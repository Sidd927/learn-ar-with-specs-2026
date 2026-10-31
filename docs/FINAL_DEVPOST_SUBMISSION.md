# Final Devpost submission draft: Squat Tutor: Coach's Eye

> Draft. **Nothing has been submitted.** It applies if `feature/coach-eye` is merged; otherwise use `DEVPOST_SUBMISSION.md`. Check the requirements in `SUBMISSION_CHECKLIST.md` against the live rules page first.

## Project title
**Squat Tutor: Coach's Eye**

## Tagline
See a squat the way a coach does: from the angle where each mistake shows, in your own space, on SPECS.

## The problem
Most people learn a squat from a video filmed from one angle. But many things trainers check are view-dependent. For example, the NASM overhead squat assessment checks **knees moving inward from the front** and **excessive forward lean from the side**. Heels lifting is likewise easiest to see side-on. Phone apps already let you rotate a 3D model and list "common mistakes". What they don't do is put the mistake and the target side by side, in your space, and turn you to the view that reveals it.

**Who it's for:** beginners learning the bodyweight squat at home who want to understand *what to look for*.

**Honesty note:** this is a **hypothesis**. We haven't yet run user studies (plan: `docs/USER_VALIDATION_PLAN.md`).

## What it does
- **A five-phase demonstration:** a jointed mannequin on a small stage about 1.7 m away squats through Starting Stance, Controlled Descent, Bottom Position, Rising Up, and Standing Finish. One short cue and one body highlight per phase.
- **Compare a common mistake (Coach's Eye):** press **Knees**, **Heels**, or **Chest**. A translucent red figure showing the mistake appears over the white target at the bottom of the squat, and the stage **turns to the checkpoint view**: front for knees, side for heels and chest. Only the *difference* is drawn in red.
- **Your pace, your view:** Play/Pause, step Previous/Next, Slow (0.5x), Replay, and Front / 35° / Side, or simply walk around the figure.
- **Demonstration only:** *"Demonstration only — this Lens does not assess your form."* No camera, body tracking, counting, or scoring.

## Why SPECS
- **The view is the lesson.** Each mistake lives on one axis, so turning the in-space figure, or stepping around it, *is* how you learn it.
- **Hands free, eyes up.** You can follow along beside the figure without holding a phone.
- **Designed for the glasses' view.** We measured the SPECS preview's field of view (about 32° x 36°) and scaled and placed the figure and panels so everything fits from where you stand.

## How we built it
- **Planning:** Devpost Learn `plan-lens` brief, with a Coach's Eye amendment recorded in `Lens/devpost/design-brief.md` (approved by the owner before merge).
- **Build:** Claude Code with CLAD skills through the Lens Studio MCP (VirtualScene scene construction, TypeScript compile, logs, preview capture, LEAF).
- **Mannequin:** jointed primitives with **analytic two-bone leg IK**. The feet stay planted, and mistake poses are parameters (knee bend direction, heel lift with foot pitch, extra lean).
- **Overlay:** a second rig in a translucent material, **inset 4% inside the target**, so only the differences show.
- **UI:** Spectacles UI Kit on the Interaction Kit. Thin ring cues are generated with `MeshBuilder`.

## Testing
**Eight LEAF scenarios pass in the Lens Studio preview.** They pinch the real buttons and measure the scene:
- Placement (1.7 m, 35°, the figure never drifts)
- Five phases in order in about 12 s
- Stepping, with knee angles matching each phase exactly
- Pause, Slow, and Replay (slow/normal ratio 2.0)
- Viewing angles (0 / 35 / 90°)
- One cue per phase
- Edge cases
- **Mistake comparison:** the mistake knees sit 3.1 cm from the midline versus 7.7 cm for the target; heels 4.0 cm higher; head 3.8 cm further forward; the correct view and exit behaviour

The project also passed a full quit-and-reopen check.

## Challenges
- A frozen preview ("Paused by Creator") traced to a UI script error during startup.
- Package-version mismatches (we read manifests before installing).
- Fitting the content to a narrow field of view.
- Making a translucent overlay show only differences.

## Limitations and what's next
- Verified in the Lens Studio preview only. Comfort, hand tracking, and overlay legibility on real glasses are untested (`docs/DEVICE_VALIDATION.md`).
- One movement and three mistakes; a scale (1:3) figure.
- No user validation yet. Next: 5-person comprehension sessions, coach review of the mistake depictions, then more movements.

## Links
- Repo: https://github.com/Sidd927/learn-ar-with-specs-2026
- Video: **[add YouTube link]**. A Lens Studio preview recording, not footage through glasses.

## Screenshots
`docs/screenshots/13-mistake-knees-front.jpg` (lead image) · `14-mistake-heels-side.jpg` · `15-mistake-chest-side.jpg` · `01-hero-intro.jpg` · `04-phase3-bottom-position.jpg` · `07-playback-interface.jpg`

## Built with
Lens Studio 5.24.1 · SPECS · CLAD · Lens Studio MCP · Spectacles Interaction Kit 2.0 · Spectacles UI Kit 2.0 · LEAF 2.0.2 · TypeScript · Claude Code
