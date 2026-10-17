import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const applicationDirectory = resolve(scriptDirectory, "..");
const sourceDirectory = resolve(applicationDirectory, "node_modules/@scratch/scratch-gui/dist");
const targetDirectory = resolve(applicationDirectory, "public/vendor/scratch-gui");
const publicChunksDirectory = resolve(applicationDirectory, "public/chunks");
const publicStaticDirectory = resolve(applicationDirectory, "public/static");

const shell = `<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Scratch 3</title>
    <style>
      html, body, #scratch-root { width: 100%; height: 100%; margin: 0; overflow: hidden; background: #FAFCFF; }
      #scratch-root { min-width: 1024px; min-height: 640px; }
      #scratch-root [class*="gui_body-wrapper"],
      #scratch-root [class*="gui_body-wrapper-without-menu-bar"] { background: #D9F2FF; }
      #scratch-root [class*="gui_menu-bar"],
      #scratch-root [class*="stage-header"] { background: #D9F2FF; border-color: #C7DEEE; }
      #scratch-root [class*="gui_flex-wrapper"],
      #scratch-root [class*="gui_editor-wrapper"],
      #scratch-root [class*="stage-wrapper"],
      #scratch-root [class*="target-pane"] { min-height: 0; }
      #scratch-root [class*="gui_flex-wrapper"] { height: 100%; overflow: hidden; }
      #scratch-root [class*="sprite-selector"] { min-height: 0; background: #E8F5FF; border-color: #C7DEEE; }
      #scratch-root [class*="sprite-selector"] [class*="scroll-wrapper"] { min-height: 0; height: auto; overflow-y: auto; overscroll-behavior: contain; }
      #scratch-root [class*="stage-selector-wrapper"],
      #scratch-root [class*="stage-selector"] { background: #E8F5FF; border-color: #C7DEEE; }
      #scratch-root .blocklyMainBackground { fill: #FAFCFF; }
      #scratch-root .blocklyToolboxDiv, #scratch-root .blocklyFlyout { background: #E8F5FF; border-color: #C7DEEE; }
      #scratch-error { display: none; box-sizing: border-box; padding: 24px; color: #991b1b; font: 600 16px/1.5 system-ui, sans-serif; }
      #scratch-error.is-visible { display: block; }
    </style>
  </head>
  <body>
    <div id="scratch-root" aria-label="Scratch 3 Editor"></div>
    <div id="scratch-error" role="alert"></div>
    <script src="./scratch-gui-standalone.js"></script>
    <script>
      (function () {
        const rootElement = document.getElementById("scratch-root");
        const errorElement = document.getElementById("scratch-error");
        let vm = null;
        let state = null;
        let suppressChanges = false;
        let ready = false;

        function send(message, transfer) {
          window.parent.postMessage(message, window.location.origin, transfer || []);
        }

        function fail(message) {
          errorElement.textContent = message;
          errorElement.classList.add("is-visible");
          send({ type: "tanisten-scratch:error", message: message });
        }

        function projectBytes(project) {
          if (project instanceof Blob) return project.arrayBuffer();
          if (project instanceof Uint8Array) return Promise.resolve(project.buffer.slice(project.byteOffset, project.byteOffset + project.byteLength));
          return Promise.resolve(project);
        }

        function normalizeToolboxConfig(value) {
          if (!value || typeof value !== "object") return null;
          const categories = Array.isArray(value.allowedCategories) ? value.allowedCategories.filter(function (item) { return typeof item === "string"; }) : null;
          const blocks = Array.isArray(value.allowedBlockTypes) ? value.allowedBlockTypes.filter(function (item) { return typeof item === "string"; }) : null;
          if (!categories && !blocks) return null;
          return { allowedCategories: categories, allowedBlockTypes: blocks };
        }

        function applyToolboxRestriction(value) {
          const config = normalizeToolboxConfig(value);
          if (!config) return;
          const currentState = state.store.getState();
          const currentXml = currentState && currentState.scratchGui && currentState.scratchGui.toolbox && currentState.scratchGui.toolbox.toolboxXML;
          if (!currentXml) throw new Error("Scratch toolbox XML fehlt");
          const documentNode = new DOMParser().parseFromString(currentXml, "text/xml");
          const allowedCategories = config.allowedCategories ? new Set(config.allowedCategories) : null;
          const allowedBlockTypes = config.allowedBlockTypes ? new Set(config.allowedBlockTypes) : null;
          Array.from(documentNode.querySelectorAll("category")).forEach(function (category) {
            const categoryId = category.getAttribute("toolboxitemid");
            if (allowedCategories && (!categoryId || !allowedCategories.has(categoryId))) {
              category.remove();
              return;
            }
            if (!allowedBlockTypes) return;
            Array.from(category.children).forEach(function (child) {
              if (child.tagName === "block" && !allowedBlockTypes.has(child.getAttribute("type"))) child.remove();
            });
            const hasBlocks = Array.from(category.children).some(function (child) { return child.tagName === "block"; });
            if (!hasBlocks && categoryId !== "myBlocks") category.remove();
          });
          state.store.dispatch({
            type: "scratch-gui/toolbox/UPDATE_TOOLBOX",
            toolboxXML: new XMLSerializer().serializeToString(documentNode.documentElement)
          });
        }

        function waitForEditor() {
          let frames = 0;
          const check = function () {
            const hasStage = Boolean(rootElement.querySelector("canvas"));
            const hasControls = rootElement.querySelectorAll("button").length >= 2;
            if (hasStage && hasControls && vm) {
              ready = true;
              send({ type: "tanisten-scratch:ready" });
              return;
            }
            frames += 1;
            if (frames > 180) {
              fail("Der Scratch-Editor konnte nicht vollstandig eingebunden werden.");
              return;
            }
            window.requestAnimationFrame(check);
          };
          window.requestAnimationFrame(check);
        }

        try {
          const scratchGui = window.GUI;
          if (!scratchGui || !scratchGui.EditorState || !scratchGui.createStandaloneRoot || !scratchGui.setAppElement) {
            throw new Error("Scratch standalone API fehlt");
          }

          scratchGui.setAppElement(rootElement);
          state = new scratchGui.EditorState({ locale: "de" });
          vm = state.store.getState().scratchGui.vm;
          if (!vm) throw new Error("Scratch VM wurde nicht erstellt");

          const gui = scratchGui.createStandaloneRoot(state, rootElement);
          gui.render({
            canEditTitle: true,
            backpackVisible: false,
            canSave: false,
            showComingSoon: false,
            onClickLogo: function () {}
          });

          vm.on("PROJECT_CHANGED", function () {
            if (!suppressChanges && ready) send({ type: "tanisten-scratch:changed" });
          });

          const versionId = new URLSearchParams(window.location.search).get("versionId");
          if (versionId) {
            suppressChanges = true;
            fetch("/api/scratch/projects?versionId=" + encodeURIComponent(versionId), { cache: "no-store" })
              .then(function (response) {
                if (!response.ok) throw new Error("Snapshot nicht verfugbar");
                return response.arrayBuffer();
              })
              .then(function (bytes) { return vm.loadProject(new Uint8Array(bytes)); })
              .then(function () { suppressChanges = false; })
              .catch(function () { suppressChanges = false; fail("Der eingereichte Scratch-Snapshot konnte nicht geladen werden."); });
          }

          window.addEventListener("message", function (event) {
            if (event.origin !== window.location.origin || event.source !== window.parent || !event.data || !vm) return;
            const data = event.data;
            try {
              if (data.type === "tanisten-scratch:green-flag") vm.greenFlag();
              if (data.type === "tanisten-scratch:stop") vm.stopAll();
              if (data.type === "tanisten-scratch:select-stage") vm.setEditingTarget(vm.runtime.getTargetForStage().id);
              if (data.type === "tanisten-scratch:configure-toolbox") applyToolboxRestriction(data.config);
              if (data.type === "tanisten-scratch:import" && data.bytes instanceof ArrayBuffer) {
                suppressChanges = true;
                vm.loadProject(new Uint8Array(data.bytes)).then(function () {
                  suppressChanges = false;
                  send({ type: "tanisten-scratch:changed" });
                }).catch(function () {
                  suppressChanges = false;
                  fail("Das Scratch-Projekt konnte nicht importiert werden.");
                });
              }
              if (data.type === "tanisten-scratch:export" && data.requestId) {
                vm.saveProjectSb3().then(projectBytes).then(function (bytes) {
                  send({ type: "tanisten-scratch:project", requestId: data.requestId, bytes: bytes }, [bytes]);
                }).catch(function () { fail("Das Scratch-Projekt konnte nicht exportiert werden."); });
              }
            } catch (_) {
              fail("Das Scratch-Projekt konnte nicht verarbeitet werden.");
            }
          });

          waitForEditor();
        } catch (_) {
          fail("Der Scratch-Editor konnte nicht geladen werden.");
        }
      }());
    </script>
  </body>
</html>`;

await rm(targetDirectory, { recursive: true, force: true });
await mkdir(targetDirectory, { recursive: true });
await cp(sourceDirectory, targetDirectory, {
  recursive: true,
  filter: source => !source.endsWith(".map") && !source.endsWith(".hex")
});
await rm(publicChunksDirectory, { recursive: true, force: true });
await cp(resolve(sourceDirectory, "chunks"), publicChunksDirectory, { recursive: true });
await rm(publicStaticDirectory, { recursive: true, force: true });
await cp(resolve(sourceDirectory, "static"), publicStaticDirectory, { recursive: true });
await writeFile(resolve(targetDirectory, "index.html"), shell, "utf8");

console.log("Prepared official Scratch GUI assets for the local workspace.");
