import Event, {PublicApi} from "SpectaclesInteractionKit.lspkg/Utils/Event"
import {MannequinRig} from "./MannequinRig"
import {
  copyPose, easeInOut, HOLD_SECONDS, lerpPose, PHASE_COUNT, SLOW_SPEED, SQUAT_PHASES, SquatPose,
  STEP_SECONDS, TRANSITION_SECONDS
} from "./SquatPhases"

/** Snapshot of the player, pushed to listeners whenever anything visible changes. */
export interface PlayerState {
  started: boolean
  playing: boolean
  complete: boolean
  slow: boolean
  phaseIndex: number
}

/**
 * Deterministic playback for the five-phase squat.
 *
 * The timeline is five pose holds with four transitions between them
 * (5 × 1.5 s + 4 × 1.2 s = 12.3 s at 1x). Phase k becomes active when the
 * movement into it begins. Pausing freezes timeline time; Slow halves the rate.
 * Next / Previous run a short eased step and leave the player paused there.
 */
@component
export class SquatPlayer extends BaseScriptComponent {
  @ui.label("Squat Player — timeline, steps, pause, and speed")
  @ui.separator
  @input
  @hint("The rig that poses the mannequin")
  rig: MannequinRig

  private started = false
  private playing = false
  private complete = false
  private slow = false
  private phase = 0
  private time = 0
  private playbackStartTime = -1
  private lastRunSeconds = -1

  private stepFrom: SquatPose | null = null
  private stepTo: SquatPose | null = null
  private stepElapsed = 0
  private shown: SquatPose = SQUAT_PHASES[0].pose

  private _onStateChanged = new Event<PlayerState>()
  get onStateChanged(): PublicApi<PlayerState> {
    return this._onStateChanged.publicApi()
  }

  onAwake(): void {
    if (!this.rig) {
      console.error("[SquatPlayer] rig input is not assigned")
      return
    }
    this.createEvent("OnStartEvent").bind(() => {
      this.apply(SQUAT_PHASES[0].pose)
      this.emit()
    })
    this.createEvent("UpdateEvent").bind(() => this.tick(getDeltaTime()))
  }

  // ---- Public API ---------------------------------------------------------

  get state(): PlayerState {
    return {started: this.started, playing: this.playing, complete: this.complete, slow: this.slow, phaseIndex: this.phase}
  }

  get phaseIndex(): number { return this.phase }
  get isPlaying(): boolean { return this.playing }
  get isComplete(): boolean { return this.complete }
  get isSlow(): boolean { return this.slow }
  get isStarted(): boolean { return this.started }
  get speed(): number { return this.slow ? SLOW_SPEED : 1 }
  /** Timeline position in seconds of 1x time. */
  get timelineSeconds(): number { return this.time }
  /** Length of the full demonstration at 1x. */
  get totalSeconds(): number { return PHASE_COUNT * HOLD_SECONDS + (PHASE_COUNT - 1) * TRANSITION_SECONDS }
  /** Wall-clock seconds the last uninterrupted Start/Replay run took to finish (−1 if none). */
  get lastRunDurationSeconds(): number { return this.lastRunSeconds }

  start(): void {
    this.started = true
    this.replay()
  }

  replay(): void {
    this.started = true
    this.cancelStep()
    this.time = 0
    this.complete = false
    this.playing = true
    this.playbackStartTime = getTime()
    this.phase = 0
    this.apply(SQUAT_PHASES[0].pose)
    this.emit()
  }

  play(): void {
    if (!this.started) {
      this.start()
      return
    }
    if (this.complete) {
      this.replay()
      return
    }
    this.cancelStep()
    this.playing = true
    this.playbackStartTime = -1 // resumed runs are not timed
    this.emit()
  }

  pause(): void {
    if (!this.playing) return
    this.playing = false
    this.playbackStartTime = -1
    this.emit()
  }

  togglePlay(): void {
    if (this.playing) this.pause()
    else this.play()
  }

