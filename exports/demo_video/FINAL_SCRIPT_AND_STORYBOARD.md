# Coach's Eye — final demo film: script and storyboard

**Film:** `Coach_Eye_Final_Hackathon_Demo.mp4` · 2:34.7 · 1920×1080 · 30 fps · H.264 + AAC
**Built from:** two real screen recordings of the Lens Studio 5.24.1 preview (SPECS 27, Interactive) of `feature/coach-eye` @ `6d92764`, made on 7 Nov 2026. The Lens was driven through its real buttons with `InjectPreviewGesture`, and the owner recorded the screen. Nothing in the product window is mocked or redrawn.
**Source of truth for timing:** `project/tools/build.py`. Rebuild with `python3 tools/build.py`, then `npx hyperframes@0.9.19 render`.

## Footage
| Source | What it is | Use |
|---|---|---|
| Recording 1 `Screen Recording 2026-11-07 at 3.22.34 AM.mov` (5:20, 2880×1864, VFR) | Intro → Start → full squat → Prev ×2 → Knees/Heels/Chest with returns → Front, 35° → Slow on → Play | Primary |
| Recording 2 `Screen Recording 2026-11-07 at 3.28.19 AM.mov` (1:05) | Half-speed rise → Slow off → Replay → full replay → completion hold | Half-speed rise (from q3.0), Replay, completion |
| Not used | Recording 1 0–30 s (browser, the Lens before reset); Recording 2 0–2.9 s (the owner's mouse pointer) and 49 s onward (desktop, Terminal) | Cut |

**Screensaver gap:** Recording 1 ends just after the Play press (Bottom Position, 35°, Slow 0.5x on). Recording 2 resumes in exactly that state, playing at half speed. The film dissolves between them over 0.3 s at 1:59.8. The lost 24 s included a Pause press that did not take effect. The film doesn't show or mention Pause.

Both recordings were converted to constant 30 fps (`fps` filter, nearest frame), cropped to the preview's render area (1252×1436) and, for the establishing shot, to the full Lens Studio window with the macOS menu bar removed (2880×1808). The originals are untouched (SHA-1 in `raw/originals.sha1`).

## Layout
- Ground `#121416`.
- Product window: the real preview, at x 720–1824, y 54–1026, radius 18. It shows the bottom 1102 px of the 1436 px render, because the top is empty sky.
- Editorial column: x 192–680, in Inter (bundled). It carries the section label (28 px, teal `#5bb6bd`, which is lifted from the Lens's stage-ring teal `#408890`), the large type, and the captions (34 px) bottom-anchored at y ≤ 968.
- Captions never cover the product window, its comparison card or its controls.

## Shot list
Times are film seconds. "p" is Recording 1 time − 30 s; "q" is Recording 2 time. Clicks are the bundled Pixabay `click.mp3`, placed at each real press (peak one frame after the UI responds).

| Time | Shot (footage) | Narration (Kokoro `af_heart`, 0.9×) | On screen / editorial column | Transition, camera, sound |
|---|---|---|---|---|
| 0:00.0–0:10.0 | **Hook.** The Knees comparison, front view, red over white (p116–126) | L01 0.5: "When you learn a squat from a video, you can watch the movement." · L02 4.35: "What's harder is seeing what changes when it's done differently, and knowing where to look." | "Watch the movement." (frame 0) → "See what changes." (5.8) → "Know where to look." (8.25); earlier lines step back | Static frame. Frame 0 is the thumbnail. |
| 0:10.0–0:16.5 | **Establishing.** The full Lens Studio window: Scene Hierarchy, Scene view with "TypeScript compilation succeeded!", Preview with the intro screen (wide, p0–6.5) | L03 10.3: "This is Coach's Eye: a spatial squat comparison Lens for SPECS, recorded here in the Lens Studio preview." | Lower third on a dark panel: **Coach's Eye** (10.95), "Spatial squat comparison · SPECS" (12.45), "Lens Studio preview recording" (14.8) | Wide fades in (0.35 s); 1.6 s push from the whole window into the preview (14.7), landing pixel-matched on the product window; wide dissolves out (16.1). Whoosh at the push. |
| 0:16.5–0:26.4 | **Intro screen** (p6.5–16.4): intro card with disclaimer, Start panel | L04 17.7: "A reference mannequin stands on a small stage in front of you. / It's a demonstration. It doesn't track your body, and it doesn't assess your form." | **Coach's Eye** + "Spatial squat comparison for SPECS"; "Demonstration only" (21.9), "No body tracking." (23.8), "No form assessment." (25.6) | Text wipes in. |
| 0:26.4–0:43.2 | **Start and the five phases** (p31.6–48.4). Start pressed 29.2; phases at 29.2 / 30.7 / 33.4 / 36.1 / 38.8; complete at 41.5 | L05a 28.8: "Pinch Start, and the reference squat plays in five phases." · L05b 34.55: "One short cue and one highlight at a time." | THE DEMONSTRATION + phase list (Starting Stance … Standing Finish), highlighted in sync with the Lens's own card; all lit at completion | 0.25 s dissolve in. Click at Start. The movement finishes and holds without voice for about 4 s (deliberate). |
| 0:43.2–0:51.6 | **Stepping.** Prev → Rising Up (44.8), Prev → Bottom Position (49.0) (p78.6–82.7, p91.5–95.8) | L06 43.2: "You can step back through the phases, and stop on the moment you want to study." | Phase list follows: Rising Up, then Bottom Position | Dissolves. Two clicks. |
| 0:51.6–0:58.0 | **Into Compare** (p107.2–113.6): the cursor rests on Knees | L07 51.9: "Then comes the core idea. Choose one common pattern, and an exaggerated red version appears over the white reference, seen from the angle where the difference shows." | COMPARE ONE PATTERN | 0.3 s dissolve. |
| 0:58.0–1:18.4 | **KNEES.** Pressed at 58.0; the stage turns to the front, red knees inside the white (p113.6–124.1, then p130.7–140.6); return at 75.2 | L08 62.9: "Knees. The stage turns to face you, because this difference is sideways. In red, the knees drift inside the toes. In white, the reference: knees track over the toes." · L09 74.8: "Pinch it again, and you're back in the demonstration." | **Knees** / "Front view" | Click on and off. Punch-in ×1.45 on the knees 67.4–74.0 (an invisible static cut at 68.5 inside it). |
| 1:18.4–1:33.0 | **HEELS.** Pressed at 78.8; the stage turns to the side; red legs faded, red heel lifted (p163.4–175.6); return at 92.1 (p187.6–189.6) | L10 78.6: "Heels. This time, the stage turns to the side. The red legs fade back, so the heel stands out. In red, the heels lift off the floor, while the white foot stays planted." | **Heels** / "Side view" | Dissolve. Punch-in ×1.6 on the feet 84.0–90.2, then back at full frame with the card and the white foot visible before the return. Two clicks. |
| 1:33.0–1:52.0 | **CHEST.** Pressed at 93.5; side view, red torso and head tipped forward (p210.1–226.6); return at 111.3 | L11 93.3: "Chest. Also from the side, where a forward lean is easiest to see. The red torso tips far forward. The white chest stays up." · L12 102.8: "Every difference is exaggerated for clarity. These are illustrative patterns to compare, not a diagnosis." | **Chest** / "Side view" | Dissolve. Punch-in ×1.4 on the torso 97.4–102.6; then ×1.9 onto the card's own line "Exaggerated for clarity. This Lens does not assess your form." 103.4–110.0. Two clicks. |
| 1:52.0–2:02.2 | **Explore.** Front (113.2), 35° (116.0), Slow 0.5x on (117.6), Play (119.6) (p248–288), then **Recording 2** half-speed rise into Rising Up (q3.6–6.3) | L13 112.4: "Outside a comparison, you choose the angle yourself, and you can slow the movement to half speed." | EXPLORE · **Front** → **35°** → **Slow 0.5x** | Short dissolves; 0.3 s dissolve across the recording gap at 119.8. Four clicks. |
| 2:02.2–2:16.1 | **Replay** (q18.7–32.6). Pressed at 123.7; the full squat replays; complete at 136.0 | L14a 123.8: "Pinch Replay, and it starts again from the top." · L15 126.8: "On SPECS, the idea is to keep your hands free and your eyes up, while you study the movement in your own space, and walk around it." | REPLAY → WHY HEAD-WORN · "Hands free" (129.1), "Eyes up" (130.2), "In your own space" (132.6) | 0.3 s dissolve. Click at Replay. |
| 2:16.1–2:26.6 | **Completion** (q32.6–43.1): "Squat complete / Try Knees, Heels or Chest below…" | L14b 136.2: "The finish points you back to the comparisons." · L16 139.0: "Whether it helps people learn, and whether the approach could work for other movements, is what we want to explore next." | WHAT'S NEXT · "Does it help people learn?" (139.7), "Could it work for other movements?" (142.6) | Punch-in ×1.8 on the completion card 136.2–139.8. |
| 2:26.6–2:34.7 | **End card.** The product window steps back to the right and shows the Knees comparison again (p118–126) | L17 146.9: "Coach's Eye. See the difference. Understand what to observe." | **Coach's Eye**; "See the difference." (147.65); "Understand what to observe." (149.25); "Learn AR with SPECS 2026"; `github.com/Sidd927/learn-ar-with-specs-2026`; "Recorded in the Lens Studio preview (SPECS 27 simulation). Illustrative patterns, exaggerated for clarity. This Lens does not assess your form." | 0.4 s dissolve; window scales to 0.8 toward the right (0.8 s); slow 1.06 push. Long soft whoosh into the end card. Holds about 4 s. |

Ripple cuts made after reviewing render v2 (dead holds): −2.0 s before Start, −1.6 s after the Heels punch, −1.2 s in the half-speed setup.

## Claims kept out
No body tracking, form assessment, rep counting, injury or medical claims, device testing, user results, expert approval, phone-AR comparison, or measured numbers. The white figure is always "the reference". The three patterns are "common" and "illustrative", never a complete list. Future work is limited to the approved line about other movements, phrased as a question.

## Audio
- **Narration:** Kokoro v1.0 (local, offline), voice `af_heart`, speed 0.9. 17 lines (L05 and L14 split at their sentence breaks after synthesis). Each line was transcribed back with Whisper `base.en` and matched the script word for word. "Coach's Eye" transcribes as its homophone "Coaches I".
- **Effects:** 14 soft clicks on real presses, 2 whooshes (push-in, end card). Bundled HyperFrames library, Pixabay Content License, no attribution required (`project/assets/sfx/CREDITS.md`).
- **Music:** none. No license-clean bed was available without signing in to an external service.
