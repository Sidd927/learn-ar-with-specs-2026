# Test results

## Extended test H (`1d1bd5a`, 31 Oct 2026, 22:48 IST): 1 run, 1 passed
Product code is unchanged since `2201d21`; only the test file changed. Test H now checks:
- **Every pattern (Knees, Heels, Chest):**
  - red figure shown, paused at the Bottom Position;
  - turned to its view (± 2°), starting from a different angle each time: knees from 35°, heels from 35°, chest from Front;
  - exact view label, title, `Red: … / White (target): …` lines, "PINCH AGAIN TO RETURN" and the exaggeration note;
  - only that toggle on;
  - red figure differing from the white one in the intended direction.
- **Controls that keep a comparison open:** Slow, and the 35° and Front angle buttons.
- **Exits:**
  - same button: stays on the Bottom Position, paused;
  - Play: playing;
  - Prev: phase 2;
  - Next: phase 4;
  - Replay: playing from phase 1.

  Each exit must also restore the row label, disclaimer and phase label, with all toggles off.

| Run | Result | Log |
|---|---|---|
| 1st attempt (22:46) | **No result.** The scenario never started: no test output, preview left on the intro. The MCP call timed out and LEAF logged "Scenario run cancelled". Treated as an infrastructure hang, not a pass. | — |
| 2nd attempt (22:48) | **PASS** in about 30 s | knees 7.7 vs 3.1 cm; heels +4.0 cm; chest +3.8 cm; "mistake comparison ok (3 patterns, 5 exits, Slow and angle keep it open)" |

Scenarios a–g were not re-run after this change: no product code or shared test-kit code changed. Their last run is the `2201d21` table below.

## Final build: `feature/coach-eye` at `2201d21` (31 Oct 2026)
Lens Studio 5.24.1.26100516 · Preview device SPECS 27 (Interactive) · LEAF 2.0.2 · SpectaclesInteractionKit 2.0.0 · SpectaclesUIKit 2.0.0

Each LEAF scenario pinches the real UIKit buttons through SIK, then reads scene state: UI text, joint transforms, turntable rotation, cue visibility, toggle state, and wall-clock time. Values are copied from the `[SquatTutorTest]` lines of the Lens Studio log for this run. Scenarios ran one at a time, in the order a → h; LEAF resets the Lens before each.

### Automated (LEAF): 8 run, 8 passed, 0 failed, 0 skipped

| ID | Checks | Measured on the final build | Result |
|---|---|---|---|
| a-placement | 150–200 cm away, yaw 35° ± 2°, Start enabled, root still while animating | Root (0, −42, −170), 170.0 cm; yaw 35.0°; root moved 0.000 cm | PASS |
| b-full-demo | Phases 1→5 in order with matching title, cue and body cue; 10–15 s; no auto-restart; completion message | Phases 1-2-3-4-5; completed in 12.01 s; still complete afterwards | PASS |
| c-stepping | One phase per press; knee within 2° of target; ends disabled | Knee 79.6 / 123.3 / 54.8 / 5.5° = targets, both directions; Prev/Next disabled at the ends | PASS |
| d-playback | Paused joints frozen; resume; Replay → phase 1; Slow ratio 1.8–2.2 | Paused knee 79.15° → 79.15°; 1x 12.29 s vs 0.5x 24.57 s, ratio 2.00 | PASS |
| e-angles | 0 / 35 / 90° ± 2°; root moves < 1 cm; playback continues | 0.0 / 35.0 / 90.0 / 0.0°; root moved 0.000 cm | PASS |
| f-cues | One cue group per phase | Foot outlines / knee arrows / hip marker / knee arrows / completion ring | PASS |
| g-edge-cases | Pause mid-transition; label and toggle sync; dimmed ends; Next while playing; Play/Replay after completion | Paused at 2.42 s (mid-transition), frozen; Replay 1.62 s → 0.35 s and phase 1 | PASS |
| h-mistake-compare (earlier, narrower version) | Knees: red figure shown, Bottom Position, paused, front view, title, view label, "White (target)", return hint, exaggeration note. Heels: side view, title, view label. Chest: title, view label (its 90° turn was **not** asserted, because Heels had already turned the stage). All three: red figure differs in the intended direction. Exits tested: same button (restores label and disclaimer) and Play only. Superseded by the extended test above. | Knees 3.1 vs 7.7 cm; heels +4.0 cm; head +3.8 cm; checked items as listed | PASS |

