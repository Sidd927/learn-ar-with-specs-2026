# Final demo recording guide: Squat Tutor: Coach's Eye

Use this with **`FINAL_DEMO_SCRIPT.md`**, which has the timeline, clicks, and narration. Target: **2:45**, limit under 3:00. Applies to `feature/coach-eye` (final build `2201d21` or later), whether recorded from the branch or after a merge; for `main`, use `DEMO_RECORDING_GUIDE.md`.

## 1. Recording setup
- Recorder: macOS Cmd+Shift+5 (Record Selected Portion) or OBS. **1080p+ at 30 fps+.** Capture the Preview panel only.
- Mic: headset or external, quiet room, notifications off (Do Not Disturb).
- Narrate live, or record the screen first and add narration afterwards.

## 2. Lens Studio and preview preparation
1. Open `Lens/Lens.esproj` in **Lens Studio 5.24.1** (not 5.23.2).
2. Inspector → `SquatTutor > Systems` → `SquatTutorController` → **Start Phase = -1, Start Angle = empty, Start Fault = empty.**
3. Preview: device **SPECS 27**, input **Interactive**. Enlarge or undock the Preview panel. It renders in portrait.
4. Hide the Logger, Asset Browser, and LEAF panels.
5. Click **Reset** in the Preview panel and don't move the camera. The opening screen should match `docs/screenshots/01-hero-intro.jpg`.
6. Do one silent dry run, then **Reset** again.

## 3. Opening screen
The figure on a round stage turned about 35° with a thin teal ring. On the left, the intro card ("BODYWEIGHT SQUAT / Squat Tutor", "Watch a squat in five phases. Then compare three common patterns…", and the disclaimer). On the right, "Pinch Start to watch the full squat" and **Start**. It should match `docs/screenshots/01-hero-intro.jpg`.

## 4–6. Actions, narration, timing
Follow the table in `FINAL_DEMO_SCRIPT.md` row by row. Button locations:
- **Cue card (left), row "COMPARE COMMON PATTERNS":** Knees · Heels · Chest. While a comparison is open, the row label reads "PINCH AGAIN TO RETURN".
- **Control panel (right):** < Prev · Play/Pause · Next > / Slow 0.5x · Replay / Front · 35° · Side

## 7. Framing
- The Preview fills most of the frame. Keep the cursor still while talking and move it only to click.
- The empty space above the figure is expected (content sits slightly below eye level, as on glasses). Don't move the camera.
- Don't show code or the Inspector.

## 8. Moments the video must contain
1. The opening screen with the disclaimer legible.
2. The full squat with the cue card updating.
3. **Knees from the front:** red knees inside the white knees. **This is the hero shot.**
4. **Chest from the side**, then **Heels**. Linger a little longer on Heels; its difference is smaller.
   - The card's "Exaggerated for clarity" line, visible for a moment.
5. Exiting the comparison, Slow, and Pause.
6. The angle buttons turning the stage.

## 9. Closing statement
> "Coach's Eye shows you what to look for and where to look, in your own space, hands free. It's a preview demonstration, and whether it helps people learn is still something we're testing. Thanks for watching."

## 10. Pre-recording checklist
- [ ] Lens Studio 5.24.1, correct project, all three capture-hook fields reset
- [ ] Preview SPECS 27 / Interactive, enlarged, **Reset** pressed
- [ ] Clutter panels hidden; notifications off; mic tested
- [ ] Dry run done; Reset again
- [ ] Recorder at 1080p+, Preview area only; stopwatch visible to you

## After recording
- [ ] Under 3:00 (aim for 2:50 or less)
- [ ] All three comparisons, the return, Slow and Pause, and an angle button shown
- [ ] No narration claims tracking, assessment, injury prevention, device testing, or user results
- [ ] Narration clear; no notifications in frame
- [ ] YouTube description says "Recorded in the Lens Studio preview (SPECS 27 simulation)"
- [ ] Uploaded as **Public**
