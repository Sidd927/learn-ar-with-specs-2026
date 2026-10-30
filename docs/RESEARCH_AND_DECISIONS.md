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
| Figure scale | About 60 cm tall (about 1:3), not life size | Snap's usable SPECS view is about 75 cm tall at 160 cm. A 175 cm figure would only fit whole at about 3.7 m, past the 0.6–1.6 m comfort range. |
| Distance | 150 cm | Inside the learner's 1.5–2 m range and Snap's comfort range. Usable area there is about 105 x 70 cm. |
| Height | Head just below eye level, feet about 62 cm below, on a stand | Content a little below eye level is most comfortable. A floor-level 60 cm figure at 150 cm would sit 47° below the eye line, out of view. |
| Layout | Cue card, figure, and controls side by side in one plane | The earlier near panel (70 cm away, 30 cm down) pushed the vertical span to about 28°, past the roughly 26° usable height. |
| Mannequin | Jointed figure built at runtime from rounded primitives, posed by script | The Asset Library has no squat animation. Code-posed joints make stepping, pausing, and speed exact and testable. |
| Viewing | Walk around (WASD) plus Front / 45° / Side buttons on a turntable | Walking around works in the preview but is keyboard-driven. Buttons are reliable and testable. |
| Input | SIK pinch on large buttons only | Works with the mouse in Interactive Preview and with LEAF. |
| Sensing | None. Never tracks, counts, or assesses the user's body | Out of scope, and the preview can't show it. |

## Preview assumptions
- The camera starts at the world origin. y = 0 is eye height at launch, and −Z is forward.
- The laptop preview's view is wider than SPECS. The composition is sized to Snap's usable-area numbers, not to the preview frame.
- Comfort, real hand tracking, and following along physically are feel unproven without SPECS hardware.
