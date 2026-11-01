---
status: draft
original_brief_status: approved (Squat Tutor, 30 Oct 2026, commit bc5faf6)
amendment_1_status: draft, plan-lens interview complete (1 Nov 2026), awaiting learner sign-off
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

**Status: draft.** The `plan-lens` interview is complete (31 Oct – 1 Nov 2026). This specification awaits the learner's final yes/no sign-off. It describes the bodyweight-squat Lens built on branch `feature/coach-eye`, with code as of commit `1d1bd5a`.

**How decisions are labelled here.**
- *(learner)*: the learner's own answer.
- *(agent proposal, confirmed by learner)*: the agent proposed it and the learner confirmed it, sometimes with refinements. The confirmed wording is used.
- *(established)*: already decided in the original approved brief or the existing build, and not reopened.

**How the product is described.**
- **Implemented:** works in the Lens Studio preview.
- **Intended for glasses:** how it is meant to be used on SPECS.
- **Not yet validated:** neither tested with users nor on a device.

### Status and traceability
- **30 Oct 2026.** Original Squat Tutor brief (above) marked approved (commit `bc5faf6`) and built. Verified build on `main`: `d1d0473`.
- **31 Oct 2026, morning.** The agent's strategic review (`docs/STRATEGIC_HACKATHON_ANALYSIS.md`) assessed that the original moment overlaps with existing phone 3D exercise viewers. The agent proposed Coach's Eye and prototyped it on `feature/coach-eye`.
- **31 Oct 2026.** The learner approved the product direction. In their words: "I have reviewed the strategic reassessment and approve Coach's Eye as the direction for our Learn AR with SPECS project. We are evolving Squat Tutor into Coach's Eye rather than pursuing a completely unrelated pivot." They said this was not approval to merge.
- **31 Oct 2026, pre-merge review.** The learner did not sign off the first wording of this amendment, and asked for corrections and a `plan-lens` interview.
- **31 Oct – 1 Nov 2026.** The `plan-lens` interview: nine questions, recorded below.
- **Now:** draft, awaiting the learner's sign-off.

### Planning interview record (plan-lens, Coach's Eye)
The learner's answers, in their words. Instructions to the agent about process are left out.

**Q1. What problem should Coach's Eye solve?** *(learner)*
> I want Coach's Eye to help beginners better understand common movement patterns in exercises such as squats. People can watch exercise demonstrations, but simply watching a movement does not always make it easy to understand how different movement patterns look, or what changes when someone performs the movement differently. Coach's Eye aims to make these differences easier to observe by placing a reference movement and exaggerated comparison in the user's physical space. The learner can inspect the comparison from relevant viewpoints using hands-free, head-worn AR. The purpose is visual understanding and education. It is not intended to assess the user's actual body movements, diagnose incorrect form, provide personalised coaching, or make medical or injury-prevention claims.

**Q2. Who is the intended learner?** *(agent proposal, confirmed by learner with refinement)*
> The intended learner is a beginner who is learning the bodyweight squat, typically through online videos or demonstrations, and wants to understand what to observe during the movement and how common movement patterns differ. They may be learning independently and have enough physical space to view and interact with the spatial demonstration. Coach's Eye is not primarily designed for professional athletes refining advanced technique, experienced coaches, or people seeking personalised assessment of their own form. Keep the initial product scope focused on the bodyweight squat. […] The priority is making the first-time learner understand the demonstration and comparisons clearly.

**Q3. Why compare movement patterns, rather than only watch the reference?** *(agent proposal, confirmed by learner)*
> A reference movement on its own demonstrates what the movement looks like, but it does not necessarily teach a beginner what specific details to observe. Coach's Eye makes those details easier to notice by placing one exaggerated movement pattern over the reference mannequin, holding both in the same squat position, and presenting the comparison from a viewpoint selected for that particular difference. Showing one comparison at a time helps the learner focus on a specific body region and observe how the illustrated movement differs from the reference. The important part is not simply having two 3D mannequins. It is combining a visual contrast with a relevant viewing angle so that the learner knows what to look at. Keep the language educational and neutral. These are illustrative movement patterns, not diagnoses or definitive classifications of incorrect form.

The learner chose not to cite any research association for this reasoning.

