# Devpost submission: Coach's Eye (final, paste-ready)

In the order of the Devpost form. **Nothing has been submitted.** Submitting, uploading the video and every eligibility declaration are the owner's actions.

Labels used below:
- **[OWNER]** — only the owner can answer or confirm this.
- **[DROPDOWN]** — I couldn't see the expanded options (no browser access, and Devpost pages return HTTP 403 to automated tools). The recommendation describes the answer; pick the option that matches it, or send a screenshot of the expanded list.

Facts are taken from `README.md`, `Lens/devpost/design-brief.md`, `docs/BUILD_PROGRESS.md`, `docs/RESEARCH_AND_DECISIONS.md`, `docs/TEST_RESULTS.md`, `docs/UI_LAYOUT_AUDIT.md`, `docs/evidence/fresh-open/` and the final film.

---

## A. Project overview

### 1. Project name (max 60)
```
Coach's Eye
```
11 characters.

### 2. Elevator pitch (max 200)
```
Helps squat beginners see what changes: one exaggerated pattern (knees, heels or chest) appears over a white reference on SPECS, and the stage turns to the view where it shows.
```
176 characters.

---

## B. Project details

### 3. About the project (Markdown)

````markdown
## The problem
Learning a bodyweight squat from videos or demonstrations, you can watch the movement, but it isn't always easy to see **what changes when it's done differently**, or **where to look** to notice it. A reference movement on its own shows what to do, not which details to observe. And some differences are easier to see from one direction than another: knees drifting inward show from the front, a forward lean from the side.

## Who it's for
A beginner learning the bodyweight squat, typically from online videos or demonstrations, who wants to understand what to observe and how common movement patterns differ. It isn't for athletes, coaches or anyone looking for an assessment of their own form.

## What it does
Coach's Eye is a Lens for Snap's SPECS glasses. A jointed figure, about 60 cm tall, stands on a small stage about 1.7 m in front of you.

**1. The demonstration.** Pinch **Start** and the white reference figure squats through five phases: Starting Stance, Controlled Descent, Bottom Position, Rising Up and Standing Finish. Each phase has its own title, one short cue and one body highlight (foot outlines, knee arrows, a hip marker, a completion ring). Play, Pause, Prev, Next, Slow 0.5x and Replay let you take it at your own pace.

**2. Compare one pattern at a time.** Pinch **Knees**, **Heels** or **Chest**. The demonstration pauses at the Bottom Position and a translucent red figure appears over the white reference, showing an exaggerated, illustrative version of that pattern. Only the difference is drawn in red. The stage turns to a view chosen for that difference, and the card spells it out:

| Pattern | View | Red (illustrative, exaggerated) | White (reference) |
|---|---|---|---|
| Knees | Front | knees drift inside the toes | knees track over the toes |
| Heels | Side | heels lift off the floor | whole foot stays planted |
| Chest | Side | chest tips far forward | chest up, torso controlled |

For Heels, the red thighs and shins fade back so the raised heel is what you notice. Pinch the same button again, or any playback control, to return to the demonstration.

**3. Your view.** Outside a comparison, Front, 35° and Side turn the stage, and you can walk around it.

**What it doesn't do.** Hand input is used only to pinch buttons. There's no camera-based body or pose tracking, no rep counting and no scoring. The Lens never assesses your squat and makes no medical or injury-prevention claims. The white figure is this demonstration's reference, not an ideal squat for everyone, and the three patterns are common examples, not a complete list.

## Why the view changes
In this model each illustrated difference lies mainly in one direction: the knees move sideways (seen best from the front), while the heel lift and the torso lean happen in the side-on plane (seen best from the side). A fixed camera angle can hide exactly the thing you're meant to notice, so the Lens turns the stage to present that direction to you, and labels the view ("VIEW: FRONT", "VIEW: SIDE").

## What head-worn AR contributes
Phone AR can place 3D figures too. What glasses change is how you inspect the comparison: you look from where you stand, step to the side or walk behind the stage, and keep your hands free and your eyes up. That is the intended glasses experience. It runs in the Lens Studio preview today and hasn't been tested on SPECS hardware.

