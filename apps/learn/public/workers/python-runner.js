/* Tanisten Learn: isolated browser-side Python runner (Pyodide 0.27.7).
   Execution results are NOT trusted as automatic grading evidence. */
let python = null;
const PYODIDE_ROOT = "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/";
async function load() {
  try {
    importScripts(`${PYODIDE_ROOT}pyodide.js`);
    python = await loadPyodide({ indexURL: PYODIDE_ROOT });
    python.setStdout({ batched: text => self.postMessage({ type: "output", stream: "stdout", text }) });
    python.setStderr({ batched: text => self.postMessage({ type: "output", stream: "stderr", text }) });
    self.postMessage({ type: "ready" });
  } catch (error) {
    self.postMessage({ type: "failed", message: String(error) });
  }
}
self.onmessage = async (event) => {
  if (event.data?.type !== "run" || !python) return;
  try {
    await python.runPythonAsync(String(event.data.code ?? ""));
    self.postMessage({ type: "finished" });
  } catch (error) {
    self.postMessage({ type: "failed", message: String(error) });
  }
};
void load();
