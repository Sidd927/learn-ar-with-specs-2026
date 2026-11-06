# Final Devpost submission draft: Coach's Eye

> **Superseded on 7 Nov 2026 by [`docs/submission/DEVPOST_SUBMISSION_FINAL.md`](submission/DEVPOST_SUBMISSION_FINAL.md)**, which follows the Devpost form field by field. This draft is kept for history.

> Draft, ready to paste. **Nothing has been submitted**, and submitting is the owner's decision. It applies to `feature/coach-eye` (build `83e71bc` or later); if the owner keeps `main`, use `DEVPOST_SUBMISSION.md`. Check the requirements in `SUBMISSION_CHECKLIST.md` against the live rules page first (automated access returns HTTP 403). Before pasting, update *Limitations* with real results if the user test, device test or live review happen first; never add results that didn't happen.

## Project title
**Coach's Eye**

*Descriptor:* A spatial squat comparison experience

## Tagline
A spatial squat comparison experience: see a common squat pattern next to a reference figure, from a view chosen to show the difference, in your own space. Built for SPECS.

## The problem
People can watch exercise demonstrations, but watching a movement doesn't always make it easy to understand how different movement patterns look, or what changes when someone performs the movement differently. A reference movement on its own shows what to do, but not necessarily which details to observe.

Coach's Eye brings an exaggerated illustrative pattern and a reference figure together in the same spatial view, holds both in the same squat position, and turns the stage to a viewpoint selected for that difference.

**Who it's for:** a beginner learning the bodyweight squat, typically through online videos or demonstrations, who wants to understand what to observe and how common movement patterns differ.

## What it does
- **A five-phase demonstration.** A jointed figure on a small stage about 1.7 m away squats through Starting Stance, Controlled Descent, Bottom Position, Rising Up and Standing Finish, with one short cue and one body highlight per phase.
- **Compare common patterns.** Press **Knees**, **Heels** or **Chest**. The figure pauses at the bottom, and a translucent red figure appears over the white reference figure showing an exaggerated, illustrative version of that pattern. The stage turns to a view chosen for it: front for knees, side for chest and heels. You can also walk behind the stage to look at the heels from the rear; the Lens doesn't turn there. The card shows:
  - a view label ("VIEW: FRONT" or "VIEW: SIDE");
  - the pattern name;
  - what the red figure does;
  - what the white reference does ("White (reference): …").

  Only the difference is drawn in red, and it is exaggerated for clarity. For Heels the red legs fade so the raised heel stands out. Pinch the button again to return.
- **Your pace, your view.** Play/Pause, Prev/Next, Slow 0.5x, Replay, and Front / 35° / Side, or walk around the figure.
- **Demonstration only.** Hand input is used only to pinch buttons. There is no camera-based body or pose tracking, and no counting or scoring of the learner's movement. The Lens never assesses the user and makes no diagnostic, clinical or injury-prevention claims. The white figure is this demonstration's reference, not everyone's ideal squat.

## What head-worn AR contributes
Phone AR can also place 3D figures in a room. What glasses change is how you inspect the comparison:
- **Head-worn and hands-free.** You look at the figures from where you stand, step to the side or walk behind the stage, and keep your hands free; you could even try the movement beside the figure. This is the intended glasses experience: no follow-along feature is built, and it is untested on a device.
- **The view matters.** In this model, each illustrated difference lies mainly in one direction (the knees move sideways; the torso tips forward), so the Lens turns the stage to present that direction to you.
- **Designed for the glasses' view.** We measured the SPECS preview's field of view (about 32° x 36°) and chose a 1:3-scale figure at 1.7 m, so the whole body, the card and the controls fit in the preview from where you stand.

We haven't tested whether this helps people learn better than a phone or a video.

