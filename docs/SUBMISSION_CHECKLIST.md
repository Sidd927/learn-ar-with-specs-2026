# Submission checklist: Squat Tutor (applies to either version)

> **Which version are you submitting?** `main` = Squat Tutor (`DEVPOST_SUBMISSION.md`, `DEMO_RECORDING_GUIDE.md`). `feature/coach-eye` = Squat Tutor: Coach's Eye (`FINAL_DEVPOST_SUBMISSION.md`, `FINAL_DEMO_SCRIPT.md`, `FINAL_DEMO_RECORDING_GUIDE.md`). You approved the Coach's Eye **direction** on 31 Oct. Before submitting it, read *Amendment 1* in the brief and give the yes/no sign-off (the planning workflow is a Stage 1 requirement), then decide on the merge.
> **Live review prep:** `LIVE_REVIEW_PACKAGE.md`.
> **Live judging review:** Thu 5 Nov, 12:00 p.m. ET. Post in Discord `#devpost-learn-feedback` tagged "Learn AR with SPECS" and "Will It Ship" (from the public hackathon page).

Nothing has been submitted. Work through this list yourself before pressing Submit on Devpost.

## Rules source and verification status
- **Official pages:** https://learn-specs.devpost.com/rules and https://learn-specs.devpost.com/resources
- **Automated access:** every attempt (30 and 31 Oct 2026) returned **HTTP 403**. **I haven't read the live pages myself.**
- **What's below:** the rules **you verified and supplied on 30 Oct 2026**, recorded in `RESEARCH_AND_DECISIONS.md`. Anything not in that record is listed as an **assumption** to check.

## Compliance table: requirements you verified (30 Oct 2026)

| # | Requirement | Current evidence | Status | Manual action required |
|---|---|---|---|---|
| 1 | New SPECS AR Lens created during the official submission period | Repo created 28 Oct 2026 (`7b18e08`); all Lens work 30–31 Oct 2026 (`git log`) | Evidence ready; **period start date not on record** | Confirm the submission-period dates on the live rules page |
| 2 | Planning uses the Devpost Learn skill pack | `Lens/devpost/design-brief.md` (plan-lens template, `status: approved`), plus *Amendment 1: Coach's Eye* with a traceability log; skill installed under `Lens/.claude/skills/plan-lens` | Evidence ready for `main`. **Coach's Eye: Amendment 1 is a draft**; the `plan-lens` interview is in progress (31 Oct) | Finish the interview, review the revised Amendment 1, then sign off yes/no |
| 3 | Built with CLAD, Lens Studio, and the Lens Studio MCP | Lens Studio 5.24.1; CLAD skills; MCP VirtualScene / compile / logs / preview capture / LEAF. Documented in README and `IMPLEMENTATION_NOTES.md` | Evidence ready | None |
| 4 | Lens installs and runs consistently in its intended Lens Studio preview | `main`: 7/7 LEAF incl. quit-and-reopen. `feature/coach-eye` final build `2201d21`: 8/8 LEAF, 0 script errors (`TEST_RESULTS.md`). Quit-and-reopen **not yet repeated on the branch** | Verified (branch fresh-open pending) | Quit and reopen Lens Studio on the branch, then re-run the 8 scenarios |
| 5 | Functionality matches the video and written description | Draft lists only verified features; recording guide uses only existing controls | Ready; depends on the video | Record exactly per `DEMO_RECORDING_GUIDE.md`; re-read the draft against the video |
| 6 | Public code repository with the Lens Studio project files | https://github.com/Sidd927/learn-ar-with-specs-2026, **PUBLIC** (checked with `gh`, 31 Oct); contains `Lens/` (`.esproj`, Assets, Packages) | Verified | Keep it public through judging |
| 7 | Accurate text description | `FINAL_DEVPOST_SUBMISSION.md` / `DEVPOST_SUBMISSION.md`: no tracking, scoring, user-research, device, injury or numeric biomechanical claims | Ready | Paste into Devpost and proofread |
| 8 | Demo video: public on YouTube, under 3 minutes, shows the Lens working (preview recording preferred) | Recording guide targets 2:45 in the Lens Studio preview | **Not done** | Record → upload as **Public** → paste the link |
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
| Thumbnail or image requirements | Screenshots are portrait 1399x1590 JPEG | Use `01-hero-intro.jpg` or crop if a landscape thumbnail is required |

## Devpost form fields: what to paste
| Field (typical) | Source |
|---|---|
| Project name | "Squat Tutor" |
| Tagline | `DEVPOST_SUBMISSION.md` → Tagline |
| About / story (inspiration, what it does, how we built it, challenges, what's next) | `DEVPOST_SUBMISSION.md` sections of the same names |
| Built with | `DEVPOST_SUBMISSION.md` → Built with |
| Try it out / repo link | https://github.com/Sidd927/learn-ar-with-specs-2026 |
| Video demo link | **Your YouTube URL** (after upload) |
| Image gallery | Coach's Eye: `13-mistake-knees-front.jpg`, `15-mistake-chest-side.jpg`, `14-mistake-heels-side.jpg`, `01-hero-intro.jpg`, `04-phase3-bottom-position.jpg`, `11-completion.jpg`. Main: `01`, `04`, `10`, `08`, `07`, `11` (the `main` versions live on the `main` branch) |

## Claims audit (verified against the code and tests)
- [x] No body tracking, rep counting, form assessment, or scoring is claimed.
- [x] The hypothesis is labelled as unvalidated; no user research is claimed.
- [x] No SPECS device testing is claimed; `DEVICE_VALIDATION.md` is marked "not run".
- [x] The video is described as a Lens Studio preview recording.
- [x] Test numbers match `TEST_RESULTS.md` (`main` 7/7; branch final build 8/8; about 12 s demo; slow ratio 2.00; 0/35/90°).
- [x] Every demo action (Start, Prev/Next, Slow, Play/Pause, Replay, Front/35°/Side, Knees/Heels/Chest and return) exists and is exercised by LEAF.
- [x] Coach's Eye: model measurements (3.1/7.7 cm and so on) are kept out of the README, Devpost draft and narration; they appear only in `TEST_RESULTS.md` and `BIOMECHANICAL_VALIDATION.md`, labelled as model geometry.
- [x] Coach's Eye: no injury, diagnosis, weakness or "correct for everyone" claims; patterns are called common patterns, exaggerated for clarity.
- [x] User validation is marked NOT CONDUCTED.

## Final steps (yours)
1. Open the live rules and resources pages; tick off the assumptions table above.
2. Record the video with `DEMO_RECORDING_GUIDE.md` and check it against the video quality checklist.
3. Upload to YouTube as **Public** and copy the link.
4. Paste the link into `DEVPOST_SUBMISSION.md` (optional) and into the Devpost form.
5. Paste the draft text, add the screenshots, and proofread.
6. Confirm the repo is still public. Submit before the deadline.
