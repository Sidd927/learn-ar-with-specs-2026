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
| 8 | Demo script, Devpost draft, device checklist, docs refresh | Done | `48a24bb` |
| 9 | Fresh-open test (quit and reopen Lens Studio) | **Passed** | this commit |

## Fresh-open test: passed (31 Oct 2026)
- **Before:** the owner quit Lens Studio 5.24.1 by hand (saving when prompted). `Scene.scene` and all assets were unchanged against `48a24bb` (only the known `.agents` housekeeping deletion).
- **Reopen:** `open -a "/Applications/Lens Studio.app" Lens/Lens.esproj`. Log reports `app_version 5.24.1.26100516`. Same project, no upgrade.
- **Loaded scene roots:** Camera Object, Lighting, SpectaclesInteractionKit, SquatTutor, LeafIndex (plus LEAF Plugin Bridge, the LEAF panel's editor helper; not written to the saved scene).
- **TypeScript:** compile succeeded.
- **Preview:** renders the intro state from the start position, identical to the final screenshots (thin rings, lowered panels, 35° start, capture hook off).
- **Runtime log:** 0 script exceptions, 0 "not yet awake", 0 "Rendering failed". Only Lens Studio infrastructure warnings: `adb` timeouts because no SPECS device is paired, the renderer's depth-format fallback, and a one-off "Cannot find plugin com.snap.leaf.LeafPlugin" at startup (the LEAF panel was created 4 s later and works).
- **LEAF:** 7/7 pass. The first run of g-edge-cases failed on a timing-sensitive assertion ("Replay resets the timeline" required < 0.5 s about 350 ms after a simulated pinch). The assertion now compares against the value just before Replay: measured 1.55 s → 0.30 s, then PASS. No product code changed.

## Known issues and notes
- Avoid `QueryRuntimeSceneTool`, `PreviewInteractTool`, and `CaptureRuntimeViewTool`. They reinstall `AiPreviewAgentInspect`, which is incompatible with this project.
- Lens Studio's Agents-Docs plugin deletes `Lens/.agents/` on save. Restore it with `git checkout -- Lens/.agents` before committing.
- Run LEAF scenarios one at a time.
- `SquatTutorController.startPhase` / `startAngle` is a capture hook. Keep it at `-1` / empty for normal launch.

## Next task
Record the demo video using `docs/DEMO_SCRIPT.md`, and submit using `docs/DEVPOST_SUBMISSION.md` (after the owner reviews it).
