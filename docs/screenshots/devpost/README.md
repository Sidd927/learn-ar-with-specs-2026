# Devpost gallery crops (3:2)

Landscape crops of four final screenshots from build `83e71bc`, for the Devpost image gallery and project thumbnail. The originals in `../` are portrait (1399 × 1590) with mostly empty space above the figure, so a centred landscape crop would cut the legs, the card and the controls.

Each file is the original with the top 658 px removed (`ffmpeg -vf crop=1398:932:0:658`), giving 1398 × 932. Nothing else is changed: no retouching, scaling or compositing. They show the Lens Studio preview (SPECS 27, Interactive), not SPECS hardware.

| File | Cropped from |
|---|---|
| `13-mistake-knees-front-3x2.jpg` (lead image) | `../13-mistake-knees-front.jpg` |
| `15-mistake-chest-side-3x2.jpg` | `../15-mistake-chest-side.jpg` |
| `14-mistake-heels-side-3x2.jpg` | `../14-mistake-heels-side.jpg` |
| `04-phase3-bottom-position-3x2.jpg` | `../04-phase3-bottom-position.jpg` |

`01` (intro) and `11` (completion) show the standing figure, whose head is too high for a 3:2 crop that keeps the feet; use the originals for those.

## Added 7 Nov 2026: frames from the final demo film (3:2)
Gallery images for the shots a 3:2 crop of a portrait screenshot can't hold (the standing figure, Lens Studio itself, the three views together). Every pixel of product comes from the real Lens Studio preview recordings; the film's own labels and captions are visible.

| File | Source |
|---|---|
| `00-film-end-card-3x2.jpg` | Final film at 2:33.6 (`Coach_Eye_Final_Hackathon_Demo.mp4`), 1920×1080 frame padded to 1920×1280 with the film's ground colour `#121416` |
| `01-film-lens-studio-3x2.jpg` | Final film at 0:13.6: the full Lens Studio 5.24.1 window (Scene Hierarchy, Scene view with "TypeScript compilation succeeded!", Preview), same padding |
| `02-film-five-phases-3x2.jpg` | Final film at 0:33.6: Bottom Position, with the film's phase list, same padding |
| `11-film-completion-3x2.jpg` | Final film at 2:17.6: zoom on the Lens's completion card, same padding |
| `08-views-front-35-side-3x2.jpg` | `../08-view-front.jpg`, `../09-view-35-degrees.jpg`, `../10-view-side.jpg`, each cropped to x 300–1100, y 420–1550 and placed side by side, labelled with the Lens's own button names, resized to 1920×1280 |
