// Evaluates src/alarm-card.js (a classic script, bundled as is by scripts/build.mjs) in a sandbox with
// minimal DOM stand-ins and returns the names the tests need. No dependency, no browser: the shadow DOM
// update (morph) is replaced by keeping the last HTML.
import { readFileSync } from "node:fs";
import vm from "node:vm";

const source = readFileSync(new URL("../src/alarm-card.js", import.meta.url), "utf8");

export const load = () => {
  const registry = new Map();
  class HTMLElement {
    attachShadow() {
      this.shadowRoot = { innerHTML: "", addEventListener() {}, querySelector: () => null };
      return this.shadowRoot;
    }
    dispatchEvent(ev) {
      (this.events ||= []).push(ev);
    }
    appendChild() {}
  }
  class CustomEvent {
    constructor(type, init = {}) {
      this.type = type;
      this.detail = init.detail;
    }
  }
  const sandbox = {
    HTMLElement,
    CustomEvent,
    Intl,
    console: { info() {}, warn() {} },
    customElements: { get: (t) => registry.get(t), define: (t, c) => registry.set(t, c) },
    document: { createElement: (t) => (registry.has(t) ? new (registry.get(t))() : {}), addEventListener() {}, removeEventListener() {} },
    addEventListener() {},
    removeEventListener() {},
    setInterval: () => 0,
    clearInterval() {},
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  return vm.runInContext(
    `${source.replace(/const morph = \(root, html\) => \{[\s\S]*?\n\};/, "const morph = (root, html) => { root.innerHTML = html; };")}
    ({ stateClass, supportedModes, remaining, fmtCountdown, fmtDuration, parseTime, entityList, esc,
       AlarmCard: customElements.get("alarm-card"), AlarmMiniCard: customElements.get("alarm-mini-card") })`,
    sandbox,
  );
};