## How we built it
- **Planning:** the Devpost Learn skill pack's `plan-lens` interview produced the design brief (`Lens/devpost/design-brief.md`). The first brief was Squat Tutor, a five-phase demonstration. A review then found it overlapped with phone 3D exercise viewers, so a second, nine-question `plan-lens` interview produced *Amendment 1: Coach's Eye*. Its product decisions, copy and limits are recorded in my own words.
- **Building:** Claude Code with the CLAD plugin, working in Lens Studio 5.24.1 through the Lens Studio MCP:
  - VirtualScene scene construction;
  - TypeScript scripts and recompiles;
  - runtime logs and preview captures;
  - LEAF tests;
  - Editor API checks.
- **Figure:** jointed primitives with analytic two-bone leg IK, so the feet stay planted. Each pattern is posed by one primary parameter: knee bend direction, heel lift with foot pitch, or extra torso lean.
- **Overlay:** a second rig with identical proportions in a translucent red material, inset slightly inside the white figure, so only the differences show.
- **UI:** Spectacles UI Kit on the Spectacles Interaction Kit. Thin ring cues are generated with MeshBuilder.
- **Sized for the glasses' view:**
  - We measured the SPECS preview's field of view (about 32° × 36°) and placed the figure, card and controls to fit it from where you stand.
  - Buttons are 5.8 cm with 2.9 cm gaps at about 1.5 m. That's about 2° per target and just over 1° apart, our conservative reading of Snap's guidance.

## Testing, and what it shows
- **Eight LEAF scenarios** run in the Lens Studio preview. They pinch the real buttons and read scene state: placement, the full demo, stepping, pause/slow/replay, view angles, cues, edge cases, and each comparison with all five ways back.
- **Fresh open, 7 Nov 2026.** After a normal quit, the saved project was reopened in Lens Studio 5.24.1. All eight scenarios passed, TypeScript compiled, the log showed no script errors, and every flow was checked by pressing the real buttons. Evidence is in `docs/evidence/fresh-open/`.
- **An internal model-geometry check** confirms the red and white figures differ in the intended direction. It led to two fixes: the Chest pattern no longer adds an unrelated arm change, and the Heels card no longer calls the side the single best view.

This shows the Lens works as specified in the preview. It is not a user test, a device test or an expert review.

## Challenges
- **A frozen preview ("Paused by Creator").** It traced to a UI layout call that threw during startup; Lens Studio stops rendering after five failed frames.
- **A preview-inspection helper package that broke the build.** It required newer kit versions than the project uses, so we removed it and test through LEAF and preview captures instead.
- **Fitting a full figure, a card and controls into a narrow view, then making the buttons larger without covering the figure.** In Side view the red figure's hands pass just above the control panel.
- **Making the Heels difference readable at this scale.** Fading the red legs helps, but it's still the subtlest of the three.
- **Keeping the wording honest:** comparisons of common patterns, never judgments of anyone's form.

## What I learned
- A good AR experience is decided by where things are and where you look, not by placing a 3D model in front of you. Coach's Eye only became distinct when the view became part of the lesson.
- Designing for a narrow field of view is a layout discipline: scale, distance and target size have to be measured, not guessed.
- Automated tests that press the real buttons made changes safe to make late.
- Precise language matters as much as the code when a product touches health or fitness.

## Limitations
- Not yet tested with users. A five-person understanding test is written (`docs/USER_VALIDATION_PLAN.md`), and the learning benefit is a hypothesis.
- Not tested on SPECS hardware. Comfort, hand tracking and the legibility of red on the see-through display are unknown.
- The depictions are simplified and exaggerated, and haven't been reviewed by a coach. Heels is the least clear of the three.
- During a comparison, the card's progress dots keep the phase shown before it opened (cosmetic).

## What's next
User sessions, a coach review, a decision on Heels based on that evidence, and a first run on SPECS. The same comparison approach could later be explored for other movements. Nothing beyond the squat is built.
````

