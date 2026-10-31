---
status: draft
original_brief_status: approved (Squat Tutor, 30 Oct 2026, commit bc5faf6)
amendment_1_status: draft, awaiting learner sign-off
---

# Design brief: Squat Tutor

> **How to read this file.**
> - **Current product specification:** *Amendment 1: Coach's Eye*, at the end. Status: **draft**, awaiting learner sign-off.
> - **Planning history:** everything from "The one spatial moment" to "After the build" is the **original Squat Tutor brief**, marked approved on 30 Oct 2026 (commit `bc5faf6`). Its words are kept. Where it no longer matches what was built, a visible **[Correction 31 Oct 2026]** note follows the original text.
> - **Front matter:** `status` was changed from `approved` to `draft` on 31 Oct 2026, because the file now contains an unapproved amendment. The original brief's approval is recorded in `original_brief_status`.

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
  **[Correction 31 Oct 2026]** The middle button is labelled **35°** in the build, matching the 35° angle; "45°" was a labelling error in this brief.
- Targets are big (at least about 6 cm (default)) and highlight when aimed at. Eight buttons on the panel, in three rows: Previous, Play/Pause, Next / Slow, Replay / Front, 45°, Side. The selected angle and Slow show an active state, and Previous/Next dim at the ends.
  **[Correction 31 Oct 2026]** The built buttons are **3.4 cm tall** (about 5.1–8.1 cm wide); only Start is larger (16.8 × 5.0 cm). That is below the "about 6 cm" default above. The middle angle button reads "35°". Amendment 1 adds three more buttons on the cue card at the same 3.4 cm height.
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
  **[Correction 31 Oct 2026]** On `main`, the card shows the label "COMPLETE", the title "Nice work" and that sentence, but **Replay is not highlighted** (never built). Amendment 1 changes the completion title and text.
- Small footer text on the cue card at all times: "Demonstration only — this Lens does not assess your form." (default wording)
  **[Correction 31 Oct 2026]** Under Amendment 1, the footer is replaced by "Exaggerated for clarity. This Lens does not assess your form." while a comparison is open.
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
   **[Correction 31 Oct 2026]** The button tested is labelled "35°" (`Angled`).
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
  **[Correction 31 Oct 2026]** **Not built.** No reach scenario exists; the LEAF tests pinch buttons directly through SIK.
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


## Amendment 1: Coach's Eye (current product specification)

**Status: draft, awaiting learner sign-off.** This section describes what is built on branch `feature/coach-eye` (code as of commit `1d1bd5a`). The agent proposed the design decisions in it. The learner approved the overall direction, but has not yet chosen or signed off these details. The learner's own decisions are being recorded through a `plan-lens` interview (see *Planning interview record* below), and this specification will be revised to match those answers before sign-off.

### Status and traceability
- **30 Oct 2026.** Original Squat Tutor brief (above) marked approved (commit `bc5faf6`) and built. Verified build on `main`: `d1d0473`.
- **31 Oct 2026, morning.** The agent's strategic review (`docs/STRATEGIC_HACKATHON_ANALYSIS.md`) assessed that the original moment overlaps with existing phone 3D exercise viewers. The agent proposed this amendment and prototyped it on branch `feature/coach-eye`.
- **31 Oct 2026.** The learner approved the product direction. In their words: "I have reviewed the strategic reassessment and approve Coach's Eye as the direction for our Learn AR with SPECS project. We are evolving Squat Tutor into Coach's Eye rather than pursuing a completely unrelated pivot."
  - The learner said this was not approval to merge into `main`.
  - The learner set the standards this work must meet: understandable in the first 20–30 seconds, responsible wording, no unsupported numbers.
- **31 Oct 2026, pre-merge review.**
  - The learner reviewed the first wording of this amendment and **did not sign it off**.
  - They asked for the corrections listed in the *Change log* below, and for the change to be recorded through the `plan-lens` interview.
- **Now:** draft. Sign-off is a yes/no by the learner, after the interview answers have been folded in.

### Planning interview record (plan-lens, Coach's Eye)
_In progress. The learner's answers will be recorded here in their own words, one per question. Until then, nothing in this section is a learner decision._

