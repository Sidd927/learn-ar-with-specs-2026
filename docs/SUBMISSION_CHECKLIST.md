# Submission checklist: Coach's Eye (`feature/coach-eye`) or Squat Tutor (`main` fallback)

> **Which version are you submitting?** `main` = Squat Tutor (`DEVPOST_SUBMISSION.md`, `DEMO_RECORDING_GUIDE.md`). `feature/coach-eye` = Coach's Eye, a spatial squat comparison experience (`FINAL_DEVPOST_SUBMISSION.md`, `FINAL_DEMO_SCRIPT.md`, `FINAL_DEMO_RECORDING_GUIDE.md`). You approved the Coach's Eye direction on 31 Oct and Amendment 1 as product direction on 1 Nov; build `83e71bc` implements it. That approval is not user testing, device validation, expert review or submission approval. The merge and the submission are still your decisions.
> **Live review prep:** `LIVE_REVIEW_PACKAGE.md`.
> **Live judging review:** Thu 5 Nov, 12:00 p.m. ET. Post in Discord `#devpost-learn-feedback` tagged "Learn AR with SPECS" and "Will It Ship" (from the public hackathon page).

Nothing has been submitted. Work through this list yourself before pressing Submit on Devpost.

## Rules source and verification status
- **Official pages:** https://learn-specs.devpost.com/rules and https://learn-specs.devpost.com/resources
- **Automated access:** every attempt (30 Oct, 31 Oct and 1 Nov 2026) returned **HTTP 403**. **I haven't read the live pages myself**, including the video requirements.
- **What's below:** the rules **you verified and supplied on 30 Oct 2026**, recorded in `RESEARCH_AND_DECISIONS.md`. Anything not in that record is listed as an **assumption** to check.

## Compliance table: requirements you verified (30 Oct 2026)

