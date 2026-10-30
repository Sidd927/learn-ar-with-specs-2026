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

  @ui.group_start("Capture / test hook")
  @input
  @hint("-1 = normal launch (intro + Start). 0–4 = open paused on that phase. 5 = autoplay to completion. For screenshots only.")
  startPhase: number = -1

  @input
  @hint("Optional starting view for screenshots: front, angled, or side. Empty = default (angled).")
  startAngle: string = ""
  @ui.group_end

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
      this.applyStartPhase()
    })
  }

  /** Current viewing-angle preset. */
  get viewAngle(): ViewAngle { return this.angle }

  private setAngle(a: ViewAngle): void {
    this.angle = a
    this.turntable.setAngle(VIEW_ANGLES[a])
    this.ui.setAngle(a)
  }

  /** Capture hook: jump straight to a phase so screenshots don't depend on timing. */
  private applyStartPhase(): void {
    if (this.startAngle === "front" || this.startAngle === "angled" || this.startAngle === "side") {
      this.setAngle(this.startAngle)
    }
    if (this.startPhase < 0) return
    this.player.start()
    if (this.startPhase >= PHASE_COUNT) return
    this.player.pause()
    for (let k = 0; k < this.startPhase; k++) this.player.next()
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
