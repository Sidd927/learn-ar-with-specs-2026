---
status: approved
---

# Design brief: Squat Tutor

<!-- Filled in by plan-lens from the learner's interview. Use the learner's words. Mark any value they didn't choose as (default). -->

## The one spatial moment
A scale mannequin, about 60 cm tall, stands on a stand about 1.7 m in front of you, turned 30–45° so you can see the hips, knees, and torso. You watch it perform a bodyweight squat through five clearly labelled phases, walk around it (or tap an angle button) to see the movement from the side, then follow along physically if you choose.

**Product hypothesis (not a validated personal experience):** people learning a movement keep re-watching a fixed-angle phone video and still can't see what the hips and knees are doing from the angle that matters. A life-size demonstration in your own space, viewable from any angle, should be easier to understand.

## Why it belongs on glasses
- Uses: draws in the world, leaves your body free
- Why it's better than the phone or laptop version: the demonstration is at real scale on your own floor, and you see it from wherever you stand, instead of one camera angle on a small screen propped against something. Your hands and eyes stay free to try the movement right next to it.

## Product or overlay
- Type: product. The virtual demonstration is the experience.
- What the real version would sense: nothing. The Lens never tracks, counts, or assesses the user's own body.
- Stand-in for the preview: none needed.

## Where things live
- Where the user is looking during the main task: straight ahead and slightly down (about 10–15°) at the mannequin on its stand. The whole figure, its cue card, and the control panel should fit in that one view.
- **Why not life size:** Snap's usable view for SPECS is about 75 cm tall at 160 cm away (53 cm at 110 cm). A 175 cm figure would only fit at about 3.7 m, far past the 0.6–1.6 m comfort range, so at 1.5–2 m the user would only ever see part of it. A scale figure keeps the head, feet, hips, and knees in view together through the whole squat, which matters more for learning than life size. (Learner chose visibility over life size.)
- Mannequin: about 60 cm tall standing (about 1:3 scale) (default). Anchored in the world in front of the user's starting position, 170 cm away horizontally (inside the learner's 1.5–2 m range). Turned 35° from frontal at start (default, inside the learner's 30–45°). It does not follow the user.
- Stand: a light-coloured round stand with a teal turntable top about 44 cm across (default). Its top sits about 42 cm below the user's eye height at start, so the standing figure spans roughly 14° below to 7° above eye level. The user can walk all the way around it.
- Mannequin build: a simple jointed figure made of rounded shapes (head, torso, pelvis, upper arms, forearms, thighs, shins, feet), posed by a script that rotates hips, knees, ankles, spine, and shoulders between one pose per phase (default). Light grey body with an accent colour for joints (default). Optional upgrade only if the basic version works: the rigged "Body Mesh With Skeleton" from the Asset Library.
- Cue card: to the mannequin's left, in a plane 155 cm away, centred 33 cm left of centre and 26 cm below eye level, turned to face the user, 21 cm wide (default). Text is sized for 155 cm. Shows "Phase N of 5", the phase name, the cue text, five progress dots, and the disclaimer.
- Control panel: to the mannequin's right, mirroring the cue card (33 cm right, 26 cm below eye level, 155 cm away), 20 cm wide, with three rows: Previous / Play-Pause / Next, Slow / Replay, Front / 35° / Side. Fixed in the world.
- **Layout correction (implementation, 30 Oct 2026):** an earlier draft put the control panel 70 cm away and 30 cm below eye level. Measured as angles from the eye, the figure covers about 2°–23° below eye level, and that panel would have added about 16°–30°, a combined span of about 28°, more than Snap's usable height of roughly 26°. Putting the card, figure, and controls side by side in one plane at 150 cm gives a composition about 100 x 60 cm, inside the roughly 105 x 70 cm usable area there. The stand under the figure sits below the view and doesn't need to fit; only the figure, card, and controls do.
- **Layout correction 2 (preview measurement, 30 Oct 2026):** the SPECS 27 preview shows about 32° wide x 36° tall (about 80 x 91 cm at 1.4 m). At 150 cm the figure's feet sat at the bottom edge of the view and the side panels were partly out of view, so the stage moved to 170 cm and was raised, and the panels moved into a 155 cm plane beside it. The whole composition (figure, cue card, controls) is visible from the start position without moving.
- Joint indicators: small arrows or glowing markers on the mannequin's knees and hips, sized for the scale figure (about 3–4 cm) (default), shown only when they help explain the phase (see When things show).

## Hands and input
- Start: one large pinch button on the control panel before the demo begins.
- Play / Pause: one toggle button.
- Previous / Next: two buttons. Each steps one phase and pauses there.
- Replay: restarts from Starting Stance and plays the full demonstration.
- Slow: a toggle between 1x and 0.5x speed.
- Angle buttons: Front, 45°, Side. Each turns the turntable so the mannequin faces 0°, 35°, or 90° relative to the user's start position (default angles), without moving the stand. Walking around the stand in the preview also works. The buttons are the reliable fallback.
- Targets are big (at least about 6 cm (default)) and highlight when aimed at. Eight buttons on the panel, in three rows: Previous, Play/Pause, Next / Slow, Replay / Front, 45°, Side. The selected angle and Slow show an active state, and Previous/Next dim at the ends.
- Voice: none.

## When things show
- Start button: shows at launch. Hides once pressed. The mannequin is visible in Starting Stance from launch.
- Full demonstration on Start: plays all five phases in order once. Five pose holds of about 1.5 s and four transitions of about 1.2 s between them (default), 12.3 s in total at 1x. There's no transition after the final phase. At 0.5x, transitions and holds take twice as long (24.6 s).
- Cue card: always shows the current phase. The text changes as each phase begins.
  1. **Starting Stance**: "Stand tall, feet shoulder-width apart." (Pose: upright, feet about shoulder-width, toes turned slightly out.)
  2. **Controlled Descent**: "Lower with control; knees follow your toes." (Pose: hips move down and back, feet grounded.)
  3. **Bottom Position**: "Reach a comfortable depth with control." (Pose: stable low squat, torso controlled.)
  4. **Rising Up**: "Rise smoothly while keeping your balance." (Pose: knees and hips extend, torso returns.)
  5. **Standing Finish**: "Finish tall and balanced." (Pose: upright, back to the starting alignment.)
  (Cue wording shortened by the learner at build time.)
- Joint indicators (default choices): thin amber foot outlines at Starting Stance, knee arrows pointing along the toes during Controlled Descent and Rising Up, a thin hip-marker ring with a backward arrow at Bottom Position, and a thin mint completion ring around the stage at Standing Finish. They hide when the phase ends.
- Completion state: after Standing Finish, the cue card changes to "Demo complete — replay, step through, or follow along" (default wording), and Replay highlights.
- Small footer text on the cue card at all times: "Demonstration only — this Lens does not assess your form." (default wording)
- If something needs attention out of view: none. Everything sits in front of the user.

## Done criteria
Each one can be checked in Lens Studio's preview. **[LEAF]** parts can be automated: LEAF can press SIK buttons, wait, and read text, enabled state, and transforms. **[Manual]** parts need a person in Interactive Preview, because LEAF can't drive WASD walking or judge how something looks.

1. **Placement and visibility.**
   [LEAF] At launch, the mannequin's root is 150–200 cm (horizontally) from the camera's start position, its turntable faces 35° ± 2°, and the Start button is enabled.
   [Manual] From the start position, without moving, the mannequin's head and feet, the cue card, and the control panel are all visible. Walking around with WASD and coming back, the mannequin and stand haven't moved.
2. **Full demonstration.**
   [LEAF] After pressing Start, polling the cue card text shows "Phase 1 of 5" through "Phase 5 of 5" in order, with the right phase names, then the completion message, all within 10–15 s at 1x.
   [Manual] The motion reads clearly as a squat: hips go back and down, knees bend along the toes, feet stay on the stand, no limbs pass through each other.
3. **Phase stepping.**
   [LEAF] Pressing Next from phase k shows "Phase k+1 of 5", and Previous shows "Phase k−1 of 5". At phase 5, Next keeps "Phase 5 of 5", and at phase 1, Previous keeps "Phase 1 of 5". After each step, the knee joint's rotation matches that phase's target pose within 2°.
4. **Pause, Play, Replay, Slow.**
   [LEAF] During playback, Pause leaves the knee joint's rotation unchanged (within 0.5°) across two readings 500 ms apart, and Play makes it change again. Replay shows "Phase 1 of 5" within 0.5 s. With Slow on, the full demonstration takes 1.8–2.2 times as long as at 1x.
5. **Angle controls.**
   [LEAF] Pressing Front, 45°, and Side sets the turntable to 0°, 35°, and 90° (± 2°), and the mannequin's root position moves by less than 1 cm.
   [Manual] The Side view clearly shows hip and knee travel.
6. **Phase-specific cues.**
   [LEAF] The knee arrows are enabled only in Controlled Descent and Rising Up, the hip marker only in Bottom Position, the foot outlines only in Starting Stance, and the completion ring only in Standing Finish.
   [Manual] Cue text reads easily from the start position, and nothing is dark enough to disappear on the additive display.

## Out of scope
- Body tracking, rep counting from camera input, automatic form correction, or any claim that the Lens assesses the user's technique.
- Movements other than the bodyweight squat.
- Voice control, AI answers, saving progress between sessions, multiplayer.
- Hand-pose or custom gestures. Only standard pinch on buttons.

## Risks and open questions
- **Scale figure instead of life size.** At about 1:3 scale it fits the SPECS view, but it may feel less like "a person next to you" when following along. The learner chose visibility. Feel unproven.
- **The preview camera's view is wider than SPECS.** Fitting in view in the preview doesn't prove it fits on glasses. Placement uses Snap's usable-area numbers. Feel unproven.
- **The need is a hypothesis.** It hasn't been validated with real learners.
- **Animation quality.** A code-posed jointed mannequin is reliable but looks simpler than a skinned human. If the poses look stiff, add more in-between poses before swapping to a rigged model.
- **Walking around in the preview** is keyboard-driven and only approximates walking around a real figure. The angle buttons carry the demo.
- **Physically following along** next to the figure (space, comfort, balance) can only be judged on real glasses. Feel unproven.
- **Hackathon rules:** the planning agent got HTTP 403 from learn-specs.devpost.com. The learner then verified the rules independently. They're recorded in `docs/RESEARCH_AND_DECISIONS.md`.

## Build notes for CLAD
- Build for SPECS so it runs and can be demonstrated in Lens Studio's preview. No SPECS device is available.
- Use Spectacles Interaction Kit (SIK) and UI Kit for all interactions, so they work with the mouse in Interactive Preview and with LEAF.
- Build any stand-in exactly as described above, and keep it obvious in the scene.
- Use real-world scale in centimeters. Keep content inside the user's view during the main task.
- The display is additive: black renders as transparent. Don't rely on black or very dark content to be seen; keep text light and readable from where the user stands.
- Get the basic flow working first, then add detail.
- Write LEAF scenarios for each [LEAF] part of the done criteria, run them in preview, and report which pass. List the [Manual] parts separately for the learner to check. Make the state testable without changing the design: give the mannequin root, turntable, knee joint, cue card text, joint indicators, and each button clear, stable scene names. Add one IK-interactor scenario on the control panel to check that it's in reach.
- Don't record, identify, or follow people.

## After the build: judge it
This part is for you, after CLAD finishes.

1. **Does it work?** Ask your agent which LEAF tests passed and which done criteria have no test.
2. **Walk around it.** Open the preview in Interactive Preview. Use WASD to move, Q and E to go down and up, and right-drag (or hold Shift) to look around. Clicking acts as a pinch. Stand where a user would and look at the task.
3. **Ask the three questions.**
   - Does it use what I'm looking at?
   - Does it put something in my space, where it belongs?
   - Does it free my hands or let me keep my eyes up?
   - Would it be just as good on a phone? If so, what would make it need the glasses?
4. **Check comfort.**
   - Everything I need is in view while I do the task. Nothing sits at the edges, behind me, or stuck to my face.
   - Every control is within reach of someone standing there.
   - Text reads easily from where I stand. No dark UI disappearing.
   - Things show when needed and get out of the way.
5. **Label what you know.** Write "logic proven" next to anything the tests and preview show working, and "feel unproven" next to anything only real glasses could tell you (comfort over time, real hand tracking, real recognition).
6. **Fix with design notes, not code.** Tell your agent what to change in design terms, for example: "Move the step card 15 cm lower and next to the pan. Make the Next button twice as big. Re-run the tests." If a fix takes under a minute, like nudging a panel, do it yourself in the scene.
7. **Submit.** Record a video under 3 minutes of your Lens in the preview, public on YouTube. Make your repo public with your Lens Studio project and this `devpost/` folder. Details are on the hackathon site: https://learn-specs.devpost.com/resources


## Proposed amendment: Coach's Eye (pending learner approval)
_Added 31 Oct 2026 on branch `feature/coach-eye` after a strategic review (`docs/STRATEGIC_HACKATHON_ANALYSIS.md`). Not in force until the learner approves it. Approving it is a yes/no decision; alternatively, re-run `plan-lens`._

- **Why:** the original moment ("watch a squat from three angles") duplicates phone 3D viewers. The amendment gives the in-space, multi-angle view a job: seeing *what a common mistake looks like* from *the angle a coach would check it from*.
- **What is added:** a "Compare a common mistake" row on the cue card with **Knees**, **Heels**, and **Chest**. Pressing one pauses at the Bottom Position, shows a translucent red figure with that mistake over the solid white target, and turns the stage to the checkpoint view (front for knees; side for heels and chest). Only the differences are visible. Pressing it again, or any playback control, returns to the demonstration.
- **Unchanged:** subject (bodyweight squat), five phases, controls, placement, demonstration-only stance, disclaimer, no tracking or assessment.
- **Added done criterion 7:** [LEAF] each mistake button shows the mistake figure at the Bottom Position, turns to its checkpoint view (0° or 90°), shows its title, and the mistake differs from the target in the intended way (knees closer to the midline, heels higher, head further forward). Pressing it again or pressing Play hides the figure. (`h-mistake-compare`)
- **Risk:** showing mistakes could be read as assessment. Mitigated by "common mistake" wording, red/white legend, and the unchanged disclaimer.
