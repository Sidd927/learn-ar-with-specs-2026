---
status: approved
original_brief_status: approved (Squat Tutor, 30 Oct 2026, commit bc5faf6)
amendment_1_status: approved as product direction by the learner (1 Nov 2026, master build brief); implemented on feature/coach-eye at 83e71bc. Not user-tested, not device-validated, no expert review, not submitted.
---

# Design brief: Squat Tutor

> **How to read this file.**
> - **Current product specification:** *Amendment 1: Coach's Eye*, at the end. Status: **approved as product direction** (1 Nov 2026) and implemented. That approval does not mean user testing, device validation, expert review or final submission approval have happened.
> - **Product name:** **Coach's Eye**, *a spatial squat comparison experience* (learner decision, 1 Nov 2026). **Squat Tutor** is the original project's name; it stays in this planning history and in code identifiers.
> - **Planning history:** everything from "The one spatial moment" to "After the build" is the **original Squat Tutor brief**, marked approved on 30 Oct 2026 (commit `bc5faf6`). Its words are kept. Where it no longer matches what was built, or was imprecise, a visible **[Correction (date)]** note follows the original text.
> - **Front matter:** `status` was changed from `approved` to `draft` on 31 Oct 2026, while the amendment was unapproved, and back to `approved` on 1 Nov 2026, when the learner approved Amendment 1 as product direction. The original brief's approval is recorded in `original_brief_status`.

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
  **[Correction 1 Nov 2026]** More precisely: the Lens uses hand input (standard Spectacles Interaction Kit / UI Kit pinch) to operate its buttons. It uses no camera-based body tracking or pose estimation, and it never tracks, counts or assesses the user's squat or movement.
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
  **[Correction 31 Oct 2026; widths corrected 1 Nov 2026]** The built buttons are **3.4 cm tall** and 5.40 cm (thirds) or 8.45 cm (halves) wide; the cue card's pattern buttons are 5.47 cm wide. Only Start is larger (16.8 × 5.0 cm). That is below the "about 6 cm" default above. The middle angle button reads "35°". Amendment 1 adds three more buttons on the cue card at the same 3.4 cm height.
  **[Correction 1 Nov 2026, polish stage]** The button layout was changed with the learner's authorization: every button is now **5.8 cm tall**, with 2.9 cm gaps (Prev/Play/Next, Front/35°/Side and Knees/Heels/Chest 5.80 cm wide, Slow/Replay 10.15 cm, Start 22.4 cm). See Amendment 1, *Deferred decisions*, and `docs/UI_LAYOUT_AUDIT.md`.
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