### The one spatial moment (amended)
The same 1:3-scale figure (about 60 cm tall) on its stage, 1.7 m away. After the five-phase demonstration, the learner presses **Knees**, **Heels** or **Chest**. Then:
- the figure pauses at the Bottom Position;
- a translucent red figure appears over the solid white figure;
- the stage turns automatically to the view chosen for that pattern:

| Pattern | View the Lens turns to | Other useful inspection view | Card label |
|---|---|---|---|
| Knees | Front (0°) | — | "BEST SEEN FROM THE FRONT" |
| Chest | Side (90°) | — | "BEST SEEN FROM THE SIDE" |
| Heels | Side (90°) | Rear. Some trainer checklists look at heel rise from behind. The Lens does **not** turn to a rear view; a learner can walk behind the stage to look. | "SEEN FROM THE SIDE OR REAR" |

No single view is presented as the only correct one.

- **White figure:** the visual target, or reference, that this demonstration uses. It is not a universal ideal squat.
- **Red figure:** an exaggerated, illustrative version of a common movement pattern.
- The Lens never looks at or assesses the learner.

### Why it belongs on glasses (amended)
- Uses: draws in the world, leaves your body free.

Phone AR can also place 3D figures in a room. What a head-worn display changes is how the learner inspects the comparison:
- **Head-worn spatial viewing.** The two figures stay on the stage while the learner looks at them from where they stand. Seeing more means moving your head or stepping, not steering a screen.
- **Hands-free inspection.** There is no device to hold up, so the learner's hands stay free, for example to try the movement beside the figure.
- **Looking around the comparison.** The learner can step to the side of, or behind, the stage and keep looking, without holding a phone in the line of sight.
- **Learner, figure and view.** The Lens turns the stage so the chosen view faces the learner's position. From there, the learner's own position sets the angle they see it from.

Whether this helps people learn better than a phone app or a video **has not been tested.**

### What the learner sees and does

**Before Start (intro card).**
- Label "BODYWEIGHT SQUAT", title "Squat Tutor".
- Body: "Watch a squat in five phases. Then compare three common patterns with the target, each from the angle where it shows."
- Disclaimer: "Demonstration only — this Lens does not assess your form."
- On the right: "Pinch Start to watch the full squat" and **Start**.

**During the demonstration (cue card).**
- Phase label, title and cue, as in the original brief.
- Five progress dots.
- A row labelled "COMPARE COMMON PATTERNS" with three toggle buttons: **Knees**, **Heels**, **Chest**.
- The disclaimer.

**While a comparison is open.** The card shows, top to bottom:
1. the view label (see the table above);
2. the pattern title: "Knees caving in", "Heels lifting" or "Chest dropping";
3. "Red: …" (what the red figure shows);
4. "White (target): …" (what the white reference shows);
5. the progress dots;
6. the row label "PINCH AGAIN TO RETURN", with only the active toggle highlighted;
7. "Exaggerated for clarity. This Lens does not assess your form.", in place of the disclaimer.

**Completion card** (separate parts):
- Label: "COMPLETE".
- Title: "Squat complete".
- Body: "Try Knees, Heels or Chest below to compare a common pattern, or Replay."

**Leaving a comparison:**
- **Closes it:** pressing the same pattern button again, Play, Prev, Next or Replay. Start can't be pressed during a comparison, because the comparison row only appears after Start.
- **Keeps it open:** Slow and the angle buttons, so the learner can turn the stage while comparing.
- **Switching:** pressing a different pattern button switches straight to that pattern.

### The red figure
It uses the same rig and proportions as the white figure, under the same turntable. Its meshes are inset 4%, so where the two figures overlap the red one stays hidden. Each pattern is posed by **one primary parameter** applied to the Bottom Position. The card names that primary difference, but other joints can also move as a consequence:
- **Knees:** the plane in which the knees bend is turned 18° inward. Hips and feet are unchanged.
- **Heels:** the heel is raised and the foot pitched. The hips stay where they are, so the legs re-solve: the red thigh and shin also move visibly, and in preview captures they stand out more than the heel gap itself.
- **Chest:** the torso leans 18° further forward. The head, shoulders and arms move with the torso; the arm angle relative to the room is unchanged.

