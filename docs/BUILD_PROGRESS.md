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
| 3 | Preview fixed; layout fitted to the SPECS view | Done | `c949e25` |
| 4 | LEAF acceptance suite | Done | `042d831` |
| 5 | README, screenshots, docs | Done | `96d8df7` |
| 6 | Visual polish: thin ring cues, hand clearance, distinct mid-poses, disabled states, edge-case test (7/7 pass) | Done | `693f863` |
| 7 | Refreshed screenshots | Done | `188adfa` |
| 8 | Demo script, Devpost draft, device checklist, docs refresh | Done | this commit |
| 9 | Fresh-open test (quit and reopen Lens Studio) | Pending: needs one manual quit | — |

## Fresh-open test
- **Before:** the project was saved and committed (`188adfa`), and the hook defaults were saved as `startPhase -1`, `startAngle ""`.
- **Quit attempt:** a scripted standard quit (`tell application "Lens Studio" to quit`) timed out ("AppleEvent timed out"). Lens Studio kept running and responding, which is consistent with a confirmation dialog waiting for a person.
- **Next:** quit Lens Studio by hand, reopen `Lens/Lens.esproj` in 5.24.1, then verify compile, preview, and LEAF.

## Known issues and notes
- Avoid `QueryRuntimeSceneTool`, `PreviewInteractTool`, and `CaptureRuntimeViewTool`. They reinstall `AiPreviewAgentInspect`, which is incompatible with this project.
- Lens Studio's Agents-Docs plugin deletes `Lens/.agents/` on save. Restore it with `git checkout -- Lens/.agents` before committing.
- Run LEAF scenarios one at a time.
- `SquatTutorController.startPhase` / `startAngle` is a capture hook. Keep it at `-1` / empty for normal launch.

## Next task
Complete the fresh-open test. Then record the demo video using `docs/DEMO_SCRIPT.md`, and submit using `docs/DEVPOST_SUBMISSION.md` (after the owner reviews it).
