import {Scenario} from "Leaf.lspkg/Scenarios/scenario/Scenario"
import {expect} from "Leaf.lspkg/Utils/common/Expect"
import {sleep} from "Leaf.lspkg/Utils/common/Utils"
import {COMPLETE_MESSAGE, SQUAT_PHASES} from "../SquatPhases"
import {SquatTestKit} from "./SquatTestKit"

const EXPECTED_CUE = ["Cue_FootOutlines", "Cue_KneeArrows", "Cue_HipMarker", "Cue_KneeArrows", "Cue_CompletionRing"]

/** Criteria 2 and 6 — the full demonstration plays five phases in order with matching cues, then completes. */
@component
export class B_FullDemoScenario extends Scenario {
  async run(): Promise<void> {
    const kit = new SquatTestKit()
    await kit.ready()

    await kit.tap("Start")
    const t0 = getTime()
    const seen: string[] = []
    const cueMismatches: string[] = []
    while (!kit.cueText().includes(COMPLETE_MESSAGE)) {
      if (getTime() - t0 > 20) throw new Error("demo did not complete within 20 s")
      const label = kit.phaseLabel()
      if (label.startsWith("PHASE") && seen[seen.length - 1] !== label) {
        seen.push(label)
        const k = seen.length - 1
        expect(kit.phaseTitle(), `title for ${label}`).toBe(SQUAT_PHASES[k].title)
        expect(kit.cueText(), `cue for ${label}`).toBe(SQUAT_PHASES[k].cue)
      }
      // Cue groups must match the phase on every sampled frame.
      const k = seen.length - 1
      if (k >= 0 && kit.cues.activeName !== EXPECTED_CUE[k]) cueMismatches.push(`${label}: ${kit.cues.activeName}`)
      await sleep(80)
    }
    const elapsed = getTime() - t0
    kit.log(`phases seen: ${seen.join(" | ")}; completed in ${elapsed.toFixed(2)} s`)
    expect(seen.join(","), "phase order").toBe("PHASE 1 OF 5,PHASE 2 OF 5,PHASE 3 OF 5,PHASE 4 OF 5,PHASE 5 OF 5")
    expect(elapsed, "duration at 1x").toBeGreaterThan(10)
    expect(elapsed, "duration at 1x").toBeLessThan(15)
    expect(cueMismatches.length, `cue mismatches: ${cueMismatches.slice(0, 3).join("; ")}`).toBe(0)
    expect(kit.phaseLabel(), "completion label").toBe("COMPLETE")
    expect(kit.player.isPlaying, "stops at completion").toBe(false)
    await sleep(1500)
    expect(kit.cueText().includes(COMPLETE_MESSAGE), "no auto-restart").toBe(true)
  }
}