### 4. Built with (max 25 tags)
Recommended, in this order (11 tags):
```
Lens Studio, Snap Spectacles, CLAD, Lens Studio MCP, Devpost Learn skill pack, TypeScript, Spectacles Interaction Kit, Spectacles UI Kit, LEAF, Claude Code, MeshBuilder
```
| Tag | Why it belongs |
|---|---|
| Lens Studio | 5.24.1 hosts the project (`Lens/Lens.esproj`), scene, scripts and the preview it runs and was recorded in |
| Snap Spectacles | The target platform (SPECS 27 preview device). Not hardware-tested, and the text says so |
| CLAD | The Claude Code plugin (`ls-clad` 1.0.0) used to build the Lens: required technology |
| Lens Studio MCP | CLAD drives Lens Studio through it (scene, compile, logs, captures, LEAF): required technology |
| Devpost Learn skill pack | The `plan-lens` skill produced the design brief and Amendment 1: required technology |
| TypeScript | All 18 Lens scripts in `Lens/Assets/Scripts/` (7 product, 11 test) |
| Spectacles Interaction Kit | 2.0.0: pinch input on every button |
| Spectacles UI Kit | 2.0.0: buttons, toggles and layout panels |
| LEAF | 2.0.2: the eight automated preview tests |
| Claude Code | The agent host CLAD runs in |
| MeshBuilder | Lens Studio API used to generate the thin ring cues at runtime |

Not recommended: JavaScript (no authored JS; all scripts are TypeScript). HyperFrames, Kokoro and ffmpeg were used only to edit the demo video, not to build the Lens. Add them only if you want the video tools listed.

### 5. "Try it out" links
- **Code (recommended URL, opens the submitted branch directly):** `https://github.com/Sidd927/learn-ar-with-specs-2026/tree/feature/coach-eye`
- There's no hosted demo; a Lens isn't a web app. Don't add any other link.
- The video goes in field 7, not here.

---

## C. Project media

### 6. Image gallery (upload in this order; all 3:2)
| # | File (repo path) | Shows |
|---|---|---|
| 1 | `docs/screenshots/devpost/00-film-end-card-3x2.jpg` | Identity: name, tagline, hackathon, repo, disclaimer, beside the Knees comparison (becomes the project thumbnail) |
| 2 | `docs/screenshots/devpost/13-mistake-knees-front-3x2.jpg` | Knees, front view: red knees inside the white |
| 3 | `docs/screenshots/devpost/14-mistake-heels-side-3x2.jpg` | Heels, side view: faded red legs, raised red heel |
| 4 | `docs/screenshots/devpost/15-mistake-chest-side-3x2.jpg` | Chest, side view: red torso tipped forward |
| 5 | `docs/screenshots/devpost/02-film-five-phases-3x2.jpg` | The five-phase demonstration, Bottom Position |
| 6 | `docs/screenshots/devpost/08-views-front-35-side-3x2.jpg` | The same pose from Front, 35° and Side |
| 7 | `docs/screenshots/devpost/11-film-completion-3x2.jpg` | Completion card pointing back to the comparisons |
| 8 | `docs/screenshots/devpost/01-film-lens-studio-3x2.jpg` | The real Lens Studio 5.24.1 project: scene, "TypeScript compilation succeeded!", preview |

Optional 9th image: `docs/screenshots/devpost/04-phase3-bottom-position-3x2.jpg`. It largely repeats #5.

### 7. Video demo link (required)
**[OWNER] Pending upload.** Paste the public YouTube URL here after uploading. The verified rules call for **YouTube**, public, under 3 minutes.
- File: `/Users/siddhant_patil/Downloads/Coach_Eye_Final_Hackathon_Demo.mp4`, 2:34.7. Title, description, tags, thumbnail and upload steps are in `DEVPOST_MEDIA_CHECKLIST.md`.

---

## D. Additional info (organisers only, not public)

### 8. Submitter Type [DROPDOWN] [OWNER]
**Recommended:** the individual option (for example "Individual"), since you're entering on your own as a student.

