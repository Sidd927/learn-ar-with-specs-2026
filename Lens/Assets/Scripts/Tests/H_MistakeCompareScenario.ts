import {Scenario} from "Leaf.lspkg/Scenarios/scenario/Scenario"
import {expect} from "Leaf.lspkg/Utils/common/Expect"
import {sleep} from "Leaf.lspkg/Utils/common/Utils"
import {COMPARE_ACTIVE_LABEL, COMPARE_LABEL, COMPARE_NOTE, DISCLAIMER} from "../SquatPhases"
import {SquatTutorController} from "../SquatTutorController"
import {SquatTestKit} from "./SquatTestKit"

/**
 * Coach's Eye: each common-mistake button shows the translucent mistake figure over the
 * target at the Bottom Position, turns the stage to the checkpoint view, and explains it;
 * pressing it again (or any playback control) returns to the normal demonstration.
 */
@component
export class H_MistakeCompareScenario extends Scenario {
  async run(): Promise<void> {
    const kit = new SquatTestKit()
    await kit.ready()
    const controller = SquatTestKit.mustFind("Systems").getComponent(SquatTutorController.getTypeName()) as SquatTutorController
    const ghost = SquatTestKit.mustFind("GhostMannequin")
    const world = (name: string) => SquatTestKit.mustFind(name).getTransform().getWorldPosition()
    const turntableInv = () => SquatTestKit.mustFind("Turntable").getTransform().getInvertedWorldTransform()
    const local = (name: string) => turntableInv().multiplyPoint(world(name))

    expect(ghost.enabled, "mistake figure hidden at launch").toBe(false)
    await kit.tap("Start")
    await sleep(500)

    // Knees caving in: front view, mistake knees closer to the midline than the target's.
    await kit.tap("Fault_knees")
    await sleep(900)
    expect(ghost.enabled, "mistake figure shown").toBe(true)
    expect(kit.player.phaseIndex, "moved to Bottom Position").toBe(2)
    expect(kit.player.isPlaying, "paused for comparison").toBe(false)
    expect(Math.abs(kit.turntableYawDeg()) < 2, "turned to front view").toBe(true)
    expect(kit.phaseTitle(), "title").toBe("Knees caving in")
    expect(kit.phaseLabel(), "view label").toBe("BEST SEEN FROM THE FRONT")
    expect(kit.cueText().includes("White (target)"), "target named").toBe(true)
    expect(kit.text("MistakesLabel"), "return hint").toBe(COMPARE_ACTIVE_LABEL)
    expect(kit.text("Disclaimer"), "exaggeration note").toBe(COMPARE_NOTE)
    const targetKneeX = Math.abs(local("KneeL").x)
    const mistakeKneeX = Math.abs(local("GhostKneeL").x)
    kit.log(`knees: target |x| ${targetKneeX.toFixed(1)} cm, mistake |x| ${mistakeKneeX.toFixed(1)} cm`)
    expect(mistakeKneeX < targetKneeX - 2, "mistake knees drift inward").toBe(true)

    // Heels lifting: side view, mistake ankle higher than the target's.
    await kit.tap("Fault_heels")
    await sleep(900)
    expect(Math.abs(kit.turntableYawDeg() - 90) < 2, "turned to side view").toBe(true)
    expect(kit.phaseTitle(), "title").toBe("Heels lifting")
    expect(kit.phaseLabel(), "view label").toBe("BEST SEEN FROM THE SIDE")
    const lift = local("GhostAnkleL").y - local("AnkleL").y
    kit.log(`heels: mistake ankle ${lift.toFixed(1)} cm higher`)
    expect(lift > 3, "mistake heels lifted").toBe(true)

    // Chest dropping: side view, mistake head further forward than the target's.
    await kit.tap("Fault_chest")
    await sleep(900)
    expect(kit.phaseTitle(), "title").toBe("Chest dropping")
    const forward = local("GhostHead").z - local("Head").z
    kit.log(`chest: mistake head ${forward.toFixed(1)} cm further forward`)
    expect(forward > 3, "mistake chest tips forward").toBe(true)
    expect(controller.activeFaultId, "active fault").toBe("chest")

    // Same button again clears; a playback control also clears.
    await kit.tap("Fault_chest")
    await sleep(300)
    expect(ghost.enabled, "cleared by toggling").toBe(false)
    expect(kit.phaseTitle(), "back to the phase").toBe("Bottom Position")
    expect(kit.text("MistakesLabel"), "label restored").toBe(COMPARE_LABEL)
    expect(kit.text("Disclaimer"), "disclaimer restored").toBe(DISCLAIMER)
    await kit.tap("Fault_knees")
    await sleep(300)
    await kit.tap("PlayPause")
    await sleep(300)
    expect(ghost.enabled, "cleared by Play").toBe(false)
    expect(kit.player.isPlaying, "playing again").toBe(true)
    kit.log("mistake comparison ok")
  }
}
