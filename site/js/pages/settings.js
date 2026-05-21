import { applyPrefs, getPrefs, setPrefs } from "../core/storage.js";

export function initSettings() {
  const prefs = getPrefs();
  const theme = document.getElementById("theme-toggle");
  const cardSize = document.getElementById("card-size");

  theme.checked = (prefs.theme || "dark") === "light";
  cardSize.value = prefs.cardSize || "compact";

  theme.addEventListener("change", () => {
    setPrefs({ theme: theme.checked ? "light" : "dark" });
  });

  cardSize.addEventListener("change", () => {
    setPrefs({ cardSize: cardSize.value });
  });

  applyPrefs();
}
