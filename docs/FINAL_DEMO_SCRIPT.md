# Final demo script: Coach's Eye (aim for 2:40, limit < 3:00)

**Applies to branch `feature/coach-eye`, build `83e71bc` or later.** If the owner keeps `main` (no comparisons), use `DEMO_SCRIPT.md` instead.
The footage is a **Lens Studio preview recording** (SPECS 27, Interactive), not footage through glasses. Setup, framing and checklists are in `FINAL_DEMO_RECORDING_GUIDE.md`.

**Status: superseded by the produced film (7 Nov 2026).** The final narration and shot list are in `exports/demo_video/FINAL_SCRIPT_AND_STORYBOARD.md` (local, not committed); this table was the starting point. Original note: Record only after the user test and any Heels decision (design brief, *Evidence of understanding*). The "under 3 minutes, public on YouTube, preview recording preferred" requirement comes from the rules the owner verified on 30 Oct 2026; automated access to the rules page still returns HTTP 403, so the owner must re-check it on the live page before recording.

The video is built around one moment: **the red pattern over the white reference figure, from the view the Lens turns to.**

The "On screen" column matches build `83e71bc` and the screenshots in `docs/screenshots/`.

| Time | Do | On screen | Say |
|---|---|---|---|
| **0:00–0:12** | Hold on the opening screen | Intro card "SPATIAL SQUAT COMPARISON / Coach's Eye", figure on the stage, **Start** (`01`) | "When you watch a squat demonstration, it isn't always easy to see what changes when the movement is done differently, or where to look." |
| **0:12–0:25** | Move the cursor slowly under the intro sentence | "Watch a squat in five phases. Then compare three illustrative patterns with the reference, each from a view chosen to show its difference." and the disclaimer | "This is Coach's Eye, a spatial squat comparison experience for SPECS, shown in the Lens Studio preview. It's a demonstration: it doesn't track your body or judge your movement." |
| **0:25–0:42** | **Start**; let the full squat play (about 12 s) | Card follows phases 1→5 with one highlight each; ends on "Squat complete" (`02`–`06`, `11`) | "First, the reference movement in five phases, with one short cue and one highlight at a time." |
| **0:42–1:05** | **Knees** | Stage turns to the front; "VIEW: FRONT / Knees caving in"; red knees inside the white knees and the knee markers (`13`) | "Now compare. Knees. The stage turns to the front, because this difference is sideways. Red is an exaggerated version of a common pattern: knees drifting inside the toes. White is the reference this demo uses." |
| **1:05–1:22** | **Chest** | "VIEW: SIDE / Chest dropping"; red torso and head further forward (`15`) | "Chest. Now it turns to the side, where the forward lean shows. The red torso tips much further forward." |
| **1:22–1:42** | **Heels** (hold a little longer) | "VIEW: SIDE / Heels lifting"; red legs faint, red heel raised beside the flat white foot; foot outlines (`14`) | "Heels. From the side, the red heel lifts off the floor while the white foot stays flat. You could also walk round to look from behind." |
| **1:42–1:52** | Point at the card's last lines | "PINCH AGAIN TO RETURN", "Exaggerated for clarity. This Lens does not assess your form." | "Each difference is exaggerated so it's easy to see. These are patterns to compare, not a diagnosis." |
| **1:52–2:02** | **Heels** again to return; then **35°** | Normal card; figure turns to 35° | "Pinch it again and you're back to the demonstration. The angle buttons turn the stage, or you can walk around it." |
| **2:02–2:22** | **< Prev** (to Rising Up), **Slow 0.5x**, **Play**, **Pause** after about 3 s | Half-speed movement, then frozen | "You set the pace: step through it, slow it to half speed, and pause where you want to look." |
| **2:22–2:40** | **Slow 0.5x** off, **Replay** | Squat restarts | "Coach's Eye shows what to look for and where to look, in your own space, hands free. It's a preview demonstration, and whether it helps people learn is something we're still testing. Thanks for watching." |

About 240 words, roughly 1:45 of speech at 140 words a minute, plus the 12 s autoplay, the stage turns, pauses on each comparison and clicks: about 2:40. Rehearse with a stopwatch; if a take runs long, shorten the 0:12–0:25 and 1:52–2:02 rows first.

## Don't say
- That it tracks, scores, corrects, or gives feedback on the viewer.
- That it improves learning, prevents injury, or reveals weakness or mobility problems (unproven, and not what it shows).
- That it was tested on SPECS glasses or with users (unless that has happened, with the results in `docs/evidence/`).
- That the white figure is "the correct squat" for everyone. Call it the reference this demo uses.
- That the three patterns are a complete list, or that a coach or expert reviewed them.
- Any of the model measurements (3.1 / 7.7 cm and so on). They are software checks on a 1:3 model, not findings.
- "The knees shoot forward" for heels (geometrically false in this model) or "the arms fall" for chest (no longer depicted).
- That other exercises are supported.
