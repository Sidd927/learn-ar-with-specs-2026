# Internal model-geometry validation: Coach's Eye

> **What this document is:** an internal engineering check by the development agent of our own simplified mannequin. It covers coordinate and landmark consistency between the white and red figures, and the size of each illustrative pose difference.
>
> **What it is not:** an expert biomechanical assessment, or a review by a coach or clinician. The values below **do not establish biomechanical correctness, a correct or ideal squat for anyone, or that any pattern is harmful.** The file name is kept for link stability.

Checked on 31 Oct 2026 on branch `feature/coach-eye` (product code as of `2201d21`, unchanged since). Sources checked: the code (`SquatPhases.ts`, `MannequinRig.ts`, `Tests/H_MistakeCompareScenario.ts`), the saved scene, an independent Python recomputation of the leg IK, and the LEAF logs.

## What the numbers are, and what they are not
The three values (knees 3.1 vs 7.7 cm, heels 4.0 cm, head 3.8 cm) are **internal model-geometry checks**. They confirm that the red figure differs from the white figure in the direction the card describes, in model units.

They are **not** measurements of people, not thresholds for good or bad form, and not evidence that a pattern matters. Three reasons:
- **Scale.** The mannequin is about 60 cm tall, roughly 1:3. One model centimetre is about 3 cm on a person.
- **Exaggeration.** The magnitudes are design parameters, chosen to be visible at 1.7 m, not taken from motion-capture data.
- **A geometry check is not a validation.** A test that reads back the parameter it set (heel lift 4.0 cm) proves the code works, nothing more.

**Decision:** the numbers stay here and in `TEST_RESULTS.md` as software test evidence. They are kept out of all public-facing text (README, Devpost draft, demo narration, live review package), where they could be read as biomechanical findings.

## Coordinate and landmark consistency
- **Two rigs, one frame.** The white target (`Mannequin`) and the red pattern figure (`GhostMannequin`) are siblings under `Turntable`, both with an identity transform.
  - Their `MannequinRig` parameters are identical: thigh 15.5, shin 15.5, ankle height 2.6, ankle half-width 6.5, hip offset (4.5, −1.5, 0), toe-out 12°, heel-to-ball 5.5 cm.
  - The 96% inset that hides overlapping geometry scales only the visible meshes, never the joint pivots.
- **Reference pose.** Both figures use the Bottom Position (pelvis height 17.2, pelvis z −6.4, torso lean 42°, arm reach 85°). The red figure adds one pattern delta (`faultPose()`).
- **Landmarks.** Joint pivot scene objects (`KneeL`, `AnkleL`, `Head` and their `Ghost*` twins).
  - Their world positions are converted into turntable-local space with the turntable's inverted world transform.
  - Turntable rotation therefore doesn't affect the result.
