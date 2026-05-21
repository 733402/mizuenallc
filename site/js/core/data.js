export async function loadJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json();
}

export function byQuery(items, q, keys = ["title"]) {
  const query = q.trim().toLowerCase();
  if (!query) return items;
  return items.filter((item) => keys.some((key) => String(item[key] || "").toLowerCase().includes(query)));
}
