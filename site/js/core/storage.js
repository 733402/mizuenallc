const KEY = "mizuena.preferences";

export function getPrefs() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

export function setPrefs(next) {
  const merged = { ...getPrefs(), ...next };
  localStorage.setItem(KEY, JSON.stringify(merged));
  applyPrefs(merged);
}

export function applyPrefs(prefs = getPrefs()) {
  document.documentElement.dataset.theme = prefs.theme || "dark";
  document.documentElement.dataset.cardSize = prefs.cardSize || "compact";
}

export function getBookmark(slug) {
  return Number(localStorage.getItem(`mizuena.bookmark.${slug}`) || 0);
}

export function setBookmark(slug, page) {
  localStorage.setItem(`mizuena.bookmark.${slug}`, String(page));
}
