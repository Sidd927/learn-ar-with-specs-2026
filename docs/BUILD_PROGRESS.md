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
| 9 | Fresh-open test (quit and reopen Lens Studio) | **Passed** | `905a938` |
| 10 | Submission package: recording guide, corrected demo timing, submission checklist and compliance table | Done | `d1d0473` |
| 11 | Strategic reassessment + Coach's Eye prototype (mistake comparison), 8/8 LEAF | Done on branch `feature/coach-eye` | `6c4e379`, `725b6a2` |
| 12 | Coach's Eye direction approved by the owner (31 Oct). Comprehension pass, measurement audit and fixes, validation plan, live review package, docs. Final build 8/8 LEAF | Done on `feature/coach-eye`; **merge awaits owner approval** | `0029122`, `643a8bb`, `78381e9`, `2201d21` + docs |

## Fresh-open test: passed (31 Oct 2026)
- **Before:** the owner quit Lens Studio 5.24.1 by hand (saving when prompted). `Scene.scene` and all assets were unchanged against `48a24bb` (only the known `.agents` housekeeping deletion).
- **Reopen:** `open -a "/Applications/Lens Studio.app" Lens/Lens.esproj`. Log reports `app_version 5.24.1.26100516`. Same project, no upgrade.
- **Loaded scene roots:** Camera Object, Lighting, SpectaclesInteractionKit, SquatTutor, LeafIndex (plus LEAF Plugin Bridge, the LEAF panel's editor helper; not written to the saved scene).
- **TypeScript:** compile succeeded.
- **Preview:** renders the intro state from the start position, identical to the final screenshots (thin rings, lowered panels, 35° start, capture hook off).
- **Runtime log:** 0 script exceptions, 0 "not yet awake", 0 "Rendering failed". Only Lens Studio infrastructure warnings: `adb` timeouts because no SPECS device is paired, the renderer's depth-format fallback, and a one-off "Cannot find plugin com.snap.leaf.LeafPlugin" at startup (the LEAF panel was created 4 s later and works).
- **LEAF:** 7/7 pass. The first run of g-edge-cases failed on a timing-sensitive assertion ("Replay resets the timeline" required < 0.5 s about 350 ms after a simulated pinch). The assertion now compares against the value just before Replay: measured 1.55 s → 0.30 s, then PASS. No product code changed.

## Milestone 12 summary (31 Oct 2026)
- **Comprehension (P0):**
  - Intro introduces the comparison.
  - Completion card points to Knees / Heels / Chest.
  - Neutral "compare common patterns" wording.
  - While comparing: "Pinch again to return" and "Exaggerated for clarity".
- **Instructional clarity (P1):**
  - View label says why the view was chosen.
  - White line is labelled "White (target)".
- **Audit fixes:**
  - The chest pattern no longer lowers the arms.
  - The heels card says "Seen from the side or rear" (trainer checklists differ).
  - The demo script no longer says the knees "shoot forward".
- **Evidence:** 8/8 LEAF on `2201d21`; 0 script errors this milestone; 14 fresh screenshots.
- **Open:**
  - The heels comparison reads weakly.
  - No user sessions.
  - No device or coach review.
  - Fresh-open test not repeated on the branch.

## Known issues and notes
- Avoid `QueryRuntimeSceneTool`, `PreviewInteractTool`, and `CaptureRuntimeViewTool`. They reinstall `AiPreviewAgentInspect`, which is incompatible with this project.
- Lens Studio's Agents-Docs plugin deletes `Lens/.agents/` on save. Restore it with `git checkout -- Lens/.agents` before committing.
- Run LEAF scenarios one at a time.
- `SquatTutorController.startPhase` / `startAngle` / `startFault` is a capture hook. Keep it at `-1` / empty / empty for normal launch.

## Next task
Owner:
1. Read and sign off *Amendment 1* in the brief (yes/no).
2. Optionally run the five-person test (`USER_VALIDATION_PLAN.md`).
3. Post for the 5 Nov live review (`LIVE_REVIEW_PACKAGE.md`).
4. Decide whether to merge `feature/coach-eye`.
5. Quit and reopen Lens Studio on the branch, so the fresh-open test can be repeated.
6. Record with `FINAL_DEMO_RECORDING_GUIDE.md`; upload and submit only after explicit approval.
