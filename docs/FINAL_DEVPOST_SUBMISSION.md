# Final Devpost submission draft: Squat Tutor: Coach's Eye

> Draft. **Nothing has been submitted.** It applies to `feature/coach-eye` (final build `2201d21` or later); if the owner keeps `main`, use `DEVPOST_SUBMISSION.md`. Check the requirements in `SUBMISSION_CHECKLIST.md` against the live rules page first. Update the "Validation" paragraph if user sessions happen before submission.

## Project title
**Squat Tutor: Coach's Eye**

## Tagline
See a common squat pattern next to the target, from the angle where the difference shows, in your own space, on SPECS.

## The problem
Most people learn a squat from a video filmed from one angle. Coaches don't watch from one angle. Trainer screening, such as the NASM overhead squat assessment, checks the knees from the **front** and torso lean from the **side**. A single fixed view can hide exactly the difference a beginner needs to see.

Phone apps already rotate 3D exercise models and list "common mistakes". What they don't do is put the pattern and the target on top of each other in your space and turn you to the view where the difference shows.

**Who it's for:** beginners learning the bodyweight squat at home who want to understand *what to look for* and *where to look*.

## What it does
- **A five-phase demonstration.** A jointed figure on a small stage about 1.7 m away squats through Starting Stance, Controlled Descent, Bottom Position, Rising Up and Standing Finish, with one short cue and one body highlight per phase.
- **Compare common patterns.** Press **Knees**, **Heels** or **Chest**. The figure pauses at the bottom, a translucent red figure showing that pattern appears over the white target, and the stage turns to the revealing view. The card shows:
  - the view, e.g. "Best seen from the front";
  - the pattern name;
  - what the red figure does;
  - what the white target does.

  Only the difference is drawn in red, and it is exaggerated for clarity. Pinch the button again to return.
- **Your pace, your view.** Play/Pause, Prev/Next, Slow 0.5x, Replay, and Front / 35° / Side, or walk around the figure.
- **Demonstration only.** No camera, body tracking, counting or scoring. The Lens never assesses the user, and the white figure is one reasonable example, not everyone's ideal.

## Why SPECS
- **The view is the lesson.** Each pattern shows on one axis, so turning the figure in your space, or stepping around it, is how you learn it.
- **Hands and body free.** You can stand beside the figure and try the movement without holding a phone.
- **Designed for the glasses' view.** We measured the SPECS preview's field of view (about 32° x 36°) and chose a 1:3-scale figure at 1.7 m so the whole body, the card and the controls fit from where you stand.

## How we built it
- **Planning.** Devpost Learn `plan-lens` brief. The move to Coach's Eye is recorded as a traceable amendment in `Lens/devpost/design-brief.md`.
- **Build.** Claude Code with CLAD skills through the Lens Studio MCP: VirtualScene scene construction, TypeScript compile, logs, preview capture and LEAF.
- **Mannequin.** Jointed primitives with analytic two-bone leg IK, so the feet stay planted. Each pattern is one pose parameter: knee bend direction, heel lift with foot pitch, or extra torso lean.
- **Overlay.** A second rig with identical proportions in a translucent material, inset 4% inside the target, so only the differences render.
- **UI.** Spectacles UI Kit on the Interaction Kit. Thin ring cues are generated with `MeshBuilder`.

## Testing and honesty
- **Eight LEAF scenarios pass in the Lens Studio preview.** They pinch the real buttons and check the scene: placement, the full demo, stepping, pause/slow/replay, view angles, cues, edge cases, and each comparison (right view, right card, red figure different in the intended direction, clean return).
- **A measurement audit** (`docs/BIOMECHANICAL_VALIDATION.md`) documents what the comparison geometry shows and doesn't. It led us to fix two things:
  - the chest comparison no longer adds an unrelated arm change;
  - the heels card no longer claims the side is the single best view.

## Challenges
- A frozen preview ("Paused by Creator") traced to a UI script error during startup.
- Package-version mismatches; we read manifests before installing anything.
- Fitting the figure, card and controls into a narrow field of view.
- Making a translucent overlay show only the difference.
- Keeping the wording honest: comparisons of common patterns, not judgments of anyone's form.

## Limitations and what's next
- **Validation:** not yet tested with users. A five-person understanding test is ready to run (`docs/USER_VALIDATION_PLAN.md`), and the learning benefit is a hypothesis.
- **Preview only:** comfort, hand tracking and red-on-additive-display legibility are untested on SPECS hardware.
- **Not coach-reviewed:** the depictions are simplified and exaggerated. The heels comparison is the least clear and is our first candidate for improvement.
- **Next:** user sessions, coach review, a clearer heel depiction, then more movements.

## Links
- Repo: https://github.com/Sidd927/learn-ar-with-specs-2026
- Video: **[add YouTube link]**. A Lens Studio preview recording, not footage through glasses.

## Screenshots
`docs/screenshots/13-mistake-knees-front.jpg` (lead image) · `15-mistake-chest-side.jpg` · `14-mistake-heels-side.jpg` · `01-hero-intro.jpg` · `04-phase3-bottom-position.jpg` · `11-completion.jpg`

## Built with
Lens Studio 5.24.1 · SPECS · CLAD · Lens Studio MCP · Spectacles Interaction Kit 2.0 · Spectacles UI Kit 2.0 · LEAF 2.0.2 · TypeScript · Claude Code
