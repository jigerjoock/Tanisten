declare module "@scratch/scratch-vm" {
  export default class VirtualMachine {
    loadProject(project: ArrayBuffer | Uint8Array): Promise<void>;
    saveProjectSb3(): Promise<ArrayBuffer | Uint8Array | Blob>;
    greenFlag(): void;
    stopAll(): void;
    on(event: string, listener: () => void): void;
    removeListener(event: string, listener: () => void): void;
  }
}