The h values are **internal model-geometry checks** (1:3-scale mannequin, exaggerated illustrative differences). They are not biomechanical measurements and don't establish a correct squat. See `BIOMECHANICAL_VALIDATION.md`.

**Runtime log** from 12:00 onwards (this milestone): 0 script errors or exceptions. Infrastructure warnings only: renderer depth-format fallback; the LEAF plugin "Skipping plugin state save"; UIKit's "automatically converted to a toggle" info lines.

**Compile:** `RecompileTypeScriptTool` succeeded after every change in this milestone.

### Manual checks (preview captures from this build, 31 Oct 2026)

| Check | Result | Evidence |
|---|---|---|
| Intro explains the comparison feature before Start | Pass: "Watch a squat in five phases. Then compare three common patterns with the target, each from the angle where it shows." | `01-hero-intro.jpg` |
| Head, feet, cue card and controls visible from the start position | Pass | `01`–`06`, `11` |
| Each phase distinct; feet planted | Pass | `02`–`06` |
| Comparison card text fits its card (label, title, red/white lines, return hint, note) | Pass. The longest label, "SEEN FROM THE SIDE OR REAR", fits with a small margin. | `13`–`15` |
| Knees: red knees visibly inside the white knees | Pass, clear | `13-mistake-knees-front.jpg` |
| Chest: red torso tips forward; arms change only with the torso | Pass (after the arm fix `78381e9`) | `15-mistake-chest-side.jpg` |
| Heels: the heel gap is the most visible difference | **Partial.** The raised red thigh and shin dominate; the heel gap is small at this scale. Open issue. | `14-mistake-heels-side.jpg` |
| Completion card points to the comparison | Pass: "Try Knees, Heels or Chest below to compare a common pattern, or Replay." | `11-completion.jpg` |
| Red hands in the chest view clear of panel text and buttons | Pass. They sit just above the control panel's top-left corner. | `15` |
| Completion ring vs cue card | Minor: at the pulse peak the ring's left edge touches the cue card's edge. Cosmetic. | `06`, `11` |
| `07-playback-interface.jpg` | Not recaptured. It's a close-up of the control panel, which is unchanged since the `main` build. | `07` |

### Not tested
- **Fresh quit-and-reopen on the branch.** It needs the owner to quit Lens Studio; it was last done on `main` (`905a938`).
- **SPECS hardware:** comfort, see-through readability (especially 55% red), real hand-tracking pinch, following along. See `DEVICE_VALIDATION.md`.
- **Users:** NOT CONDUCTED (`USER_VALIDATION_PLAN.md`).
- **Walking around with WASD by a person:** only measured programmatically (root 0.000 cm).

## History

Earlier runs, kept for traceability. The first block is the `main` build (`d1d0473`, fallback). The last block is the first Coach's Eye prototype (`6c4e379`/`725b6a2`), before this milestone's copy and pose changes.

Main build run: 31 Oct 2026 · Lens Studio 5.24.1.26100516 · Preview device SPECS 27 (Interactive) · LEAF 2.0.2 · SpectaclesInteractionKit 2.0.0 · SpectaclesUIKit 2.0.0

Automated checks run in the Lens Studio preview through LEAF. Each scenario pinches the real UIKit buttons through SIK, then measures scene state: UI text and label colour, joint transforms, turntable rotation, cue visibility, toggle state, and wall-clock time. Values are copied from the Lens Studio log (`[SquatTutorTest]` lines) from the run after the final visual changes. Scenarios run one at a time; LEAF resets the Lens before each.

### Automated (LEAF): 7 run, 7 passed, 0 failed, 0 skipped

