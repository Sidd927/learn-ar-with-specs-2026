# Recommended product architecture: Squat Tutor: Coach's Eye

Branch: `feature/coach-eye` (prototype, 8/8 LEAF pass). Fallback: `main` (`d1d0473`). Platform: Lens Studio 5.24.1, SPECS preview, SpectaclesInteractionKit 2.0, SpectaclesUIKit 2.0, LEAF 2.0.2.

## Scene hierarchy
```
SquatTutor
├── Stage (0, −42, −170)
│   ├── Stand: column + plate
│   └── Turntable (yaw 0 / 35 / 90°) [Turntable]
│       ├── TurntableRing [RingMesh], TurntableFrontMark
│       ├── Mannequin [MannequinRig]            solid "target" figure + Cues
│       └── GhostMannequin                       translucent "mistake" figure (hidden by default)
│           └── GhostPelvis > … (same joints, meshes inset 4%, GhostMistakeMaterial)
├── SquatTutorUI [SquatTutorUI]                  cue card (left) + control panel (right), built at runtime
└── Systems [SquatPlayer, Turntable, CueIndicators, SquatTutorController, MannequinRig (ghost)]
LeafIndex [LeafIndex]                            8 LEAF scenarios
```

## Components and responsibilities
| Component | Role | Status |
|---|---|---|
| `SquatPhases.ts` | Phase data and timing; **`SQUAT_FAULTS`** (id, label, checkpoint view, mistake and target copy, pose delta); `faultPose()` | Implemented |
| `MannequinRig.ts` | Two-bone leg IK with planted feet; **knee-in bend direction**, **heel lift with foot pitch**; optional knee arrows | Implemented |
| `SquatPlayer.ts` | Deterministic timeline; **`goTo(phase)`** for comparisons | Implemented |
| `Turntable.ts` | Eased yaw presets | Implemented (unchanged) |
| `CueIndicators.ts` | One pulsing body cue at a time | Implemented (unchanged) |
| `RingMesh.ts` | Thin runtime torus for the ring cues | Implemented (unchanged) |
| `SquatTutorUI.ts` | UIKit panels; **"Compare a common mistake" row**; `showFault()` card mode | Implemented |
| `SquatTutorController.ts` | Wiring; **fault toggle** (shows the ghost, goes to the Bottom Position, turns to the checkpoint view, highlights the relevant body cue); any playback control exits the comparison | Implemented |

## Data flow
```mermaid
flowchart LR
  UI[SquatTutorUI] -- onFault(id) --> C[SquatTutorController]
  UI -- playback / angle events --> C
  C -- goTo(Bottom) / play / step --> P[SquatPlayer]
  C -- setAngle(front/side) --> T[Turntable]
  C -- applyPose(faultPose) --> G[Ghost MannequinRig]
  P -- pose per frame --> R[Target MannequinRig]
  P -- state --> C
  C -- showFault / setPhase --> UI
  C -- show(cue) --> Q[CueIndicators]
  D[(SquatPhases: phases + faults)] --> P
  D --> C
  D --> UI
```

## State model
`started × playing × complete × slow × phaseIndex` (player) plus `activeFault | null` (controller).
- Selecting a fault: paused, phase = Bottom, view = the fault's checkpoint, ghost visible.
- Selecting the same fault again, or Start, Play, Prev, Next, or Replay: ghost hidden, normal phase card.
- Slow and the angle buttons don't exit a comparison. The user may rotate freely while comparing.

## Rendering approach for the overlay
- The ghost uses Unlit, `blendMode: Normal`, alpha 0.55, and `depthWrite: false`, and draws after the opaque target.
- **Ghost meshes are scaled to 96%**, so wherever the two poses coincide the ghost sits inside the target and fails the depth test. Only the *difference* is visible: red knees inside the white knees, red shins and heels raised, red torso tipped forward. This was found and fixed through preview captures (the first version tinted the whole figure).

## Capability status
| Capability | Status |
|---|---|
| Articulated rig, IK, playback, turntable, UIKit UI, LEAF | Implemented and tested (8/8) |
| Fault poses and ghost overlay, checkpoint auto-angle | Implemented and tested (`h-mistake-compare`) |
| Walking around in the preview (WASD) | Supported by the preview; manual check only |
| Hand pinch on SPECS hardware | Supported by SIK; **unverified on a device** |
| Additive-display legibility of 55% red | **Unverified.** Needs glasses |
| Body tracking, form assessment | **Out of scope by design**; not used |

## Testing strategy
- LEAF a–g regression (placement, demo, stepping, playback, angles, cues, edge cases), plus **h-mistake-compare**. That last one measures mistake versus target joints in turntable space: knee |x| 3.1 vs 7.7 cm, ankle +4.0 cm, head +3.8 cm forward. It also checks the view yaw, the card title, and the exit behaviour.
- Preview captures for each mistake (`docs/screenshots/13–15`).

## Technical risks
| Risk | Mitigation |
|---|---|
| Overlay hard to read on the additive display | Inset approach keeps red to the difference only; alpha and colour are tunable in one material |
| Fault depictions judged inaccurate | Conservative magnitudes; wording "common mistake", sourced to standard trainer checkpoints; coach review in the validation plan |
| Scope creep before the deadline | Feature set frozen to three mistakes; `main` remains the fallback |

## Implementation sequence (done on the branch)
1. Fault data and rig support → 2. ghost hierarchy (generator) → 3. controller and UI → 4. visual fixes from captures (inset, magnitudes, copy, arm clearance) → 5. LEAF h → 6. full regression.
