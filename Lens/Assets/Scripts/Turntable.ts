import Event, {PublicApi} from "SpectaclesInteractionKit.lspkg/Utils/Event"
import {easeInOut, VIEW_ANGLES} from "./SquatPhases"

const DEG = Math.PI / 180

/**
 * Rotates the mannequin's turntable to preset viewing angles.
 * Only yaw changes — the turntable's position (and the joint animation under it) is untouched.
 */
@component
export class Turntable extends BaseScriptComponent {
  @ui.label("Turntable — preset viewing angles")
  @ui.separator
  @input
  @hint("The object to rotate (its children turn with it)")
  target: SceneObject

  @input
  @hint("Yaw at start (degrees, 0 = mannequin faces the user)")
  initialYawDeg: number = VIEW_ANGLES.angled

  @input
  @hint("Seconds for an eased turn between presets")
  @widget(new SliderWidget(0.1, 2, 0.05))
  turnSeconds: number = 0.6

  private fromYaw = 0
  private toYaw = 0
  private yaw = 0
  private elapsed = 0
  private turning = false

  private _onAngleChanged = new Event<number>()
  /** Fires with the new target yaw (degrees) as soon as a preset is chosen. */
  get onAngleChanged(): PublicApi<number> {
    return this._onAngleChanged.publicApi()
  }

  onAwake(): void {
    if (!this.target) {
      console.error("[Turntable] target input is not assigned")
      return
    }
    this.yaw = this.toYaw = this.fromYaw = this.initialYawDeg
    this.applyYaw(this.yaw)
    this.createEvent("UpdateEvent").bind(() => this.tick(getDeltaTime()))
  }

  /** Current displayed yaw in degrees. */
  get yawDeg(): number { return this.yaw }
  /** Yaw the turntable is heading to (or resting at). */
  get targetYawDeg(): number { return this.toYaw }

  setAngle(deg: number): void {
    this.fromYaw = this.yaw
    this.toYaw = deg
    this.elapsed = 0
    this.turning = true
    this._onAngleChanged.invoke(deg)
  }

  private tick(dt: number): void {
    if (!this.turning) return
    this.elapsed += dt
    const u = Math.min(this.elapsed / this.turnSeconds, 1)
    this.yaw = this.fromYaw + (this.toYaw - this.fromYaw) * easeInOut(u)
    this.applyYaw(this.yaw)
    if (u >= 1) this.turning = false
  }

  private applyYaw(deg: number): void {
    this.target.getTransform().setLocalRotation(quat.angleAxis(deg * DEG, vec3.up()))
  }
}
