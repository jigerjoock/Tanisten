import { createHash, randomUUID } from "node:crypto";
import { inflateRawSync } from "node:zlib";

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const MAX_PROJECT_JSON_BYTES = 2 * 1024 * 1024;
const MAX_UNCOMPRESSED_BYTES = 50 * 1024 * 1024;
const MAX_ARCHIVE_ENTRIES = 1_000;

type ProjectJson = { targets?: Array<{ isStage?: boolean; blocks?: Record<string, { opcode?: string }>; variables?: Record<string, unknown> }> };

function readUint16(bytes: Uint8Array, offset: number) { return bytes[offset] | (bytes[offset + 1] << 8); }
function readUint32(bytes: Uint8Array, offset: number) { return (bytes[offset] | (bytes[offset + 1] << 8) | (bytes[offset + 2] << 16) | (bytes[offset + 3] << 24)) >>> 0; }

export type ScratchProjectValidation = {
  sha256: string;
  sizeBytes: number;
  summary: { sprites: number; variables: number; opcodes: Record<string, number>; eventHandlers: number; loops: number; conditions: number };
};

export function validateScratchProjectArchive(input: ArrayBuffer): ScratchProjectValidation {
  const bytes = new Uint8Array(input);
  if (bytes.byteLength < 22 || bytes.byteLength > MAX_FILE_BYTES || readUint32(bytes, 0) !== 0x04034b50) throw new Error("Die Datei ist kein gültiges Scratch-Projekt.");
  let end = -1;
  for (let index = Math.max(0, bytes.length - 65_557); index <= bytes.length - 22; index += 1) {
    if (readUint32(bytes, index) === 0x06054b50) end = index;
  }
  if (end < 0) throw new Error("Das Scratch-Projekt hat kein gültiges ZIP-Verzeichnis.");
  const entries = readUint16(bytes, end + 10);
  const centralOffset = readUint32(bytes, end + 16);
  if (!entries || entries > MAX_ARCHIVE_ENTRIES || centralOffset >= bytes.length) throw new Error("Das Scratch-Projekt enthält ein ungültiges ZIP-Verzeichnis.");
  let cursor = centralOffset;
  let totalUncompressed = 0;
  let projectJson: Uint8Array | null = null;
  for (let count = 0; count < entries; count += 1) {
    if (cursor + 46 > bytes.length || readUint32(bytes, cursor) !== 0x02014b50) throw new Error("Das Scratch-Projekt ist beschädigt.");
    const compression = readUint16(bytes, cursor + 10);
    const compressedSize = readUint32(bytes, cursor + 20);
    const uncompressedSize = readUint32(bytes, cursor + 24);
    const nameLength = readUint16(bytes, cursor + 28);
    const extraLength = readUint16(bytes, cursor + 30);
    const commentLength = readUint16(bytes, cursor + 32);
    const localOffset = readUint32(bytes, cursor + 42);
    const name = new TextDecoder().decode(bytes.slice(cursor + 46, cursor + 46 + nameLength));
    if (!name || name.includes("..") || name.startsWith("/") || name.includes("\\")) throw new Error("Das Scratch-Projekt enthält einen unsicheren Dateinamen.");
    totalUncompressed += uncompressedSize;
    if (totalUncompressed > MAX_UNCOMPRESSED_BYTES) throw new Error("Das Scratch-Projekt ist zu groß.");
    if (name === "project.json") {
      if (uncompressedSize > MAX_PROJECT_JSON_BYTES || localOffset + 30 > bytes.length || readUint32(bytes, localOffset) !== 0x04034b50) throw new Error("project.json ist ungültig.");
      const localNameLength = readUint16(bytes, localOffset + 26);
      const localExtraLength = readUint16(bytes, localOffset + 28);
      const dataStart = localOffset + 30 + localNameLength + localExtraLength;
      const compressed = bytes.slice(dataStart, dataStart + compressedSize);
      if (compressed.byteLength !== compressedSize) throw new Error("project.json ist unvollständig.");
      projectJson = compression === 0 ? compressed : compression === 8 ? new Uint8Array(inflateRawSync(compressed, { maxOutputLength: MAX_PROJECT_JSON_BYTES })) : null;
      if (!projectJson) throw new Error("project.json verwendet eine nicht unterstützte Komprimierung.");
    }
    cursor += 46 + nameLength + extraLength + commentLength;
  }
  if (!projectJson) throw new Error("Das Scratch-Projekt enthält keine project.json.");
  let project: ProjectJson;
  try { project = JSON.parse(new TextDecoder().decode(projectJson)) as ProjectJson; } catch { throw new Error("project.json enthält kein gültiges JSON."); }
  if (!Array.isArray(project.targets)) throw new Error("project.json ist kein Scratch-3-Projekt.");
  const opcodes: Record<string, number> = {};
  let variables = 0;
  for (const target of project.targets) {
    variables += Object.keys(target.variables ?? {}).length;
    for (const block of Object.values(target.blocks ?? {})) {
      if (!block.opcode) continue;
      opcodes[block.opcode] = (opcodes[block.opcode] ?? 0) + 1;
    }
  }
  const opcodeCount = (prefix: string) => Object.entries(opcodes).filter(([opcode]) => opcode.startsWith(prefix)).reduce((sum, [, count]) => sum + count, 0);
  return {
    sha256: createHash("sha256").update(bytes).digest("hex"),
    sizeBytes: bytes.byteLength,
    summary: {
      sprites: project.targets.filter((target) => !target.isStage).length,
      variables,
      opcodes,
      eventHandlers: opcodeCount("event_"),
      loops: opcodeCount("control_repeat") + opcodeCount("control_forever"),
      conditions: opcodeCount("control_if")
    }
  };
}

export function scratchStoragePath(studentId: string, exerciseId: string) {
  return `scratch-projects/${studentId}/${exerciseId}/${randomUUID()}.sb3`;
}
