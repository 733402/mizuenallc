import { loadJSON, byQuery } from "../core/data.js";
import { card } from "../core/components.js";

export async function initAnime() {
  const list = await loadJSON("assets/metadata/anime.json");
  const grid = document.getElementById("anime-grid");
  const search = document.getElementById("anime-search");
  const filter = document.getElementById("anime-filter");

  const genres = [...new Set(list.flatMap((item) => item.genres || []))].sort();
  filter.innerHTML += genres.map((g) => `<option value="${g}">${g}</option>`).join("");

  const render = () => {
    const searched = byQuery(list, search.value, ["title", "description"]);
    const filtered = filter.value === "all" ? searched : searched.filter((item) => (item.genres || []).includes(filter.value));
    grid.innerHTML = filtered.map((item) => card({ ...item, sub: `${item.year} • ${item.status}` }, `anime-series.html?slug=${item.slug}`)).join("");
  };

  search.addEventListener("input", render);
  filter.addEventListener("change", render);
  render();
}
