// Lifecycle service to determine End-of-Life dates

class LifecycleService {
  constructor() {
    this.overrideCache = null; // from optional /eol-overrides.json
  }

  async loadOverridesOnce() {
    if (this.overrideCache !== null) return this.overrideCache;
    try {
      const res = await fetch(`/eol-overrides.json`, { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const json = await res.json();
      this.overrideCache = json || {};
    } catch {
      this.overrideCache = {};
    }
    return this.overrideCache;
  }

  // Try endoflife.date for some known ecosystems (node, python, java runtime etc.)
  async fetchEolFromEndOfLife(pkgInfo, component) {
    try {
      // This API is more product-oriented (e.g., nodejs, python), not libraries.
      // So only attempt for known products by name match if applicable.
      const nameLower = (component.name || "").toLowerCase();
      if (/^python$/.test(nameLower)) return this.queryEolApi("python", component.version);
      if (/^node(\.js)?$/.test(nameLower)) return this.queryEolApi("nodejs", component.version);
      if (/^java$/.test(nameLower)) return this.queryEolApi("java", component.version);
    } catch {}
    return null;
  }

  async queryEolApi(product, version) {
    try {
      const res = await fetch(`https://endoflife.date/api/${product}.json`);
      if (!res.ok) throw new Error(String(res.status));
      const rows = await res.json();
      if (!Array.isArray(rows)) return null;
      // Find matching cycle by major/minor prefix when possible
      const v = String(version || "");
      const found = rows.find((r) => r.cycle && (v === r.cycle || v.startsWith(r.cycle + ".")));
      const eol = found?.eol || null;
      if (!eol || eol === false) return null;
      // eol is YYYY-MM-DD
      const [yyyy, mm, dd] = String(eol).split("-");
      if (yyyy && mm && dd) return `${dd}-${mm}-${yyyy}`;
      return null;
    } catch {
      return null;
    }
  }

  normalizeGa(group, artifact) {
    return `${group}:${artifact}`.toLowerCase();
  }

  async fetchEol(component, pkgInfo) {
    // 1) Overrides file (for libraries like Maven where no public EOL data is available)
    const overrides = await this.loadOverridesOnce();
    if (pkgInfo?.ecosystem === "maven" && pkgInfo.group && pkgInfo.name) {
      const key = this.normalizeGa(pkgInfo.group, pkgInfo.name);
      const date = overrides?.maven?.[key] || null;
      if (date) return date; // expected DD-MM-YYYY in overrides
    }

    // 2) endoflife.date for some known products (rarely libraries)
    const eol = await this.fetchEolFromEndOfLife(pkgInfo, component);
    if (eol) return eol;

    return null;
  }
}

export default LifecycleService;


