# Build progress: Coach's Eye (originally Squat Tutor)

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
| 12 | Coach's Eye direction approved by the owner (31 Oct). Comprehension pass, internal model-geometry check and fixes, validation plan, live review package, docs. Final build 8/8 LEAF | Done on `feature/coach-eye` | `0029122`, `643a8bb`, `78381e9`, `2201d21` + docs |
| 13 | Pre-merge review: brief corrected (Amendment 1 rewritten as a draft, visible corrections in the original), test H extended to every pattern and exit (pass), wording aligned; learner-led `plan-lens` interview (Q1–Q9) completed 1 Nov 2026 and recorded in Amendment 1 | Done (committed 31 Oct – 1 Nov 2026) | `744be9d`, `1d1bd5a`, `5328a4c`, `126663b`, `67a4622`, `df73fa5` |
| 14 | 1 Nov 2026 documentation pass, before sign-off: verbatim interview record; hand input vs body-tracking wording; neutral "What head-worn AR contributes" heading; product name **Coach's Eye** and "reference" terminology adopted in the docs; Snap button guidance verified and the layout audited; evidence-readiness audit (Snap wording vs our interpretation, far-field read as Z depth, layout re-derived, screenshot calibration measured by pixel); documentation closeout (`UI_LAYOUT_AUDIT.md` with a reproduction script, remaining docs reviewed, revised proposed intro sentence recorded); documentation only, no Lens change | **In the working tree, not committed**; awaiting the owner's review | — |

## Pending (not started; each needs the owner's decision or approval)
- **Sign-off** of Amendment 1.
- **Approved in principle, not implemented:**
  - product name "Coach's Eye";
  - descriptor "A spatial squat comparison experience";
  - intro label "SPATIAL SQUAT COMPARISON";
  - intro title "Coach's Eye";
  - the three "White (reference): …" card lines;
  - the principle that the white figure is called the reference.

  Implementing it later needs the owner's go-ahead. The saved scene value of `introTitle` overrides the TypeScript default, so both must change. After that: recapture the screenshots, update test H's expected string, and re-run all 8 LEAF scenarios.
- **Proposed, awaiting the owner's approval:** the exact intro sentence "Watch a squat in five phases. Then compare three illustrative patterns with the reference, each from a view chosen to show its difference." (estimated to need more room than today's intro row; see `UI_LAYOUT_AUDIT.md`).
- **Undecided:**
  - view labels: neutral `VIEW: FRONT` / `VIEW: SIDE` or explanatory labels (options in the design brief);
  - whether to implement the proposed button layout and sizing. The current controls are about 1.2° tall with 0.25° gaps, so they do **not** meet the 2° size and 1° spacing we use as a conservative reading of Snap's guidance. The proposal is not approved or validated; see `UI_LAYOUT_AUDIT.md`.
- **Process:** fresh-open test on the branch; user test (3–5 people); live review (5 Nov); demo video; merge decision.

## Fresh-open test: passed on the `main` build (31 Oct 2026; not yet repeated on `feature/coach-eye`)
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
- **Fixes from the internal model-geometry check:**
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
See *Pending* above. In order, owner first:
1. Review the uncommitted documentation pass (row 14) and sign off *Amendment 1* (yes/no).
2. Approve or revise the proposed intro sentence; decide the view-label wording and the button layout (both undecided); decide whether to implement the approved copy before the user test.
3. Quit Lens Studio on the branch, so the fresh-open test can be repeated.
4. Run the 3–5 person user test (`USER_TEST_OBSERVATION_SHEET.md`).
5. Post for the 5 Nov live review (`LIVE_REVIEW_PACKAGE.md`).
6. Merge decision; record with `FINAL_DEMO_RECORDING_GUIDE.md`; upload and submit only after explicit approval.
