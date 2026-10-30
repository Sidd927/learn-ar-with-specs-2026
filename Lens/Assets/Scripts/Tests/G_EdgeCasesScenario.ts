import {Scenario} from "Leaf.lspkg/Scenarios/scenario/Scenario"
import {expect} from "Leaf.lspkg/Utils/common/Expect"
import {sleep} from "Leaf.lspkg/Utils/common/Utils"
import {COMPLETE_MESSAGE} from "../SquatPhases"
import {SquatTestKit} from "./SquatTestKit"

/** Edge cases: pause mid-transition, UI state sync, Next while playing, completion and replay after it. */
@component
export class G_EdgeCasesScenario extends Scenario {
  async run(): Promise<void> {
    const kit = new SquatTestKit()
    await kit.ready()
    const label = (button: string): Text => {
      const so = kit.ui.getButton(button).getSceneObject()
      for (let i = 0; i < so.getChildrenCount(); i++) {
        if (so.getChild(i).name === "Label") return so.getChild(i).getComponent("Component.Text") as Text
      }
      throw new Error(`No label on ${button}`)
    }

    await kit.tap("Start")
    expect(label("PlayPause").text, "label while playing").toBe("Pause")
    expect(label("Previous").textFill.color.w < 0.5, "Previous dimmed at phase 1").toBe(true)

    // Pause in the middle of the first transition (1.5–2.7 s).
    await sleep(1900)
    await kit.tap("PlayPause")
    const t = kit.player.timelineSeconds
    kit.log(`paused at timeline ${t.toFixed(2)} s`)
    expect(t > 1.5 && t < 2.7, "paused mid-transition").toBe(true)
    const k1 = kit.rig.measuredKneeFlexionDeg()
    await sleep(600)
    expect(Math.abs(kit.rig.measuredKneeFlexionDeg() - k1) < 0.5, "frozen mid-transition").toBe(true)
    expect(label("PlayPause").text, "label while paused").toBe("Play")

    // Toggle states mirror the player and turntable.
    await kit.tap("Slow")
    expect(kit.ui.getButton("Slow").isOn && kit.player.isSlow, "Slow on").toBe(true)
    await kit.tap("Slow")
    expect(!kit.ui.getButton("Slow").isOn && !kit.player.isSlow, "Slow off").toBe(true)
    await kit.tap("Side")
    expect(kit.ui.getButton("Side").isOn, "Side on").toBe(true)
    expect(kit.ui.getButton("Front").isOn || kit.ui.getButton("Angled").isOn, "others off").toBe(false)

    // Next while playing pauses and advances one phase.
    await kit.tap("PlayPause")
    await sleep(200)
    const before = kit.player.phaseIndex
    await kit.tap("Next")
    expect(kit.player.isPlaying, "Next pauses playback").toBe(false)
    expect(kit.player.phaseIndex, "Next advances one").toBe(before + 1)

    // Step to the last phase, play to completion.
    while (kit.player.phaseIndex < 4) {
      await kit.tap("Next")
      await sleep(250)
    }
    expect(label("Next").textFill.color.w < 0.5, "Next dimmed at phase 5").toBe(true)
    await kit.tap("PlayPause")
    await kit.waitFor(() => kit.player.isComplete, 5000, "completion from phase 5")
    expect(kit.cueText().includes(COMPLETE_MESSAGE), "completion message").toBe(true)
    expect(label("PlayPause").text, "label at completion").toBe("Play")

    // Play after completion restarts from phase 1; Replay does too.
    await kit.tap("PlayPause")
    await sleep(200)
    expect(kit.phaseLabel(), "Play after completion restarts").toBe("PHASE 1 OF 5")
    expect(kit.player.isPlaying, "playing again").toBe(true)
    await sleep(1000)
    // Replay must jump back to the start. Compare against the value just before the tap:
    // the simulated pinch itself takes a few hundred ms of real playback time.
    const beforeReplay = kit.player.timelineSeconds
    await kit.tap("Replay")
    const afterReplay = kit.player.timelineSeconds
    kit.log(`replay: timeline ${beforeReplay.toFixed(2)} s -> ${afterReplay.toFixed(2)} s`)
    expect(afterReplay < beforeReplay - 0.3, "Replay resets the timeline").toBe(true)
    expect(kit.phaseLabel(), "Replay shows phase 1").toBe("PHASE 1 OF 5")
    kit.log("edge cases ok")
  }
}
