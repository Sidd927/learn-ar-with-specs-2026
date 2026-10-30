# Build progress: Squat Tutor

A resumable log of the implementation. A feature counts as complete only after it's verified in the preview.

## Environment
- **Lens Studio 5.24.1.26100516** (`/Applications/Lens Studio.app`). The project file was saved with 5.24.1. Don't open it with the older 5.23.2 install (`Lens Studio 2.app`).
- Lens Studio MCP is connected, and the CLAD plugin `ls-clad` 1.0.0 is installed.
- Project: `Lens/Lens.esproj`, target Specs. Preview device: SPECS 27, Interactive input.

## Milestones
| # | Milestone | Status | Commit |
|---|---|---|---|
| 1 | Planning brief, verified rules, project files | Done, pushed | `bc5faf6` |
| 2 | Recovery + mannequin scene, materials, scripts wired | Done (scene saved, runtime clean) | this commit |
| 3 | Animation and playback verified in preview | Next | — |
| 4 | UI and interactions verified | — | — |
| 5 | LEAF tests | — | — |
| 6 | Docs, screenshots, demo script | — | — |

## Recovery (30 Oct 2026)
- **Root cause.** The first call to `QueryRuntimeSceneTool` auto-installed `AiPreviewAgentInspect.lspkg`, which pulled in `Icons.lspkg`, `Motion.lspkg`, and the `Plugins/…/IconAtlas` editor plugin. The helper depends on `InteractionKit` and `UIKit` 4.0.0, which aren't in this project (it uses `SpectaclesInteractionKit` and `SpectaclesUIKit`), so its example scripts failed to compile. Running in the older 5.23.2 editor, the failed compile task left the asset system stuck: no saves, no scene writes.
- **Package changes.** The four items were unreferenced by the scene, the project file, and our scripts. They were moved, not deleted, to `~/Projects/squat-tutor-backups/removed-preview-helper/` so they can be restored.
- **Backup.** A full pre-recovery archive is at `~/Projects/squat-tutor-backups/recovery-20261030-225953.tgz`.
- **Editor.** Reopened in 5.24.1. The project saves successfully, and TypeScript compiles with 0 errors.
- **Materials.** All seven `.mat` files from the stuck session were empty stubs (`PassesInfo: []`), which rendered magenta. They were recreated under the same names (SimplePBR for the body, joints, and stand; Unlit for cues), and all 38 renderers were rewired.
- **Lens Studio housekeeping on open.** These are kept: new `.gitattributes` asset types, an `ls-live-instance.json` ignore in the managed `.gitignore` block, `AI_MUTATED` in `Lens.esproj`, and a refreshed `Echopark.hdr.meta`. It also removed `Lens/.agents/skills/plan-lens`, which was restored from Git.

## Current state
- **Scene** (saved): `SquatTutor > Stage (0,-62,-150) > Stand | Turntable (yaw 35°) > Mannequin > Pelvis > Spine/Neck/Head, Shoulders > Elbows, Hips > Knees > Ankles > Feet`, plus the `Cues` groups. `SquatTutor > SquatTutorUI` and `SquatTutor > Systems` (SquatPlayer, Turntable, CueIndicators, SquatTutorController).
- **Wiring:** all 23 script inputs are set with VirtualScene (component-typed inputs use component IDs).
- **Runtime:** a refresh shows no script errors and no missing inputs.
- **Generator:** `tools/generate_mannequin_scene.py` reproduces the hierarchy from asset paths.

## Known issues
- **The preview panel won't capture.** `CapturePanelScreenshotTool` times out, and the preview keeps returning to "Preview is Paused". Scene-view captures work.
- **Don't use `QueryRuntimeSceneTool`, `PreviewInteractTool`, or `CaptureRuntimeViewTool`.** They reinstall the incompatible helper package.
- **Lens Studio isn't signed in** in this session. Asset Library installs (LEAF) need sign-in.

## Next task
Get the preview rendering. Then verify the mannequin pose and animation through all five phases (capture at several timestamps), then the UI layout.
