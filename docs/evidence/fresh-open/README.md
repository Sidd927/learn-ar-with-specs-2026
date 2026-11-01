# Gate: fresh-open check on `feature/coach-eye`

**Status: NOT DONE.** All checks on build `83e71bc` so far ran in the same Lens Studio session that made the changes.

Why: a fresh open shows that the saved project (scene, scripts, packages) loads and runs on its own, not just in the editing session.

## Steps
1. **Owner:** in Lens Studio, File → Save if prompted, then quit Lens Studio normally (Cmd+Q). Don't force quit.
2. Check the working tree: `git status` shows no unexpected changes (only `Lens/.agents` may be deleted by Lens Studio's plugin; restore it with `git checkout -- Lens/.agents`).
3. Reopen: `open -a "/Applications/Lens Studio.app" Lens/Lens.esproj`. Confirm Lens Studio **5.24.1** and no package upgrade prompts accepted.
4. Preview: SPECS 27, Interactive, Reset. The first screen matches `docs/screenshots/01-hero-intro.jpg`.
5. Recompile TypeScript; collect the runtime log (no Lens script errors).
6. Run LEAF `a-placement` … `h-mistake-compare` **one at a time**. A scenario that never starts is **not** a pass; retry once and record both attempts.

## Record here
| Item | Result |
|---|---|
| Date and time | |
| Commit (`git rev-parse --short HEAD`) | |
| Lens Studio version from the log | |
| Compile | |
| Runtime log errors | |
| LEAF a–h (each) | |
| First screen matches `01` | |
| Notes | |
