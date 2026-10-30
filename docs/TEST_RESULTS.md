# Test results

Run date: 30 Oct 2026 · Lens Studio 5.24.1.26100516 · Preview device SPECS 27 (Interactive) · LEAF 2.0.2 · SpectaclesInteractionKit 2.0.0 · SpectaclesUIKit 2.0.0

Every automated check runs in the Lens Studio preview through LEAF. Scenarios pinch the real UIKit buttons through SIK, then measure scene state (UI text, joint transforms, turntable rotation, cue visibility, and wall-clock time). Values below are copied from the Lens Studio log (`[SquatTutorTest]` lines). The final regression run came after the last layout change.

## Automated (LEAF)

| ID | Criterion | Input | Expected | Measured | Result |
|---|---|---|---|---|---|
| a-placement | 1. Placement | Launch, then Start | 150–200 cm away, yaw 35° ± 2°, Start enabled, root still while animating | root (0, −42, −170), 170.0 cm; yaw 35.0°; root moved 0.000 cm in 3 s | PASS |
| b-full-demo | 2. Full demonstration (+6) | Start | Phases 1→5 in order with matching title, cue, and body cue; completion in 10–15 s; no auto-restart | Phases 1-2-3-4-5, titles and cues matched, 0 cue mismatches; completed in 12.08 s; still complete 1.5 s later | PASS |
| c-stepping | 3. Phase stepping | Start, Next ×4, boundary, Previous ×4, boundary | One phase per press; knee within 2° of the phase target; Next/Previous disabled at the ends | Knee 64.6 / 123.3 / 71.7 / 5.5° = targets; Next disabled at phase 5, Previous at phase 1; extra steps ignored | PASS |
| d-playback | 4. Pause, Play, Replay, Slow | Start, Pause at 2 s, Play, Replay, full 1x run, Slow, Replay | Joints frozen while paused (< 0.5°); timeline resumes; Replay → phase 1; Slow ratio 1.8–2.2 | Paused knee 63.93° → 63.93°; resumed; 1x 12.27 s, 0.5x 24.58 s, ratio 2.00 | PASS |
| e-angles | 5. Viewing angles | Front, 35°, Side, Front during playback | Yaw 0° / 35° / 90° ± 2°; root moves < 1 cm; playback continues | 0.0° / 35.0° / 90.0° / 0.0°; root moved 0.000 cm; timeline kept advancing | PASS |
| f-cues | 6. Phase cues | Start, pause, Next ×4 | Exactly one cue group per phase: feet, knees, hip, knees, finish ring | Foot outlines / knee arrows / hip marker / knee arrows / completion ring | PASS |

**6 / 6 passed.** Run serially with `run_leaf_scenario` (LEAF resets the Lens before each scenario).

Re-run: open the project, then in Claude Code with CLAD use `open_leaf_panel`, `list_leaf_scenarios`, and `run_leaf_scenario` for each id. Alternatively, use the LEAF panel in Lens Studio.

## Manual checks (preview screenshots)

Captured from the preview at the user's start position (camera reset to the origin). The screenshots are in `docs/screenshots/`.

| Check | Result | Evidence |
|---|---|---|
| Head, feet, cue card, and controls visible from the start position without moving | Pass | `01-intro.jpg`, `02`–`07` |
| The motion reads as a squat: hips back and down, knees along the toes, feet planted, no limbs crossing | Pass | `03`, `04`, `05`, `10-view-side.jpg` |
| Front view shows the knees tracking outward over the toes | Pass | `08-view-front.jpg` |
| Side view shows the hip and knee travel | Pass | `10-view-side.jpg` |
| Cue text readable; no dark UI disappearing | Pass at full capture size. Thin glyphs can look dropped in downscaled captures, but they're intact at native resolution. | `02-phase1-starting-stance.jpg` |
| Completion state | Pass: "COMPLETE / Nice work / Demo complete — replay, step through, or follow along." | `07-completion.jpg` |
| WASD walk-around keeps the mannequin fixed | Verified by measurement (root moved 0.000 cm in a-placement and e-angles) and by moving the preview camera to (0, −25, 120). Not tried with a person at the keyboard. | — |

## Not verifiable without SPECS hardware (feel unproven)
- Comfort and readability on the real see-through display.
- Real hand-tracking pinch reliability (the preview uses mouse and SIK simulation).
- Following along physically next to the figure.

## Known limitations found during testing
- At the bottom of the squat in Side view, the mannequin's fingertips reach the inner edge of the control panel (no overlap, but no gap either).
- The completion ring renders as a broad mint band on the turntable rather than a thin ring (torus scaled flat).
