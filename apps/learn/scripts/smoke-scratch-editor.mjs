import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const baseUrl = process.env.SCRATCH_SMOKE_BASE_URL ?? "http://localhost:3000";
const artifactsDirectory = resolve(".private", "scratch-smoke");
await mkdir(artifactsDirectory, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
const consoleErrors = [];
const failedRequests = [];

page.on("console", message => {
  if (message.type() === "error") consoleErrors.push(message.text());
});
page.on("requestfailed", request => failedRequests.push(`${request.method()} ${request.url()} (${request.failure()?.errorText ?? "failed"})`));

function controlByLabel(pattern) {
  return page.locator("button").evaluateAll((buttons, patternSource) => {
    const pattern = new RegExp(patternSource, "i");
    const button = buttons.find(element => pattern.test(`${element.getAttribute("aria-label") ?? ""} ${element.getAttribute("title") ?? ""} ${element.textContent ?? ""}`));
    return button ? (buttons.indexOf(button)) : -1;
  }, pattern.source);
}

async function openLibrary(pattern, screenshotName) {
  const buttonIndex = await controlByLabel(pattern);
  if (buttonIndex < 0) {
    const labels = await page.locator("button").evaluateAll(buttons => buttons.map(button => button.getAttribute("aria-label")).filter(Boolean));
    throw new Error(`Library control not found for ${pattern}: ${labels.join(", ")}`);
  }
  await page.locator("button").nth(buttonIndex).click();
  const libraryItem = page.locator("[class*='library-item']").first();
  await libraryItem.waitFor({ state: "visible", timeout: 15_000 });
  await page.screenshot({ path: resolve(artifactsDirectory, screenshotName), fullPage: true });
  await libraryItem.click();
  await libraryItem.waitFor({ state: "detached", timeout: 10_000 });
}

try {
  await page.goto(`${baseUrl}/vendor/scratch-gui/index.html`, { waitUntil: "networkidle", timeout: 30_000 });
  await page.locator("#scratch-root canvas:not([class*='dragging-sprite'])").first().waitFor({ state: "visible", timeout: 20_000 });
  await page.locator(".blocklyWorkspace").first().waitFor({ state: "visible", timeout: 20_000 });
  await page.screenshot({ path: resolve(artifactsDirectory, "editor.png"), fullPage: true });

  const initialSpriteCount = await page.locator("[class*='sprite-selector'] [class*='sprite-wrapper']").count();
  await openLibrary(/Figur wählen|choose.*sprite/i, "sprite-library.png");
  await page.waitForFunction(count => document.querySelectorAll("[class*='sprite-selector'] [class*='sprite-wrapper']").length > count, initialSpriteCount, { timeout: 10_000 });
  const addedSpriteCount = await page.locator("[class*='sprite-selector'] [class*='sprite-wrapper']").count();
  if (addedSpriteCount <= initialSpriteCount) throw new Error("Selecting a sprite did not add it to the project.");

  await page.evaluate(() => window.postMessage({ type: "tanisten-scratch:select-stage" }, window.location.origin));
  await page.waitForTimeout(250);
  await openLibrary(/Hintergrund wählen|choose.*backdrop/i, "backdrop-library.png");
  const toolboxCategory = page.locator(".blocklyToolboxDiv, .blocklyToolbox").locator(".blocklyTreeRow").first();
  await toolboxCategory.click();
  await page.locator(".blocklyFlyout .blocklyDraggable").first().waitFor({ state: "visible", timeout: 10_000 });

  const exportLength = await page.evaluate(() => new Promise((resolveExport, rejectExport) => {
    const timeout = window.setTimeout(() => rejectExport(new Error("Scratch export did not respond.")), 15_000);
    window.addEventListener("message", event => {
      if (event.data?.type !== "tanisten-scratch:project") return;
      window.clearTimeout(timeout);
      resolveExport(event.data.bytes.byteLength);
    }, { once: true });
    window.postMessage({ type: "tanisten-scratch:export", requestId: "playwright-smoke" }, window.location.origin);
  }));
  if (typeof exportLength !== "number" || exportLength < 100) throw new Error("Scratch export was not a valid SB3 archive.");

  await page.screenshot({ path: resolve(artifactsDirectory, "editor-after-libraries.png"), fullPage: true });
  console.log(JSON.stringify({ ok: true, initialSpriteCount, addedSpriteCount, exportLength, consoleErrors, failedRequests }, null, 2));
  if (consoleErrors.length || failedRequests.length) process.exitCode = 1;
} catch (error) {
  await page.screenshot({ path: resolve(artifactsDirectory, "failure.png"), fullPage: true });
  console.error(JSON.stringify({ consoleErrors, failedRequests }, null, 2));
  throw error;
} finally {
  await browser.close();
}
