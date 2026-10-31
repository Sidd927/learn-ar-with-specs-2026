# User validation plan: Squat Tutor: Coach's Eye

**Status: not run.** No user sessions have taken place. Until they do, every value claim is a **hypothesis**.

## Hypotheses to test
| ID | Hypothesis | Why it matters |
|---|---|---|
| H1 | After using the Lens, beginners can name what to look for in a squat and *from which angle* (knees from the front; heels and chest from the side) | This is the core teaching claim of Coach's Eye |
| H2 | Seeing a mistake overlaid on the target, from the checkpoint view, makes the mistake easier to recognise than a single fixed-angle demonstration | The reason the 3D, multi-angle view exists |
| H3 | First-time users can operate the controls (Start, Prev/Next, Slow, angles, mistakes) without help | Usability; part of the Design criterion |
| H4 | Text is readable and nothing feels in the way (preview only; repeat on glasses if available) | Comfort and readability |

## Smallest useful study before 9 Nov (about 2–3 hours total)
- **Participants:** 5 people who don't coach or train others professionally, ideally including 2 who rarely exercise. Friends and classmates are fine; record that they're a convenience sample.
- **Setup:** a laptop running the Lens Studio preview (SPECS 27, Interactive), and a 30-second fixed-angle squat video for comparison (any reputable front-facing tutorial).
- **Ethics:** verbal consent; no recording of faces; notes only; no health data; anyone can stop at any time. State clearly that this is a design study, not fitness advice.

### Session script (about 15 minutes)
1. **Baseline (2 min):** "When someone squats, what would you look at to tell whether it's going well?" Write down the answer verbatim.
2. **Comparison order:** half the participants watch the video first and then the Lens; the other half the reverse (counterbalanced).
3. **Lens tasks (5 min).** Observe; don't help unless they're stuck for more than 30 s:
   - T1 "Watch the full squat." (success: presses Start)
   - T2 "Show me the bottom position from the side." (success: reaches phase 3, then Side)
   - T3 "Find out what 'knees caving in' looks like." (success: presses Knees)
   - T4 "Make it play slower." (success: Slow)
4. **Comprehension check (3 min, neutral wording):**
   - "Describe one thing to check from the front, and one from the side."
   - Show 3 still images (target, knees in, heels up), shuffled: "Which of these, if any, looks different from the target? How?"
5. **Neutral comparison questions (3 min):**
   - "What, if anything, did you learn from the video?"
   - "What, if anything, did you learn from the 3D version?"
   - "Was anything confusing or hard to use? What?"
   - "If you could change one thing, what would it be?"
   - Avoid "Was the AR version better?" (leading).

### What to record
| Measure | How |
|---|---|
| Task success T1–T4 | yes / no / helped |
| Time to complete T3 | stopwatch |
| Comprehension | correct front/side checkpoint named: 0 / 1 / 2 |
| Mistake recognition | correct identifications out of 2 |
| Usability issues | verbatim notes, tallied by theme |

### How we'll report it
- Raw counts only (for example, "4 of 5 named a side-view checkpoint after the Lens"). **No percentages or claims of statistical significance with n = 5.**
- Report negative findings too.
- If this isn't done before submission, the Devpost text keeps saying "hypothesis, not yet validated".

## Device check (only if SPECS glasses become available)
Use `DEVICE_VALIDATION.md`. Add: is the red-versus-white overlay distinguishable on the additive display (red at 55% alpha may look faint)?

## Future validation (after the hackathon)
- A larger comparison against a high-quality multi-angle video, measuring recognition of mistakes in new, unseen clips.
- A review by qualified coaches or trainers of the three mistake depictions and wording.
- Accessibility review: colour choice (red versus white also differs in brightness), text size, one-handed use.
