import {CueIndicators} from "./CueIndicators"
import {PlayerState, SquatPlayer} from "./SquatPlayer"
import {MannequinRig} from "./MannequinRig"
import {FAULT_PHASE_INDEX, faultPose, PHASE_COUNT, SQUAT_FAULTS, SQUAT_PHASES, SquatFault, VIEW_ANGLES} from "./SquatPhases"
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

  @input
  @hint("Rig on the translucent 'mistake' figure")
  ghostRig: MannequinRig

  @input
  @hint("Root of the translucent 'mistake' figure (hidden unless a comparison is shown)")
  ghostRoot: SceneObject

  @ui.group_start("Capture / test hook")
  @input
  @hint("-1 = normal launch (intro + Start). 0–4 = open paused on that phase. 5 = autoplay to completion. For screenshots only.")
  startPhase: number = -1

  @input
  @hint("Optional starting view for screenshots: front, angled, or side. Empty = default (angled).")
  startAngle: string = ""

  @input
  @hint("Optional mistake comparison to open with, for screenshots: knees, heels, or chest. Empty = none.")
  startFault: string = ""
  @ui.group_end

  private angle: ViewAngle = "angled"
  private fault: SquatFault | null = null

  onAwake(): void {
    if (!this.player || !this.ui || !this.turntable || !this.cues || !this.ghostRig || !this.ghostRoot) {
      console.error("[SquatTutorController] One or more inputs are not assigned")
      return
    }
    this.ghostRoot.enabled = false
    // Any playback control leaves comparison mode first.
    this.ui.onStart.add(() => { this.clearFault(); this.player.start() })
    this.ui.onPlayPause.add(() => { this.clearFault(); this.player.togglePlay() })
    this.ui.onPrevious.add(() => { this.clearFault(); this.player.previous() })
    this.ui.onNext.add(() => { this.clearFault(); this.player.next() })
    this.ui.onSlow.add(() => this.player.toggleSlow())
    this.ui.onReplay.add(() => { this.clearFault(); this.player.replay() })
    this.ui.onAngle.add((a) => this.setAngle(a))
    this.ui.onFault.add((id) => this.toggleFault(id))

    this.player.onStateChanged.add((s) => this.render(s))
    this.ui.onReady.add(() => {
      this.ui.setAngle(this.angle)
      this.render(this.player.state)
      this.applyStartPhase()
    })
  }

  /** Current viewing-angle preset. */
  get viewAngle(): ViewAngle { return this.angle }

  /** Id of the mistake being compared, or "" if none. */
  get activeFaultId(): string { return this.fault ? this.fault.id : "" }

  /**
   * Show a common mistake as a translucent figure over the solid target figure at the
   * Bottom Position, and turn the stage to the view a coach would check it from.
   */
  private toggleFault(id: string): void {
    if (this.fault && this.fault.id === id) {
      this.clearFault()
      this.render(this.player.state)
      return
    }
    const f = SQUAT_FAULTS.find((x) => x.id === id)
    if (!f) return
    this.fault = f
    this.ghostRig.applyPose(faultPose(f))
    this.ghostRoot.enabled = true
    this.player.goTo(FAULT_PHASE_INDEX)
    this.setAngle(f.view === "front" ? "front" : "side")
    this.render(this.player.state)
  }

  private clearFault(): void {
    if (!this.fault) return
    this.fault = null
    this.ghostRoot.enabled = false
    this.ui.showFault(null)
  }

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
    if (this.startFault) this.toggleFault(this.startFault)
  }

  private render(s: PlayerState): void {
    this.ui.showIntro(!s.started)
    const phase = SQUAT_PHASES[s.phaseIndex]
    if (this.fault) this.ui.showFault(this.fault)
    else if (s.complete) this.ui.setComplete()
    else this.ui.setPhase(s.phaseIndex, phase.title, phase.cue)
    this.ui.setPlaying(s.playing, s.complete)
    this.ui.setSlow(s.slow)
    this.ui.setStepBounds(s.phaseIndex > 0, s.phaseIndex < PHASE_COUNT - 1)
    // Before Start the figure waits in its stance; the cue appears once the demo runs.
    // In comparison mode, highlight the body part the mistake is about.
    const faultCue = this.fault ? (this.fault.id === "knees" ? "knees" : this.fault.id === "heels" ? "feet" : "hip") : null
    this.cues.show(faultCue ?? (s.started ? phase.indicator : null))
  }
}
