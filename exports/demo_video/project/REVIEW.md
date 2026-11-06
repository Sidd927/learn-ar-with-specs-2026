# Review: Coach's Eye demo film (final cut, render v3 + loudness pass)

## Creative calls
- Built storyline A, "Where to look": result first (the Knees comparison), then the real Lens Studio window, then each claim shown happening in the real preview. B (question cards) and C (one continuous take) are in STORYLINES.md.
- One home stage (the real preview, 1104x972) plus an editorial column. Captions and labels never cover the Lens's card or controls.
- Narration-led, no music: there's no license-clean bed without an external sign-in. Clicks only on real presses, two whooshes.
- Recording-gap seam: Recording 1 ends just after the Play press; Recording 2 resumes in the same state. 0.3 s dissolve; Pause is never shown or mentioned.

## Measured
- check: ok (structure warnings only: one generated file instead of sub-compositions, deliberate, rebuilt from tools/build.py).
- ffprobe on the delivered MP4: 154.700 s, H.264 High 1920x1080, 30/1 CFR, 4641 frames, yuv420p; AAC-LC 48 kHz stereo; 40,941,199 bytes.
- Loudness: -15.0 LUFS integrated, true peak -1.4 dBTP, LRA 4.9 LU (two-pass loudnorm; video stream copied).
- Full decode: no errors. blackdetect: none. freezedetect (>=2.5 s): 5 narrated holds of 2.6-2.9 s.
- Narration: every line transcribed back with Whisper base.en matches the script ("Coach's Eye" -> homophone "Coaches I").
- Click sync: 12/14 clicks start at the designed sample (one frame after the UI responds); 1 within 10 ms; 1 masked by speech.

## Looked at (not measured)
- A 1 fps contact sheet of the whole delivered MP4 (155 frames), full-resolution crops of the punch-ins and end card, and the recording seam at 0.3 s spacing.

## Nobody checked
- The sound was measured, not heard: voice naturalness, click level against the voice, and how the whooshes feel need a human listen.

## Weakest shot / with more time
- The Heels difference is small at this scale. The punch helps, but the reference foot and the raised red heel are still close together. A rear-view shot would need a new recording.
- The Lens's own card text is about 16 px in the full window; it reads only in the punch-ins.
- About 6 s without voice while the squat finishes (0:37-0:43): deliberate, to let the movement play.

## Warnings kept
- composition_file_too_large / timeline_track_too_dense / nested_structure_needs_subcomposition: the film is generated from one timing table so footage, captions and audio can't drift apart.
