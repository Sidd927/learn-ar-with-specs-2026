# User validation plan: Squat Tutor: Coach's Eye

## Status: NOT CONDUCTED
No participant has used the Lens yet, and no results are reported anywhere in this repository. Until sessions happen, every claim about understanding or learning is a **hypothesis**. When sessions are run, record them in the results table at the bottom, including negative findings.

> **To run a session, use the one-page [`USER_TEST_OBSERVATION_SHEET.md`](USER_TEST_OBSERVATION_SHEET.md).** It has the exact script, fallback prompts, per-participant sheet and summary table. This file holds the background and rationale.

## What we want to find out
| ID | Question | Why it matters |
|---|---|---|
| Q1 | Without an explanation, can a first-time viewer say what the Lens teaches within about 30 seconds? | The first-impression goal set for this milestone |
| Q2 | Can they name the difference between the red and white figures, for each pattern? | The comparison is the core of the product |
| Q3 | Can they say why the Lens turned to that view? | The reason the experience is spatial |
| Q4 | What do they remember afterwards? | Whether anything is learnt, even short-term |
| Q5 | Can they operate it without help? | Design and usability |

Known risk to watch: in preview captures, the **heels** comparison reads mostly as "the red legs move" rather than "the heel lifts" (see `BIOMECHANICAL_VALIDATION.md`).

## Participants and setup
- **About 5 people** who don't coach or train others professionally. Friends and classmates are fine; record that it's a convenience sample.
- A laptop running the Lens Studio preview: `Lens/Lens.esproj` on branch `feature/coach-eye`, device SPECS 27, Interactive input, preview **Reset** before each person.
- Capture hook off: `SquatTutorController` with Start Phase −1 and Start Angle / Start Fault empty.
- **Ethics:** verbal consent; notes only, no audio or video of faces; no health questions; anyone can stop at any time. Say: "This is a test of the design, not of you, and it isn't fitness advice."

## Protocol (about 10 minutes per person)
Read the prompts as written. Don't explain the Lens, don't hint at answers, and help only if someone is stuck for more than 30 seconds. Note it if you help.

| Step | Facilitator does / says | Record |
|---|---|---|
| 1. Cold open | Open the Lens to the intro screen. "Here's something we made. Take a look and use it however you like. I won't explain it yet." Wait up to 60 s. | What they do first; time to first pinch; any hesitation |
| 2. Purpose | "In your own words, what do you think this is designed to teach?" | Verbatim answer |
| 3. Difference | If they haven't opened a comparison: "There are buttons labelled Knees, Heels and Chest. Try one." Then for each comparison they open: "What, if anything, is different between the two figures?" | Verbatim, per pattern |
| 4. Viewpoint | "The view changed when you pressed that. Why do you think it turned to this angle?" | Verbatim |
| 5. Takeaway | Close or reset the Lens. "What, if anything, would you remember from this?" | Verbatim |
| Wrap-up | "Was anything confusing or hard to use? What would you change?" | Verbatim |

Avoid leading words: don't say "mistake", "correct", "wrong", "better" or "AR".

## Test sheet (copy one per participant)

```
Participant: P__   Date: ____   Facilitator: ____   Helped? Y/N (when: ____)
Exercise background (self-described, optional): ____

1. Cold open
   First action: ________________   Time to first pinch: ___ s
   Hesitations / confusion: ____________________________________

2. "What is this designed to teach?"
   Verbatim: __________________________________________________
   Understood the product?  [ ] yes  [ ] partly  [ ] no

3. "What is different between the two figures?"
   Knees  verbatim: ______________________  Correct difference? [ ]Y [ ]Partly [ ]N [ ]Not opened
   Heels  verbatim: ______________________  Correct difference? [ ]Y [ ]Partly [ ]N [ ]Not opened
   Chest  verbatim: ______________________  Correct difference? [ ]Y [ ]Partly [ ]N [ ]Not opened
   (Correct = knees closer together than the feet / heel off the floor / torso tipped further forward)

4. "Why did it turn to this angle?"
   Verbatim: __________________________________________________
   Linked view to what is visible?  [ ] yes  [ ] partly  [ ] no

5. "What would you remember?"
   Verbatim: __________________________________________________

Operation:  Start [ ]alone [ ]helped   Compare [ ]alone [ ]helped   Return from compare [ ]alone [ ]helped
            Angle buttons [ ]used [ ]not used   Slow/Pause [ ]used [ ]not used
Where they got confused: _____________________________________
Suggested change: ____________________________________________
```

## How to report
**Thresholds, agreed with the learner before testing (design brief, Amendment 1, Q9).** For each of the five outcomes below, at least 60% of participants, rounded up (2 of 3, 3 of 4, 3 of 5):
1. state the purpose without explanation;
2. identify the Knees difference;
3. identify the Chest difference;
4. explain why the viewpoint changes;
5. return to the demonstration on their own.

These are formative prototype decision criteria, not statistical validation or proof of learning. If any threshold is missed, bring the results to the learner before recording the video.

Also:
- Raw counts only (for example "3 of 5 identified the heel difference"). No percentages or significance claims with n ≈ 5.
- Quote at least one negative finding if there is one.
- If sessions don't happen before submission, the Devpost text keeps saying "not yet validated with users".

## Results
| Participant | Date | Purpose understood | Knees | Heels | Chest | Viewpoint reason | Remembered | Notes |
|---|---|---|---|---|---|---|---|---|
| — | — | NOT CONDUCTED | — | — | — | — | — | — |

## Later (beyond the hackathon)
- Review by a qualified coach or physiotherapist of the three depictions and the wording.
- If SPECS glasses become available: `DEVICE_VALIDATION.md`, plus whether 55% red is distinguishable from white on the additive display.
- A larger comparison against a good multi-angle video, using recognition of the patterns in new, unseen clips.
- Accessibility: red and white also differ in brightness, but test with people with colour-vision differences.
