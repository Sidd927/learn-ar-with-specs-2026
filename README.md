# Squat Tutor: Coach's Eye

**See a squat the way a coach does: from the angle where each mistake shows, in your own space, on SPECS.**

A jointed 3D mannequin demonstrates a bodyweight squat in five phases on a small stage in front of you. Press **Knees**, **Heels**, or **Chest**, and a translucent red figure shows that common mistake over the white target, while the stage turns to the view a coach would check it from.

Built for the [Learn AR with SPECS](https://learn-specs.devpost.com) hackathon with Lens Studio 5.24.1, CLAD, and the Lens Studio MCP. Everything shown runs in Lens Studio's preview. No SPECS hardware was used.

| Knees caving in (front view) | Heels lifting (side view) | Chest dropping (side view) |
|---|---|---|
| ![Knees mistake](docs/screenshots/13-mistake-knees-front.jpg) | ![Heels mistake](docs/screenshots/14-mistake-heels-side.jpg) | ![Chest mistake](docs/screenshots/15-mistake-chest-side.jpg) |

*Red = the mistake. White = the target. Only the difference is drawn in red.*

## The problem, and why glasses
- **Who:** beginners learning the bodyweight squat at home.
- **Problem:** most learn from a single-angle video, but the things trainers check are view-dependent. NASM's overhead squat assessment, for example, checks knees moving inward from the **front** and excessive forward lean from the **side**. Heels lifting is also easiest to see side-on.
- **What already exists:** phone apps rotate 3D exercise models and list common mistakes (see the [strategic analysis](docs/STRATEGIC_HACKATHON_ANALYSIS.md)).
- **What's different:** the mistake is overlaid on the target in your space, and the stage turns to the revealing view. On glasses you can also step around it with your hands free.

> **Product hypothesis.** This need hasn't been validated with users, and no user research is claimed. The study plan is in [`docs/USER_VALIDATION_PLAN.md`](docs/USER_VALIDATION_PLAN.md).

> **Demonstration only.** This Lens does not track, count, or assess your body. It shows general guidance, not individual fitness or medical advice.

## What it does

| | |
|---|---|
| ![Intro](docs/screenshots/01-hero-intro.jpg) | ![Starting stance](docs/screenshots/02-phase1-starting-stance.jpg) |
| **Intro.** Title, a short explanation, the disclaimer, and one Start button. | **1 · Starting Stance:** "Stand tall, feet shoulder-width apart." Thin amber outlines mark the feet. |
| ![Controlled descent](docs/screenshots/03-phase2-controlled-descent.jpg) | ![Bottom position](docs/screenshots/04-phase3-bottom-position.jpg) |
| **2 · Controlled Descent:** "Lower with control; knees follow your toes." Knee arrows point along the toes. | **3 · Bottom Position:** "Reach a comfortable depth with control." A hip marker shows the hips sitting back. |
| ![Rising up](docs/screenshots/05-phase4-rising-up.jpg) | ![Standing finish](docs/screenshots/06-phase5-standing-finish.jpg) |
| **4 · Rising Up:** "Rise smoothly while keeping your balance." More upright than the descent. | **5 · Standing Finish:** "Finish tall and balanced." A thin completion ring frames the stage. |

**Controls.** These are UIKit buttons, pinched with a hand or clicked in the preview:
- **Playback:** Start, Play/Pause, Previous, Next, Slow (0.5x), Replay.
- **View angle:** Front / 35° / Side turns the turntable. Walking around the figure also works.
- **Stepping:** Previous and Next disable (and dim) at the ends.
- **Completion:** the demo stops on "Demo complete — replay, step through, or follow along." It doesn't restart on its own.
- **Compare a common mistake:** Knees, Heels, or Chest pauses at the Bottom Position, shows the red mistake figure, and turns to the checkpoint view. Press it again, or any playback control, to return.

| Front | 35° | Side |
|---|---|---|
| ![Front](docs/screenshots/08-view-front.jpg) | ![35 degrees](docs/screenshots/09-view-35-degrees.jpg) | ![Side](docs/screenshots/10-view-side.jpg) |

| Playback controls | Completion |
|---|---|
| ![Playback interface](docs/screenshots/07-playback-interface.jpg) | ![Completion](docs/screenshots/11-completion.jpg) |

*All screenshots are captures of the running Lens in the Lens Studio preview (SPECS 27 device, Interactive input). See the [screenshot index](docs/screenshots/README.md).*

## AR design decisions
- **Scale over life size.** The preview's SPECS view measures about 32° wide by 36° tall. A 175 cm figure only fits at about 3.7 m. A 60 cm figure at 1.7 m keeps head, feet, knees, and hips in view through the whole squat.
- **One composition.** The cue card (left), figure (centre), and controls (right) sit in a band about 1.55–1.7 m away, so everything is visible from the start position.
- **One cue at a time.** Each phase shows exactly one body highlight: feet, then knees, then hips, then knees, then a finish ring.
- **Big, few targets.** Eight buttons in three rows, with toggle states for speed and view angle and dimmed labels when disabled.
- **Clear of the figure.** The cue card and controls sit low beside the stage, so even in Side view the reaching hands pass above the control panel.
- **Additive display.** Light materials and light text; nothing depends on black.

Details are in [`docs/RESEARCH_AND_DECISIONS.md`](docs/RESEARCH_AND_DECISIONS.md) and the approved brief in [`Lens/devpost/design-brief.md`](Lens/devpost/design-brief.md).

## How it's built

```mermaid
flowchart LR
  UI[SquatTutorUI<br/>UIKit buttons] -- events --> C[SquatTutorController]
  C -- start / pause / next / prev / replay / slow --> P[SquatPlayer<br/>timeline]
  C -- setAngle --> T[Turntable]
  P -- pose per frame --> R[MannequinRig<br/>leg IK + joints]
  P -- state --> C
  C -- phase, playing, bounds --> UI
  C -- show cue --> Q[CueIndicators]
  D[(SquatPhases<br/>phases, poses, timing)] --> P
  D --> UI
  D --> C
```

- **Mannequin.** It's a real scene hierarchy of rounded primitives under joint pivots: pelvis, spine, neck, shoulders, elbows, hips, knees, ankles. It was generated with the Lens Studio MCP (`VirtualScene`) from [`tools/generate_mannequin_scene.py`](tools/generate_mannequin_scene.py).
- **Animation.** Each leg uses analytic two-bone IK to a fixed ankle, bending toward the toes, so the feet stay planted at every frame of every blend. Torso lean, neck, and arm reach are joint angles. Phases blend with an ease-in-out curve: five 1.5 s holds and four 1.2 s transitions make 12.3 s at 1x.
- **Mistake overlay.** A second rig in a translucent material, inset 4% inside the target so only differences render. Mistakes are pose parameters in the same leg IK: knee bend direction, heel lift with foot pitch, extra lean.
- **Cues.** Thin rings (feet, hips, completion, turntable) are torus meshes generated at runtime with `MeshBuilder`, so tube thickness is independent of ring size.
- **UI.** Spectacles UI Kit (`BackPlate`, `FlexLayout`, `Button`) on top of the Spectacles Interaction Kit.
- **Workflow.** Planning used the Devpost Learn `plan-lens` skill. The build used Claude Code with CLAD skills (scene construction, Lens API, UI Kit, LEAF) through the Lens Studio MCP: VirtualScene, TypeScript compile, logs, preview capture, and LEAF runs.

Script responsibilities and the scene tree are in [`docs/IMPLEMENTATION_NOTES.md`](docs/IMPLEMENTATION_NOTES.md).

## Testing

Eight LEAF scenarios run in the Lens Studio preview: one per done criterion, plus edge cases and the mistake comparison. They pinch the real buttons and measure scene state. **All eight pass:**

| Scenario | Measured |
|---|---|
| Placement | 170 cm away, starts at 35.0°, root moves 0.000 cm while animating |
| Full demo | Phases 1→5 in order with matching cues; 12.03 s; no auto-restart |
| Stepping | Knee 79.6° / 123.3° / 54.8° / 5.5° match the targets; ends disabled |
| Playback | Paused joints frozen; 1x 12.30 s vs 0.5x 24.59 s (ratio 2.00) |
| Angles | 0.0° / 35.0° / 90.0°; figure stays put; playback continues |
| Cues | Exactly one correct cue per phase |
| Edge cases | Pause mid-transition, toggle and label sync, Next while playing, Play/Replay after completion |
| Mistake comparison | Mistake knees 3.1 cm vs target 7.7 cm from the midline; heels +4.0 cm; head +3.8 cm forward; correct view, title, and exit |

Full results and the manual checks are in [`docs/TEST_RESULTS.md`](docs/TEST_RESULTS.md).

## Run it
1. Install **Lens Studio 5.24.1**.
2. Clone the repo and open `Lens/Lens.esproj`.
3. In the Preview panel, choose device **SPECS 27** and **Interactive** input.
4. Click **Start**. A mouse click acts as a pinch. Use **WASD** to walk, **Q/E** to go down and up, and right-drag to look around.
5. To run the tests, open the LEAF panel and run `a-placement` to `h-mistake-compare`, one at a time.

## Repository layout
```
Lens/                      Lens Studio project
  Assets/Scripts/          Squat Tutor TypeScript (+ Tests/ for LEAF)
  Assets/Meshes, Materials Mannequin primitives and materials
  Packages/                SpectaclesInteractionKit 2.0, SpectaclesUIKit 2.0, Leaf 2.0.2, Bitmoji 3D
  devpost/design-brief.md  Approved plan-lens brief
docs/                      Decisions, implementation notes, test results, build log, screenshots
tools/                     Scene generator for the mannequin hierarchy
```

## Documents
- [Final demo script](docs/FINAL_DEMO_SCRIPT.md) · [Final recording guide](docs/FINAL_DEMO_RECORDING_GUIDE.md) · [Final Devpost draft](docs/FINAL_DEVPOST_SUBMISSION.md) · [Submission checklist](docs/SUBMISSION_CHECKLIST.md) · [Device validation checklist](docs/DEVICE_VALIDATION.md)
- [Strategic analysis](docs/STRATEGIC_HACKATHON_ANALYSIS.md) · [Architecture](docs/RECOMMENDED_PRODUCT_ARCHITECTURE.md) · [User validation plan](docs/USER_VALIDATION_PLAN.md)
- [Test results](docs/TEST_RESULTS.md) · [Implementation notes](docs/IMPLEMENTATION_NOTES.md) · [Research and decisions](docs/RESEARCH_AND_DECISIONS.md) · [Build log](docs/BUILD_PROGRESS.md)

## Known limitations
- Built and verified in the Lens Studio preview only. Comfort, hand tracking, and following along on real SPECS glasses are unverified. See the [device checklist](docs/DEVICE_VALIDATION.md).
- The figure is a stylised 1:3-scale mannequin, not a life-size human, so it fits the narrow SPECS view.
- One movement and three common mistakes. No tracking, counting, or form assessment, by design. The mistake depictions are general examples and haven't been reviewed by a coach.