| ID | Criterion | Expected | Measured | Result |
|---|---|---|---|---|
| a-placement | 1. Placement | 150–200 cm away, yaw 35° ± 2°, Start enabled, root still while animating | Root (0, −42, −170), 170.0 cm; yaw 35.0°; root moved 0.000 cm in 3 s | PASS |
| b-full-demo | 2. Full demonstration (+6) | Phases 1→5 in order with matching title, cue, and body cue; completes in 10–15 s; no auto-restart | Phases 1-2-3-4-5, 0 cue mismatches; completed in 12.03 s; still complete 1.5 s later | PASS |
| c-stepping | 3. Phase stepping | One phase per press; knee within 2° of target; Prev/Next disabled at the ends | Knee 79.6 / 123.3 / 54.8 / 5.5° = targets (both directions); Next disabled at 5, Prev at 1; extra steps ignored | PASS |
| d-playback | 4. Pause, Play, Replay, Slow | Joints frozen while paused (< 0.5°); resume advances; Replay → phase 1; Slow ratio 1.8–2.2 | Paused knee 79.01° → 79.01°; resumed; 1x 12.30 s vs 0.5x 24.59 s, ratio 2.00 | PASS |
| e-angles | 5. Viewing angles | 0° / 35° / 90° ± 2°; root moves < 1 cm; playback continues | 0.0 / 35.0 / 90.0 / 0.0°; root moved 0.000 cm; timeline kept advancing | PASS |
| f-cues | 6. Phase cues | Exactly one cue group per phase: feet, knees, hip, knees, finish ring | Foot outlines / knee arrows / hip marker / knee arrows / completion ring | PASS |
| g-edge-cases | Interaction edge cases | Pause mid-transition freezes the pose; Play/Pause label matches state; Slow and angle toggles match state; disabled labels dimmed; Next while playing pauses and advances one; completion; Play and Replay after completion restart (Replay assertion revised after reopening; see below) | Paused at 2.36 s (inside the 1.5–2.7 s transition), frozen; labels "Pause"/"Play" correct; toggles matched; Prev/Next dimmed at the ends; restart from completion OK | PASS |

To re-run, open the LEAF panel (or use `open_leaf_panel` / `run_leaf_scenario` through the Lens Studio MCP) and run each id one at a time. Running scenarios in parallel aborts the earlier one.

### Manual checks (preview screenshots, 31 Oct 2026)

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

### Not tested (requires SPECS hardware)
Comfort over time, see-through readability, real hand-tracking pinch, physical follow-along. See `DEVICE_VALIDATION.md`.

### Fresh-open regression (after quitting and reopening Lens Studio 5.24.1, 31 Oct 2026): 7 run, 7 passed

| ID | Measured after reopening | Result |
|---|---|---|
| a-placement | Root (0, −42, −170), 170.0 cm; yaw 35.0°; root moved 0.000 cm | PASS |
| b-full-demo | Phases 1→5 in order; completed in 12.18 s | PASS |
| c-stepping | Knee 79.6 / 123.3 / 54.8 / 5.5° = targets, both directions; ends disabled | PASS |
| d-playback | Paused knee 79.12° → 79.12°; 1x 12.28 s vs 0.5x 24.59 s, ratio 2.00 | PASS |
| e-angles | 0.0 / 35.0 / 90.0 / 0.0°; root moved 0.000 cm | PASS |
| f-cues | Foot outlines / knee arrows / hip marker / knee arrows / completion ring | PASS |
| g-edge-cases | Paused at 2.34 s (mid-transition), frozen; Replay 1.55 s → 0.30 s and phase 1 | PASS (after a test-only fix, below) |

**Test fix.** On its first post-reopen run, g-edge-cases failed at "Replay resets the timeline". It required the timeline to be below 0.5 s, measured about 350 ms after a simulated pinch, while playback was already running again. That threshold was too tight. The assertion now checks that the timeline drops by more than 0.3 s relative to just before Replay and that the label shows phase 1. No product code changed.

Runtime log for the session: 0 script exceptions. Only Lens Studio infrastructure warnings (`adb` without a paired device, depth-format fallback, LEAF panel load order).

### Coach's Eye branch (`feature/coach-eye`, 31 Oct 2026): 8 run, 8 passed

| ID | Measured | Result |
|---|---|---|
| h-mistake-compare | Knees: mistake knee 3.1 cm from midline vs target 7.7 cm, front view (0°), title "Knees caving in". Heels: mistake ankle +4.0 cm, side view (90°). Chest: mistake head +3.8 cm forward. Toggling off and Play both hide the mistake figure. | PASS |
| a–g (regression on the branch) | Placement 170.0 cm / 35.0° / 0.000 cm; full demo 12.08 s; stepping exact; slow ratio 2.01; angles 0/35/90°; one cue per phase; Replay 1.59 → 0.38 s | PASS (7/7) |

Runtime log over the branch runs: 0 script exceptions. Visual checks: `docs/screenshots/13–15` (each mistake in its checkpoint view).
