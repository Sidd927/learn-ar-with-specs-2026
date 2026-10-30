# Research and decisions

## Official hackathon requirements

Sources: https://learn-specs.devpost.com/rules and https://learn-specs.devpost.com/resources

The planning agent's automated fetch of these pages returned HTTP 403. The requirements below were verified independently by the entrant and supplied at build time (30 Oct 2026).

Deadline: 9 Nov 2026, 5:00 p.m. ET (10 Nov 2026, 3:30 a.m. IST).

### Requirements
1. A new SPECS AR Lens created during the official submission period.
2. Planning uses the Devpost Learn skill pack (`plan-lens`). The output is `Lens/devpost/design-brief.md`.
3. Building uses CLAD, Lens Studio, and the Lens Studio MCP.
4. The Lens installs and runs consistently in its intended Lens Studio preview.
5. Functionality matches the demo video and written description.
6. A public code repository contains the Lens Studio project files.
7. An accurate text description.
8. A public YouTube demo under three minutes showing the actual Lens working, preferably as a Lens Studio preview recording.

### Judging
**Stage One: eligibility and baseline viability (pass/fail).** Required tools and workflow, project and submission requirements, functional preview compatibility.

**Stage Two: four equally weighted criteria.**
- **Design:** Does the project deliver a complete, coherent product experience, not just a technical proof of concept?
- **Technical Implementation:** How well is the project built, and how well did it use CLAD, Lens Studio, and the Lens Studio MCP?
- **Innovation/Idea:** How creative and novel is the concept, and does it differ from existing concepts?
- **Presentation:** Does the video clearly demonstrate the project working end to end? Does the pitch communicate what problem is solved, who it's for, and why it matters? Is the presentation easy to follow?

## Product hypothesis

People learning a movement such as the bodyweight squat often rely on fixed-angle videos and can't easily see what the hips and knees do from the angle that matters. A scale 3D demonstration in their own space, viewable from any angle and controllable phase by phase, should be easier to understand.

This is a hypothesis. It has not been validated with users, and no user research is claimed.

## Design decisions

| Decision | Choice | Reason |
|---|---|---|
| Figure scale | About 60 cm tall (about 1:3), not life size | A life-size 175 cm figure only fits the SPECS view at about 3.7 m. |
| Distance | Figure 170 cm, panels 155 cm | The SPECS 27 preview measured about 32° wide x 36° tall (about 80 x 91 cm at 1.4 m). At 150 cm the feet hit the bottom of the view and the side panels were partly out of view. 170 cm is inside the learner's 1.5–2 m range. |
| Height | Stand top 42 cm below eye level; standing figure spans about 14° below to 7° above eye level | Keeps the whole figure inside the 36° vertical view from the start position. A floor-level figure would sit far below the view. |
| Layout | Cue card (left), figure, controls (right), 33 cm either side, 15 cm below eye level | An earlier near panel (70 cm away, 30 cm down) didn't fit vertically. Side-by-side panels fit the narrow view, and the side-view arms just clear the control panel. |
| Mannequin | Jointed figure authored in the scene (VirtualScene) from rounded primitives, posed by script | The Asset Library has no squat animation. Code-posed joints make stepping, pausing, and speed exact and testable. |
| Viewing | Walk around (WASD) plus Front / 35° / Side buttons on a turntable | Walking around works in the preview but is keyboard-driven. Buttons are reliable and testable. |
| Input | SIK pinch on large buttons only | Works with the mouse in Interactive Preview and with LEAF. |
| Sensing | None. Never tracks, counts, or assesses the user's body | Out of scope, and the preview can't show it. |

## Preview assumptions
- The camera starts at the world origin. y = 0 is eye height at launch, and −Z is forward.
- The SPECS 27 preview renders the SPECS view, about 32° wide x 36° tall, measured from a capture with known geometry. The composition is sized to that view.
- Comfort, real hand tracking, and following along physically are feel unproven without SPECS hardware.

## Build-time findings (30 Oct 2026)
- **Preview "Paused by Creator".** Root cause: an exception in `SquatTutorUI.onAwake`. `FlexLayout.addItems()` throws before the layout initializes when `autoDiscoverItemsOnStart` is on, and Lens Studio stops rendering after five failed frames ("Rendering failed 5 times in a row. Please fix the Lens and hit Reset"). Fixed by relying on auto-discovery. Evidence: Lens Studio log stack trace `addItems@FlexLayout.ts:642 ← registerChild@SquatTutorUI.ts`.
- **Inspector defaults.** `@input` defaults that referenced imported constants serialized as 0 (turntable yaw 0°, panels at 0 cm). They're now literals.
- **LEAF version.** Leaf 4.0.0 declares and imports `InteractionKit` 4.0, the renamed kit. This project uses `SpectaclesInteractionKit` 2.0.0, which Leaf 2.0.2 declares. Leaf 2.0.2 was installed after reading both packages' manifests and imports in an isolated download.
- **Preview helper package.** `QueryRuntimeSceneTool`, `PreviewInteractTool`, and `CaptureRuntimeViewTool` auto-install `AiPreviewAgentInspect`, which depends on `UIKit`/`InteractionKit` 4.0 and breaks this project's compile. It was moved out of the project (backup kept). Runtime checks use LEAF and preview screenshots instead.
- **Editor version.** The project file is from Lens Studio 5.24.1. A second, older install (5.23.2) wedged when it opened the project. Use 5.24.1.
