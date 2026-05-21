import { loadJSON } from "../core/data.js";
import { card, shortcut } from "../core/components.js";

export async function initHome() {
  const [home, anime, manga, music] = await Promise.all([
    loadJSON("assets/metadata/home.json"),
    loadJSON("assets/metadata/anime.json"),
    loadJSON("assets/metadata/manga.json"),
    loadJSON("assets/metadata/music.json")
  ]);

  const featured = home.featured;
  document.getElementById("featured-banner").innerHTML = `
    <article class="banner">
      <p>Featured</p>
      <h2>${featured.title}</h2>
      <p>${featured.description}</p>
    </article>`;

  const byType = { anime, manga, music };
  const entryHref = (type, item, mode) => {
    const routes = {
      continue: {
        anime: `anime-series.html?slug=${item.slug}`,
        manga: `manga-reader.html?slug=${item.slug}`,
        music: "music.html"
      },
      recent: {
        anime: "anime.html",
        manga: "manga.html",
        music: "music.html"
      }
    };
    return routes[mode][type];
  };
  const continueItems = home.continue.map((entry) => {
    const item = byType[entry.type].find((i) => i.slug === entry.slug);
    if (!item) return "";
    const href = entryHref(entry.type, item, "continue");
    return card({ ...item, sub: `Continue ${entry.type}` }, href);
  });
  document.getElementById("continue-grid").innerHTML = continueItems.join("");

  const recentItems = home.recent.map((entry) => {
    const item = byType[entry.type].find((i) => i.slug === entry.slug);
    if (!item) return "";
    const href = entryHref(entry.type, item, "recent");
    return card({ ...item, sub: `New ${entry.type}` }, href);
  });
  document.getElementById("recent-grid").innerHTML = recentItems.join("");

  document.getElementById("shortcuts").innerHTML = [
    shortcut("Anime", "anime.html"),
    shortcut("Manga", "manga.html"),
    shortcut("Music", "music.html"),
    shortcut("Settings", "settings.html")
  ].join("");
}