### 9. Organization name
**Leave blank.** It only applies to an organisation submitter type, and you're not submitting on behalf of PICT or anyone else.

### 10. Submitter Country of Residence [OWNER]
**India**, if that's your country of residence.

### 11–13. Declarations [OWNER — do not let anyone tick these for you]
- **Age of majority:** confirm you're at least the age of majority where you live, as the form states. In India that's 18.
- **Excluded countries:** read the list shown on the form and confirm you're not resident in any of them. Also confirm you're not subject to the sanctions or other restrictions it names.
- **Conflict of interest:** read the declaration as displayed. Confirm you're not an employee, contractor, judge or immediate family member of anyone it lists (typically the sponsor, Devpost, and the agencies involved). If any of that applies, don't tick it; ask the organisers first.

### 14. Public code repository URL
```
https://github.com/Sidd927/learn-ar-with-specs-2026/tree/feature/coach-eye
```
The repository is public. Its **default branch is `main`, which is the earlier Squat Tutor build without the comparisons.** Anyone who opens the bare repository URL lands on the version that does *not* match the video. Linking the branch avoids that. See `RELEASE_CLOSEOUT.md` for the owner decision on `main`.

### 15. How the project meets the main technology requirement
```
Devpost Learn skill pack (plan-lens): planning. The plan-lens interview turned my idea into the design brief in Lens/devpost/design-brief.md: the spatial moment, who it is for, placement and scale, input, done criteria, out-of-scope items and build notes for CLAD. The first brief (Squat Tutor, a five-phase squat demonstration) was approved on 30 Oct 2026. A review then showed it overlapped with phone 3D viewers, so I ran a second, nine-question plan-lens interview, recorded in my own words as Amendment 1: Coach's Eye. It defines the three illustrative patterns, the view for each, the on-screen wording and what the Lens must never claim. Build changes after that were made and reviewed against the brief.

CLAD (the Lens Studio agent plugin for Claude Code), through the Lens Studio MCP: building and verifying. CLAD built the scene with VirtualScene (the jointed figure, the translucent red overlay rig, the stage and panels), wrote and recompiled the TypeScript (playback, the five phases, the turntable, the comparison logic, Spectacles UI Kit layout) and installed and version-checked the packages (Spectacles Interaction Kit 2.0, UI Kit 2.0, LEAF 2.0.2). It read runtime logs to find errors and captured preview screenshots to check layout. It also wrote and ran eight LEAF scenarios that pinch the real buttons and check the result. I made the product decisions and approvals: the direction, the name, the copy, the button layout (chosen from four options) and what stays out of scope. CLAD did the implementation and verification.

Lens Studio 5.24.1: where the Lens lives and runs. It holds the project (Lens/Lens.esproj): the scene, materials, scripts and packages. Its SPECS 27 preview is where the Lens runs, where every test passed (most recently after a fresh quit-and-reopen on 7 Nov 2026), and where the demo video was recorded.

Snap Spectacles (SPECS): the target. The Lens is built for SPECS (layout sized to the measured SPECS preview field of view, pinch input through the Spectacles kits). It has not been run on SPECS hardware.
```

### 16. Social post link (optional)
**Leave blank** unless you have actually posted publicly. Don't create a placeholder.

### 17. Had you used Lens Studio before this hackathon? [DROPDOWN] [OWNER]
**Your answer only.** The repository doesn't record your prior experience, so I can't recommend one.

### 18. Did CLAD build what your design brief described? [DROPDOWN]
**Recommended:** "Yes, mostly" or the closest equivalent. If the choices are only Yes/No, choose **Yes**.
- CLAD built both the original brief and Amendment 1, and they run and pass the preview tests.
- **The nuance:**
  - One build note wasn't built: an LEAF reach test for the control panel, recorded as a correction in the brief.
  - The Heels comparison reads weaker than the others.
  - The product itself changed partway, through a planned amendment rather than a mismatch.
  - Everything is verified only in the preview.

