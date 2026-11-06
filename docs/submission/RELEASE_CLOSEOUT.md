# Release closeout: Coach's Eye (7 Nov 2026)

## Branches
| Ref | Commit | Notes |
|---|---|---|
| `feature/coach-eye` (local and origin) | this closeout's commit (after `0c00181`) | Completed implementation, build `83e71bc`, plus docs, fresh-open evidence, film sources and the submission package |
| `origin/feature/coach-eye` before this closeout | `6d92764` | Fresh-open evidence |
| `main` (local and origin) | `d1d0473` | Untouched. Squat Tutor, the verified fallback without comparisons |
| GitHub default branch | `main` | Unchanged |

Commits made in this closeout (authored by Siddhant Patil, no co-author trailers):
1. `0c00181` docs(video): record the Coach's Eye demo film and its reproducible sources
2. docs(submission): this commit — the final Devpost submission package and the five new 3:2 gallery images

Push: `git push origin feature/coach-eye`, a fast-forward from `6d92764`. Verify with `git ls-remote --heads origin`.

## Committed in this closeout
- `docs/submission/`: `DEVPOST_SUBMISSION_FINAL.md`, `DEVPOST_MEDIA_CHECKLIST.md`, `RELEASE_CLOSEOUT.md`, `SUBMISSION_QA.md`.
- `docs/screenshots/devpost/`: five new 3:2 gallery images (frames of the final film, and a view triptych from existing screenshots), with provenance in its `README.md`.
- Film sources in `exports/demo_video/` (about 1.2 MB):
  - the script and storyboard;
  - the composition generator, narration text and word timings;
  - the subtitles (`captions.srt`), thumbnail and publishing text;
  - the spec, storylines and review note.
- Docs updated to say the film exists and isn't uploaded:
  - `docs/evidence/recording/README.md`;
  - `docs/SUBMISSION_CHECKLIST.md`, row 8;
  - status lines in `docs/FINAL_DEMO_SCRIPT.md` and `docs/FINAL_DEMO_RECORDING_GUIDE.md`.
- `docs/FINAL_DEVPOST_SUBMISSION.md` now points to the final package.
- `.gitignore`: rules for the film's local media.

## Intentionally excluded
| Item | Why |
|---|---|
| `Coach_Eye_Final_Hackathon_Demo.mp4` (40.9 MB) | Under GitHub's 100 MB limit, but every version would stay in history for good. Git LFS isn't set up, and adding it is a new dependency. The film's home is YouTube. |
| `exports/demo_video/raw/`, `renders/`, `project/assets/`, `audio/` WAVs | About 300 MB of derived media and intermediate renders, all reproducible from the two original recordings |
| `exports/demo_video/.venv-tts/` | Local Python environment (160 MB) |
| The two original screen recordings | They stay on the Desktop, untouched (SHA-1 in `exports/demo_video/raw/originals.sha1`, local) |
| `Lens/.mcp.json`, `ls-live-instance.json`, `.claude/settings.local.json`, `spk_debug_key.pem` | Machine-local or secret, already ignored |

## Final video location
- `/Users/siddhant_patil/Downloads/Coach_Eye_Final_Hackathon_Demo.mp4`, the copy to upload;
- `~/Projects/learn-ar-with-specs-2026/exports/demo_video/final/Coach_Eye_Final_Hackathon_Demo.mp4`.

Both are identical (SHA-256 `3a237034…d57fa0`).

## What a judge sees on GitHub, and the owner's decision
- The bare repository URL opens `main`, which is **Squat Tutor**: the five-phase demonstration without Knees/Heels/Chest. That doesn't match the video or the description.
- The submission links `https://github.com/Sidd927/learn-ar-with-specs-2026/tree/feature/coach-eye`, which opens the right code and README directly. A judge who goes to the bare repository or clones with defaults would still get `main`.
- `main` is an ancestor of `feature/coach-eye` (21 commits behind), so making them match is a clean fast-forward.

**Recommended, the owner's decision (I haven't done it), before submitting, in order of preference:**
1. **Fast-forward `main` to `feature/coach-eye`** (`git checkout main && git merge --ff-only feature/coach-eye && git push origin main`). No merge commit and no history rewrite. The fallback build stays reachable as commit `d1d0473`; consider `git tag squat-tutor-fallback d1d0473` first.
2. Or, on GitHub: Settings → Default branch → `feature/coach-eye`. It's reversible and leaves `main` untouched.
3. Or keep both as they are and rely on the `/tree/feature/coach-eye` links. Safe, but the weakest for judges.

## Remaining owner actions
1. Watch the film with sound; upload it to YouTube as Public (`DEVPOST_MEDIA_CHECKLIST.md`).
2. Decide about `main` (above).
3. Re-check the live rules page (video, repository, eligibility).
4. Fill in Devpost from `DEVPOST_SUBMISSION_FINAL.md`: answer the [OWNER] fields and tick the declarations yourself.
5. Upload the 8 gallery images in order, paste the YouTube URL, review the preview page, and submit before **9 Nov 2026, 5:00 p.m. ET (10 Nov, 3:30 a.m. IST)**.
6. Optional: add the YouTube link to `README.md` on the submitted branch.
