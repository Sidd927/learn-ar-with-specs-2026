# Live review package: Thursday 5 Nov 2026, 12:00 p.m. ET

For the Learn AR with SPECS live judging review (Discord `#devpost-learn-feedback`, tags "Learn AR with SPECS" and "Will It Ship"). The product is **in progress, not finished**; present it that way. Nothing below has been posted.

## One-sentence pitch
Coach's Eye puts a squatting figure on a small stage in your room. Press Knees, Heels or Chest, and an exaggerated red version of a common movement pattern appears over the white reference figure, while the stage turns to a view chosen to show the difference.

## The problem
Watching an exercise demonstration doesn't always make it easy to see how different movement patterns look, or what changes when the movement is performed differently. A reference movement on its own shows what to do, but not necessarily which details to observe.

## Intended user
A beginner learning the bodyweight squat at home, who wants to know what to look for and where to look. Not athletes, and not anyone looking for a medical or injury assessment.

## What head-worn AR contributes
Phone AR can also place 3D figures in a room. What glasses change is how you inspect the comparison:
- **Head-worn and hands-free.** You look from where you stand, step to the side or walk behind the stage, without holding a phone in your line of sight.
- **The view matters.** In this model, each illustrated difference lies mainly in one direction, so the Lens turns the stage to present that direction to you.
- **Fits the glasses' view.** We measured the SPECS preview's field of view (about 32° x 36°) and scaled the figure to 1:3 so the whole body, cue card and controls fit from where you stand.

We haven't tested whether this helps people learn.

## What the user does
1. Sees the intro card ("SPATIAL SQUAT COMPARISON / Coach's Eye: Watch a squat in five phases. Then compare three illustrative patterns with the reference, each from a view chosen to show its difference.") and presses **Start**.
2. Watches a five-phase squat, about 12 s, with one short cue and one body highlight per phase.
3. Presses **Knees**, **Heels** or **Chest**. The figure pauses at the bottom, the red pattern figure appears, the stage turns, and the card names the view ("VIEW: FRONT" or "VIEW: SIDE"), the pattern, what the red figure does and what the white reference does.
4. Presses the same button again (the card says "Pinch again to return") or any playback control to go back.
5. Steps, slows to 0.5x, pauses, or switches Front / 35° / Side at any time.

## What makes it different
Some phone apps already show rotatable 3D exercise models and list common mistakes; we don't claim no other product does this. Coach's Eye's own design combines three things in one moment, in your space:
- the pattern overlaid directly on a reference figure, with only the difference drawn in red;
- an automatic turn to a viewpoint selected for that difference;
- a card naming the pattern, the difference and the view.

## Implemented (Lens Studio 5.24.1 preview)
- Jointed 1:3 mannequin with leg IK (feet stay planted); five-phase timeline; Play/Pause, Prev/Next, Slow 0.5x, Replay; Front / 35° / Side turntable.
- Three comparisons (knees, heels, chest) with automatic viewpoint, pattern card, return hint and "Exaggerated for clarity" note.
- 8 LEAF scenarios pass in the preview, each run individually on build `83e71bc` (1 Nov 2026).
- Buttons sized from the scene geometry to at least 2° with at least 1° gaps (our conservative reading of Snap's guidance), checked in preview captures; not tested with real hand tracking.
- An internal model-geometry check of the two figures (`BIOMECHANICAL_VALIDATION.md`). It is not an expert biomechanical assessment.

## Not yet validated
- **No user testing yet.** A five-person protocol is ready (`USER_VALIDATION_PLAN.md`), results NOT CONDUCTED.
- **Not run on SPECS hardware.** Comfort, hand tracking, and red-on-additive-display legibility are unverified.
- **No coach or expert review** of the three depictions.
- The design brief's Coach's Eye amendment is approved as product direction (1 Nov 2026). That is a planning decision, not validation.
- The **heels** comparison is the weakest. The red legs now fade so the raised heel stands out, but whether people read it correctly is untested.
- The learning benefit is a hypothesis.

## Three questions for reviewers
1. **First 30 seconds:** from the intro card alone, is it clear that comparing patterns is the point, or does it read as "just a squat animation" until someone presses Knees?
2. **The heels comparison:** in the screenshot or demo, what do you see changing? If it isn't the heel, would you rather see a closer view, a stronger marker at the heel, or the heels pattern dropped, leaving two strong patterns?
3. **Scope for the final days:** should we spend them on (a) the short user test and fixes, (b) more work on Heels clarity, or (c) presentation polish? Which would most change your Design and Innovation scores?

## What to show (about 2 minutes)
1. The intro screen (`docs/screenshots/01-hero-intro.jpg`).
2. Start, then let the squat play (about 12 s).
3. **Knees**: the strongest moment (`13-mistake-knees-front.jpg`).
4. **Chest** (`15-mistake-chest-side.jpg`).
5. **Heels** (`14-mistake-heels-side.jpg`): ask question 2 here.
6. Press it again to return; finish on the completion card (`11-completion.jpg`).

## Suggested post (edit before posting; not posted)
> **Coach's Eye**, a spatial squat comparison experience (Learn AR with SPECS, Will It Ship): a squatting figure on a stage in your room. Press Knees, Heels or Chest to overlay an exaggerated common pattern in red on the white reference figure, and the stage turns to a view chosen to show the difference. Preview-only so far, no user testing yet. Three questions: [paste the three questions]. Repo: https://github.com/Sidd927/learn-ar-with-specs-2026 (branch `feature/coach-eye`)