### 19. Which step took the most time for what you got out of it? [DROPDOWN]
**Recommended: reviewing and correcting, specifically getting the wording, the design brief and the evidence exactly right.**
- About 6 of the 16 milestones were documentation, accuracy and audit passes with little or no change to the Lens: the brief amendment, verbatim interview records, the button-size audit, evidence checks.
- Pick the option closest to "reviewing/checking the AI's output" or "documentation". If neither exists, pick "testing/verification".

### 20. Did the cost of AI (tokens, credits or a usage limit) affect what you did? [DROPDOWN] [OWNER confirms]
**Recommended: yes, it changed how I worked**, not what I built. Usage limits meant:
- targeted checks instead of re-running everything;
- one LEAF scenario at a time;
- re-recording only when necessary;
- in the final stages, explicit rules not to repeat tests or rebuild.

### 21. Where did you get stuck, or nearly quit?
```
Three places.

First, the concept. The first version, Squat Tutor, worked: a five-phase squat demonstration you could rotate and step through. The day after it was verified, a review showed it was essentially what phone 3D exercise viewers already do. That was the point where the project could have stalled: start over, or submit something unoriginal. Instead I ran a second plan-lens interview and evolved it into Coach's Eye. It keeps the working demonstration and adds one exaggerated pattern at a time over the reference, with the stage turned to the view where that difference shows. That kept the build and gave the idea a reason to be on glasses.

Second, the preview. Early on, the preview froze with "Paused by Creator". It traced to a UI layout call that threw during startup, and Lens Studio stops rendering after five failed frames. Later, a preview-inspection tool silently installed a helper package that needed newer interaction-kit versions and broke the compile. We removed it and switched to LEAF tests that pinch the real buttons, plus preview screenshots. That turned out to be the more reliable way to verify the Lens.

Third, the narrow field of view. Fitting a full figure, a readable card and controls into about 32 x 36 degrees, then making the buttons big enough for Snap's guidance without the red figure's hands covering them, took several measured layout passes. What I learned: measure the view and the targets, and let the automated tests guard every change.
```

### 22. If Snap could fix one thing in CLAD or Lens Studio, what would it be?
```
A built-in, version-safe way for CLAD to drive and record the Lens Studio preview.

To test real interactions we needed to press buttons in the preview and see the result. The preview-inspection tools available to CLAD through the Lens Studio MCP work by installing a helper package into the project, and that package required newer Spectacles Interaction Kit / UI Kit versions than the project used, so it broke the TypeScript compile. We had to remove it and rely on LEAF tests and screenshots. Injected mouse gestures did work, but the first click at a new spot only moves the cursor, and screenshots take a few seconds, so timing-sensitive checks are hard. The MCP can't record a preview video at all, so the demo had to be screen-recorded by hand. A screensaver interrupted that recording halfway through.

What would help: preview tools that never modify the project and work with whatever kit versions it uses. Add "pinch the element named X" and "wait until this text appears" actions, and an MCP call that records the preview to a video file. That would make the loop of building, verifying and demonstrating fully reliable.
```
(One smaller real issue, if there's room: Lens Studio's Agents-Docs plugin deletes the project's `Lens/.agents/` folder on every open. That's where the Devpost Learn `plan-lens` skill is installed, so the hackathon's own planning tool disappears each time.)

### 23. How likely are you to use Specs and Lens Studio again? [DROPDOWN] [OWNER]
Your opinion. **Suggested, if it's true for you:** "Likely". You have a working Lens, a tested workflow and clear next steps (a user test, a first device run).

### 24. How much did this hackathon help you develop new skills or knowledge? [DROPDOWN] [OWNER]
Your opinion. **Suggested, if true:** the highest or second-highest option. You built your first SPECS Lens end to end: a spatial layout for a measured field of view, interaction kits, automated tests, and an honest product scope.

### 25. Did this change what you think makes a good AR app? [DROPDOWN] [OWNER confirms]
**Recommended: yes.** If there's a text box, add: "The first version just placed a 3D figure in front of you, and that's something a phone can do. It became worth wearing only when where you look became part of the experience: one difference at a time, from the view that shows it, with hands free. It's still untested with users, so this is a design insight, not a proven result."