- **Reproducibility.** The poses are deterministic: no physics, randomness or tracking.
  - LEAF `h-mistake-compare` logged identical values on every run on 31 Oct, before and after the arm change (which doesn't affect the head pivot).
  - An independent Python recomputation of the same IK equations matched to 0.1 cm.

## Illustrative pose differences

### Pattern 1: Knees caving in

| | |
|---|---|
| **Intended visual difference** | From the front, the red knees sit inside the line of the feet; the white knees sit over the feet. |
| **How it is posed** | `kneeInDeg: 18` turns the plane in which each knee bends from 12° toe-out to 6° toe-in. Hips, ankles and feet are unchanged. |
| **Landmark** | `KneeL` / `GhostKneeL` pivot, distance from the midline (\|x\|, turntable space). |
| **Illustrative difference (model cm)** | Target 7.7 cm, pattern 3.1 cm from the midline (knee-to-knee 15.5 vs 6.2 cm). The ankles are 6.5 cm from the midline (13.0 cm apart). |
| **What the learner should observe** | Red knees closer together than the feet; white knees over the feet. |
| **View** | Front. Front-view knee checks are standard in trainer screening (e.g. the NASM overhead squat assessment lists "knees move inward" under the anterior view; see Sources). |
| **Notes (non-expert)** | Knees inside the ankle line at the bottom of a squat is a recognisable inward-knee pattern. The 18° is deliberately large so it reads at 1.7 m. |
| **Limitations** | Hips don't rotate and feet don't roll in, so it is simplified. How far knees should travel varies between people and stance widths. The white figure is this demonstration's visual reference, not a universal ideal. |

### Pattern 2: Heels lifting

| | |
|---|---|
| **Intended visual difference** | The red heels leave the floor while the balls of the feet stay down; the white feet stay flat. |
| **How it is posed** | `heelLiftCm: 4.0` raises the ankle target by 4.0 cm and pitches the foot by atan2(4.0, 5.5) ≈ 36°. The pelvis is unchanged, so the legs re-solve. |
| **Landmark** | `AnkleL` / `GhostAnkleL` pivot height (y). |
| **Illustrative difference (model cm)** | Pattern ankle +4.0 cm (equal to the input; this confirms the code, nothing more). Side effect: the red knee rises about 4.4 cm and moves about 0.4 cm back, and the shin is about 2° more upright. |
| **What the learner should observe** | A gap under the red heel; the red foot is tilted. |
| **View** | **Automatic view: side.** Another potentially useful inspection view is the **rear**: NASM-style assessments list "heels rise" under the posterior view, and other guides check it from the side. The card says "Seen from the side or rear". The Lens does not turn to the rear; a learner can walk behind the stage. Neither view is presented as the only correct one. |
| **Notes (non-expert)** | 4 cm at 1:3 scale is about 12 cm on a person, close to standing on the toes. This is **strongly exaggerated** and disclosed on the card ("Exaggerated for clarity"). |
| **Limitations** | **This is the weakest comparison.** Preview captures show the most visible red is the raised thigh and shin, not the heel gap, which is small at this scale. The earlier demo line "the knees shoot forward" was **wrong** (the knee moves 0.4 cm back) and has been removed. Needs user testing and possibly a clearer depiction (see `USER_VALIDATION_PLAN.md`). |

### Pattern 3: Chest dropping

| | |
|---|---|
| **Intended visual difference** | From the side, the red torso tips further forward than the white torso. |
| **How it is posed** | `extraLeanDeg: 18`, so the torso leans 60° from vertical instead of 42°. |
| **Landmark** | `Head` / `GhostHead` pivot, forward distance (z). |
| **Illustrative difference (model cm)** | Pattern head 3.8 cm further forward and about 4.1 cm lower (recomputed). |
| **What the learner should observe** | The red chest and head ahead of and below the white ones. |
| **View** | Side. "Excessive forward lean" is a lateral-view checkpoint in the NASM overhead squat assessment. |
| **Notes (non-expert)** | 18° extra lean is clearly visible. How much lean is appropriate depends on body proportions and depth; more lean is not always wrong. |
| **Correction made during this check** | The red figure used to lower its arms by 30°. That is a separate checkpoint ("arms fall forward") the card doesn't teach. It's now removed (`78381e9`): the red arms keep the target's arm angle and move only because the torso tips. |
| **Limitations** | The spine is a single rigid segment, so rounding versus hinging is not shown. |

## Responsible wording (applied in the Lens and the docs)
- "Common pattern" and "compare", not "wrong" or "bad form". The title names the pattern; the card says what differs and what the white target (this demonstration's reference) shows.
- The red figure is an exaggerated, illustrative movement pattern.
- On the card while comparing: "Exaggerated for clarity. This Lens does not assess your form."
- **We don't say:**
  - that a pattern causes injury, or that avoiding it prevents injury;
  - that it reveals weakness or limited mobility;
  - that the white figure is everyone's ideal squat;
  - that the Lens diagnoses or assesses anyone.

## Open items
1. Review by a qualified coach or physiotherapist of all three depictions and their wording. **Not done.**
2. A clearer heel depiction (for example a floor-gap marker or a closer view), if user testing confirms it is misread.
3. Check the 55% red against white on an additive SPECS display. **Not done** (no device).

## Sources
- NASM overhead squat assessment views and compensations (secondary summary): [PT Pioneer](https://www.ptpioneer.com/personal-training/certifications/study/nasm-overhead-squat-assessment/)
- Heel rise listed under the posterior view: [TrainerMetrics OHSA calculator](https://www.trainermetrics.com/fitness-assessment-calculations/movement-assessments-overhead-squat/), [CMS Fitness Courses](https://www.cmsfitnesscourses.co.uk/blog/overhead-squat-analysis/)
- Heel rise checked from the sagittal (side) view: [POIN-T-GO guide](https://research.poin-t-go.com/en/exercises/overhead-squat-mobility)

These are secondary summaries. We did not read the NASM primary text.