**Q4. The spatial moment, and why head-worn glasses?** *(agent proposal, confirmed by learner with clarification)*
> A learner stands in their own space, watches the squat demonstration, selects Knees, Heels or Chest, and sees the stage automatically turn to present the relevant comparison. They can inspect the figures by moving their head or body, and potentially follow along physically beside the demonstration. The reason for using SPECS glasses is the hands-free, eyes-up interaction. The learner can look at the spatial comparison while keeping their hands free, rather than holding a phone and continuously aiming its screen at the content. I agree that phone AR can also place 3D figures in a physical environment. We should never claim that this experience is impossible on a phone. The strongest distinction is that head-worn AR allows the learner to inspect the spatial content while naturally looking around it, without holding a device. The possibility of observing the figure while trying the movement alongside it is also an interesting part of the concept. […] We have not yet validated the actual glasses experience, so do not claim proven comfort, usability or learning benefits.

**Q5. Why Knees, Heels and Chest?** *(agent proposal, confirmed by learner)*
> Keep Knees, Heels and Chest in the current scope for now. The reasons for retaining these three are: 1. They represent distinct movement patterns that a beginner can observe in a squat demonstration. 2. They allow us to demonstrate the purpose of selecting a relevant viewpoint: front for Knees and side for Heels and Chest. 3. They can be implemented using the existing mannequin rig without introducing unnecessary technical complexity. […] The comparisons should be evaluated on how clearly a first-time learner can identify the intended visual difference, not simply whether the code works. Heels is conditional. […] Do not present these three patterns as an exhaustive list of squat mistakes, universally agreed coaching checkpoints, or medically validated indicators. They are the three illustrative patterns selected for this prototype. Keep any external biomechanics or trainer-reference claims out of the brief unless their sources have been properly verified.

**Q6. What should the learner understand afterwards?** *(agent proposal, confirmed by learner with refinement)*
> 1. What they experienced: Coach's Eye demonstrates a reference squat alongside exaggerated illustrative movement patterns. It helps them observe differences between the figures; it does not track, evaluate or judge their own movements. 2. What to observe in each comparison: Knees: observe the relationship between the knees and feet from the front. Chest: observe how the torso leans forward from the side. Heels: observe whether the heels remain in contact with the floor from the side. 3. Why the viewpoint changes: Different movement differences are easier to inspect from different perspectives. The learner should understand that changing the viewing angle helps bring the relevant visual detail into focus. These are intended learning outcomes, not proven results.

**Q7. What does Coach's Eye deliberately not do, and how should other exercises be treated?** *(agent proposal, confirmed by learner)*

The learner's out-of-scope list is reproduced under *Out of scope* below. On other exercises:
> Include one sentence in a clearly labelled "Future possibilities" section […] This is a future possibility, not a committed roadmap or a claim about existing capabilities. Do not expand this into a multi-exercise product pitch. Keep the actual submission focused entirely on the bodyweight squat.

**Q8. What limitations and uncertainties remain?** *(agent proposal, confirmed by learner)*

The learner's list is reproduced under *Risks and open questions* below.
> Please avoid describing untested risks as confirmed failures. Equally, do not present intended benefits as proven outcomes.

**Q9. What does success look like?** *(agent proposal, confirmed by learner with clarifications)*

The decisions are reproduced under *Done criteria*, *Evidence of understanding*, *Deferred decisions* and *What counts as validated* below.