The magnitudes are deliberately exaggerated so the difference is visible from 1.7 m. `docs/BIOMECHANICAL_VALIDATION.md` holds the agent's **internal model-geometry validation**: coordinate and landmark consistency between the two figures, and the size of each illustrative pose difference in model units. It is not an expert biomechanical assessment. Its values don't establish biomechanical correctness or a universal ideal squat, and they don't appear in public-facing claims.

### Unchanged from the original brief
- Subject: the bodyweight squat.
- The five phases, their cues and the one-at-a-time body highlights.
- Placement, scale and stage.
- Playback, stepping, Slow and angle controls; the angle button is labelled "35°".
- Demonstration only: no tracking, counting or assessment of the user.

### Done criteria
Criteria 1–6 of the original brief still apply, read with the corrections noted above. Criterion 7 is added.

7. **Pattern comparison.**
   [LEAF] `h-mistake-compare` checks, for **each** of Knees, Heels and Chest, that the button:
   - shows the red figure;
   - pauses at the Bottom Position;
   - turns the stage to that pattern's view (0° or 90°, ± 2°). Each case starts from a **different** angle: knees from 35°, heels from 35°, chest from Front;
   - shows exactly that pattern's view label, title and `Red: … / White (target): …` lines;
   - shows "PINCH AGAIN TO RETURN" and the exaggeration note;
   - highlights only that toggle;
   - poses the red figure so it differs from the white one in the intended direction: knees closer to the midline, ankle higher, head further forward.

   It also checks that Slow and the angle buttons keep the comparison open. Each of the five exits (same button, Play, Prev, Next, Replay) must:
   - hide the red figure and restore the row label, disclaimer and phase label;
   - turn all toggles off;
   - leave the player in the expected state: still at the Bottom Position and paused (same button), playing (Play), one phase back (Prev), one phase forward (Next), or playing from phase 1 (Replay).

   [Manual] In each comparison, the named difference is visible from the start position. **Open:** the heels difference reads weakly in preview captures.

### Out of scope (amended)
- Everything in the original "Out of scope".
- A rear-view button, or any automatic switch between several views for one pattern.
- Any claim that a pattern is wrong for everyone, causes injury, or reveals weakness or limited mobility.
- Any diagnosis, clinical use, or numeric biomechanical claim.

### Risks and open questions (added)
- **Read as assessment.** Showing patterns could be read as judging the viewer. Mitigations:
  - "Common pattern" and "compare" wording, never "wrong" or "bad form";
  - the exaggeration note;
  - the disclaimer.
- **Depictions are simplified and not coach-reviewed.** Trainer checklists differ on where heel rise is checked (side or rear).
- **Heels legibility.** The raised red thigh and shin are more visible than the heel gap.
- **Button size.** All pattern and control buttons are 3.4 cm tall at about 155 cm, below the original brief's "about 6 cm" default. They are untested for comfort with real hand tracking.
- **No user validation.** A protocol and an observation sheet are ready (`docs/USER_VALIDATION_PLAN.md`, `docs/USER_TEST_OBSERVATION_SHEET.md`). Results: NOT CONDUCTED.
- **Preview only.** Comfort, hand tracking, and whether 55% red reads clearly on an additive display are untested on SPECS hardware.

### Change log for Amendment 1
**31 Oct 2026, after the learner's pre-merge review:**
- **"Why it belongs on glasses"** rewritten. It no longer claims a phone can't place figures in a room. It now rests on head-worn, hands-free inspection and makes no claim about learning gains.
- **Heels view made explicit:** the Lens turns to the side; rear is another possible inspection view; the Lens does not switch to both.
- **"Each pattern changes one thing"** replaced by "one primary parameter", noting that other joints can move.
- **"Audited"** replaced by "internal model-geometry validation", explicitly not an expert biomechanical assessment.
- **Done criterion 7** rewritten to match the extended test H, which now covers every pattern and every exit and was run and passed on 31 Oct 2026.
- **"Strategic review found"** changed to "assessed".
- **Front matter** status set to `draft`; the original brief's approval is kept in `original_brief_status`.
- **Completion card** title and body separated.
- **Visible correction notes** added to the original brief: "35°" label, button sizes, Replay not highlighted, footer swap during comparisons, reach test not built.
