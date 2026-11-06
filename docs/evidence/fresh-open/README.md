# Gate: fresh-open check on `feature/coach-eye`

**Status: DONE, 7 Nov 2026 (IST). Passed.** The owner quit Lens Studio normally; the project was reopened from disk and checked in a new Lens Studio session. No product code, scene or package file changed.

Why: a fresh open shows that the saved project (scene, scripts, packages) loads and runs on its own, not just in the editing session.

## Steps
1. **Owner:** in Lens Studio, File → Save if prompted, then quit Lens Studio normally (Cmd+Q). Don't force quit.
2. Check the working tree: `git status` shows no unexpected changes (only `Lens/.agents` may be deleted by Lens Studio's plugin; restore it with `git checkout -- Lens/.agents`).
3. Reopen: `open -a "/Applications/Lens Studio.app" Lens/Lens.esproj`. Confirm Lens Studio **5.24.1** and no package upgrade prompts accepted.
4. Preview: SPECS 27, Interactive, Reset. The first screen matches `docs/screenshots/01-hero-intro.jpg`.
5. Recompile TypeScript; collect the runtime log (no Lens script errors).
6. Run LEAF `a-placement` … `h-mistake-compare` **one at a time**. A scenario that never starts is **not** a pass; retry once and record both attempts.

## Record here
| Item | Result |
|---|---|
| Date and time | 7 Nov 2026. Lens Studio opened 01:24:34 IST; LEAF 01:26–01:29; journey captures 01:29–01:37 |
| Commit (`git rev-parse --short HEAD`) | `4798f27` (build `83e71bc` plus docs) |
| Lens Studio version from the log | `Application Version: 5.24.1.26100516 Public` (`/Applications/Lens Studio.app`). No upgrade or migration prompt in the log. |
| Compile | `RecompileTypeScriptTool`: succeeded |
| Runtime log errors | 0 Lens script errors or exceptions. See "Log" below. |
| LEAF a–h (each) | 8 run, 8 passed, each on the first attempt. Table below. |
| First screen matches `01` | Yes (`00-first-screen.jpg`) |
| Notes | Lens Studio's AgentsDocs plugin deleted `Lens/.agents` (see below); restored from git. Project files byte-identical before the open, after it and after all runs. |

## Before opening
- `git status`: clean apart from the four `Lens/.agents/skills/plan-lens/*` files, already deleted on disk. Restored with `git checkout -- Lens/.agents` (owner approved).
- SHA-1 of every file under `Lens/Assets`, `Lens/Packages` and `Lens/Lens.esproj` (85 files) recorded. They matched after the open and again after all runs.
- Saved scene capture hook (`Assets/Scene.scene`, `SquatTutorController` on `Systems`): `startPhase -1`, `startAngle ""`, `startFault ""`. That's normal launch.

## After opening
- The log shows the cause of the `.agents` deletion: `[AgentsDocs] Removed legacy .agents/ directory` (Agents-Docs plugin 5.24.0). It runs on every project open, so `Lens/.agents` shows as deleted again while Lens Studio is open. The same plugin rewrites `.mcp.json`, `.claude/settings.local.json`, `AGENTS.md` and `Support/editor.d.ts`; none of these showed as modified in git.
- MCP: Lens Studio MCP server started on port 50040; every tool call in this session succeeded. QueryRuntimeSceneTool, PreviewInteractTool and CaptureRuntimeViewTool were not used.
- Live editor scene (read via the Editor API): roots Camera Object, Lighting, SpectaclesInteractionKit, SquatTutor, LeafIndex, LEAF Plugin Bridge. Capture hook still `-1` / `""` / `""`.
- Preview: SPECS 27, Interactive (Plane scene), camera Front.

## LEAF (preview, one at a time, order a → h; LEAF resets the Lens before each)
LEAF 2.0.2 in the project, LEAF plugin 5.23.0. Values from the `[SquatTutorTest]` log lines; full extract in `leaf-a-h.log`.

| ID | Measured | Time | Result |
|---|---|---|---|
| a-placement | Root (0, −42, −170), 170.0 cm; yaw 35.0°; root moved 0.000 cm during animation | 3.6 s | PASS |
| b-full-demo | Phases 1-2-3-4-5 in order; completed in 12.16 s | 14.3 s | PASS |
| c-stepping | Knee 79.6 / 123.3 / 54.8 / 5.5° = targets, forwards and backwards; ends hold | 12.5 s | PASS |
| d-playback | Paused knee 75.53° → 75.53°; 1x 12.29 s vs 0.5x 24.60 s, ratio 2.00 | 41.8 s | PASS |
| e-angles | Front 0.0°, Angled 35.0°, Side 90.0°, Front 0.0°; root moved 0.000 cm each time | 5.5 s | PASS |
| f-cues | Foot outlines / knee arrows / hip marker / knee arrows / completion ring | 5.3 s | PASS |
| g-edge-cases | Paused at 2.22 s (mid-transition); Replay 1.45 s → 0.22 s | 9.9 s | PASS |
| h-mistake-compare | Knees red 3.1 vs white 7.7 cm; heels red ankle +4.0 cm; chest red head +3.8 cm; "3 patterns, 5 exits, Slow and angle keep it open". Includes the Heels-only leg fade and its restore on every exit. | 17.7 s | PASS |

The h values are internal model-geometry checks on an exaggerated 1:3 mannequin, not biomechanical measurements.

## Journey captures (manual, same session)
Driven in the Preview panel with `InjectPreviewGesture` (mouse press and release on the real buttons, through SIK). The first press at a new spot only moves the cursor there, so each new button was pressed twice. Screenshots via `CapturePanelScreenshotTool` (Preview panel).

| Check | Result | Evidence |
|---|---|---|
| Intro: title, approved sentence, disclaimer, Start | Pass, same as `docs/screenshots/01-hero-intro.jpg` | `00-first-screen.jpg` |
| Five phases: title, cue text, dots, body cue | Pass: Starting Stance / Controlled Descent / Bottom Position / Rising Up / Standing Finish, with foot outlines, knee arrows, hip marker, knee arrows, completion ring. Prev dimmed on 1, Next dimmed on 5. | `01`–`05` |
| Completion | Pass: "COMPLETE / Squat complete / Try Knees, Heels or Chest below to compare a common pattern, or Replay.", ring, Play label, Next dimmed | `06-completion.jpg`, `15` |
| View changes | Pass: Front and Side turn the stage; the selected toggle follows | `07`, `08` |
| Knees | Pass: turns to Front, Bottom Position, paused; red knees inside the white | `09-compare-knees.jpg` |
| Heels | Pass: turns to Side; red thigh and shin faded; raised red heel visible | `10-compare-heels.jpg` |
| Chest | Pass: Side; red torso and head tip forward, arms follow | `11-compare-chest.jpg` |
| Exit (same button) | Pass: Phase 3 card, row label and disclaimer restored, overlay gone, still paused | `12-compare-exit-restored.jpg` |
| Heels fade restore | Pass: Heels on → off → Knees shows full-strength red legs, same as before Heels | `13` vs `09` |
| Replay | Pass: from a comparison and from completion, playback restarts and runs to completion. Phase 1 itself isn't in a capture (screenshot latency is a few seconds); "Replay → phase 1" rests on LEAF g and h. | `14`, `16` |

**Observation (cosmetic, not a regression):** during a comparison the five progress dots keep the phase shown before it opened: all five lit when opened from completion (`09`–`11`), three lit when opened from Phase 3 (`13`). The card text shows the comparison and the pose is the Bottom Position. Cause: `SquatTutorUI.showFault()` updates the label, title and cue text but not the dots. It's the same in build `83e71bc`; no change was made here.

## Log (whole session, `LensStudioLog-2026-11-07-01-24-34-848-d0d8c.txt`)
- **Errors (E/F): 1.** `Cannot find plugin com.snap.leaf.LeafPlugin` at 01:24:37, before plugins finished loading (01:24:40). The LEAF plugin then loaded and ran all eight scenarios. Infrastructure, no effect.
- **Lens script errors or exceptions: 0.**
- **Warnings, all infrastructure:** adb timeouts (no Spectacles connected), renderer depth-format fallback, SceneMaterialBatcher "batching retries exhausted", LEAF plugin "Skipping plugin state save" and a deprecated `workspaces` API inside the LEAF plugin, client-version and Spectacles-compatibility network checks at startup.
- Info only: UIKit "automatically converted to a toggle" for the seven toggle buttons; SIK prints its internal "0.18.0".

## Not covered here
SPECS hardware, real hand-tracking pinch, see-through readability and user sessions. See `DEVICE_VALIDATION.md` and `USER_VALIDATION_PLAN.md`.
