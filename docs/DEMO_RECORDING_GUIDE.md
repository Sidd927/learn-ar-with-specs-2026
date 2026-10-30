# Demo recording guide: Squat Tutor

Everything you need to record the demo, in one place. Target length: **2:45** (limit: under 3:00).
The video is a **Lens Studio preview recording** (device SPECS 27, Interactive input). It wasn't filmed through SPECS glasses, so describe it that way in the video and on Devpost.

---

## 1. Recording setup
- **Recorder:** macOS screen recording (Cmd+Shift+5 → Record Selected Portion) or OBS.
- **Resolution:** record at 1080p or higher, 30 fps or higher. Capture only the Preview panel area if possible.
- **Microphone:** a headset or external mic in a quiet room. Turn off notifications (Focus → Do Not Disturb).
- **Narration:** record live with the screen, or record the screen silently and add narration afterwards. Both are fine. Keep a single take per section if live.
- **Cursor:** leave it visible. Clicks are the pinch in the preview, so viewers should see what you press.

## 2. Lens Studio and Preview preparation
1. Open `Lens/Lens.esproj` in **Lens Studio 5.24.1**.
2. **Check the capture hook is off:** Scene Hierarchy → `SquatTutor > Systems` → Inspector → `SquatTutorController` → **Start Phase = -1**, **Start Angle = (empty)**.
3. **Preview panel:** device **SPECS 27**, input **Interactive**. Make the Preview panel as large as you can (undock it or maximise it). It renders in portrait.
4. **Hide clutter:** close or minimise the Logger, Asset Browser, and LEAF panels so only Preview (and optionally the Scene Hierarchy) shows.
5. **Reset the view:** click the Preview panel's **Reset** button so the Lens restarts, and don't move the camera. The start position is the framing used in the screenshots.
6. **Dry run:** do one silent run of the whole script, then click **Reset** again before recording.

## 3. Exact opening screen
After Reset you should see the following (it matches `docs/screenshots/01-hero-intro.jpg`):
- The mannequin standing on a round stage, turned about 35°, with a thin teal ring on the stage.
- On the left, the **intro card**: "BODYWEIGHT SQUAT / Squat Tutor", a short description, and "Demonstration only — this Lens does not assess your form."
- On the right, **"Pinch Start to watch the full squat"** and a large **Start** button.

## 4–6. Actions, narration, and timing

Read the **Say** column, perform the **Do** column, and keep an eye on **Time**. Narration is roughly 140 words per minute.

| Time | Do | On screen | Say |
|---|---|---|---|
| **0:00–0:20** | Nothing. Hold on the opening screen. | Intro card, mannequin, Start | "When you learn a movement like a squat, you usually watch a phone video, filmed from one angle. You can't see what the hips and knees are doing from the side, and it's hard to pause at the right moment. Squat Tutor tests whether a 3D demonstration in your own space works better." |
| **0:20–0:35** | Move the cursor slowly over the intro card, then the figure. | Same | "It's a SPECS Lens, shown here in the Lens Studio preview. A jointed mannequin stands on a small stage, scaled so the whole movement fits the glasses' view. Instructions on the left, controls on the right. It demonstrates. It doesn't track or judge you." |
| **0:35–0:52** | Click **Start**. Let the whole squat play (about 12 s). | The cue card updates through phases 1→5; ends on "COMPLETE / Nice work" with a mint ring around the stage | "Start plays the full squat: down, through the bottom, and back up. The card on the left follows each phase, and the ring at the end marks completion." *(Then let it finish quietly.)* |
| **0:52–1:00** | Click **< Prev** four times, about a second apart. | Steps back from phase 4 to phase 1; "< Prev" dims at phase 1 | "Now let's go through it one phase at a time." |
| **1:00–1:12** | (On phase 1.) | "PHASE 1 OF 5 / Starting Stance", amber foot outlines | "Phase one, Starting Stance: stand tall, feet shoulder-width apart. The outlines show where the feet stay for the whole movement." |
| **1:12–1:24** | Click **Next >**. | Phase 2: Controlled Descent, knee arrows | "Controlled Descent: lower with control. The arrows show the knees travelling the same way as the toes." |
| **1:24–1:36** | Click **Next >**. | Phase 3: Bottom Position, hip ring with arrow | "Bottom Position: a comfortable depth. The ring marks the hips sitting back, not just down." |
| **1:36–1:46** | Click **Next >**. | Phase 4: Rising Up | "Rising Up: back through the same path, keeping your balance." |
| **1:46–1:56** | Click **Next >**. | Phase 5: Standing Finish, mint ring; "Next >" dims | "And Standing Finish: tall and balanced. Next is greyed out because this is the last phase." |
| **1:56–2:22** | Click **< Prev** twice (to the Bottom Position). Click **Slow 0.5x** (it shows "Slow 0.5x: on"). Click **Play**. After about 4 s, mid-movement, click **Pause**. Wait 2 s, then click **Play**. | The figure rises at half speed, freezes on Pause, then continues | "You control the pace. Slow plays at half speed, so the hard part is easy to follow. Pause freezes the pose exactly where you are… and Play carries on." |
| **2:22–2:42** | When it finishes, click **< Prev** twice (to the Bottom Position). Click **Side**, wait 2 s, then **Front**, wait 2 s, then **35°**. | The turntable rotates to each view | "This is where the glasses earn their place. From the side you see the hips go back and the shins angle forward. From the front, the knees track out over the toes. And you can always walk around it." |
| **2:42–2:55** | Click **Slow 0.5x** (back to normal speed), then **Replay**. | The squat restarts from phase 1 at normal speed | "Squat Tutor is a small, focused learning tool: a movement you can see from any angle, at your own pace, with your hands free to follow along. It's demonstration only, with no tracking or scoring. Thanks for watching." |

