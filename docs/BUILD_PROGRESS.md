# Build progress: Squat Tutor

A resumable log of the implementation. A feature counts as complete only after it's verified in the preview.

## Environment
- **Lens Studio 5.24.1.26100516** (`/Applications/Lens Studio.app`). Don't use the older 5.23.2 install (`Lens Studio 2.app`).
- Lens Studio MCP and CLAD (`ls-clad` 1.0.0) are available. Preview: SPECS 27, Interactive.
- Packages: SpectaclesInteractionKit 2.0.0, SpectaclesUIKit 2.0.0, Leaf 2.0.2, Bitmoji 3D (Leaf dependency).

## Milestones
| # | Milestone | Status | Commit |
|---|---|---|---|
| 1 | Planning brief, verified rules, project files | Done | `bc5faf6` |
| 2 | Recovery + mannequin scene, materials, scripts wired | Done | `871a2d0` |
| 3 | Preview fixed; layout fitted to the SPECS view; animation, UI, and controls verified in preview | Done | `c949e25` |
| 4 | LEAF acceptance suite (6/6 pass) | Done | `042d831` |
| 5 | Screenshots, README, docs, brief placement update | Done | this commit |
| 6 | Demo video script, Devpost copy, final polish | Next | — |

## Verified in the preview (30 Oct 2026)
- All five phases render and blend; the feet stay planted (LEAF knee checks and screenshots).
- Start, Play/Pause, Previous, Next, Replay, and Slow: LEAF c-stepping and d-playback.
- Front / 35° / Side: LEAF e-angles and screenshots.
- Phase cues: LEAF b-full-demo and f-cues, plus screenshots.
- Completion message, no auto-restart: LEAF b-full-demo and `07-completion.jpg`.
- Runtime log: no script errors (only Lens Studio's own depth-format and plugin-state warnings).

## Known issues and notes
- Avoid `QueryRuntimeSceneTool`, `PreviewInteractTool`, and `CaptureRuntimeViewTool`. They reinstall `AiPreviewAgentInspect`, which is incompatible with this project.
- Lens Studio's Agents-Docs plugin deletes `Lens/.agents/` on save. Restore it with `git checkout -- Lens/.agents` before committing.
- `SquatTutorController.startPhase` / `startAngle` is a capture hook. Keep it at `-1` / empty for normal launch (it's saved that way).
- Side view at the bottom of the squat: the fingertips reach the control panel's inner edge.
- Close-and-reopen persistence: the scene is saved and committed. Reopening from a fresh clone hasn't been tried yet.

## Next task
Write `devpost/demo-script.md` (under 3 minutes) and `devpost/submission-copy.md`. Optionally refine the completion ring into a thinner ring.
