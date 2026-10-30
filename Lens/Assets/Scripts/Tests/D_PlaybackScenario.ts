import {Scenario} from "Leaf.lspkg/Scenarios/scenario/Scenario"
import {expect} from "Leaf.lspkg/Utils/common/Expect"
import {sleep} from "Leaf.lspkg/Utils/common/Utils"
import {SquatTestKit} from "./SquatTestKit"

/** Criterion 4 — Pause freezes the joints, Play resumes, Replay restarts, and Slow doubles the run time. */
@component
export class D_PlaybackScenario extends Scenario {
  async run(): Promise<void> {
    const kit = new SquatTestKit()
    await kit.ready()
    await kit.tap("Start")

    // Pause mid-descent.
    await sleep(2000)
    await kit.tap("PlayPause")
    expect(kit.player.isPlaying, "paused").toBe(false)
    const a = kit.rig.measuredKneeFlexionDeg()
    const tA = kit.player.timelineSeconds
    await sleep(500)
    const b = kit.rig.measuredKneeFlexionDeg()
    kit.log(`paused knee ${a.toFixed(2)}° -> ${b.toFixed(2)}°`)
    expect(Math.abs(a - b) < 0.5, "joints frozen while paused").toBe(true)
    expect(kit.player.timelineSeconds, "timeline frozen").toBe(tA)

    // Resume continues from the same point.
    await kit.tap("PlayPause")
    await sleep(600)
    expect(kit.player.isPlaying, "playing after resume").toBe(true)
    expect(kit.player.timelineSeconds, "timeline advanced").toBeGreaterThan(tA)

    // Replay restarts at phase 1.
    await kit.tap("Replay")
    await sleep(300)
    expect(kit.phaseLabel(), "replay restarts").toBe("PHASE 1 OF 5")

    // Uninterrupted 1x run, then Slow run; compare wall-clock durations.
    await kit.waitFor(() => kit.player.isComplete, 20000, "1x completion")
    const d1 = kit.player.lastRunDurationSeconds
    await kit.tap("Slow")
    expect(kit.player.isSlow, "slow on").toBe(true)
    await kit.tap("Replay")
    await kit.waitFor(() => kit.player.isComplete, 35000, "0.5x completion")
    const d2 = kit.player.lastRunDurationSeconds
    const ratio = d2 / d1
    kit.log(`1x ${d1.toFixed(2)} s, 0.5x ${d2.toFixed(2)} s, ratio ${ratio.toFixed(2)}`)
    expect(ratio, "slow ratio").toBeGreaterThan(1.8)
    expect(ratio, "slow ratio").toBeLessThan(2.2)
  }
}