Stop recording at about **2:55** or earlier. If you're running long, shorten the 0:20–0:35 line or the angle waits. Don't cut the phases or the side view.

### Optional (only if you're under 2:40)
During the angles section, press **D** or **A** to sidestep a little, showing that you can walk around the figure. Return before clicking **Replay**.

## 7. Framing and window arrangement
- Make the Preview panel fill most of the recorded frame. The UI text is sized for the glasses, so a small preview makes it hard to read.
- The portrait preview leaves empty space above the figure. That's expected, because the composition sits slightly below eye level as it would on glasses. Don't move the camera to "fix" it.
- Keep the cursor still while narrating, and move it only to click.
- Don't show the Inspector, Logger, or code during the demo. Mention the tech in the Devpost text instead.

## 8. Visual moments the video must show
1. The opening screen, with the disclaimer readable.
2. Each phase title on the cue card with its body cue: feet → knees → hip ring → knees → completion ring.
3. "Demo complete — replay, step through, or follow along."
4. A dimmed **< Prev** at phase 1 and a dimmed **Next >** at phase 5.
5. **Slow 0.5x: on**, plus a visible Pause freeze.
6. **Side** view at the Bottom Position. This is the most important frame.
7. **Front** view showing the knees over the toes.

## 9. Closing statement
> "Squat Tutor is a small, focused learning tool: a movement you can see from any angle, at your own pace, with your hands free to follow along. It's demonstration only, with no tracking or scoring. Thanks for watching."

## 10. Pre-recording checklist
- [ ] Lens Studio 5.24.1 is open on `Lens/Lens.esproj` (not the older 5.23.2 install).
- [ ] Capture hook: Start Phase = -1, Start Angle empty.
- [ ] Preview: SPECS 27, Interactive, enlarged, and Reset just pressed (intro screen showing).
- [ ] Logger, Asset Browser, and LEAF panels hidden. Notifications off.
- [ ] Mic tested; room quiet.
- [ ] Dry run completed; Reset pressed again afterwards.
- [ ] Recorder set to 1080p+ and capturing the Preview area.
- [ ] Timer visible to you (phone stopwatch) so you can pace each section.

## Video quality checklist (after recording)
- [ ] Duration under 3:00. Aim for about 2:50 or less.
- [ ] Cue card text is legible at 1080p full screen.
- [ ] Every click lands on the intended button, with no missed pinches or double clicks.
- [ ] All five phases, Slow + Pause, and the Side / Front / 35° views appear.
- [ ] Narration is audible, with no clipping and no long silences (the 12 s full demo can be quiet).
- [ ] No notifications, personal windows, or editor clutter in frame.
- [ ] The description says "recorded in the Lens Studio preview".
- [ ] Uploaded as **Public** on YouTube (it's your upload, so check visibility before submitting).

## Don't say
- That it tracks, counts, scores, or corrects your squat.
- That user research showed it works better. It's a hypothesis.
- That it was tested on SPECS glasses. Everything was verified in the Lens Studio preview.
