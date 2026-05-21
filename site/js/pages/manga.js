import { loadJSON, byQuery } from "../core/data.js";
import { card } from "../core/components.js";

export async function initManga() {
  const list = await loadJSON("assets/metadata/manga.json");
  const grid = document.getElementById("manga-grid");
  const search = document.getElementById("manga-search");

  const render = () => {
    const filtered = byQuery(list, search.value, ["title", "author"]);
    grid.innerHTML = filtered.map((item) => card({ ...item, sub: item.author }, `manga-reader.html?slug=${item.slug}`)).join("");
  };

  search.addEventListener("input", render);
  render();
}
