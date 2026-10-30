import {Scenario} from "Leaf.lspkg/Scenarios/scenario/Scenario"
import {expect} from "Leaf.lspkg/Utils/common/Expect"
import {sleep} from "Leaf.lspkg/Utils/common/Utils"
import {SquatTestKit} from "./SquatTestKit"

const GROUPS = ["Cue_FootOutlines", "Cue_KneeArrows", "Cue_HipMarker", "Cue_CompletionRing"]
const EXPECTED = ["Cue_FootOutlines", "Cue_KneeArrows", "Cue_HipMarker", "Cue_KneeArrows", "Cue_CompletionRing"]

/** Criterion 6 — exactly one cue group is visible per phase, and it is the right one. */
@component
export class F_CuesScenario extends Scenario {
  async run(): Promise<void> {
    const kit = new SquatTestKit()
    await kit.ready()
    for (const g of GROUPS) {
      expect(SquatTestKit.mustFind(g).enabled, `${g} hidden before Start`).toBe(false)
    }
    await kit.tap("Start")
    await sleep(300)
    await kit.tap("PlayPause")
    for (let k = 0; k < 5; k++) {
      if (k > 0) {
        await kit.tap("Next")
        await sleep(700)
      }
      const visible = GROUPS.filter((g) => SquatTestKit.mustFind(g).enabled)
      kit.log(`phase ${k + 1}: visible cues ${visible.join(", ")}`)
      expect(visible.length, `one cue in phase ${k + 1}`).toBe(1)
      expect(visible[0], `cue for phase ${k + 1}`).toBe(EXPECTED[k])
    }
  }
}
