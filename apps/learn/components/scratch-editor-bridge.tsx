"use client";

import dynamic from "next/dynamic";
import { ComponentType, useEffect, useRef, useState } from "react";

type ScratchVm = {
  loadProject(project: ArrayBuffer | Uint8Array): Promise<void>;
  saveProjectSb3(): Promise<ArrayBuffer | Uint8Array | Blob>;
  greenFlag(): void;
  stopAll(): void;
  on(event: string, listener: () => void): void;
  removeListener?(event: string, listener: () => void): void;
};

type ScratchGuiProps = { vm: ScratchVm; locale?: string };

const ScratchGui = dynamic<ScratchGuiProps>(async () => {
  const module = await import("@scratch/scratch-gui");
  return module.default as unknown as ComponentType<ScratchGuiProps>;
}, {
  ssr: false,
  loading: () => <p style={{ padding: 24, fontFamily: "system-ui" }}>Scratch-Editor wird geladen …</p>
});

function post(message: Record<string, unknown>, transfer?: Transferable[]) {
  window.parent.postMessage(message, window.location.origin, transfer ?? []);
}

async function projectBytes(project: ArrayBuffer | Uint8Array | Blob): Promise<ArrayBuffer> {
  if (project instanceof Blob) return project.arrayBuffer();
  if (project instanceof Uint8Array) return project.buffer.slice(project.byteOffset, project.byteOffset + project.byteLength) as ArrayBuffer;
  return project;
}

export default function ScratchEditorBridge() {
  const vm = useRef<ScratchVm | null>(null);
  const [readyVm, setReadyVm] = useState<ScratchVm | null>(null);
  const suppressChanges = useRef(false);

  useEffect(() => {
    let mounted = true;
    let projectChanged: (() => void) | undefined;
    import("@scratch/scratch-vm").then((module) => {
      if (!mounted) return;
      const VirtualMachine = module.default as unknown as new () => ScratchVm;
      const instance = new VirtualMachine();
      projectChanged = () => {
        if (!suppressChanges.current) post({ type: "tanisten-scratch:changed" });
      };
      instance.on("PROJECT_CHANGED", projectChanged);
      vm.current = instance;
      setReadyVm(instance);
      const versionId = new URLSearchParams(window.location.search).get("versionId");
      if (versionId) {
        suppressChanges.current = true;
        fetch(`/api/scratch/projects?versionId=${encodeURIComponent(versionId)}`, { cache: "no-store" })
          .then(async (response) => {
            if (!response.ok) throw new Error();
            await instance.loadProject(new Uint8Array(await response.arrayBuffer()));
          })
          .then(() => { suppressChanges.current = false; post({ type: "tanisten-scratch:ready" }); })
          .catch(() => { suppressChanges.current = false; post({ type: "tanisten-scratch:error", message: "Der eingereichte Scratch-Snapshot konnte nicht geladen werden." }); });
        return;
      }
      post({ type: "tanisten-scratch:ready" });
    }).catch(() => post({ type: "tanisten-scratch:error", message: "Der Scratch-Editor konnte nicht geladen werden." }));
    return () => {
      mounted = false;
      if (vm.current && projectChanged) vm.current.removeListener?.("PROJECT_CHANGED", projectChanged);
      vm.current = null;
    };
  }, []);

  useEffect(() => {
    async function onMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin || event.source !== window.parent) return;
      const data = event.data as { type?: string; requestId?: string; bytes?: ArrayBuffer };
      const instance = vm.current;
      if (!instance || !data.type) return;
      try {
        if (data.type === "tanisten-scratch:green-flag") instance.greenFlag();
        if (data.type === "tanisten-scratch:stop") instance.stopAll();
        if (data.type === "tanisten-scratch:import" && data.bytes instanceof ArrayBuffer) {
          suppressChanges.current = true;
          await instance.loadProject(new Uint8Array(data.bytes));
          suppressChanges.current = false;
          post({ type: "tanisten-scratch:changed" });
        }
        if (data.type === "tanisten-scratch:export" && data.requestId) {
          const bytes = await projectBytes(await instance.saveProjectSb3());
          post({ type: "tanisten-scratch:project", requestId: data.requestId, bytes }, [bytes]);
        }
      } catch {
        suppressChanges.current = false;
        post({ type: "tanisten-scratch:error", message: "Das Scratch-Projekt konnte nicht verarbeitet werden." });
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return <main style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>{readyVm ? <ScratchGui vm={readyVm} locale="de" /> : null}</main>;
}
