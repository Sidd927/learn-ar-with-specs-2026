# Screenshot index

All images are real captures of the running Lens in the **Lens Studio 5.24.1 preview** (device SPECS 27, Interactive input). None are Scene-viewport renders or edited images.

**Build:** branch `feature/coach-eye`, captured on 31 Oct 2026, and every image matches the final build `2201d21`:
- `01`–`06` and `08`–`12` come from `0029122`. Later commits changed only the comparison card and pattern poses, which these screens don't show.
- `13` comes from `643a8bb`, `15` from `78381e9` (after the chest-arm fix), and `14` from `2201d21` (after the view-label fix).
- `07` is from the `main` build: a close-up of the control panel, which is unchanged.

Each shot is taken from the user's start position (preview camera reset to the origin). Phase, angle and comparison shots were opened directly with the controller's capture hook (`startPhase` / `startAngle` / `startFault`). The hook is off by default (−1 / empty) and isn't used in normal launches.

| File | Shows |
|---|---|
| `01-hero-intro.jpg` | First launch: intro card ("Watch a squat in five phases. Then compare three common patterns…"), disclaimer, the figure at 35°, and Start. |
| `02-phase1-starting-stance.jpg` | Phase 1 with thin amber foot outlines; Prev dimmed; the "COMPARE COMMON PATTERNS" row. |
| `03-phase2-controlled-descent.jpg` | Phase 2 with knee arrows along the toes. |
| `04-phase3-bottom-position.jpg` | Phase 3 (target Bottom Position) with the hip marker. |
| `05-phase4-rising-up.jpg` | Phase 4, more upright than the descent. |
| `06-phase5-standing-finish.jpg` | Phase 5 with the completion ring; Next dimmed. |
| `07-playback-interface.jpg` | Close-up of the control panel (from the `main` build; panel unchanged). |
| `08-view-front.jpg` | Front view at the Bottom Position. |
| `09-view-35-degrees.jpg` | Default 35° view at the Bottom Position (same frame as `04`). |
| `10-view-side.jpg` | Side view at the Bottom Position. |
| `11-completion.jpg` | Completion: "Squat complete. Try Knees, Heels or Chest below to compare a common pattern, or Replay." |
| `12-extra-rising-up-side.jpg` | Side view of Rising Up. |
| `13-mistake-knees-front.jpg` | Knees comparison, front view: "BEST SEEN FROM THE FRONT"; red knees inside the white knees; "PINCH AGAIN TO RETURN"; exaggeration note. |
| `14-mistake-heels-side.jpg` | Heels comparison, side view: "SEEN FROM THE SIDE OR REAR"; red heels raised (the raised red thigh and shin are the most visible part; see the audit). |
| `15-mistake-chest-side.jpg` | Chest comparison, side view: "BEST SEEN FROM THE SIDE"; red torso and head further forward; arms keep the target's angle. |

File names keep the `mistake` prefix for link stability; the Lens itself says "common pattern".
