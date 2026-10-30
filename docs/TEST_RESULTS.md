# Test results

Latest run: 31 Oct 2026 · Lens Studio 5.24.1.26100516 · Preview device SPECS 27 (Interactive) · LEAF 2.0.2 · SpectaclesInteractionKit 2.0.0 · SpectaclesUIKit 2.0.0

Automated checks run in the Lens Studio preview through LEAF. Each scenario pinches the real UIKit buttons through SIK, then measures scene state: UI text and label colour, joint transforms, turntable rotation, cue visibility, toggle state, and wall-clock time. Values are copied from the Lens Studio log (`[SquatTutorTest]` lines) from the run after the final visual changes. Scenarios run one at a time; LEAF resets the Lens before each.

## Automated (LEAF): 7 run, 7 passed, 0 failed, 0 skipped

| ID | Criterion | Expected | Measured | Result |
|---|---|---|---|---|
| a-placement | 1. Placement | 150–200 cm away, yaw 35° ± 2°, Start enabled, root still while animating | Root (0, −42, −170), 170.0 cm; yaw 35.0°; root moved 0.000 cm in 3 s | PASS |
| b-full-demo | 2. Full demonstration (+6) | Phases 1→5 in order with matching title, cue, and body cue; completes in 10–15 s; no auto-restart | Phases 1-2-3-4-5, 0 cue mismatches; completed in 12.03 s; still complete 1.5 s later | PASS |
| c-stepping | 3. Phase stepping | One phase per press; knee within 2° of target; Prev/Next disabled at the ends | Knee 79.6 / 123.3 / 54.8 / 5.5° = targets (both directions); Next disabled at 5, Prev at 1; extra steps ignored | PASS |
| d-playback | 4. Pause, Play, Replay, Slow | Joints frozen while paused (< 0.5°); resume advances; Replay → phase 1; Slow ratio 1.8–2.2 | Paused knee 79.01° → 79.01°; resumed; 1x 12.30 s vs 0.5x 24.59 s, ratio 2.00 | PASS |
| e-angles | 5. Viewing angles | 0° / 35° / 90° ± 2°; root moves < 1 cm; playback continues | 0.0 / 35.0 / 90.0 / 0.0°; root moved 0.000 cm; timeline kept advancing | PASS |
| f-cues | 6. Phase cues | Exactly one cue group per phase: feet, knees, hip, knees, finish ring | Foot outlines / knee arrows / hip marker / knee arrows / completion ring | PASS |
| g-edge-cases | Interaction edge cases | Pause mid-transition freezes the pose; Play/Pause label matches state; Slow and angle toggles match state; disabled labels dimmed; Next while playing pauses and advances one; completion; Play and Replay after completion restart | Paused at 2.36 s (inside the 1.5–2.7 s transition), frozen; labels "Pause"/"Play" correct; toggles matched; Prev/Next dimmed at the ends; restart from completion OK | PASS |

To re-run, open the LEAF panel (or use `open_leaf_panel` / `run_leaf_scenario` through the Lens Studio MCP) and run each id one at a time. Running scenarios in parallel aborts the earlier one.

## Manual checks (preview screenshots, 31 Oct 2026)

| Check | Result | Evidence |
|---|---|---|
| Head, feet, cue card, and controls visible from the start position | Pass | `01`–`06`, `11` |
| Squat reads clearly; feet planted; each phase distinct | Pass. Descent is lower with more lean than Rising Up. | `02`–`06` |
| Front view shows the knees tracking over the toes | Pass | `08-view-front.jpg` |
| Side view: hip and knee travel; hands clear of the control panel | Pass. The hands pass above the panel. | `10-view-side.jpg` |
| No arm or body intersections | Pass. The Rising Up hands are in front of the body (confirmed from the side). | `12-extra-rising-up-side.jpg` |
| Completion ring is thin and doesn't cover the feet | Pass | `06`, `11` |
| Button states: active toggles highlighted, Prev/Next dimmed at the ends | Pass | `02`, `06`, `07` |
| Text readable; nothing dark disappearing | Pass at full capture size. Thin glyphs can look dropped in downscaled images. | `07-playback-interface.jpg` |
| WASD walk-around keeps the figure fixed | Measured (root moved 0.000 cm) and the camera moved programmatically. Not tried by a person at the keyboard. | — |

## Not tested (requires SPECS hardware)
Comfort over time, see-through readability, real hand-tracking pinch, physical follow-along. See `DEVICE_VALIDATION.md`.

## Fresh-open test
See `BUILD_PROGRESS.md` → Fresh-open test.