| # | Requirement | Current evidence | Status | Manual action required |
|---|---|---|---|---|
| 1 | New SPECS AR Lens created during the official submission period | Repo created 28 Oct 2026 (`7b18e08`); all Lens work 30–31 Oct 2026 (`git log`) | Evidence ready; **period start date not on record** | Confirm the submission-period dates on the live rules page |
| 2 | Planning uses the Devpost Learn skill pack | `Lens/devpost/design-brief.md`: original brief (approved 30 Oct, `bc5faf6`) plus *Amendment 1: Coach's Eye*, written from a learner-led `plan-lens` interview (Q1–Q9, completed 1 Nov 2026) with the answers recorded in the learner's words. Front matter `status: approved` (Amendment 1 approved as product direction, 1 Nov 2026). Skill installed under `Lens/.claude/skills/plan-lens` | Evidence ready | None |
| 3 | Built with CLAD, Lens Studio, and the Lens Studio MCP | Lens Studio 5.24.1; CLAD skills; MCP VirtualScene / compile / logs / preview capture / LEAF. Documented in README and `IMPLEMENTATION_NOTES.md` | Evidence ready | None |
| 4 | Lens installs and runs consistently in its intended Lens Studio preview | `main`: 7/7 LEAF incl. quit-and-reopen. `feature/coach-eye` build `83e71bc`: 8/8 LEAF run individually, 0 Lens script errors (`TEST_RESULTS.md`), same session. Quit-and-reopen **not yet repeated on the branch** | Verified in-session (branch fresh-open pending) | Quit Lens Studio normally; then reopen and re-run the 8 scenarios (`docs/evidence/fresh-open/`) |
| 5 | Functionality matches the video and written description | Draft lists only verified features; recording guide uses only existing controls | Ready; depends on the video | Record exactly per `FINAL_DEMO_RECORDING_GUIDE.md` (Coach's Eye) or `DEMO_RECORDING_GUIDE.md` (`main`); re-read the draft against the video |
| 6 | Public code repository with the Lens Studio project files | https://github.com/Sidd927/learn-ar-with-specs-2026, **PUBLIC** (checked with `gh`, 31 Oct); contains `Lens/` (`.esproj`, Assets, Packages) | Verified | Keep it public through judging |
| 7 | Accurate text description | `FINAL_DEVPOST_SUBMISSION.md` / `DEVPOST_SUBMISSION.md`: no tracking, scoring, user-research, device, injury or numeric biomechanical claims | Ready | Paste into Devpost and proofread |
| 8 | Demo video: public on YouTube, under 3 minutes, shows the Lens working (preview recording preferred) | Final edit 2:34.7, recorded in the Lens Studio preview on 7 Nov 2026 (`docs/evidence/recording/`) | **Recorded and edited; not uploaded** | Owner reviews the file → uploads to YouTube as **Public** → pastes the link |
| 9 | Deadline: 9 Nov 2026, 5:00 p.m. ET (10 Nov, 3:30 a.m. IST) | Recorded in decisions log | Noted | Submit with margin |

**Judging (as verified):** Stage One is pass/fail eligibility (tools, workflow, submission requirements, preview compatibility). Stage Two weighs four criteria equally: Design, Technical Implementation, Innovation/Idea, and Presentation.

## Assumptions to confirm on the live pages
These aren't in the verified rules record. Check each one, because the Devpost form or the rules may require them.

| Item | Why it matters | What to check |
|---|---|---|
| Exact Devpost form fields and any word limits | The draft uses common Devpost sections | Match the draft sections to the form; trim if there are limits |
| Required disclosure of AI or agent tools | The build used Claude Code with CLAD | If disclosure is required, the draft's "How we built it" and "Built with" already state it |
| Whether the video must or may be a preview recording | Ours is a Lens Studio preview recording, not through glasses | Confirm the preview recording is acceptable; the draft and video already say so |
| Team / entrant details, eligibility (age, region, employer) | Personal eligibility | Fill in your own details |
| Whether a design brief or `devpost/` folder must be linked or uploaded | The brief is at `Lens/devpost/design-brief.md` | Link it if asked |
| Third-party content or licensing rules | We use only Snap packages (SIK, UI Kit, LEAF, Bitmoji 3D); no music, fonts, or external art | Confirm nothing else is needed |
| Thumbnail or image requirements | Screenshots are portrait 1399x1590 JPEG | Landscape 3:2 crops are ready in `docs/screenshots/devpost/` (lead: `13-mistake-knees-front-3x2.jpg`); check the thumbnail preview on the form |

## Devpost form fields: what to paste
| Field (typical) | Source |
|---|---|
| Project name | Coach's Eye version: "Coach's Eye" (descriptor: "A spatial squat comparison experience"). `main` version: "Squat Tutor" |
| Tagline | `FINAL_DEVPOST_SUBMISSION.md` (Coach's Eye) or `DEVPOST_SUBMISSION.md` (`main`) → Tagline |
| About / story (problem, what it does, how we built it, challenges, what's next) | The same file's sections of the same names |
| Built with | The same file → Built with |
| Try it out / repo link | https://github.com/Sidd927/learn-ar-with-specs-2026 |
| Video demo link | **Your YouTube URL** (after upload) |
| Image gallery | Coach's Eye: upload the 3:2 crops in `docs/screenshots/devpost/` first (`13` as the lead/thumbnail, then `15`, `14`, `04`), then the originals `01` and `11`. Portrait originals: `13-mistake-knees-front.jpg`, `15-mistake-chest-side.jpg`, `14-mistake-heels-side.jpg`, `01-hero-intro.jpg`, `04-phase3-bottom-position.jpg`, `11-completion.jpg`. Main: `01`, `04`, `10`, `08`, `07`, `11` (the `main` versions live on the `main` branch) |

## Claims audit (verified against the code and tests)
- [x] No body tracking, rep counting, form assessment, or scoring is claimed.
- [x] The hypothesis is labelled as unvalidated; no user research is claimed.
- [x] No SPECS device testing is claimed; `DEVICE_VALIDATION.md` is marked "not run".
- [x] The video is described as a Lens Studio preview recording.
- [x] Test numbers match `TEST_RESULTS.md` (`main` 7/7; branch build `83e71bc` 8/8; about 12 s demo; slow ratio 2.01; 0/35/90°).
- [x] Button sizes are described as checked by geometry and preview captures, not by device testing.
- [x] Screenshots in the gallery are the final set from `83e71bc` (`docs/screenshots/README.md`).
- [x] Every demo action (Start, Prev/Next, Slow, Play/Pause, Replay, Front/35°/Side, Knees/Heels/Chest and return) exists and is exercised by LEAF.
- [x] Coach's Eye: model measurements (3.1/7.7 cm and so on) are kept out of the README, Devpost draft and narration; they appear only in `TEST_RESULTS.md` and `BIOMECHANICAL_VALIDATION.md`, labelled as model geometry.
- [x] Coach's Eye: no injury, diagnosis, weakness or "correct for everyone" claims; patterns are called common patterns, exaggerated for clarity.
- [x] User validation is marked NOT CONDUCTED.

## Coach's Eye process tasks
These belong here rather than in the design brief, by the learner's decision on 1 Nov 2026. Each external gate has a folder under `docs/evidence/` with a checklist and a place for the results.

Done (1 Nov 2026):
- [x] Amendment 1 approved as product direction (by the owner, in the master build brief).
- [x] Approved copy, intro sentence and neutral view labels implemented; intro fit fixed (`83e71bc`).
- [x] Button size and spacing decided and implemented (`UI_LAYOUT_AUDIT.md`).
- [x] Heels visibility improved without new claims (red legs fade); Heels kept.
- [x] Compile, logs, LEAF a–h individually, screenshots recaptured.

Open (external gates; none can be done by the agent alone):
- [ ] **Fresh-open check** on `feature/coach-eye`: you quit Lens Studio normally (save if prompted); then reopen and run all 8 LEAF scenarios one at a time (`docs/evidence/fresh-open/`).
- [ ] **User test** with 3–5 people (`USER_TEST_OBSERVATION_SHEET.md`; `docs/evidence/user-test/`). Apply the 60% thresholds and the Heels rule.
- [ ] **Heels decision**, only if 2+ participants misread Heels: you choose to improve it or remove it before the video (`docs/evidence/heels-decision/`).
- [ ] **Device test** on SPECS, if a device is available (`DEVICE_VALIDATION.md`; `docs/evidence/device/`). Otherwise keep "preview only" in every public text.
- [ ] **Live review**, Thu 5 Nov, 12:00 p.m. ET (`LIVE_REVIEW_PACKAGE.md`; `docs/evidence/live-review/`).
- [ ] **Rules confirmation**: read the live rules and resources pages yourself and tick the assumptions table (`docs/evidence/rules/`).
- [ ] **Recording**: record the demo video (`FINAL_DEMO_RECORDING_GUIDE.md`) after the user test and any Heels decision (`docs/evidence/recording/`).
- [ ] **Merge and submission**: merge, upload the video as Public, and submit on Devpost only with your explicit approval (`docs/evidence/submission/`).

## Final steps (yours)
1. Open the live rules and resources pages; tick off the assumptions table above.
2. Record the video with `FINAL_DEMO_RECORDING_GUIDE.md` (Coach's Eye) or `DEMO_RECORDING_GUIDE.md` (`main`) and check it against its checklist.
3. Upload to YouTube as **Public** and copy the link.
4. Paste the link into the Devpost form (and, optionally, the submission draft).
5. Paste the draft text, add the screenshots, and proofread.
6. Confirm the repo is still public. Submit before the deadline.
