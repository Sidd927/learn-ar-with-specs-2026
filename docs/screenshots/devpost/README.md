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
