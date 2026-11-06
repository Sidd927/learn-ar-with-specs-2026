# Devpost media checklist: Coach's Eye

## Final video (verified 7 Nov 2026 with ffprobe and a full decode)
| Item | Value |
|---|---|
| File | `Coach_Eye_Final_Hackathon_Demo.mp4` |
| Upload copy | `/Users/siddhant_patil/Downloads/Coach_Eye_Final_Hackathon_Demo.mp4` |
| Project copy | `exports/demo_video/final/Coach_Eye_Final_Hackathon_Demo.mp4` (local only, not in Git) |
| SHA-256 (both copies identical) | `3a23703496fe835e84ad90dd2c588292275ca991b06245e4c08c0c9aefd57fa0` |
| Duration | 2:34.7 (154.700 s), under the 3:00 limit |
| Video | H.264 High, 1920 × 1080, constant 30 fps, 4641 frames, yuv420p |
| Audio | AAC-LC, 48 kHz stereo; −15.0 LUFS integrated, true peak −1.4 dBTP |
| Size | 40,941,199 bytes (40.9 MB) |
| Checks | No decode errors, no black frames; every second reviewed on a contact sheet; narration matched the script word for word in a Whisper read-back |
| Content | Real Lens Studio 5.24.1 preview recordings (SPECS 27 simulation), driven through the Lens's real buttons. Synthetic narration (Kokoro, local). Burned-in captions. No music |
| Not in the film | The Pause action (lost during the screensaver between the two recordings). Nothing implies it |
| Not heard | Nobody has listened to the final mix; it was measured only. **Watch it once with sound before uploading.** |

## YouTube (owner uploads; the verified rules require public YouTube)
1. Upload `~/Downloads/Coach_Eye_Final_Hackathon_Demo.mp4`.
2. **Title (89 characters):** `Coach's Eye: see the difference in a squat, from the right view | Learn AR with SPECS 2026`
3. **Description:** paste the block in `exports/demo_video/final/PUBLISHING.md`. It's also reproduced below.
4. **Thumbnail:** `exports/demo_video/final/thumbnail_1280x720.jpg`. It's a real frame: the Knees comparison with the "Knees / Front view" label.
5. **Subtitles:** upload `exports/demo_video/final/captions.srt` as English.
6. **Visibility: Public.** Not made for kids. Category: Science & Technology.
7. **Tags:** Coach's Eye, Snap Spectacles, SPECS, Lens Studio, augmented reality, AR glasses, spatial computing, squat, exercise demonstration, movement learning, Learn AR with SPECS 2026, Devpost, hackathon, Spectacles UI Kit
8. Open the public link in a private window to confirm it plays without signing in, then paste it into Devpost field 7.

```
Coach's Eye is a spatial squat comparison Lens for SPECS, built for Learn AR with SPECS 2026.

A white reference mannequin demonstrates a squat in five phases: Starting Stance, Controlled Descent, Bottom Position, Rising Up and Standing Finish. Pick one of three common patterns (Knees, Heels or Chest) and an exaggerated, translucent red version appears over the white reference. The stage turns to the view where that difference shows (front for Knees, side for Heels and Chest). Pinch again to return to the demonstration. You can step through the phases, slow the movement to half speed, change the angle, and replay.

This video is a recording of the Lens Studio preview (SPECS 27 simulation), not footage through glasses.

What it is not: Coach's Eye is a demonstration. It doesn't track your body, count reps or assess your form. The red patterns are illustrative and exaggerated for clarity, and the white figure is this demo's reference, not an ideal squat for everyone. It hasn't been tested on SPECS hardware or with users yet; whether it helps people learn is what we want to find out next.

Chapters
0:00 The question
0:10 Coach's Eye in Lens Studio
0:26 The five-phase demonstration
0:52 Compare: Knees (front view)
1:18 Compare: Heels (side view)
1:33 Compare: Chest (side view)
1:52 Angles and half speed
2:02 Replay and why head-worn
2:26 Coach's Eye

Built with Lens Studio 5.24.1, Spectacles Interaction Kit, Spectacles UI Kit and LEAF.
Code: https://github.com/Sidd927/learn-ar-with-specs-2026/tree/feature/coach-eye

Narration: synthetic voice (Kokoro, generated locally). Sound effects: Pixabay Content License.
```

## Devpost gallery (all 3:2, genuine footage; upload in this order)
| # | Path | Size |
|---|---|---|
| 1 | `docs/screenshots/devpost/00-film-end-card-3x2.jpg` (project thumbnail) | 1920 × 1280 |
| 2 | `docs/screenshots/devpost/13-mistake-knees-front-3x2.jpg` | 1398 × 932 |
| 3 | `docs/screenshots/devpost/14-mistake-heels-side-3x2.jpg` | 1398 × 932 |
| 4 | `docs/screenshots/devpost/15-mistake-chest-side-3x2.jpg` | 1398 × 932 |
| 5 | `docs/screenshots/devpost/02-film-five-phases-3x2.jpg` | 1920 × 1280 |
| 6 | `docs/screenshots/devpost/08-views-front-35-side-3x2.jpg` | 1920 × 1280 |
| 7 | `docs/screenshots/devpost/11-film-completion-3x2.jpg` | 1920 × 1280 |
| 8 | `docs/screenshots/devpost/01-film-lens-studio-3x2.jpg` | 1920 × 1280 |

Provenance for each file is in `docs/screenshots/devpost/README.md`. Images 2–4 are crops of the 1 Nov screenshots, images 1, 5, 7 and 8 are frames of the final film, and image 6 puts three 1 Nov screenshots side by side. None are mock-ups.

## Still open
- [ ] Watch the film once with sound (the mix was measured, not heard).
- [ ] Upload to YouTube as **Public**; add subtitles and the thumbnail.
- [ ] Paste the YouTube URL into Devpost field 7. Optionally add it to the repository README.
- [ ] Upload the gallery in the order above.
- [ ] Recommended: link the video in `README.md` on `feature/coach-eye` after upload.
