import {Scenario} from "Leaf.lspkg/Scenarios/scenario/Scenario"
import {expect} from "Leaf.lspkg/Utils/common/Expect"
import {sleep} from "Leaf.lspkg/Utils/common/Utils"
import {SquatTestKit} from "./SquatTestKit"

/** Criterion 5 — Front / 45° / Side set the turntable yaw without moving the mannequin or disturbing playback. */
@component
export class E_AnglesScenario extends Scenario {
  async run(): Promise<void> {
    const kit = new SquatTestKit()
    await kit.ready()
    await kit.tap("Start")
    const origin = kit.mannequinWorldPos()

    const cases: [string, number][] = [["Front", 0], ["Angled", 35], ["Side", 90], ["Front", 0]]
    for (const [button, deg] of cases) {
      const tBefore = kit.player.timelineSeconds
      await kit.tap(button)
      await sleep(900) // eased turn is 0.6 s
      const yaw = kit.turntableYawDeg()
      const moved = kit.mannequinWorldPos().distance(origin)
      kit.log(`${button}: yaw ${yaw.toFixed(1)}°, root moved ${moved.toFixed(3)} cm`)
      expect(Math.abs(yaw - deg) < 2, `${button} yaw ${yaw}`).toBe(true)
      expect(moved < 1, `${button} moved ${moved}`).toBe(true)
      if (!kit.player.isComplete) {
        expect(kit.player.timelineSeconds, `${button} playback continues`).toBeGreaterThan(tBefore)
      }
    }
  }
}
