import {CueIndicator} from "./SquatPhases"

/**
 * Shows the one body cue that explains the current phase and gives it a gentle pulse.
 * Foot outlines at Starting Stance, knee arrows during Descent and Rising Up,
 * hip marker at the Bottom Position, and a completion ring at Standing Finish.
 */
@component
export class CueIndicators extends BaseScriptComponent {
  @ui.label("Cue Indicators — one highlight per phase")
  @ui.separator
  @input
  @hint("Foot outlines group")
  footOutlines: SceneObject

  @input
  @hint("Knee arrows group")
  kneeArrows: SceneObject

  @input
  @hint("Hip marker group")
  hipMarker: SceneObject

  @input
  @hint("Completion ring")
  finishRing: SceneObject

  @input
  @hint("Pulse speed (cycles per second)")
  @widget(new SliderWidget(0, 3, 0.1))
  pulseHz: number = 1.1

  @input
  @hint("Pulse size change (fraction)")
  @widget(new SliderWidget(0, 0.3, 0.01))
  pulseAmount: number = 0.08

  // undefined until the first show() so the initial call always applies visibility.
  private active: SceneObject | null | undefined = undefined
  private pulsed: {t: Transform; base: vec3}[] = []
  private time = 0

  onAwake(): void {
    this.show(null)
    this.createEvent("UpdateEvent").bind(() => this.tick(getDeltaTime()))
  }

  /** Show the indicator for a phase, or none. */
  show(indicator: CueIndicator | null): void {
    const target = this.objectFor(indicator)
    if (target === this.active) return
    for (const p of this.pulsed) p.t.setLocalScale(p.base)
    this.pulsed = []
    for (const so of [this.footOutlines, this.kneeArrows, this.hipMarker, this.finishRing]) {
      if (so) so.enabled = so === target
    }
    this.active = target
    this.time = 0
    if (target) {
      // Pulse each child in place — scaling the group would also move the children.
      for (let i = 0; i < target.getChildrenCount(); i++) {
        const t = target.getChild(i).getTransform()
        this.pulsed.push({t, base: t.getLocalScale()})
      }
      if (this.pulsed.length === 0) {
        const t = target.getTransform()
        this.pulsed.push({t, base: t.getLocalScale()})
      }
    }
  }

  /** Name of the visible indicator group, or "" if none. Used by tests. */
  get activeName(): string {
    return this.active ? this.active.name : ""
  }

  private objectFor(indicator: CueIndicator | null): SceneObject | null {
    switch (indicator) {
      case "feet": return this.footOutlines
      case "knees": return this.kneeArrows
      case "hip": return this.hipMarker
      case "finish": return this.finishRing
      default: return null
    }
  }

  private tick(dt: number): void {
    if (!this.active) return
    this.time += dt
    const s = 1 + this.pulseAmount * 0.5 * (1 - Math.cos(this.time * this.pulseHz * Math.PI * 2))
    for (const p of this.pulsed) p.t.setLocalScale(p.base.uniformScale(s))
  }
}
