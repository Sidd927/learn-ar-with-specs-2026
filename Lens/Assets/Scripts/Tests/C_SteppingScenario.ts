import {Scenario} from "Leaf.lspkg/Scenarios/scenario/Scenario"
import {expect} from "Leaf.lspkg/Utils/common/Expect"
import {sleep} from "Leaf.lspkg/Utils/common/Utils"
import {findInteractableByName} from "Leaf.lspkg/Interactors/InteractableUtils"
import {SQUAT_PHASES} from "../SquatPhases"
import {SquatTestKit} from "./SquatTestKit"

/** Criterion 3 — Next / Previous move exactly one phase, stop at the ends, and pose the knee for that phase. */
@component
export class C_SteppingScenario extends Scenario {
  async run(): Promise<void> {
    const kit = new SquatTestKit()
    await kit.ready()
    await kit.tap("Start")
    await sleep(300)

    const check = async (k: number) => {
      await sleep(900) // step tween is 0.6 s
      expect(kit.phaseLabel(), "label").toBe(`PHASE ${k + 1} OF 5`)
      expect(kit.phaseTitle(), "title").toBe(SQUAT_PHASES[k].title)
      const target = kit.rig.kneeFlexionForPose(SQUAT_PHASES[k].pose)
      const measured = kit.rig.measuredKneeFlexionDeg()
      kit.log(`phase ${k + 1}: knee ${measured.toFixed(1)}° (target ${target.toFixed(1)}°)`)
      expect(Math.abs(measured - target) < 2, `knee ${measured} vs ${target}`).toBe(true)
    }

    // Stepping pauses playback; walk forward to the end.
    for (let k = 1; k < 5; k++) {
      await kit.tap("Next")
      await check(k)
      expect(kit.player.isPlaying, "paused after step").toBe(false)
    }
    // Boundary: Next is disabled at the last phase, and the player ignores a further step.
    expect(findInteractableByName("Next", undefined, true) === undefined, "Next disabled at phase 5").toBe(true)
    kit.player.next()
    await check(4)
    for (let k = 3; k >= 0; k--) {
      await kit.tap("Previous")
      await check(k)
    }
    // Boundary: Previous is disabled at the first phase, and the player ignores a further step.
    expect(findInteractableByName("Previous", undefined, true) === undefined, "Previous disabled at phase 1").toBe(true)
    kit.player.previous()
    await check(0)
  }
}
