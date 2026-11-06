# Submission QA: Coach's Eye (one focused pass, 7 Nov 2026)

Checked `DEVPOST_SUBMISSION_FINAL.md` and `DEVPOST_MEDIA_CHECKLIST.md` against the repository evidence. No product, test or video work was repeated.

## Accuracy (every claim traced)
| Claim in the submission | Source |
|---|---|
| Five phases, names, one cue and one highlight each | `Lens/Assets/Scripts/SquatPhases.ts`; LEAF f-cues; film 0:29–0:41 |
| Knees → Front, Heels → Side, Chest → Side, with the card's Red/White lines | Screenshots `13`–`15`; LEAF h-mistake-compare; design brief *UI copy* |
| Red legs fade for Heels | Build `83e71bc`; `docs/IMPLEMENTATION_NOTES.md` |
| Figure about 60 cm at 1.7 m; FOV about 32° × 36°; buttons 5.8 cm / 2.9 cm, about 2° / just over 1° | `docs/RESEARCH_AND_DECISIONS.md`; `docs/UI_LAYOUT_AUDIT.md` |
| Two-bone leg IK; red rig inset inside the white; MeshBuilder rings; SIK/UIKit 2.0; LEAF 2.0.2 | `docs/IMPLEMENTATION_NOTES.md`; `docs/BUILD_PROGRESS.md` |
| 8 LEAF scenarios pass; fresh open 7 Nov: compile ok, no script errors | `docs/evidence/fresh-open/README.md`, `leaf-a-h.log` |
| plan-lens original brief (30 Oct, `bc5faf6`) and nine-question Amendment 1 interview (31 Oct – 1 Nov) | `Lens/devpost/design-brief.md` |
| Concept change after a review found overlap with phone 3D viewers | `docs/STRATEGIC_HACKATHON_ANALYSIS.md`; brief *Status and traceability* |
| "Paused by Creator" root cause; preview helper package broke the compile | `docs/RESEARCH_AND_DECISIONS.md` *Build-time findings* |
| Preview gestures: first click only moves the cursor; screenshot latency; no MCP video recording; screensaver interruption | Observed in the 7 Nov sessions (`docs/evidence/fresh-open/`, `exports/demo_video/README.md`) |
| `.agents` deleted on every project open | Lens Studio log `[AgentsDocs] Removed legacy .agents/ directory` (`docs/evidence/fresh-open/README.md`) |
| Progress dots keep the earlier phase during a comparison | `docs/evidence/fresh-open/README.md` (observation, not fixed) |
| Reach (IK) LEAF scenario not built | Design brief, *Build notes for CLAD*, correction of 31 Oct |

Corrected during this pass: a sentence about feeling like quitting, which wasn't on record, was replaced with what actually happened. A wrong "two days in" became "the day after it was verified". Imprecise geometry ("heels move forward and back") was corrected to the heel lift and torso lean being in the side-on plane.

## Completeness
All 25 form fields have an answer or explicit guidance. Fields needing the owner: 7 (video URL after upload), 8, 10, 11–13, 17, and confirmation of 20, 23, 24 and 25.

## Character limits
| Field | Limit | Length |
|---|---|---|
| Project name | 60 | 11 |
| Elevator pitch | 200 | 176 |
| Built with | 25 tags | 11 tags |
| About the project | none shown | 7,845 characters (about 6 min to read) |
| Technology requirement (15) | none shown | 2,056 characters |
| Where you got stuck (21) | none shown | 1,490 characters |
| One thing to fix (22) | none shown | 1,133 characters |

If the live form shows a limit on 15, 21 or 22, trim from the end of each paragraph; the first sentence of each carries the answer.

## Technology requirement (field 15)
It names the Devpost Learn skill pack (plan-lens), CLAD, the Lens Studio MCP, Lens Studio and SPECS. It says what each did: planning, building and verifying, hosting and running, target platform. It separates the owner's decisions from CLAD's implementation, and doesn't claim CLAD built everything on its own.

## Responsible claims (checked)
- **Never claimed:** body tracking, rep counting, assessment, coaching of the user, medical or injury-prevention benefit, user testing, device testing, expert review, or learning gains.
- **Wording:** the white figure is always "the reference"; the patterns are "common", "illustrative" and "exaggerated", never a complete list.
- **Phone AR:** "phone AR can place 3D figures too". The glasses' contribution is framed as intended and untested.
- **Future:** limited to the approved sentence about other movements.
- **Banned words:** none in the About text (searched: revolutionary, world-first, game-changing, seamless, unlock, cutting-edge, perfect form, correct squat, injury prevention, proven, validated).

## Media readiness
- **Video:** exists and is verified (2:34.7, 1080p30, H.264/AAC, −15 LUFS). **Not uploaded; the URL is pending.** Not yet watched with sound.
- **Gallery:** 8 genuine 3:2 images, with provenance in `docs/screenshots/devpost/README.md`.
- **Thumbnail and subtitles:** ready.

## Risks that could affect the submission
1. **The repository's default branch is `main` (Squat Tutor, no comparisons), and it doesn't match the video.** Mitigated by linking `/tree/feature/coach-eye` in fields 5 and 14. Fully resolved only by the owner's decision on `main` (`RELEASE_CLOSEOUT.md`).
2. **The video isn't public yet.** Field 7 is required.
3. **The rules were never read automatically** (HTTP 403). The owner confirmed them on 30 Oct. Re-check the live page for the video and repository requirements before submitting.
4. **The dropdown options weren't visible.** Choose the closest option to each recommendation, or share screenshots of the expanded lists.
5. **Deadline:** 9 Nov 2026, 5:00 p.m. ET (10 Nov, 3:30 a.m. IST).