  next(): void {
    this.stepTo_(this.phase + 1)
  }

  previous(): void {
    this.stepTo_(this.phase - 1)
  }

  /** Step (eased, paused) to a specific phase. Used by the mistake comparison. */
  goTo(phaseIndex: number): void {
    if (!this.started) {
      this.started = true
    }
    if (this.playing) this.pause()
    this.stepTo_(phaseIndex)
  }

  setSlow(slow: boolean): void {
    if (this.slow === slow) return
    this.slow = slow
    // Changing speed mid-run invalidates the wall-clock timing of that run.
    this.playbackStartTime = -1
    this.emit()
  }

  toggleSlow(): void {
    this.setSlow(!this.slow)
  }

  // ---- Timeline -----------------------------------------------------------

  /** Timeline second at which phase k's hold begins. */
  holdStart(k: number): number {
    return k * HOLD_SECONDS + k * TRANSITION_SECONDS
  }

  private stepTo_(target: number): void {
    if (!this.started) return
    const clamped = Math.min(Math.max(target, 0), PHASE_COUNT - 1)
    if (clamped === this.phase) {
      // At a boundary: stay put, but stop any playback so the step controls feel predictable.
      if (this.playing) this.pause()
      return
    }
    this.stepFrom = copyPose(this.shown)
    this.stepTo = SQUAT_PHASES[clamped].pose
    this.stepElapsed = 0
    this.phase = clamped
    this.time = this.holdStart(clamped)
    this.playing = false
    this.complete = false
    this.playbackStartTime = -1
    this.emit()
  }

  private cancelStep(): void {
    if (this.stepTo) {
      this.apply(this.stepTo)
    }
    this.stepFrom = null
    this.stepTo = null
  }

  private tick(dt: number): void {
    if (this.stepFrom && this.stepTo) {
      this.stepElapsed += dt * this.speed
      const u = Math.min(this.stepElapsed / STEP_SECONDS, 1)
      this.apply(lerpPose(this.stepFrom, this.stepTo, easeInOut(u)))
      if (u >= 1) {
        this.stepFrom = null
        this.stepTo = null
      }
      return
    }
    if (!this.playing) return

    this.time = Math.min(this.time + dt * this.speed, this.totalSeconds)
    this.apply(this.poseAt(this.time))

    const newPhase = this.phaseAt(this.time)
    let changed = newPhase !== this.phase
    this.phase = newPhase

    if (this.time >= this.totalSeconds) {
      this.playing = false
      this.complete = true
      if (this.playbackStartTime >= 0) {
        this.lastRunSeconds = getTime() - this.playbackStartTime
      }
      this.playbackStartTime = -1
      changed = true
    }
    if (changed) this.emit()
  }

  /** Active phase at a timeline second: a phase starts when the movement into it begins. */
  phaseAt(t: number): number {
    for (let k = PHASE_COUNT - 1; k > 0; k--) {
      if (t >= this.holdStart(k) - TRANSITION_SECONDS) return k
    }
    return 0
  }

  /** Interpolated pose at a timeline second. */
  poseAt(t: number): SquatPose {
    for (let k = 0; k < PHASE_COUNT; k++) {
      const holdEnd = this.holdStart(k) + HOLD_SECONDS
      if (t < holdEnd || k === PHASE_COUNT - 1) return SQUAT_PHASES[k].pose
      if (t < holdEnd + TRANSITION_SECONDS) {
        const u = (t - holdEnd) / TRANSITION_SECONDS
        return lerpPose(SQUAT_PHASES[k].pose, SQUAT_PHASES[k + 1].pose, easeInOut(u))
      }
    }
    return SQUAT_PHASES[PHASE_COUNT - 1].pose
  }

  private apply(pose: SquatPose): void {
    this.shown = pose
    this.rig.applyPose(pose)
  }

  private emit(): void {
    this._onStateChanged.invoke(this.state)
  }
}