**Status: approved as product direction** by the learner on 1 Nov 2026 (master build brief), after the `plan-lens` interview (31 Oct – 1 Nov 2026). It describes the bodyweight-squat Lens built on branch `feature/coach-eye`, with code as of commit `83e71bc`. This approval is **not** evidence of user testing, physical-device validation, expert review or final submission approval; none of those has happened.

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
- **1 Nov 2026, pre-sign-off review.** The learner decided:
  - the product naming (Coach's Eye, a spatial squat comparison experience);
  - "reference" terminology for the white figure;
  - the approved UI copy now listed under *UI copy*. At that point it was approved as copy but not yet implemented.

  At that point the exact intro-body sentence was still a proposal (approved later the same day, below).

  The learner also asked for a button-size and spacing audit, recorded under *Deferred decisions*.
- **1 Nov 2026, master build brief.** The learner approved Amendment 1 as product direction and authorized:
  - the name and descriptor, the intro label and title, the "White (reference)" card lines and the exact intro sentence;
  - neutral view labels "VIEW: FRONT" (Knees) and "VIEW: SIDE" (Heels, Chest);
  - keeping Knees, Heels and Chest, and the validation criteria and thresholds unchanged;
  - the polish stage: intro card fit, button layout, and Heels visibility without new biomechanical claims.

  The learner stated that this authorization does not mean user testing, physical-device validation, expert review or final submission approval have occurred.
- **1 Nov 2026, build `83e71bc`.** Copy, layout and Heels fade implemented; compile clean; LEAF a–h each passed in the preview; screenshots recaptured.
- **Now:** approved as product direction and implemented. Open external gates: fresh-open check, the 3–5 person user test (including the Heels rule), device testing, the live review, the demo video, rules confirmation and the owner's submission.

### Planning interview record (plan-lens, Coach's Eye)
Each answer below is the learner's own text, quoted in full. Only process instructions to the agent are omitted (for example "record these" or "do not modify the build"), and each such omission is marked "[process instruction omitted]". The label after each question records how the decision arose.

**Q1. What problem should Coach's Eye solve?** *(learner)*
> I want Coach's Eye to help beginners better understand common movement patterns in exercises such as squats.
>
> People can watch exercise demonstrations, but simply watching a movement does not always make it easy to understand how different movement patterns look, or what changes when someone performs the movement differently.
>
> Coach's Eye aims to make these differences easier to observe by placing a reference movement and exaggerated comparison in the user's physical space. The learner can inspect the comparison from relevant viewpoints using hands-free, head-worn AR.
>
> The purpose is visual understanding and education. It is not intended to assess the user's actual body movements, diagnose incorrect form, provide personalised coaching, or make medical or injury-prevention claims.

**Q2. Who is the intended learner?** *(agent proposal, confirmed by learner with refinement)*
> I confirm the proposed learner description, with a small refinement:
>
> The intended learner is a beginner who is learning the bodyweight squat, typically through online videos or demonstrations, and wants to understand what to observe during the movement and how common movement patterns differ.
>
> They may be learning independently and have enough physical space to view and interact with the spatial demonstration.
>
> Coach's Eye is not primarily designed for professional athletes refining advanced technique, experienced coaches, or people seeking personalised assessment of their own form.
>
> Keep the initial product scope focused on the bodyweight squat. We can discuss whether the long-term concept could extend to other exercises when we reach Question 7, but do not present those extensions as existing capabilities.
>
> The priority is making the first-time learner understand the demonstration and comparisons clearly.

**Q3. Why compare movement patterns, rather than only watch the reference?** *(agent proposal, confirmed by learner)*
> I confirm your recommended reasoning.
>
> A reference movement on its own demonstrates what the movement looks like, but it does not necessarily teach a beginner what specific details to observe.
>
> Coach's Eye makes those details easier to notice by placing one exaggerated movement pattern over the reference mannequin, holding both in the same squat position, and presenting the comparison from a viewpoint selected for that particular difference.
>
> Showing one comparison at a time helps the learner focus on a specific body region and observe how the illustrated movement differs from the reference.
>
> The important part is not simply having two 3D mannequins. It is combining a visual contrast with a relevant viewing angle so that the learner knows what to look at.
>
> Keep the language educational and neutral. These are illustrative movement patterns, not diagnoses or definitive classifications of incorrect form.

*Agent summary of a further decision in the same answer:* the learner chose not to include the research reference the agent had offered. A learning benefit has not been established, and the innovation story should stand on the actual experience.

**Q4. The spatial moment, and why head-worn glasses?** *(agent proposal, confirmed by learner with clarification)*
> I confirm the proposed moment and rationale, with the following clarification.
>
> The experience I want is:
>
> A learner stands in their own space, watches the squat demonstration, selects Knees, Heels or Chest, and sees the stage automatically turn to present the relevant comparison. They can inspect the figures by moving their head or body, and potentially follow along physically beside the demonstration.
>
> The reason for using SPECS glasses is the hands-free, eyes-up interaction. The learner can look at the spatial comparison while keeping their hands free, rather than holding a phone and continuously aiming its screen at the content.
>
> I agree that phone AR can also place 3D figures in a physical environment. We should never claim that this experience is impossible on a phone.
>
> The strongest distinction is that head-worn AR allows the learner to inspect the spatial content while naturally looking around it, without holding a device. The possibility of observing the figure while trying the movement alongside it is also an interesting part of the concept.
>
> However, distinguish carefully between:
> - What is implemented and visible in Lens Studio Preview.
> - What is intended to be experienced on SPECS glasses.
> - What still requires physical device testing.
>
> We have not yet validated the actual glasses experience, so do not claim proven comfort, usability or learning benefits.
>
> Keep the current product scope intact. We can revisit whether the follow-along aspect needs stronger implementation when we reach the success criteria and scope questions. Do not add features prematurely.

**Q5. Why Knees, Heels and Chest?** *(agent proposal, confirmed by learner with clarification)*
> I confirm the recommendation.
>
> Keep Knees, Heels and Chest in the current scope for now.
>
> The reasons for retaining these three are:
> 1. They represent distinct movement patterns that a beginner can observe in a squat demonstration.
> 2. They allow us to demonstrate the purpose of selecting a relevant viewpoint: front for Knees and side for Heels and Chest.
> 3. They can be implemented using the existing mannequin rig without introducing unnecessary technical complexity.
>
> I agree that the comparisons should be evaluated on how clearly a first-time learner can identify the intended visual difference, not simply whether the code works.
>
> Heels is conditional. Use the existing observation sheet and its decision rule: if two or more participants in the 3–5 person user test misinterpret the Heels comparison, bring the results back to me. We will decide whether to improve its visual clarity or remove it and deliver two stronger comparisons.
>
> Do not change or remove Heels before collecting that evidence.
>
> One clarification: do not present these three patterns as an exhaustive list of squat mistakes, universally agreed coaching checkpoints, or medically validated indicators. They are the three illustrative patterns selected for this prototype.
>
> Keep any external biomechanics or trainer-reference claims out of the brief unless their sources have been properly verified.

**Q6. What should the learner understand afterwards?** *(agent proposal, confirmed by learner with refinement)*
> I confirm all three intended takeaways, with a small refinement to emphasise visual observation.
>
> After using Coach's Eye, a first-time learner should ideally be able to explain:
>
> 1. **What they experienced:** Coach's Eye demonstrates a reference squat alongside exaggerated illustrative movement patterns. It helps them observe differences between the figures; it does not track, evaluate or judge their own movements.
>
> 2. **What to observe in each comparison:**
>    - Knees: observe the relationship between the knees and feet from the front.
>    - Chest: observe how the torso leans forward from the side.
>    - Heels: observe whether the heels remain in contact with the floor from the side.
>
> 3. **Why the viewpoint changes:** Different movement differences are easier to inspect from different perspectives. The learner should understand that changing the viewing angle helps bring the relevant visual detail into focus.
>
> These are intended learning outcomes, not proven results. We should use the observation sheet to find out whether actual participants understand these points after using the Lens.
>
> Do not turn these takeaways into prescriptive exercise instructions or claims about correct technique. The purpose remains visual understanding, not personal form assessment or coaching.

**Q7. What does Coach's Eye deliberately not do, and how should other exercises be treated?** *(agent proposal, confirmed by learner)*
> I confirm Part A. All the listed capabilities are deliberately out of scope for this version.
>
> To make the boundaries explicit:
>
> [The learner's list follows here. It is reproduced word for word under *Out of scope* below.]
>
> I also confirm Part B, with a small wording adjustment.
>
> Include one sentence in a clearly labelled "Future possibilities" section:
>
> [The learner's sentence follows here. It is reproduced word for word under *Future possibilities* below.]
>
> This is a future possibility, not a committed roadmap or a claim about existing capabilities.
>
> Do not expand this into a multi-exercise product pitch. Keep the actual submission focused entirely on the bodyweight squat.
>
> Make sure the README, Devpost submission and demo script do not imply that other exercises are currently supported.
>
> Preserve the distinction between implemented functionality, intended use and future possibilities throughout the documentation.

**Q8. What limitations and uncertainties remain?** *(agent proposal, confirmed by learner)*
> I confirm the proposed limitations and the split between the design brief and submission checklist.
>
> [The learner's three-part list follows here. It is reproduced word for word under *Risks and open questions* below.]
>
> Please avoid describing untested risks as confirmed failures. Equally, do not present intended benefits as proven outcomes.
>
> Keep the following submission-process tasks in `SUBMISSION_CHECKLIST.md`, not in the product design brief:
> - Fresh-open validation of the feature branch.
> - Manual verification of the official competition rules and requirements, since automated access to the relevant pages returns HTTP 403.
> - Recording the final demo video.
> - Final Amendment 1 sign-off.
>
> Do not enlarge the buttons or make other product changes yet. Record the button-size concern for the success-criteria discussion and subsequent evidence-led polish stage.

**Q9. What does success look like?** *(agent proposal, confirmed by learner with clarifications)*
> I confirm Parts A, B and C, with the following clarifications.
>
> **Part A — Done criteria**
>
> Agreed. Keep exactly the seven established criteria, including the visible corrections to the original brief and criterion 7 for Coach's Eye comparisons. All seven have passed LEAF. Do not add new preview-checkable criteria at this stage.
>
> **Part B — Evidence of understanding**
>
> I agree with setting thresholds before testing. Use a minimum of 60% of participants, rounded up:
> - 2 of 3
> - 3 of 4
> - 3 of 5
>
> Apply this independently to each of the five outcomes:
> 1. State the purpose of the comparison without explanation.
> 2. Identify the intended Knees difference.
> 3. Identify the intended Chest difference.
> 4. Explain why the viewpoint changes.
> 5. Return to the demonstration independently.
>
> Keep the existing Heels rule unchanged: if 2 or more participants in a 3–5 person test misinterpret the Heels comparison, bring the results back to me for a design decision before recording the video.
>
> Record raw counts and actual observations, including unsuccessful responses. These thresholds are formative prototype decision criteria, not statistical validation or proof of learning effectiveness. Do not describe the results as evidence that the product improves learning.
>
> **Part C — Button size and follow-along**
>
> I agree with deferring button enlargement until the polish stage. The current 3.4 cm buttons are below the approximate 5.6 cm guidance Claude identified for the interaction distance. Before making changes, verify the relevant Snap/CLAD UI guidance and confirm the proposed dimensions against the actual scene layout. Bring the proposed change to me for approval first. No changes now.
>
> I agree that we should build nothing for follow-along in this submission. Keep it documented as an intended possibility for glasses use and an unvalidated device-testing question. It must not be presented in the demo as an implemented feature.
>
> **Overall project success**
>
> Agreed:
> - Submission requirements are met and supported by evidence.
> - The demo video clearly communicates the comparison experience and follows the official duration and submission requirements.
> - Every public claim accurately reflects what is implemented and tested.
> - The 5 November live review produces specific feedback, which we evaluate and act on where appropriate.
>
> One important distinction: passing the seven LEAF criteria establishes that the preview implementation meets its defined requirements. User-test observations establish whether people understand the experience. Physical glasses testing and expert review remain separate, uncompleted validation activities.
>
> [process instruction omitted]

*Also confirmed in Q9:* the agent's Part B proposal said that if a threshold is missed, the results come back to the learner for a design decision before the video is recorded. The learner confirmed Part B as a whole ("I confirm Parts A, B and C").

### The one spatial moment
*(Q4, learner's words)* A learner stands in their own space, watches the squat demonstration, selects Knees, Heels or Chest, and sees the stage automatically turn to present the relevant comparison. They can inspect the figures by moving their head or body, and potentially follow along physically beside the demonstration.

**The problem it addresses (Q1–Q3):** a reference movement on its own shows what the movement looks like, but not what specific details a beginner should observe. Coach's Eye combines a visual contrast (one exaggerated illustrative pattern over the reference, held in the same squat position) with a viewing angle selected for that difference, so the learner knows what to look at.

**The learner (Q2):** a beginner learning the bodyweight squat, typically from online videos or demonstrations, who may be learning independently and has enough space to view the demonstration. Not primarily for professional athletes, experienced coaches, or people seeking personalised assessment of their own form.

### Why it belongs on glasses
- **Uses:** draws in the world, leaves your body free.
- **What head-worn AR contributes** *(Q4)*. This replaces the plan-lens template's label "Why it's better than the phone or laptop version", which the learner judged too strong:
  - The value is **hands-free, eyes-up inspection**. The learner looks at the spatial comparison and naturally looks around it with their head and body, without holding a phone and continually aiming its screen.
  - Phone AR can also place 3D figures in a room. **We never claim this experience is impossible on a phone.**
  - Watching the figure while trying the movement beside it is part of the concept, but it is not a built feature.

| | Status |
|---|---|
| Figures anchored on a stage; automatic turn to the selected view; walking around (keyboard and mouse) | **Implemented** in the Lens Studio preview |
| Looking around the comparison with head and body, hands free; trying the movement beside the figure | **Intended for glasses** |
| Comfort, usability and any learning benefit of the glasses experience | **Not yet validated** (no device testing, no user testing) |

### Product or overlay
*(established; sensing wording made precise on 1 Nov 2026)*
- **Type:** product. The virtual demonstration and comparison are the experience.
- **What the real version would sense:** hand input only, used to operate the interface: standard Spectacles Interaction Kit / UI Kit pinch on buttons. This is hand tracking on glasses and a mouse click in the preview.
- **What it does not sense:** there is no camera-based body tracking or pose estimation. It never tracks, counts, evaluates or assesses the learner's squat or physical movement.
- **Stand-in for the preview:** none needed.

### Where things live
*(established; as in the original brief, with the corrections noted there)*
- **Where the learner looks:** straight ahead and slightly down, at the figure on its stage.
- **Stage:** about 170 cm ahead, top about 42 cm below eye height, starting at 35°.
- **Figure:** 1:3 scale, about 60 cm tall.
- **Red comparison figure:** on the same stage, overlaid on the white figure, same rig and proportions. Hidden except while comparing.
- **Cue card:** left of the figure (29 cm left, 22 cm below eye level, 150 cm away, 26.4 cm wide). It also holds the "COMPARE COMMON PATTERNS" row with Knees, Heels and Chest. The intro card uses the same slot.
- **Control panel:** right of the figure (29 cm right, 31 cm below eye level, 150 cm away, 25.6 cm wide): Prev / Play-Pause / Next, Slow / Replay, then "VIEW ANGLE" Front / 35° / Side. It sits lower than the cue card so the red Chest pattern's hands stay above it in the side view. The Start panel uses the same slot.
- *(Positions changed in the 1 Nov 2026 polish stage; before that both panels were 33 cm to the side, 26 cm below eye level and 155 cm away, with a 21 cm card and a 20 cm panel.)*

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
- **Button size (implemented 1 Nov 2026):** every button is **5.8 cm tall**; widths are 5.80 cm (Prev, Play/Pause, Next, Front, 35°, Side, Knees, Heels, Chest), 10.15 cm (Slow, Replay) and 22.4 cm (Start), with 2.9 cm gaps. At 147.7–151.0 cm Z depth the colliders are about 2.04–2.15° tall and 2.10–3.72° wide (Start 8.20°), with 1.06–1.08° edge-to-edge gaps. That meets the 2° size and 1° spacing we use as a conservative reading of Snap's guidance. It is derived from the code and saved scene, checked against preview captures, and **not** tested with real hand targeting on SPECS. See *Deferred decisions* and `docs/UI_LAYOUT_AUDIT.md`.
- **Voice:** none.

### When things show
*(implemented; the quoted strings are the on-screen text of build `83e71bc`)*
- **Intro (before Start):**
  - label "SPATIAL SQUAT COMPARISON", title "Coach's Eye";
  - body: "Watch a squat in five phases. Then compare three illustrative patterns with the reference, each from a view chosen to show its difference." (four lines on the 26.4 cm card);
  - the disclaimer;
  - on the right, "Pinch Start to watch the full squat" and **Start**.
- **Demonstration:** the five phases with one cue and one body highlight each, as in the original brief.
- **While a comparison is open:** the figure is paused at the Bottom Position, the red figure is shown, and the stage turns to the pattern's view. The cue card shows, top to bottom:
  1. the view label;
  2. the pattern title;
  3. "Red: …";
  4. "White (reference): …";
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
| Knees ("Knees caving in") | Front (0°) | "VIEW: FRONT" | knees drift inside the line of the feet | knee bend direction turned 18° inward |
| Chest ("Chest dropping") | Side (90°) | "VIEW: SIDE" | torso tips further forward | 18° extra torso lean |
| Heels ("Heels lifting") | Side (90°) | "VIEW: SIDE" | heels leave the floor | heel raised with the foot pitched |

The view labels are neutral: they name the view the Lens chose, without claiming it is the only or best one (learner decision, 1 Nov 2026). Before 1 Nov 2026 they read "BEST SEEN FROM THE FRONT/SIDE" and "SEEN FROM THE SIDE OR REAR".

How the figures are built:
- **The white figure** is the visual reference this demonstration uses. It is not a universally ideal squat.
- **The red figure** is an exaggerated, illustrative movement pattern.
- **Each pattern** is posed by one primary parameter, but other joints and geometry can move as a result. For Heels, the legs re-solve, so the red thigh and shin also move.
- **Presentation aids (1 Nov 2026 polish; no new biomechanical claim):** during Heels the red thighs, knees and shins fade (opacity about 0.16), so the raised red heel beside the flat white foot is the clearest red shape. The pose itself is unchanged. Body cues: Knees shows the knee markers, Heels the foot outlines, Chest none (the hip marker no longer appears during Chest).
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
*(Q9 Part A)* Keep exactly seven. Criteria 1–6 are as in the original brief, read with its visible corrections. Criterion 7 is below. All seven pass in LEAF in the Lens Studio preview: a–h each run individually on 1 Nov 2026 at `83e71bc` (earlier: a–g at `2201d21`, extended h at `1d1bd5a`, 31 Oct). No new criteria at this stage. Passing LEAF establishes preview behaviour only; it is not a user test or device test.

7. **Pattern comparison.**
   [LEAF] `h-mistake-compare` checks, for **each** of Knees, Heels and Chest, that the button:
   - shows the red figure;
   - pauses at the Bottom Position;
   - turns the stage to that pattern's view (0° or 90°, ± 2°), starting from a different angle each time (knees from 35°, heels from 35°, chest from Front);
   - shows exactly that pattern's view label, title and `Red: … / White (reference): …` lines;
   - shows "PINCH AGAIN TO RETURN" and the exaggeration note;
   - highlights only that toggle;
   - poses the red figure so it differs from the white figure in the intended direction: knees closer to the midline, ankle higher, head further forward;
   - shows only that pattern's body cue (knee markers, foot outlines, or none for Chest), and fades the red legs only for Heels *(checks added 1 Nov 2026 with the polish stage; presentation only)*.

   It also checks that Slow and the angle buttons keep the comparison open. Each of the five exits (same button, Play, Prev, Next, Replay) must:
   - hide the red figure and restore the row label, disclaimer and phase label;
   - turn all toggles off;
   - leave the player in the expected state: still at the Bottom Position and paused (same button), playing (Play), one phase back (Prev), one phase forward (Next), or playing from phase 1 (Replay).

   [Manual] In each comparison, the named difference is visible from the start position. **Status (1 Nov 2026):** in the final captures `13`–`15` the agent can see each difference from the start position. Heels was the weakest; with the leg fade the raised red heel is now the clearest red shape in `14`, but it remains small. Whether first-time learners read it correctly is for the user test (Heels rule).

### Evidence of understanding (user test)
*(Q9 Part B)* These thresholds were set before testing, using `docs/USER_TEST_OBSERVATION_SHEET.md`. They are **formative prototype decision criteria**, not statistical validation or proof of learning effectiveness.
- **Threshold:** at least 60% of participants, rounded up (2 of 3, 3 of 4, 3 of 5), applied independently to each outcome:
  1. states the purpose of the comparison without explanation;
  2. identifies the intended Knees difference;
  3. identifies the intended Chest difference;
  4. explains why the viewpoint changes;
  5. returns to the demonstration independently.
- **If a threshold is missed:** the results come back to the learner for a design decision before the video is recorded *(agent proposal in Q9 Part B, confirmed)*.
- **Heels rule (unchanged):** if 2 or more participants in a 3–5 person test misinterpret Heels, the results go back to the learner for a design decision before the video is recorded. The options are to improve its visual clarity, or remove it and deliver two stronger comparisons. Heels is not changed before that evidence exists.
- **Reporting:** record raw counts and actual observations, including unsuccessful responses. The results are never described as evidence that the product improves learning.

### UI copy (learner decision, 1 Nov 2026; approved and implemented in `83e71bc`)
Approved in principle on 1 Nov 2026 (pre-sign-off review); the exact intro sentence and the view labels were approved in the master build brief the same day. All of it is implemented in both the TypeScript defaults and the saved scene, and confirmed by preview capture (`docs/screenshots/01`, `13`–`15`).

| Where | Before 1 Nov 2026 | Now (implemented) |
|---|---|---|
| Intro label (`SquatPhases.ts`, `INTRO_LABEL`) | BODYWEIGHT SQUAT | **SPATIAL SQUAT COMPARISON** |
| Intro title (`introTitle`: saved scene value **and** TypeScript default) | Squat Tutor | **Coach's Eye** |
| Intro body (`INTRO_BODY`) | "Watch a squat in five phases. Then compare three common patterns with the target, each from the angle where it shows." | **"Watch a squat in five phases. Then compare three illustrative patterns with the reference, each from a view chosen to show its difference."** |
| Comparison card, Knees | White (target): knees track over the toes. | **White (reference): knees track over the toes.** |
| Comparison card, Heels | White (target): whole foot stays planted. | **White (reference): whole foot stays planted.** |
| Comparison card, Chest | White (target): chest up, torso controlled. | **White (reference): chest up, torso controlled.** |
| View label, Knees | BEST SEEN FROM THE FRONT | **VIEW: FRONT** |
| View label, Heels | SEEN FROM THE SIDE OR REAR | **VIEW: SIDE** |
| View label, Chest | BEST SEEN FROM THE SIDE | **VIEW: SIDE** |
| Completion card | COMPLETE / Squat complete / Try Knees, Heels or Chest… | No change (no product name) |

**Fit, checked by capture:** on the 26.4 cm card the label fits on one line and the intro sentence wraps to four lines inside its 6.6 cm row, with space above the disclaimer. On the old 21 cm card it wrapped to five lines and nearly touched the disclaimer (evidence image `docs/evidence/ui-fit/intro-old-21cm-card.jpg`). The fix was a wider card, not smaller text.

**Unchanged by design:** internal code names (`target` field, `SquatTutorUI`, `SquatTutor` objects), the "COMPARE COMMON PATTERNS" and "PINCH AGAIN TO RETURN" labels, the disclaimer, and the exaggeration note "Exaggerated for clarity. This Lens does not assess your form."

### Out of scope
*(Q7 Part A, learner's list, word for word)*
- No camera-based body tracking or pose estimation.
- No rep counting or feedback on the learner's own movement, even if they follow along.
- No personal assessment, scoring, diagnosis or personalised coaching.
- No medical, clinical, safety or injury-prevention claims.
- No claim that the white mannequin represents a universally ideal squat.
- No claim that the three patterns are exhaustive or medically validated.
- No rear-view button or automatic switching between multiple viewpoints for one pattern.
- No exercises beyond the bodyweight squat in this submission.
- No voice interaction, AI-generated answers, saved learner progress or shared multi-user sessions.

### Future possibilities
*(Q7 Part B. A future possibility, not a committed roadmap or an existing capability.)*
The underlying comparison approach could potentially be explored for other movements in the future, using a reference figure, one illustrative pattern at a time and a viewpoint selected to make the difference easier to observe. No other exercises are implemented in this submission.

### Risks and open questions
*(Q8, learner's list, word for word)* These are untested risks, not confirmed failures. Intended benefits are not proven outcomes.

**1. Not yet validated**
- No user testing has been conducted. Whether first-time learners understand the three intended takeaways remains unknown. The observation sheet is prepared.
- No physical testing on SPECS glasses has been conducted. Comfort, hand-tracking pinch interaction, readability and the visibility of the 55%-opacity red mannequin on the see-through display remain unverified.
- No qualified coach or biomechanics expert has reviewed the three illustrative movement patterns.
- The current evidence comes from Lens Studio Preview, not a physical glasses demonstration.

**2. Known design weaknesses and usability risks**
- Heels is visually weaker than Knees and Chest in the current preview captures. The red thigh and shin attract more attention than the heel gap. Keep it conditional on the existing user-testing decision rule.
- Most buttons are 3.4 cm tall at approximately 1.55 m, below the original brief's approximately 6 cm default. This may affect pinch interaction on actual glasses.
- The 1:3 mannequin scale fits the current presentation but may make the figure feel less like a person standing beside the learner.
- Physical follow-along is possible in concept, but no dedicated follow-along functionality has been implemented or validated.
- Walking around the figure in Lens Studio Preview using keyboard and mouse is not equivalent to moving around a physical AR figure.

**3. Honest product positioning**
- Phone AR can also place 3D figures in a physical environment. Our glasses-specific value proposition is hands-free, eyes-up inspection, and this remains a hypothesis until tested on the actual device.
- Distinguish clearly between what is implemented, what is intended for the glasses experience, and what remains unvalidated.

**[Status note, 1 Nov 2026; the list above is kept word for word]** Two items above describe the build before the polish stage. The buttons are now 5.8 cm tall at about 1.5 m (about 2.0–2.2°); hand-tracking pinch on glasses is still untested. During Heels the red thigh and shin are now faded so the heel is the clearest red shape; whether learners read it correctly is still untested, and Heels stays conditional on the user-test rule.

Submission-process tasks are tracked in `docs/SUBMISSION_CHECKLIST.md`, not here: fresh-open validation of the branch, manual verification of the competition rules, the demo video, and this amendment's sign-off.

### Deferred decisions
*(Q9 Part C)*
- **Button size: decided and implemented on 1 Nov 2026.** Deferred in Q9 Part C to the polish stage; the master build brief then asked for "the best practical button layout", balancing targetability, stage visibility, text readability, composition and reliability, verified against the actual colliders. The full method, numbers and reproduction script are in [`docs/UI_LAYOUT_AUDIT.md`](../../docs/UI_LAYOUT_AUDIT.md).
  - **Snap's wording, re-verified 1 Nov 2026** ([Positioning & Sizing Content](https://developers.snap.com/spectacles/best-practices/design-for-spectacles/positioning-sizing-content)):
    - "Targetable elements should be at least 2 degrees in angular size."
    - "Targetable elements should be spaced at least 1 degree apart in angular size."
    - "The recommended size refers to the interactive collider on an element."
    - "Visual meshes can be smaller, provided the collider meets the minimum standards for comfortable interactions."
    - "Spacing may also need to accommodate the size of any targeting feedback."
    - Under "Z Axis: Near-Field or Far-Field": "Far-Field (60cm - 160cm): Uses indirect interactions".
    - Its "Button Sizing & Spacing" table is indexed by "Position Z": minimum 4.0 cm at Z = 110 cm and 5.5 cm at Z = 160 cm; "Best" 6.0 cm and 8.5 cm.
  - **What Snap does not say:** whether 2° applies to width, height or the smaller dimension, and whether 1° spacing is measured edge to edge or centre to centre.
  - **Our interpretation (a design choice, not Snap's wording):** 2° in both collider dimensions; 1° edge to edge between colliders; the 60–160 cm range read as Z depth.
  - **Before (build `2201d21`, historical):** buttons 3.4 cm tall (about 1.2°), 5.40–8.45 cm wide, 0.70 cm gaps (about 0.25°); panels at `sideOffset 33`, `panelHeight −26`, `panelDistance 155`, card 21 cm, panel 20 cm. Below our conservative target on height and spacing.
  - **Options considered:**
    1. *Keep the pre-build layout*: rejected; about 1.2° tall with 0.25° gaps.
    2. *The audit proposal* (both sides at new heights, left −25 cm, right −32 cm, "PLAYBACK" caption kept): implemented first and captured. The control panel and card sat low over the stage plate and ring sides, and the bottom button row was about 15° below eye level.
    3. *Implemented refinement*: the "PLAYBACK" caption removed (the five playback buttons label themselves; control panel 26.0 cm tall instead of 28.5 cm), left panels raised to −22 cm and right panels to −31 cm. The control panel top stays below the side-view hands; the card bottom stays above the ring sides.
    4. *Smaller targets (for example 5.2 cm, exactly 2° at 150 cm)*: not chosen; no margin for off-axis foreshortening, which already brings the angle row to 2.04°.
  - **Implemented values:** `panelDistance` 150, `sideOffset` 29, `panelHeight` −22 (left), `rightPanelHeight` −31 (right), card 26.4 cm, panel 25.6 cm; buttons 5.8 cm tall, gaps 2.9 cm, a 1.6 cm spacer between the first two control rows.
  - **A. Derived from code and saved scene (audit script):** colliders 2.10–3.72° wide and 2.04–2.15° tall (Start 8.20° × 2.08°); horizontal gaps 1.055–1.080°; vertical gaps 1.095° (Prev→Slow) and 1.142° (Slow→Front); Z depth 147.7–151.0 cm, straight-line 153.8–157.5 cm.
  - **B. Measured in the final preview captures** (pinhole model from the 31 Oct calibration; predicted panel edges match the captures within 2 px, except the control panel's right edge, 8 px):
    - the red Chest pattern's lowest point is about **0.77°** above the control panel top; the white figure about 2.0–2.2°;
    - the hip-marker ring clears the card's inner edge by about 0.42° (side view) and 1.15° (35° view);
    - the card bottom (el −13.60°) sits just above the ring sides (about −13.7°); the control panel still covers the right edge of the turntable ring by about 0.4°, and the stand-top and completion-ring edges by about 1.2° and 1.8°. In the captures this hides a small part of the plate rim, never the figures.
  - **C. Not established:** real hand-ray targeting tolerance on SPECS; SPECS optics and eye position; comfort over a session. These need the device test.
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
- Any change to the build needs the learner's approval first, including any Heels decision after the user test. (The button-size change was authorized and made on 1 Nov 2026.)
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
- **1 Nov 2026, accuracy pass before sign-off:**
  - The interview record now quotes each answer in full in the learner's words, restoring omitted qualifications (Q2 extensions, Q4 implemented/intended/untested and "do not add features prematurely", Q5 Heels rule, Q6 non-prescriptive note, Q7 documentation rules, Q8 process split, Q9 in full).
  - The *Out of scope* and *Risks* lists are restored word for word.
  - The sensing statement now separates hand input from body tracking, here and as a visible correction in the original brief.
  - The template label "Why it's better than the phone or laptop version" is replaced by "What head-worn AR contributes".
  - The button-size guidance is verified against Snap's documentation, and the button distance corrected to about 160 cm from the eye.
  - The confirmed "threshold missed → learner decides before the video" rule is added.
- **1 Nov 2026, pre-sign-off review:**
  - product name, descriptor and "reference" terminology recorded (learner decision);
  - approved UI copy recorded as not yet implemented, with current on-screen strings marked as current;
  - button widths corrected (5.40, 5.47 and 8.45 cm, not "5.1–8.1 cm"), in the earlier correction note and in *Hands and input*;
  - the button and spacing audit and the agent's layout proposal recorded (proposal not approved).
- **1 Nov 2026, final pre-sign-off corrections:**
  - the intro-body sentence marked as proposed and awaiting approval (the other copy is approved);
  - view-label proposal updated ("VIEW: SIDE" for Heels, no rear wording);
  - button audit completed (both axes, collider states, Snap's far-field range verified, per-control distances);
  - layout proposal corrected for the single `rowGap`, the side-view hands and the 160 cm limit.
- **1 Nov 2026, evidence-readiness audit:**
  - Snap wording re-verified; per-axis and edge-to-edge rules marked as our interpretation, with 2° in both dimensions stated as a conservative target;
  - the far-field range corrected to Z depth: current controls are inside it by Z, and the earlier "beyond 160 cm" was straight-line distance;
  - the proposed layout re-derived independently and separated into derived, estimated and unknown values;
  - the screenshot calibration redone by pixel measurement. The red-arm clearance is now about 0.67°, not "about 1.2°"; the bottom margin about 1.5°, not 0.9°; ring overlaps given per ring;
  - approved, proposed and undecided copy separated.
- **1 Nov 2026, documentation closeout:**
  - the layout audit made durable in `docs/UI_LAYOUT_AUDIT.md`, with a reproduction script; the brief now points to it instead of a conversation-only report;
  - screenshot-derived figures aligned with that script (red figure 0.68°, hip ring 0.42°, card margin 0.37°);
  - the proposed intro sentence updated to the learner's revised wording, still awaiting approval, with an estimated fit risk noted;
  - "approved" copy relabelled "approved in principle, not implemented".
- **1 Nov 2026, master build and polish:**
  - Amendment 1 approved as product direction by the learner; front matter set to `approved`, with the learner's statement that this is not user testing, device validation, expert review or submission approval;
  - approved copy, intro sentence and neutral view labels implemented (`83e71bc`), with the *UI copy* table rewritten from "approved, not implemented" to "implemented";
  - intro card fit fixed by widening the card to 26.4 cm (four lines, checked by capture);
  - button layout chosen from four options and implemented (5.8 cm targets, 2.9 cm gaps, per-side panel heights, "PLAYBACK" caption removed), with measured evidence;
  - Heels: red legs fade during the comparison; Chest no longer shows the hip marker; no pose or wording change;
  - criterion 7 checks extended (cue and fade); LEAF a–h passed individually; screenshots recaptured;
  - status notes added after the word-for-word *Risks* list instead of editing it.
