# SPECS device validation checklist

**Status: not run.** No SPECS glasses were available. Everything verified so far was in the Lens Studio 5.24.1 preview (SPECS 27 device, Interactive input), most recently on build `83e71bc` (1 Nov 2026). See `TEST_RESULTS.md`. Record results in `docs/evidence/device/`.

Items 1–12 were written for the original Squat Tutor demonstration and still apply to Coach's Eye. Items 13–17 cover the Coach's Eye comparison.

Use this checklist the first time the Lens runs on real glasses. Mark each item Pass, Fail, or Note, and add a sentence.

## Setup
- Push the Lens to a paired SPECS device from Lens Studio (Preview panel → send to device).
- Stand in a clear space of at least 2 x 2 m with even lighting. Launch the Lens from a natural standing posture, looking straight ahead.

## Checklist

| # | Check | How | Notes |
|---|---|---|---|
| 1 | Initial placement | At launch, is the stand about 1.7 m ahead and the figure fully visible without moving your head? | |
| 2 | Vertical comfort | Is the figure's head near or just above eye level and the feet visible with a slight downward glance? Any neck strain? | |
| 3 | Mannequin readability | Can you tell the phases apart at this distance, against a real room background? | |
| 4 | Cue card readability | Is the phase title, cue, and disclaimer readable without leaning in? Any text washed out on the additive display? | |
| 5 | Control reach and targeting | Can you pinch each button reliably by ray-casting from a relaxed arm? Any mis-hits between neighbouring buttons? (Since `83e71bc` the buttons are 5.8 cm tall with 2.9 cm gaps: about 2.0–2.2° with 1.06–1.08° gaps by geometry, meeting our conservative 2°/1° target on paper; see `UI_LAYOUT_AUDIT.md`. Test each row, especially the bottom row Front / 35° / Side, the smallest at 2.04°.) | |
| 6 | Button feedback | Does each pinch feel acknowledged (visual state, sound)? Do Prev and Next look disabled at the ends? | |
| 7 | Walking around | Walk a half-circle around the stand. Does the figure stay anchored? Do the panels stay readable from the side? | |
| 8 | Front, 35°, and Side | Do the angle buttons give a clearer view than walking? Any disorientation when the turntable turns? | |
| 9 | Hand obstruction | When pinching, does your hand block the figure or the cue card at key moments? The right panel sits lower than the left (−31 vs −22 cm); is reaching it comfortable? | |
| 10 | Visual comfort during playback | Watch three full demos (one at 0.5x). Any eye strain, flicker, or vergence discomfort? | |
| 11 | Follow-along usability | Try squatting alongside the demo. Can you keep the figure in view while moving? Is 0.5x usable for following? | |
| 12 | Real surroundings | Does the stand clash with real furniture? Is the content legible against bright and dark backgrounds? | |
| 13 | Red vs white visibility | In each comparison, can you clearly tell the 55%-opacity red figure from the white reference figure on the see-through display? | |
| 14 | Comparison card readability | Are the view label, pattern title, red and reference lines, return hint and exaggeration note readable from the start position? | |
| 15 | Named difference visible | From the automatically selected view (Knees: front; Chest and Heels: side), can you see the difference the card names? Heels is the known weak case: the red legs fade during Heels so the raised red heel stands out. Is the faded red leg still visible enough to make sense on the see-through display? | |
| 16 | Optional rear look (Heels) | Walk behind the stage while Heels is open. Is the heel gap easier to see? (The Lens never turns to a rear view automatically.) | |
| 17 | Pattern buttons and return | Can you pinch Knees, Heels and Chest, and pinch again to return, without mis-hits? | |

## Not verifiable in the simulator
- Comfort over time, vergence, and readability on the see-through display.
- Hand-tracking pinch reliability (the preview uses mouse and SIK simulation).
- Physical follow-along: space needs, balance, and keeping the figure in view while squatting.
- World anchoring stability while walking.

## Reporting
Record the device model, OS version, Lens Studio version, room conditions, and the date. Keep notes factual. Don't generalise from one person's session.