## How we built it
- **Origin.** Coach's Eye developed from our original project, Squat Tutor, a five-phase squat demonstration.
- **Planning.** Devpost Learn `plan-lens` brief. The move to Coach's Eye is recorded as a traceable amendment in `Lens/devpost/design-brief.md`.
- **Build.** Claude Code with CLAD skills through the Lens Studio MCP: VirtualScene scene construction, TypeScript compile, logs, preview capture and LEAF.
- **Mannequin.** Jointed primitives with analytic two-bone leg IK, so the feet stay planted. Each pattern is posed by one primary parameter: knee bend direction, heel lift with foot pitch, or extra torso lean. Other joints can move as a result.
- **Overlay.** A second rig with identical proportions in a translucent material, inset 4% inside the white reference figure, so only the differences render.
- **UI.** Spectacles UI Kit on the Interaction Kit. Thin ring cues are generated with `MeshBuilder`.
- **Sizing for glasses.** Snap's guidance asks for targets of at least 2° spaced at least 1° apart. We read that conservatively (both dimensions, edge to edge) and sized every button from the scene geometry: 5.8 cm targets with 2.9 cm gaps at about 1.5 m, about 2.0–2.2° each and just over 1° apart. We checked the result against preview captures; pinch comfort on real glasses is untested.

## Testing and honesty
- **Eight LEAF scenarios pass in the Lens Studio preview**, each run on its own. They pinch the real buttons and check the scene: placement, the full demo, stepping, pause/slow/replay, view angles, cues, edge cases, and each comparison. The comparison test covers the right view, paused state, exact card text, return hint, exaggeration note, red figure differing in the intended direction, the body cue, and all five ways back. Passing them shows the preview works as specified; it is not a user or device test.
- **An internal model-geometry check** (`docs/BIOMECHANICAL_VALIDATION.md`) confirms the two figures share one coordinate frame and differ in the intended direction (for Heels, the legs also re-solve). It is not an expert biomechanical assessment. It led us to fix two things:
  - the chest comparison no longer adds an unrelated arm change;
  - the heels card no longer claims the side is the single best view.

## Challenges
- A frozen preview ("Paused by Creator") traced to a UI script error during startup.
- Package-version mismatches; we read manifests before installing anything.
- Fitting the figure, card and controls into a narrow field of view, then enlarging the buttons without covering the figure: the control panel had to stay below the red figure's hands in the side view.
- Making a translucent overlay show only the difference.
- Keeping the wording honest: comparisons of common patterns, not judgments of anyone's form.

## Limitations and what's next
- **Validation:** not yet tested with users. A five-person understanding test is ready to run (`docs/USER_VALIDATION_PLAN.md`), and the learning benefit is a hypothesis.
- **Preview only:** comfort, hand tracking and red-on-additive-display legibility are untested on SPECS hardware.
- **Not coach-reviewed:** the depictions are simplified and exaggerated. The heels comparison is the least clear; we fade the red legs to help, and a user test decides whether it stays.
- **Next:** user sessions, coach review, and an evidence-based decision on the heels comparison. Applying the same comparison approach to other movements is only a future possibility; nothing beyond the squat is built or committed.

## Links
- Repo: https://github.com/Sidd927/learn-ar-with-specs-2026
- Video: **[add YouTube link after the owner uploads it]**. A Lens Studio preview recording, not footage through glasses.

## Screenshots
For the gallery and thumbnail, upload the 3:2 crops in `docs/screenshots/devpost/` first (`13-mistake-knees-front-3x2.jpg` as the lead image, then `15-…-3x2`, `14-…-3x2`, `04-…-3x2`); they are the originals with the empty top removed. Then add `01-hero-intro.jpg` and `11-completion.jpg` from `docs/screenshots/`.

Originals (portrait): `docs/screenshots/13-mistake-knees-front.jpg` (lead image) · `15-mistake-chest-side.jpg` · `14-mistake-heels-side.jpg` · `01-hero-intro.jpg` · `04-phase3-bottom-position.jpg` · `11-completion.jpg`

## Built with
Lens Studio 5.24.1 · SPECS · CLAD · Lens Studio MCP · Spectacles Interaction Kit 2.0 · Spectacles UI Kit 2.0 · LEAF 2.0.2 · TypeScript · Claude Code
