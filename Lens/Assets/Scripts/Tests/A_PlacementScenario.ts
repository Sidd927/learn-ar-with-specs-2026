import {Scenario} from "Leaf.lspkg/Scenarios/scenario/Scenario"
import {expect} from "Leaf.lspkg/Utils/common/Expect"
import {findInteractableByName} from "Leaf.lspkg/Interactors/InteractableUtils"
import {sleep} from "Leaf.lspkg/Utils/common/Utils"
import {SquatTestKit} from "./SquatTestKit"

/** Criterion 1 — placement: distance, starting angle, Start available, and a stationary root while animating. */
@component
export class A_PlacementScenario extends Scenario {
  async run(): Promise<void> {
    const kit = new SquatTestKit()
    await kit.ready()

    const pos = kit.mannequinWorldPos()
    const horizontal = Math.sqrt(pos.x * pos.x + pos.z * pos.z)
    kit.log(`mannequin root ${pos.toString()} horizontal distance ${horizontal.toFixed(1)} cm`)
    expect(horizontal, "horizontal distance").toBeGreaterThan(150)
    expect(horizontal, "horizontal distance").toBeLessThan(200)

    const yaw = kit.turntableYawDeg()
    kit.log(`turntable yaw ${yaw.toFixed(1)}°`)
    expect(Math.abs(yaw - 35) < 2, `start yaw ${yaw}`).toBe(true)

    expect(findInteractableByName("Start", undefined, true) !== undefined, "Start button enabled").toBe(true)
    expect(kit.player.isStarted, "not started before Start").toBe(false)

    await kit.tap("Start")
    await sleep(3000)
    const moved = kit.mannequinWorldPos().distance(pos)
    kit.log(`root moved ${moved.toFixed(3)} cm during animation`)
    expect(moved < 0.5, `root moved ${moved}`).toBe(true)
  }
}
