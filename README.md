# Mizuena

Local-first anime + manga + music archive website built with HTML, CSS, and vanilla JavaScript.

## Run locally

```bash
cd site
python3 -m http.server 8000
```

Open `http://127.0.0.1:8000/index.html`.

## Structure

- `site/` web app pages, modular CSS/JS, and JSON metadata
- `site/assets/metadata/*.json` dynamic media definitions (no hardcoded card HTML)
- `Anime/`, `Manga/`, `Music/` local media folders

## Notes

- Anime, manga, and music pages render from metadata JSON.
- Manga reader supports extracted image pages defined in metadata.
- Theme and layout preferences are saved to `localStorage`.