### The one spatial moment
*(Q4, learner's words)* A learner stands in their own space, watches the squat demonstration, selects Knees, Heels or Chest, and sees the stage automatically turn to present the relevant comparison. They can inspect the figures by moving their head or body, and potentially follow along physically beside the demonstration.

**The problem it addresses (Q1–Q3):** a reference movement on its own shows what the movement looks like, but not what specific details a beginner should observe. Coach's Eye combines a visual contrast (one exaggerated illustrative pattern over the reference, held in the same squat position) with a viewing angle selected for that difference, so the learner knows what to look at.

**The learner (Q2):** a beginner learning the bodyweight squat, typically from online videos or demonstrations, who may be learning independently and has enough space to view the demonstration. Not primarily for professional athletes, experienced coaches, or people seeking personalised assessment of their own form.

### Why it belongs on glasses
- **Uses:** draws in the world, leaves your body free.
- **Why it's better than the phone or laptop version** *(Q4)*:
  - The value is **hands-free, eyes-up inspection**. The learner looks at the spatial comparison and naturally looks around it with their head and body, without holding a phone and continually aiming its screen.
  - Phone AR can also place 3D figures in a room. **We never claim this experience is impossible on a phone.**
  - Watching the figure while trying the movement beside it is part of the concept, but it is not a built feature.

| | Status |
|---|---|
| Figures anchored on a stage; automatic turn to the selected view; walking around (keyboard and mouse) | **Implemented** in the Lens Studio preview |
| Looking around the comparison with head and body, hands free; trying the movement beside the figure | **Intended for glasses** |
| Comfort, usability and any learning benefit of the glasses experience | **Not yet validated** (no device testing, no user testing) |

### Product or overlay
*(established, unchanged)*
- **Type:** product. The virtual demonstration and comparison are the experience.
- **What the real version would sense:** nothing. The Lens never tracks, counts or assesses the learner.
- **Stand-in for the preview:** none needed.

### Where things live
*(established; as in the original brief, with the corrections noted there)*
- **Where the learner looks:** straight ahead and slightly down, at the figure on its stage.
- **Stage:** about 170 cm ahead, top about 42 cm below eye height, starting at 35°.
- **Figure:** 1:3 scale, about 60 cm tall.
- **Red comparison figure:** on the same stage, overlaid on the white figure, same rig and proportions. Hidden except while comparing.
- **Cue card:** left of the figure (33 cm left, 26 cm below eye level, 155 cm away, 21 cm wide). It also holds the "COMPARE COMMON PATTERNS" row with Knees, Heels and Chest.
- **Control panel:** right of the figure, mirroring the cue card (20 cm wide): Prev / Play-Pause / Next, Slow / Replay, Front / 35° / Side.

### Hands and input
*(established; implemented)*
- **Standard pinch only** on Spectacles UI Kit buttons:
  - Start;
  - Play/Pause, Prev, Next, Slow 0.5x, Replay;
  - Front / 35° / Side;
  - **Knees / Heels / Chest**, which are toggles.
- **Opening a comparison:** pinch a pattern button.
- **Closing a comparison:** pinch the same button again, or Play, Prev, Next or Replay. Start is not shown while comparing.
- **Keeps a comparison open:** Slow and the angle buttons, so the learner can turn the stage while comparing.
- **Switching:** pinching a different pattern button switches straight to it.
- **Button size:** all buttons except Start are **3.4 cm tall** (about 5.1–8.1 cm wide) at about 155 cm. That is below the original brief's "about 6 cm" default. See *Deferred decisions*.
- **Voice:** none.

### When things show
*(implemented)*
- **Intro (before Start):**
  - label "BODYWEIGHT SQUAT", title "Squat Tutor";
  - body: "Watch a squat in five phases. Then compare three common patterns with the target, each from the angle where it shows.";
  - the disclaimer;
  - on the right, "Pinch Start to watch the full squat" and **Start**.
- **Demonstration:** the five phases with one cue and one body highlight each, as in the original brief.
- **While a comparison is open:** the figure is paused at the Bottom Position, the red figure is shown, and the stage turns to the pattern's view. The cue card shows, top to bottom:
  1. the view label;
  2. the pattern title;
  3. "Red: …";
  4. "White (target): …";
  5. the progress dots;
  6. "PINCH AGAIN TO RETURN", with only the active toggle lit;
  7. "Exaggerated for clarity. This Lens does not assess your form.", in place of the disclaimer.
- **Completion card:**
  - label "COMPLETE";
  - title "Squat complete";
  - body "Try Knees, Heels or Chest below to compare a common pattern, or Replay."
  - The demonstration does not restart on its own.
- **Out-of-view attention:** none needed; everything sits in front of the learner.

### The three illustrative patterns
*(Q5)* These are the three illustrative patterns selected for this prototype. They are **not** an exhaustive list of squat mistakes, universally agreed coaching checkpoints, or medically validated indicators.

| Pattern | Automatic view | Card label | What the red figure illustrates | Primary parameter |
|---|---|---|---|---|
| Knees ("Knees caving in") | Front (0°) | "BEST SEEN FROM THE FRONT" | knees drift inside the line of the feet | knee bend direction turned 18° inward |
| Chest ("Chest dropping") | Side (90°) | "BEST SEEN FROM THE SIDE" | torso tips further forward | 18° extra torso lean |
| Heels ("Heels lifting") | Side (90°) | "SEEN FROM THE SIDE OR REAR" | heels leave the floor | heel raised with the foot pitched |

How the figures are built:
- **The white figure** is the visual reference this demonstration uses. It is not a universally ideal squat.
- **The red figure** is an exaggerated, illustrative movement pattern.
- **Each pattern** is posed by one primary parameter, but other joints and geometry can move as a result. For Heels, the legs re-solve, so the red thigh and shin also move.
- **For Heels**, the Lens turns to the side only. A rear view is another possible way to inspect it, but the Lens does not switch to it; the learner can walk behind the stage.
- **Heels is conditional** on the user-test rule under *Evidence of understanding*.

### Intended learning outcomes
*(Q6)* These are intended outcomes, not proven results. They are not exercise instructions or claims about correct technique. After using Coach's Eye, a first-time learner should ideally be able to explain:
1. **What they experienced:** a reference squat alongside exaggerated illustrative movement patterns. It helps them observe differences between the figures and does not track, evaluate or judge their own movements.
2. **What to observe:**
   - Knees: the relationship between the knees and feet, from the front.
   - Chest: how the torso leans forward, from the side.
   - Heels: whether the heels stay in contact with the floor, from the side.
3. **Why the viewpoint changes:** different differences are easier to inspect from different perspectives, and changing the viewing angle brings the relevant detail into focus.

### Done criteria
*(Q9 Part A)* Keep exactly seven. Criteria 1–6 are as in the original brief, read with its visible corrections. Criterion 7 is below. All seven pass in LEAF in the Lens Studio preview: a–g on 31 Oct 2026 at `2201d21`, and the extended `h-mistake-compare` on 31 Oct 2026 at `1d1bd5a`. No new criteria at this stage.

7. **Pattern comparison.**
   [LEAF] `h-mistake-compare` checks, for **each** of Knees, Heels and Chest, that the button:
   - shows the red figure;
   - pauses at the Bottom Position;
   - turns the stage to that pattern's view (0° or 90°, ± 2°), starting from a different angle each time (knees from 35°, heels from 35°, chest from Front);
   - shows exactly that pattern's view label, title and `Red: … / White (target): …` lines;
   - shows "PINCH AGAIN TO RETURN" and the exaggeration note;
   - highlights only that toggle;
   - poses the red figure so it differs from the white figure in the intended direction: knees closer to the midline, ankle higher, head further forward.

   It also checks that Slow and the angle buttons keep the comparison open. Each of the five exits (same button, Play, Prev, Next, Replay) must:
   - hide the red figure and restore the row label, disclaimer and phase label;
   - turn all toggles off;
   - leave the player in the expected state: still at the Bottom Position and paused (same button), playing (Play), one phase back (Prev), one phase forward (Next), or playing from phase 1 (Replay).

   [Manual] In each comparison, the named difference is visible from the start position. **Open:** Heels reads weakly in preview captures.

### Evidence of understanding (user test)
*(Q9 Part B)* These thresholds were set before testing, using `docs/USER_TEST_OBSERVATION_SHEET.md`. They are **formative prototype decision criteria**, not statistical validation or proof of learning effectiveness.
- **Threshold:** at least 60% of participants, rounded up (2 of 3, 3 of 4, 3 of 5), applied independently to each outcome:
  1. states the purpose of the comparison without explanation;
  2. identifies the intended Knees difference;
  3. identifies the intended Chest difference;
  4. explains why the viewpoint changes;
  5. returns to the demonstration independently.
- **Heels rule (unchanged):** if 2 or more participants in a 3–5 person test misinterpret Heels, the results go back to the learner for a design decision before the video is recorded. The options are to improve its visual clarity, or remove it and deliver two stronger comparisons. Heels is not changed before that evidence exists.
- **Reporting:** record raw counts and actual observations, including unsuccessful responses. The results are never described as evidence that the product improves learning.

### Out of scope
*(Q7 Part A, learner's list)*
- No camera-based body tracking or pose estimation.
- No rep counting or feedback on the learner's own movement, even if they follow along.
- No personal assessment, scoring, diagnosis or personalised coaching.
- No medical, clinical, safety or injury-prevention claims.
- No claim that the white mannequin represents a universally ideal squat.
- No claim that the three patterns are exhaustive or medically validated.
- No rear-view button, or automatic switching between multiple viewpoints for one pattern.
- No exercises beyond the bodyweight squat in this submission.
- No voice interaction, AI-generated answers, saved learner progress or shared multi-user sessions.

### Future possibilities
*(Q7 Part B. A future possibility, not a committed roadmap or an existing capability.)*
The underlying comparison approach could potentially be explored for other movements in the future, using a reference figure, one illustrative pattern at a time and a viewpoint selected to make the difference easier to observe. No other exercises are implemented in this submission.

### Risks and open questions
*(Q8, learner's list)* These are untested risks, not confirmed failures. Intended benefits are not proven outcomes.

**1. Not yet validated**
- No user testing has been conducted. Whether first-time learners understand the three intended takeaways remains unknown. The observation sheet is prepared.
- No physical testing on SPECS glasses has been conducted. Comfort, hand-tracking pinch interaction, readability and the visibility of the 55%-opacity red mannequin on the see-through display remain unverified.
- No qualified coach or biomechanics expert has reviewed the three illustrative movement patterns.
- The current evidence comes from Lens Studio Preview, not a physical glasses demonstration.

**2. Known design weaknesses and usability risks**
- Heels is visually weaker than Knees and Chest in the current preview captures. The red thigh and shin attract more attention than the heel gap. It stays conditional on the existing user-testing decision rule.
- Most buttons are 3.4 cm tall at approximately 1.55 m, below the original brief's approximately 6 cm default. This may affect pinch interaction on actual glasses.
- The 1:3 mannequin scale fits the current presentation but may make the figure feel less like a person standing beside the learner.
- Physical follow-along is possible in concept, but no dedicated follow-along functionality has been implemented or validated.
- Walking around the figure in Lens Studio Preview using keyboard and mouse is not equivalent to moving around a physical AR figure.

**3. Honest product positioning**
- Phone AR can also place 3D figures in a physical environment. Our glasses-specific value proposition is hands-free, eyes-up inspection, and this remains a hypothesis until tested on the actual device.
- Distinguish clearly between what is implemented, what is intended for the glasses experience, and what remains unvalidated.

Submission-process tasks are tracked in `docs/SUBMISSION_CHECKLIST.md`, not here: fresh-open validation of the branch, manual verification of the competition rules, the demo video, and this amendment's sign-off.

### Deferred decisions
*(Q9 Part C)*
- **Button size.** This is deferred to the polish stage.
  - The 3.4 cm buttons are below the approximately 5.6 cm figure the agent derived: the "about 4 cm at 110 cm" minimum in the CLAD UI skill's reference, scaled to about 155 cm.
  - Before any change, the relevant Snap and CLAD UI guidance is to be verified, and the proposed dimensions checked against the actual scene layout. The change then comes to the learner for approval.
  - No change now.
- **Follow-along.** Nothing is built for it in this submission. It stays documented as an intended possibility for glasses use and an unvalidated device-testing question, and it must not be presented in the demo as an implemented feature.

### What counts as validated
*(Q9)*
- **The seven LEAF criteria** establish that the preview implementation meets its defined requirements.
- **User-test observations** establish whether people understand the experience.
- **Physical glasses testing and expert review** are separate validation activities, and neither has been done.

**Overall project success:**
- the submission requirements are met and supported by evidence;
- the demo video clearly communicates the comparison experience and follows the official duration and submission requirements;
- every public claim accurately reflects what is implemented and tested;
- the 5 November live review produces specific feedback, which we evaluate and act on where appropriate.

### Build notes for CLAD
*(established)* These are the original brief's build notes, which still apply, plus:
- Preserve the working build; `main` (`d1d0473`) is the fallback.
- Any change to the build needs the learner's approval first, including the deferred button-size change and any Heels decision.
- Re-run all eight LEAF scenarios, one at a time, after any change.

### Change log for Amendment 1
- **31 Oct 2026, after the pre-merge review:**
  - rationale rewritten around head-worn, hands-free inspection;
  - Heels view made explicit;
  - "one primary parameter" wording;
  - "internal model-geometry validation" terminology;
  - criterion 7 matched to the extended test H;
  - front-matter status set to draft;
  - completion card title and body separated;
  - visible correction notes added to the original brief.
- **1 Nov 2026, after the `plan-lens` interview:** the specification was restructured to the plan-lens template and filled from the learner's Q1–Q9 answers. Added:
  - the interview record;
  - the problem and learner;
  - intended learning outcomes;
  - the learner's out-of-scope list;
  - the "Future possibilities" sentence;
  - the learner's risks list;
  - user-test thresholds (60%, rounded up);
  - deferred decisions;
  - the validation distinctions.
