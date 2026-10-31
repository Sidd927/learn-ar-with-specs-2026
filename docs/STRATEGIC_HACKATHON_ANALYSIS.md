# Strategic hackathon analysis: is Squat Tutor the right product?

Date: 31 Oct 2026 · Stable baseline: `d1d0473` (main) · Deadline: 9 Nov 2026, 5:00 p.m. ET

This document challenges the product rather than its implementation. Facts are cited, our own judgements are labelled, and hypotheses are marked as hypotheses.

---

## 1. What this competition actually rewards

### Confirmed
| Item | Source | Status |
|---|---|---|
| **"Learn AR with SPECS: Learn to design for glasses. Your coding agent builds the Lens, no SPECS required."** | [learn-specs.devpost.com](https://learn-specs.devpost.com/) (search snippet, 31 Oct) | Public page |
| **Format:** install the Devpost Learn skill pack; it interviews you, checks the idea against AR design practice, and writes a design brief; Snap's CLAD agents build the Lens from that brief | Same | Public page |
| **Deadline:** 9 Nov 2026, 5:00 p.m. EST | Same | Public page, matches the owner's record |
| **Judging (Stage 2, equal weight):** Design · Technical Implementation · Innovation/Idea · Presentation | Owner-verified on 30 Oct (`RESEARCH_AND_DECISIONS.md`); the public snippet shows Design and Presentation wording verbatim | Owner-verified |
| **Stage 1 (pass/fail):** required tools and workflow, submission requirements, functional preview compatibility | Owner-verified | Owner-verified |
| **Judges:** Devpost staff (an AI Learning Hackathon Architect and a Developer Marketing Manager), not Snap engineers | Public page snippet | Public page |
| **Live review:** "SPECS Live Review: Inside the Judging Criteria" on **Thu 5 Nov, 12:00 p.m. ET**. Post the project in Discord `#devpost-learn-feedback`, tagged "Learn AR with SPECS" and "Will It Ship" | Public page snippet | **Opportunity: free judge feedback 4 days before the deadline** |
| **Eligibility:** above the age of majority; all countries with standard exceptions | Public page snippet | Public page |

### Unresolved (needs the live pages; automated reads return HTTP 403)
- Exact criterion wording for Technical Implementation and Innovation/Idea (owner-verified text exists; re-check before submitting).
- Whether **changing the product after planning** requires re-running `plan-lens` or just amending the brief. **This matters for any pivot. See §6.**
- Prize amounts (one participant repo claims $2,500 total; not official, not relied on).
- Any rule on disclosing AI agent use (the whole hackathon is agent-built, so disclosure is natural).

### What this tells us about winning (our reading)
1. **It's a learning hackathon about designing for glasses.** The title is literally "Learn to design for glasses". Judges will look for AR-native design judgement: why this belongs on glasses, placement, comfort, when to show things.
2. **"A complete, coherent product experience, not just a technical proof of concept"** (Design) is a stated bar. Completeness and coherence count as much as novelty.
3. **Technical Implementation is judged on how well CLAD, Lens Studio, and the MCP were used.** Our MCP-built scene, LEAF tests, and documented recovery are a genuine strength.
4. **Process compliance is a gate.** The design brief from the skill pack is the plan of record. The skill pack is explicitly **learner-led**: the learner makes product decisions. So an AI agent can't legitimately swap the product on its own. Any change of direction must be the owner's decision, recorded in the brief.
5. **Direct competition exists in the same hackathon.** For example, a public repo "SolderCoach-SPECS" (a PCB soldering assistant) targets this challenge ([GitHub](https://github.com/kevin9327/DevpostLearnARSPECS2026)). Skill-coaching ideas aren't unique here.

---

## 2. Honest product autopsy: Squat Tutor (as shipped on `main`)

### Who benefits, and from what?
- **Claimed user:** a beginner learning the bodyweight squat.
- **Claimed difficulty:** a fixed-angle video doesn't show the hips and knees from the angle that matters.
- **Evidence for the difficulty:** **none collected by us.** Coaching practice does treat squat form as angle-dependent: NASM's overhead squat assessment explicitly checks the **front** view (feet turn out, knees move inward) and the **side** view (excessive forward lean, low back arches, arms fall forward) ([PT Pioneer summary of the NASM OHSA](https://www.ptpioneer.com/personal-training/certifications/study/nasm-overhead-squat-assessment/)). That supports "angle matters". It doesn't show that beginners struggle because of video angle.
- **Frequency and severity:** squat learning is common, but low-stakes. Excellent free videos exist, and most beginners learn adequately from them or from a coach. This is not a high-severity problem.

### Existing alternatives (what already exists)
- **Interactive 3D exercise models on phones** that rotate to "check knee tracking" from the front: FitCraft ([blog, vendor claim](https://getfitcraft.com/blog/3d-exercise-demonstrations)).
- **3D exercise animations with "common mistakes to avoid"**: Muscle & Motion Strength app, 1,200+ exercises ([App Store](https://apps.apple.com/us/app/strength-by-muscle-motion/id1302056349)). Commercial 3D squat animation libraries: Myographics, MoveKit ([myographics.com](https://myographics.com/), [movekit.com](https://movekit.com/exercises/barbell-squat)).
- **Conclusion:** "rotate a 3D squat demonstration" is **not new**. A phone does it today.

### Is AR necessary?
| Squat Tutor capability | Phone 3D viewer equivalent | Does glasses add anything real? |
|---|---|---|
| Rotate to front / side | Swipe to rotate | Marginal: the in-space turntable is nicer, not essential |
| Step through phases, slow motion | Buttons on screen | No |
| See it at a physical scale in the room | Small screen | Some: a stable 3D object in the room is easier to read than a thumbnail, but our figure is 1:3 scale to fit the view |
| Follow along hands-free, eyes up | Phone propped on the floor; glance down mid-movement | **Yes, potentially.** But Squat Tutor never designs for this moment. It's a watch-then-do viewer. |

**Verdict on AR necessity:** weak. The one genuinely glasses-native advantage (hands-free, eyes-up follow-along) is mentioned in the pitch but not designed into the product.

### Innovation
Ordinary. The best of it is interaction polish (turntable presets, phase stepping) and AR design discipline (fitting the narrow view, one cue at a time). It's not a new idea.

### Limitations
- **No body tracking or personal feedback (by design).** A judge may read "squat tutor" and expect feedback, which creates an expectation gap.
- **No user research.** The value is a hypothesis.
- **No device validation.** Preview only.
- **One movement, fixed content.**
- **1:3 scale** to fit the field of view. Defensible, but less "a coach beside you".
- **Teaches only what correct looks like, not what wrong looks like.** Coaching relies heavily on contrast: "knees in" versus "knees out".

### Judge verdict (our honest scoring, 1–10)
| Category | Score | Evidence |
|---|---:|---|
| Strengths | 7 | Coherent, complete, polished; robust engineering (7/7 LEAF, fresh-open verified); disciplined AR layout |
| Weaknesses (higher = fewer) | 4 | Weak problem, weak AR necessity, no contrast or feedback, no evidence |
| Differentiation | 3 | Phone apps already rotate 3D squats and list common mistakes |
| Real-world impact | 3 | Low-stakes problem; free alternatives are good |
| Technical quality | 8 | MCP-built articulated rig with IK, deterministic playback, LEAF coverage, documented recovery |
| AR necessity | 4 | Mostly a 3D viewer; the hands-free moment isn't designed |
| Submission competitiveness | 5 | Would score well on Technical and Design, poorly on Innovation; likely mid-pack |

**Against the official four criteria (equal weight; our estimate):** Design 7 · Technical 8 · Innovation 4 · Presentation 6 (video not yet made) → **about 6.3/10**.

**Conclusion: (2) Fundamentally reposition Squat Tutor.** The engineering is the strongest part. The product framing ("watch a squat from three angles") is the weakest, because it's a phone feature. The repositioning must create a reason to be in 3D, in space, from a chosen angle, which the current build lacks.

---

## 3. Alternative directions considered

Evidence used across concepts:
- **AR procedural guidance reduces errors.** Tang et al. (2003) found 3D overlaid instructions cut assembly errors by 82% versus printed instructions; other studies report fewer errors but often slower completion ([summary with sources](https://pmc.ncbi.nlm.nih.gov/articles/PMC12222328/); [Springer HCII 2018](https://link.springer.com/chapter/10.1007/978-3-319-91581-4_35)). These are established findings.
- **First-person-perspective demonstrations are imitated faster and with fewer errors than mirror-facing ones** in short imitation tasks (Jackson, Meltzoff & Decety 2006 ([NeuroImage](https://www.sciencedirect.com/science/article/abs/pii/S1053811905024754)); [PMC4868846](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4868846/)). Long-term learning effects are not established.
- **Immersive or AR training for motor competence: evidence is inconsistent** ([meta-analysis](https://pmc.ncbi.nlm.nih.gov/articles/PMC13172324/)). HMDs are often non-inferior rather than superior ([JMIR 2021 review](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8299342/)). **We must not claim learning gains.**
- **Squat checkpoints are view-specific** (front versus side) in a widely used trainer assessment ([NASM OHSA summary](https://www.ptpioneer.com/personal-training/certifications/study/nasm-overhead-squat-assessment/)).

Each concept is assessed for preview-demonstrability, because Stage 1 requires it and no SPECS hardware is available.

| # | Concept | Problem / user | AR advantage | Preview-demonstrable? | Feasibility (9 days) | Main risks |
|---|---|---|---|---|---|---|
| 1 | **Squat Tutor: Coach's Eye** (transform) | Beginners can't tell *what wrong looks like* or *where to look*. Coaches check knees from the front and lean or heels from the side. | Mistake-vs-target overlay you inspect from the exact checkpoint angle, in space, hands free | **Yes**, fully | High: reuses the rig, adds fault poses, a ghost overlay, and auto-angle | Must not imply it assesses the user; content must stay general |
| 2 | **Movement Library** (transform: lunge, hinge, push-up) | Same as Squat Tutor, more moves | Same as today | Yes | Medium (new poses per move) | Breadth without a new insight; Innovation stays low |
| 3 | **Behind-View Follow-Along** (transform/unconventional) | Mirror-facing videos force left/right mental flipping for asymmetric moves (lunges, dance, tai chi) | Stand behind the model (first-person-like), proven faster imitation in lab tasks | Yes (figure plus camera) | Medium (new asymmetric animations) | The squat is symmetric, so it needs new content; gains unproven for skill learning |
| 4 | **Repair-step coach** (outside: e.g. replace a bike inner tube) | People abandon simple repairs; diagrams are hard to map onto the real object | 3D step overlays on the object (strongest evidence base: assembly errors) | **Partly.** No object recognition, so a stand-in virtual bike wheel is needed | Low–medium (new models and many steps) | Content-heavy; a stand-in weakens the "on your object" story; a SolderCoach-like space already in this hackathon |
| 5 | **CPR rhythm & hand-placement primer** (outside, healthcare-adjacent) | Bystanders hesitate; rate and depth are hard to recall | Hands-free metronome and a placement overlay on a manikin | **Weak.** Compressions are a custom gesture and can't be shown in the preview | Medium | High responsibility risk (implying certification or medical efficacy) |
| 6 | **First-person fingerspelling** (outside, unconventional) | Learners copy mirrored hand shapes from videos | Hand shapes shown where *your* hands are, from your eyes (1PP evidence) | Yes (animated hands) | **Low.** Needs 26 accurate hand poses | Accuracy and cultural risk without Deaf community involvement; can't responsibly ship in 9 days |
| 7 | **Kitchen step coach** (outside) | Hands busy while cooking | Steps and timers over each pan | Stand-in pans | Medium | **This is the hackathon's own worked example**, so originality is near zero |
| 8 | **Home fire-escape rehearsal** (outside, safety) | Households rarely rehearse exit routes | Route markers in your real rooms | **Weak.** Needs real-room mapping; stand-in room only | Medium | Safety-critical claims; a stand-in undercuts the point |
| 9 | **Spatial memory anchors** (unconventional) | People forget where things are stored | Notes pinned to real places | **No.** Persistence isn't showable in the preview | — | Fails Stage 1 preview demonstrability |

---

## 4. Scoring (our framework, labelled as ours)

Weights: problem significance 20 · innovation 15 · spatial essential 15 · UX 15 · technical feasibility 10 · demo quality 10 · evidence/validation potential 10 · responsible design 5. Scores are 1–10. "Feasibility" includes the risk of not finishing by 9 Nov.

| Concept | Prob 20 | Innov 15 | Spatial 15 | UX 15 | Feas 10 | Demo 10 | Evid 10 | Resp 5 | **Weighted** |
|---|---|---|---|---|---|---|---|---|---:|
| Squat Tutor (as is) | 4 | 3 | 4 | 7 | 9 | 6 | 5 | 8 | **5.3** |
| 1 Coach's Eye | 5 | 6 | 6 | 7 | 8 | 8 | 6 | 7 | **6.4** |
| 2 Movement Library | 4 | 3 | 4 | 6 | 6 | 5 | 5 | 8 | **4.75** |
| 3 Behind-View Follow-Along | 5 | 6 | 7 | 6 | 5 | 6 | 6 | 7 | **5.9** |
| 4 Repair-step coach | 7 | 5 | 7 | 6 | 3 | 5 | 7 | 7 | **5.95** |
| 5 CPR primer | 8 | 4 | 6 | 5 | 4 | 3 | 5 | 3 | **5.2** |
| 6 First-person fingerspelling | 7 | 8 | 8 | 6 | 2 | 6 | 5 | 3 | **6.15** |
| 7 Kitchen step coach | 5 | 2 | 6 | 6 | 6 | 5 | 5 | 8 | **5.1** |
| 8 Fire-escape rehearsal | 7 | 5 | 6 | 5 | 3 | 3 | 4 | 4 | **5.0** |
| 9 Spatial memory anchors | 6 | 5 | 9 | 5 | 1 | 1 | 4 | 6 | **4.95** |

**Category winners**
- Best overall (our framework): **Coach's Eye (6.4)**.
- Highest potential real-world impact: **CPR primer**, but responsibility and preview constraints make it unsuitable now. **Repair-step coach** is the best evidence base.
- Most innovative: **First-person fingerspelling (6.15, second overall)**, but it can't be responsibly built in 9 days.
- Most AR-native: **Spatial memory anchors**, which isn't demonstrable in the preview. Of the demonstrable ones, **Behind-View Follow-Along** and **fingerspelling**.
- Most feasible: **Squat Tutor as is**, then **Coach's Eye**.
- Best 3-minute demo: **Coach's Eye** ("watch the knees cave in, from the angle a coach would check").
- Strongest under the actual rules: **Coach's Eye**. It keeps the approved plan's subject, so process compliance is straightforward. It scores well on Design and Technical, raises Innovation, and is fully preview-demonstrable.

---

## 5. Paths compared

| | Path A: keep Squat Tutor | **Path B: transform into Coach's Eye** | Path C: new direction (best candidate: Repair-step coach) |
|---|---|---|---|
| Work remaining | Video + submit | Fault poses, ghost overlay, auto-angle, UI row, tests, docs, video | New planning interview, models, step content, UI, tests, docs, video |
| Reuse | 100% | ~85% (rig, IK, player, turntable, UI kit, tests, docs) | ~30% (UI patterns, test harness) |
| New technical requirements | — | Fault parameters in the IK; a translucent duplicate rig; fault data | Object models, step sequencing, stand-in object |
| Risk | Very low | Low–medium (contained; main is the fallback) | High (content, time, re-planning) |
| Time | 1 day | ~2–3 days including tests and docs | 6–8 days, little slack |
| Likely demo quality | Good but forgettable | Good and memorable ("see the mistake") | Uncertain |
| Product value | Low | Moderate: teaches contrast, uses angle for a reason | Potentially higher, but stand-in weakened |
| P(stable submission by 9 Nov) | ~0.95 | ~0.85 | ~0.45 |
| Expected judged score (official four) | ~6.3 | ~7.3 (Innovation 6, Design 8, Technical 8, Presentation 7) | ~6–7.5, high variance |

### Recommendation: **Path B, transform into "Squat Tutor: Coach's Eye"**
- It fixes the core weakness: **it gives the 3D, in-space, multi-angle viewing a job.** Each common fault is shown as a translucent "mistake" figure overlaid on the solid "target" figure, and the stage turns to the checkpoint angle where that fault is visible (front for knees caving in; side for heels lifting and chest dropping, matching published trainer checkpoints).
- It stays inside the approved plan's subject (bodyweight squat, demonstration-only, no tracking) and needs only a **brief amendment that you approve**.
- It keeps the verified build on `main` as a fallback at every step.
- **Why not Path C:** the best new idea (repair coach) relies on a stand-in object in the preview, needs re-planning through `plan-lens` and new content, and has under 50% delivery odds. **Why not first-person fingerspelling:** valuable, but shipping inaccurate signs without Deaf community input would be irresponsible.

**Honest ceiling:** Coach's Eye is still a demonstration tool. It does not watch the user, and its learning benefit is a hypothesis. It's a clearly better product than today's Squat Tutor, not a breakthrough.

---

## 6. Process note (important)
The skill pack is learner-led, and the brief is the plan of record. **The transformation is an owner decision.** It's implemented on branch `feature/coach-eye`, and `main` stays the verified fallback. Before merging, you approve the brief amendment (`Lens/devpost/design-brief.md`, proposed section). If you prefer, re-run `plan-lens` to record the change through the official interview.

## 7. Schedule (deadline 9 Nov, 5:00 p.m. ET)
| Date | Work |
|---|---|
| 31 Oct–1 Nov | Analysis (this doc); prototype Coach's Eye on the branch; tests; compare with the original |
| 2 Nov | Owner decision: merge or keep `main`. Brief amendment approved. 2–3 informal validation sessions (see `USER_VALIDATION_PLAN.md`) |
| 3–4 Nov | Polish from feedback; refresh screenshots; final docs |
| **5 Nov 12:00 ET** | **Post in Discord `#devpost-learn-feedback` for the live judging review** |
| 6–7 Nov | Act on review feedback; record the video |
| 8 Nov | Upload, fill in Devpost, final checks |
| 9 Nov (before 5 p.m. ET) | Submit with margin |

## Sources
- [Learn AR with SPECS (Devpost)](https://learn-specs.devpost.com/)
- [SolderCoach-SPECS participant repo](https://github.com/kevin9327/DevpostLearnARSPECS2026)
- [FitCraft: 3D exercise demonstrations (vendor blog)](https://getfitcraft.com/blog/3d-exercise-demonstrations)
- [Muscle & Motion Strength (App Store)](https://apps.apple.com/us/app/strength-by-muscle-motion/id1302056349) · [Myographics](https://myographics.com/) · [MoveKit](https://movekit.com/exercises/barbell-squat)
- [NASM Overhead Squat Assessment summary (PT Pioneer)](https://www.ptpioneer.com/personal-training/certifications/study/nasm-overhead-squat-assessment/)
- [AR assistance systems in industry: review (PMC12222328)](https://pmc.ncbi.nlm.nih.gov/articles/PMC12222328/) · [HMD vs face-to-face assembly training (Springer)](https://link.springer.com/chapter/10.1007/978-3-319-91581-4_35)
- [Jackson, Meltzoff & Decety 2006 (NeuroImage)](https://www.sciencedirect.com/science/article/abs/pii/S1053811905024754) · [Behavioral advantages of the first-person perspective (PMC4868846)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4868846/)
- [Immersive training and motor competence meta-analysis (PMC13172324)](https://pmc.ncbi.nlm.nih.gov/articles/PMC13172324/) · [HMDs for medical education review (PMC8299342)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8299342/)

---

## 8. Stage 4: prototype compared with the original (31 Oct, same framework)
The prototype is built on `feature/coach-eye` (`6c4e379`): 8/8 LEAF pass, 0 runtime exceptions, and previews `docs/screenshots/13–15`.

| Dimension (weight) | Squat Tutor (main) | Coach's Eye (branch) | What changed, with evidence |
|---|---:|---:|---|
| Problem significance (20) | 4 | 5 | It now teaches *what wrong looks like and where to look*, which is how trainers check a squat (front versus side) |
| Innovation (15) | 3 | 6 | Phone apps rotate a 3D model and *list* mistakes. Here the mistake is overlaid on the target and the stage turns to the view that reveals it. We found no example of that combination (not an exhaustive search) |
| Spatial essential (15) | 4 | 6 | Each mistake is only visible from one direction, so turning the in-space figure, or walking to that side, is the lesson itself. A phone could still do this, which caps the score |
| UX (15) | 7 | 7 | One extra row; comparison exits on any playback control; tested |
| Feasibility (10) | 9 | 8 | Built and passing; slightly larger surface |
| Demo (10) | 6 | 8 | A memorable frame: red knees caving inside white knees |
| Evidence potential (10) | 5 | 6 | A clear comprehension test exists (`USER_VALIDATION_PLAN.md`) |
| Responsible (5) | 8 | 7 | Showing mistakes risks being read as assessment; mitigated by wording and the disclaimer |
| **Weighted** | **5.3** | **6.4** | |

**Result:** the change improves the product on our framework (5.3 → 6.4) and on the official criteria estimate (about 6.3 → about 7.3), at low risk. **It is still a hypothesis-stage learning tool, not a validated one.**

### Decision needed from the owner
1. **Adopt Coach's Eye?** If yes: approve the brief amendment (or re-run `plan-lens`), then merge `feature/coach-eye` into `main`.
2. **If not:** `main` stays as submitted. Nothing on `main` changed during this milestone.

## 9. Update after approval (31 Oct 2026, end of day)
The owner approved Path B as the **product direction** (not a merge). Since then:
- **Comprehension pass.** The intro now says what the Lens teaches; the completion card points to the comparison; each comparison card states the view and why, names the target, and explains how to return.
- **Audit corrections.**
  - The chest pattern no longer lowers the arms (an untaught second difference).
  - Heels are labelled "seen from the side or rear", because trainer checklists differ.
  - Numeric model measurements were removed from public-facing text.
- **New weakness found:** the heels comparison reads mostly as "the red legs move", not "the heel lifts".

### Honest re-score (official criteria, 0–10)
| Criterion | Earlier estimate (section 5) | Now | Why |
|---|---|---|---|
| Design | 8 | **7** | Clear flow and responsible copy, but no user evidence yet, preview-only, and one of three comparisons is weak |
| Technical implementation | 8 | **7.5** | Reliable, 8/8 LEAF, analytic IK and an inset overlay; primitive figure; no device run |
| Innovation / idea | 6 | **5.5** | Overlay + automatic checkpoint view in space is a real twist, but 3D exercise viewers with "common mistakes" exist |
| Presentation | 7 | **6.5** | Strong repo and screenshots; the video isn't recorded yet; live review feedback not yet collected |
| **Mean** | 7.3 | **6.6** | The earlier estimate was optimistic. Running the user test and fixing heels are the largest available gains. |
