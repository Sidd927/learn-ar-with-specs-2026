# Live review package: Thursday 5 Nov 2026, 12:00 p.m. ET

For the Learn AR with SPECS live judging review (Discord `#devpost-learn-feedback`, tags "Learn AR with SPECS" and "Will It Ship"). The product is **in progress, not finished**; present it that way. Nothing below has been posted.

## One-sentence pitch
Coach's Eye puts a squatting figure on a small stage in your room. Press Knees, Heels or Chest, and an exaggerated red version of a common movement pattern appears over the white reference figure, while the stage turns to a view chosen to show the difference.

## The problem
Most people learn a squat from a video shot from one angle. Coaches don't watch from one angle: knees are checked from the front, torso lean from the side. A single fixed view can hide exactly the difference a beginner needs to see.

## Intended user
A beginner learning the bodyweight squat at home, who wants to know what to look for and where to look. Not athletes, and not anyone looking for a medical or injury assessment.

## Why AR glasses
Phone AR can also place 3D figures in a room. What glasses change is how you inspect the comparison:
- **Head-worn and hands-free.** You look from where you stand, step to the side or walk behind the stage, without holding a phone in your line of sight.
- **The view matters.** Each pattern shows most clearly from a particular side, so the Lens turns the stage to face you with that view.

We haven't tested whether this helps people learn.
- **Fits the glasses' view.** We measured the SPECS preview's field of view (about 32° x 36°) and scaled the figure to 1:3 so the whole body, cue card and controls fit from where you stand.

## What the user does
1. Sees the intro card ("Watch a squat in five phases. Then compare three common patterns…") and presses **Start**.
2. Watches a five-phase squat, about 12 s, with one short cue and one body highlight per phase.
3. Presses **Knees**, **Heels** or **Chest**. The figure pauses at the bottom, the red pattern figure appears, the stage turns, and the card says what differs and which view shows it.
4. Presses the same button again (the card says "Pinch again to return") or any playback control to go back.
5. Steps, slows to 0.5x, pauses, or switches Front / 35° / Side at any time.

## What makes it different
Phone apps already rotate 3D exercise models and list common mistakes. Coach's Eye combines three things in one moment, in your space:
- the pattern overlaid directly on the target, with only the difference drawn in red;
- an automatic turn to a viewpoint selected for that difference;
- a card naming the pattern, the difference and the view.

## Implemented (Lens Studio 5.24.1 preview)
- Jointed 1:3 mannequin with leg IK (feet stay planted); five-phase timeline; Play/Pause, Prev/Next, Slow 0.5x, Replay; Front / 35° / Side turntable.
- Three comparisons (knees, heels, chest) with automatic viewpoint, pattern card, return hint and "Exaggerated for clarity" note.
- 8 LEAF scenarios pass in the preview, all run on the final build on 31 Oct 2026.
- An internal model-geometry check of the two figures (`BIOMECHANICAL_VALIDATION.md`). It is not an expert biomechanical assessment.

## Not yet validated
- **No user testing yet.** A five-person protocol is ready (`USER_VALIDATION_PLAN.md`), results NOT CONDUCTED.
- **Not run on SPECS hardware.** Comfort, hand tracking, and red-on-additive-display legibility are unverified.
- **No coach or expert review** of the three depictions.
- The design brief's Coach's Eye amendment is a **draft**: the learner-led `plan-lens` interview is complete and sign-off is pending.
- The **heels** comparison may read as "legs move" more than "heel lifts" (seen in our own captures).
- The learning benefit is a hypothesis.

## Three questions for reviewers
1. **First 30 seconds:** from the intro card alone, is it clear that comparing patterns is the point, or does it read as "just a squat animation" until someone presses Knees?
2. **The heels comparison:** in the screenshot or demo, what do you see changing? If it isn't the heel, would you rather see a closer view, a floor-gap marker, or the heels pattern dropped, leaving two strong patterns?
3. **Scope for the final week:** should we spend it on (a) a short user test and fixes, (b) a fourth pattern or a second movement, or (c) presentation polish? Which would most change your Design and Innovation scores?

## What to show (about 2 minutes)
1. The intro screen (`docs/screenshots/01-hero-intro.jpg`).
2. Start, then let the squat play (about 12 s).
3. **Knees**: the strongest moment (`13-mistake-knees-front.jpg`).
4. **Chest** (`15-mistake-chest-side.jpg`).
5. **Heels** (`14-mistake-heels-side.jpg`): ask question 2 here.
6. Press it again to return; finish on the completion card (`11-completion.jpg`).

## Suggested post (edit before posting; not posted)
> **Squat Tutor: Coach's Eye** (Learn AR with SPECS, Will It Ship): a squatting figure on a stage in your room. Press Knees, Heels or Chest to overlay a common pattern in red on the white target, and the stage turns to the angle where it shows. Preview-only so far, no user testing yet. Three questions: [paste the three questions]. Repo: https://github.com/Sidd927/learn-ar-with-specs-2026 (branch `feature/coach-eye`)
