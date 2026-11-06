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
| 14 | 1 Nov 2026 documentation pass, before sign-off: verbatim interview record; hand input vs body-tracking wording; neutral "What head-worn AR contributes" heading; product name **Coach's Eye** and "reference" terminology adopted in the docs; Snap button guidance verified and the layout audited; evidence-readiness audit (Snap wording vs our interpretation, far-field read as Z depth, layout re-derived, screenshot calibration measured by pixel); documentation closeout (`UI_LAYOUT_AUDIT.md` with a reproduction script, remaining docs reviewed, revised proposed intro sentence recorded); documentation only, no Lens change | Done | `65912d8` |
| 15 | Master build and polish (1 Nov 2026), authorized by the owner: Amendment 1 approved as product direction; approved copy, intro sentence and neutral view labels implemented in code and saved scene; intro card fit fixed by a wider card; button layout chosen from four options and implemented (5.8 cm targets, 2.9 cm gaps, per-side panel heights, "PLAYBACK" caption removed); Heels red legs fade; Chest drops the hip marker; test H extended; LEAF a–h pass individually; all 15 screenshots recaptured (old set archived); docs updated; evidence folders for the external gates | Done on `feature/coach-eye` (same Lens Studio session; fresh-open not yet repeated) | `83e71bc`, `f41cae1` + docs |
| 16 | 7 Nov 2026 resume check: environment re-verified (Lens Studio 5.24.1.26100516; branch clean at `aa47b4a`; Lens source unchanged since `83e71bc`); the Lens Studio log confirms the 1 Nov LEAF passes and shows no Lens activity since; code review of `83e71bc` found no defects; 3:2 gallery crops added (`docs/screenshots/devpost/`); video target aligned to the script's 2:40. No Lens change and no tests re-run (the next meaningful run is the fresh-open check) | Done | this commit |

## Pending (external gates; each needs the owner or other people)
Nothing in the build is waiting on a decision. What remains needs people, hardware or the owner:
- **Fresh-open check** of `feature/coach-eye`: the owner quits Lens Studio normally; then reopen and re-run LEAF (`docs/evidence/fresh-open/`).
- **User test (3–5 people)** with `USER_TEST_OBSERVATION_SHEET.md`, including the **Heels rule** (2+ misreadings → owner decides before the video) and the 60% thresholds (`docs/evidence/user-test/`).
- **SPECS device test** if a device is available (`DEVICE_VALIDATION.md`, `docs/evidence/device/`).
- **Live review** on 5 Nov (`LIVE_REVIEW_PACKAGE.md`, `docs/evidence/live-review/`).
- **Rules confirmation** by the owner (automated access returns HTTP 403; `docs/evidence/rules/`).
- **Demo video** recording, then the **owner's** merge decision, upload and Devpost submission (`docs/evidence/recording/`, `docs/evidence/submission/`).

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

## Milestone 15 summary (1 Nov 2026)
- **Copy:** "SPATIAL SQUAT COMPARISON" / "Coach's Eye" / the approved sentence; "White (reference)"; `VIEW: FRONT` (Knees), `VIEW: SIDE` (Heels, Chest). Set in `SquatPhases.ts` and `SquatTutorUI.ts` defaults and in the saved scene (`introTitle`).
- **Intro fit:** the sentence wrapped to five lines on the 21 cm card (captured); the card is now 26.4 cm and it fits in four. Text was not shrunk.
- **Layout:** see `UI_LAYOUT_AUDIT.md` sections 4–5. Every button at least 2.04° in both axes, gaps at least 1.055°, Z 147.7–151.0 cm; red Chest hands 0.77° above the control panel.
- **Heels:** red thighs, knees and shins fade to about 0.16 opacity during Heels; pose and wording unchanged. Chest no longer shows the hip marker (it pointed at a body part the Chest card doesn't discuss).
- **Evidence:** compile clean; 0 Lens runtime errors; LEAF a–h pass; screenshots `01`–`15` from this build.
- **Open:** fresh-open on the branch; user test; device; live review; video; rules; submission.

## Known issues and notes
- Avoid `QueryRuntimeSceneTool`, `PreviewInteractTool`, and `CaptureRuntimeViewTool`. They reinstall `AiPreviewAgentInspect`, which is incompatible with this project.
- Lens Studio's Agents-Docs plugin deletes `Lens/.agents/` on save. Restore it with `git checkout -- Lens/.agents` before committing.
- Run LEAF scenarios one at a time.
- `SquatTutorController.startPhase` / `startAngle` / `startFault` is a capture hook. Keep it at `-1` / empty / empty for normal launch (verified in the saved scene after the 1 Nov captures).
- The Lens Studio MCP and CLAD plugin are configured in `Lens/.mcp.json` and `Lens/.claude/settings.json`, so their tools load only when Claude Code is started from `Lens/` (a session started at the repo root has neither, although Lens Studio's MCP endpoint is up).
- `.mcp.json`, `ls-live-instance.json`, `leaf_plugin_settings.json`, `.claude/settings.local.json`, `spk_debug_key.pem` and `.virtual-scene.json` are local files; never commit them.

## Next task
See *Pending* above. In order, owner first:
1. Review commits `83e71bc` (build), `f41cae1` (screenshots) and the docs commit.
2. Quit Lens Studio normally (save if prompted) so the fresh-open check can run on the branch.
3. Run the 3–5 person user test; apply the thresholds and the Heels rule.
4. Post for the 5 Nov live review.
5. Confirm the official rules by hand; record the video with `FINAL_DEMO_RECORDING_GUIDE.md`.
6. Merge, upload and submit only after the owner's explicit approval.
