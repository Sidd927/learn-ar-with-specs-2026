import {DefaultLeafInteractor} from "Leaf.lspkg/Interactors/interactor/DefaultLeafInteractor"
import {findInteractableByName} from "Leaf.lspkg/Interactors/InteractableUtils"
import {findSceneObjectByName, sleep} from "Leaf.lspkg/Utils/common/Utils"
import {CueIndicators} from "../CueIndicators"
import {MannequinRig} from "../MannequinRig"
import {SquatPlayer} from "../SquatPlayer"
import {SquatTutorUI} from "../SquatTutorUI"
import {Turntable} from "../Turntable"

/**
 * Shared helpers for the Squat Tutor LEAF scenarios.
 * Every check reads real scene state: UI text, joint transforms, turntable yaw, and cue visibility.
 */
export class SquatTestKit {
  readonly interactor = new DefaultLeafInteractor("SquatTutorTester")
  readonly player: SquatPlayer
  readonly rig: MannequinRig
  readonly ui: SquatTutorUI
  readonly turntable: Turntable
  readonly cues: CueIndicators

  constructor() {
    const systems = SquatTestKit.mustFind("Systems")
    this.player = systems.getComponent(SquatPlayer.getTypeName()) as SquatPlayer
    this.turntable = systems.getComponent(Turntable.getTypeName()) as Turntable
    this.cues = systems.getComponent(CueIndicators.getTypeName()) as CueIndicators
    this.rig = SquatTestKit.mustFind("Mannequin").getComponent(MannequinRig.getTypeName()) as MannequinRig
    this.ui = SquatTestKit.mustFind("SquatTutorUI").getComponent(SquatTutorUI.getTypeName()) as SquatTutorUI
  }

  static mustFind(name: string): SceneObject {
    const so = findSceneObjectByName(name)
    if (!so) throw new Error(`Scene object "${name}" not found`)
    return so
  }

  /** Wait until the UIKit elements have initialized (each scenario starts from a fresh Lens). */
  async ready(): Promise<void> {
    await this.waitFor(() => this.ui.isReady, 8000, "UI ready")
    await sleep(300)
  }

  /** Pinch a UIKit button by its scene-object name through SIK. */
  async tap(name: string): Promise<void> {
    const target = findInteractableByName(name, undefined, true)
    if (!target) throw new Error(`Button "${name}" not found or not enabled`)
    await this.interactor.trigger(target)
    await sleep(150)
  }

  text(name: string): string {
    const t = SquatTestKit.mustFind(name).getComponent("Component.Text") as Text
    return t.text
  }

  phaseLabel(): string { return this.text("PhaseLabel") }
  phaseTitle(): string { return this.text("PhaseTitle") }
  cueText(): string { return this.text("PhaseCue") }

  /** Yaw of the turntable in degrees, measured from its world rotation. */
  turntableYawDeg(): number {
    const fwd = SquatTestKit.mustFind("Turntable").getTransform().getWorldRotation().multiplyVec3(vec3.forward())
    return Math.atan2(fwd.x, fwd.z) * 180 / Math.PI
  }

  mannequinWorldPos(): vec3 {
    return SquatTestKit.mustFind("Mannequin").getTransform().getWorldPosition()
  }

  async waitFor(cond: () => boolean, timeoutMs: number, what: string): Promise<number> {
    const start = getTime()
    while (!cond()) {
      if ((getTime() - start) * 1000 > timeoutMs) throw new Error(`Timed out after ${timeoutMs} ms waiting for ${what}`)
      await sleep(50)
    }
    return getTime() - start
  }

  log(msg: string): void {
    print(`[SquatTutorTest] ${msg}`)
  }
}
