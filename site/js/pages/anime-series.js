import { loadJSON } from "../core/data.js";
import { episodeRow } from "../core/components.js";

export async function initAnimeSeries() {
  const slug = new URLSearchParams(location.search).get("slug");
  const data = await loadJSON("assets/metadata/anime.json");
  const series = data.find((item) => item.slug === slug) || data[0];
  const title = document.getElementById("series-title");
  const listEl = document.getElementById("episode-list");
  const video = document.getElementById("video-player");
  const subSel = document.getElementById("subtitle-select");

  title.textContent = series.title;
  listEl.innerHTML = series.episodes.map(episodeRow).join("");

  const playEpisode = (idx) => {
    const episode = series.episodes[idx];
    if (!episode) return;
    video.src = episode.file;
    while (video.firstChild) video.removeChild(video.firstChild);
    subSel.innerHTML = `<option value="">None</option>`;
    if (episode.subtitle) {
      const track = document.createElement("track");
      track.kind = "subtitles";
      track.label = "English";
      track.srclang = "en";
      track.src = episode.subtitle;
      video.appendChild(track);
      subSel.innerHTML += `<option value="${episode.subtitle}">English</option>`;
    }
    video.play().catch(() => {});
  };

  listEl.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-ep]");
    if (!btn) return;
    playEpisode(Number(btn.dataset.ep));
  });

  subSel.addEventListener("change", () => {
    const selected = subSel.value;
    const track = video.querySelector("track");
    if (track) track.mode = selected ? "showing" : "disabled";
  });

  playEpisode(0);
}
