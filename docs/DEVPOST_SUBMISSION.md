# Devpost submission draft: Squat Tutor

> Draft only. Nothing has been submitted or published. Fill in the video link after uploading, and check every field against the live Devpost form before submitting.

## Official requirements
Source: https://learn-specs.devpost.com/rules and /resources. Automated fetches return HTTP 403, so these come from the rules the entrant verified on 30 Oct 2026, recorded in `docs/RESEARCH_AND_DECISIONS.md`. **Re-check the live pages before submitting.**

| Requirement | Status for this project |
|---|---|
| A new SPECS AR Lens created during the submission period | Repo history starts 28–30 Oct 2026 (`7b18e08` onwards). |
| Planned with the Devpost Learn skill pack (`plan-lens`) | `Lens/devpost/design-brief.md` (status: approved). |
| Built with CLAD, Lens Studio, and the Lens Studio MCP | Lens Studio 5.24.1, CLAD skills, MCP (VirtualScene, compile, logs, preview capture, LEAF). See README → How it's built. |
| Installs and runs consistently in its intended Lens Studio preview | 7/7 LEAF scenarios pass in the preview. See `docs/TEST_RESULTS.md`. |
| Functionality matches the video and description | The description below lists only verified features. Record the video from the same build. |
| Public repo containing the Lens Studio project | https://github.com/Sidd927/learn-ar-with-specs-2026 (public, verified with `gh`). |
| Accurate text description | This draft. |
| Public YouTube demo, under 3 minutes, showing the Lens working (preview recording preferred) | Script in `docs/DEMO_SCRIPT.md` (about 2:40). **To do: record and upload.** |
| Deadline | 9 Nov 2026, 5:00 p.m. ET (10 Nov, 3:30 a.m. IST). |

**Judging:** Stage One is pass/fail eligibility. Stage Two weighs four criteria equally: Design, Technical Implementation, Innovation/Idea, and Presentation.

---

## Project title
**Squat Tutor**

## Tagline
A 3D squat demonstration you can walk around, slow down, and step through, in your own space on SPECS.

## Inspiration / problem
People learning a movement usually rely on a fixed-angle video. You can't see what the hips and knees are doing from the side while you're watching from the front, and scrubbing a video to the exact moment is awkward while your hands are busy. We wanted to test whether a spatial demonstration is easier to understand: in your space, viewable from any angle, and controllable phase by phase.

**This is a product hypothesis.** We haven't run user research, and we don't claim it's proven.

## What it does
Squat Tutor places a jointed 3D mannequin on a small stage about 1.7 m in front of you. It demonstrates a bodyweight squat in five phases:
1. **Starting Stance:** "Stand tall, feet shoulder-width apart." The feet are outlined.
2. **Controlled Descent:** "Lower with control; knees follow your toes." Arrows show the knees tracking the toes.
3. **Bottom Position:** "Reach a comfortable depth with control." A ring marks the hips sitting back.
4. **Rising Up:** "Rise smoothly while keeping your balance."
5. **Standing Finish:** "Finish tall and balanced." A ring around the stage marks completion.

A cue card beside the figure shows the phase, the instruction, progress dots, and the disclaimer: *"Demonstration only — this Lens does not assess your form."* A control panel on the other side offers Play/Pause, Previous/Next, Slow (0.5x), Replay, and three viewing angles: Front, 35°, and Side. You can also walk around the figure.

## Why SPECS / AR
- **Viewing angle is the lesson.** The side view shows the hips going back and the shins angling forward. The front view shows the knees tracking over the toes. A turntable and free walking make both one pinch or one step away.
- **It's in your space, at a readable scale.** We measured the preview's SPECS view (about 32° x 36°) and scaled the figure (about 60 cm tall, 1.7 m away) so head, knees, and feet stay in view through the whole movement. Life size wouldn't fit.
- **Hands free.** You can follow along beside the demonstration without holding a phone.

## How we built it
- **Planning:** the Devpost Learn `plan-lens` interview produced the approved design brief.
- **Build:** Claude Code with CLAD skills (scene construction, Lens API, UI Kit, LEAF) through the Lens Studio MCP.
- **Mannequin:** a real scene hierarchy of rounded primitives under joint pivots (pelvis, spine, neck, shoulders, elbows, hips, knees, ankles). It was generated through MCP `VirtualScene` from a small Python generator.
- **Animation:** analytic two-bone leg IK keeps the feet planted at every frame. Torso, neck, and arms are joint angles. A deterministic timeline runs five 1.5 s holds and four 1.2 s eased transitions (12.3 s at 1x, 24.6 s at 0.5x).
- **Cues:** thin rings generated at runtime with `MeshBuilder`.
- **UI:** Spectacles UI Kit (BackPlate, FlexLayout, Button) on the Spectacles Interaction Kit.

## Testing
Seven LEAF scenarios run in the Lens Studio preview. They pinch the real buttons and measure scene state. **All seven pass:**
- **Placement:** 170 cm away, starts at 35°, root moves 0.000 cm while animating.
- **Full demo:** phases 1→5 in order with matching cues; about 12.0 s; no auto-restart.
- **Stepping:** knee angles match each phase's target; ends disabled.
- **Playback:** paused joints frozen; slow/normal run-time ratio 2.00.
- **Angles:** 0° / 35° / 90°; figure stays put; playback continues.
- **Cues:** exactly one correct cue per phase.
- **Edge cases:** pause mid-transition, toggle and label sync, Next while playing, completion, Play/Replay after completion.

## Challenges
- **Frozen preview.** It showed "Paused by Creator" because a UI script threw while starting up. Lens Studio stops rendering after repeated failed frames. Fixed at the root cause.
- **Package mismatches.** A preview-helper package and the newest LEAF target a renamed version of the interaction kit. We read package manifests before installing and used LEAF 2.0.2, which matches the project.
- **Fitting the view.** Fitting a readable, complete demonstration into a narrow field of view meant moving from a life-size figure to a scale figure, and redesigning the layout twice from measured captures.

## Limitations and future scope
- Built and verified in the Lens Studio preview only. Comfort, hand tracking, and following along on real SPECS glasses are unverified. A checklist is in `docs/DEVICE_VALIDATION.md`.
- One movement (the bodyweight squat). Future work: more movements authored the same way, and user testing of the hypothesis.
- No body tracking, counting, scoring, or form assessment. That's out of scope by design.

## Links
- Repository: https://github.com/Sidd927/learn-ar-with-specs-2026
- Video: **[add YouTube link after upload]**

## Screenshots to upload
`docs/screenshots/01-hero-intro.jpg`, `04-phase3-bottom-position.jpg`, `10-view-side.jpg`, `08-view-front.jpg`, `07-playback-interface.jpg`, `11-completion.jpg`

## Built with
Lens Studio 5.24.1 · SPECS · CLAD · Lens Studio MCP · Spectacles Interaction Kit 2.0 · Spectacles UI Kit 2.0 · LEAF 2.0.2 · TypeScript · Claude Code
