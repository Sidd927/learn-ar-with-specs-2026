import {CueIndicators} from "./CueIndicators"
import {PlayerState, SquatPlayer} from "./SquatPlayer"
import {PHASE_COUNT, SQUAT_PHASES, VIEW_ANGLES} from "./SquatPhases"
import {SquatTutorUI, ViewAngle} from "./SquatTutorUI"
import {Turntable} from "./Turntable"

/**
 * Connects the Squat Tutor pieces: UI input drives the player and turntable,
 * and player state drives the cue card, button states, and body cues.
 */
@component
export class SquatTutorController extends BaseScriptComponent {
  @ui.label("Squat Tutor — wiring between UI, player, turntable, and cues")
  @ui.separator
  @input
  @hint("Playback state machine")
  player: SquatPlayer

  @input
  @hint("Cue card and control panel")
  ui: SquatTutorUI

  @input
  @hint("Viewing-angle turntable")
  turntable: Turntable

  @input
  @hint("Phase-specific body cues")
  cues: CueIndicators

  private angle: ViewAngle = "angled"

  onAwake(): void {
    if (!this.player || !this.ui || !this.turntable || !this.cues) {
      console.error("[SquatTutorController] One or more inputs are not assigned")
      return
    }
    this.ui.onStart.add(() => this.player.start())
    this.ui.onPlayPause.add(() => this.player.togglePlay())
    this.ui.onPrevious.add(() => this.player.previous())
    this.ui.onNext.add(() => this.player.next())
    this.ui.onSlow.add(() => this.player.toggleSlow())
    this.ui.onReplay.add(() => this.player.replay())
    this.ui.onAngle.add((a) => this.setAngle(a))

    this.player.onStateChanged.add((s) => this.render(s))
    this.ui.onReady.add(() => {
      this.ui.setAngle(this.angle)
      this.render(this.player.state)
    })
  }

  /** Current viewing-angle preset. */
  get viewAngle(): ViewAngle { return this.angle }

  private setAngle(a: ViewAngle): void {
    this.angle = a
    this.turntable.setAngle(VIEW_ANGLES[a])
    this.ui.setAngle(a)
  }

  private render(s: PlayerState): void {
    this.ui.showIntro(!s.started)
    const phase = SQUAT_PHASES[s.phaseIndex]
    if (s.complete) this.ui.setComplete()
    else this.ui.setPhase(s.phaseIndex, phase.title, phase.cue)
    this.ui.setPlaying(s.playing, s.complete)
    this.ui.setSlow(s.slow)
    this.ui.setStepBounds(s.phaseIndex > 0, s.phaseIndex < PHASE_COUNT - 1)
    // Before Start the figure waits in its stance; the cue appears once the demo runs.
    this.cues.show(s.started ? phase.indicator : null)
  }
}
