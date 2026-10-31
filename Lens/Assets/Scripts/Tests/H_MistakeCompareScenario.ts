import {Scenario} from "Leaf.lspkg/Scenarios/scenario/Scenario"
import {expect} from "Leaf.lspkg/Utils/common/Expect"
import {sleep} from "Leaf.lspkg/Utils/common/Utils"
import {
  COMPARE_ACTIVE_LABEL, COMPARE_LABEL, COMPARE_NOTE, DISCLAIMER, FAULT_PHASE_INDEX,
  SQUAT_FAULTS, SQUAT_PHASES, SquatFault, VIEW_ANGLES
} from "../SquatPhases"
import {SquatTutorController} from "../SquatTutorController"
import {SquatTestKit} from "./SquatTestKit"

/**
 * Coach's Eye (done criterion 7). For each of Knees, Heels and Chest: the red pattern figure
 * appears at the Bottom Position, paused; the stage turns to that pattern's view from a
 * different starting angle; the card shows the view label, title, red and target lines,
 * return hint and exaggeration note; only that toggle is on; and the red figure differs from
 * the white one in the intended direction. Slow and the angle buttons keep the comparison open.
 * Every reachable exit (same button, Play, Prev, Next, Replay) closes it and restores the card.
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
    const fault = (id: string): SquatFault => SQUAT_FAULTS.find((f) => f.id === id) as SquatFault
    const yawNear = (deg: number) => Math.abs(kit.turntableYawDeg() - deg) < 2

    const expectOpen = (f: SquatFault) => {
      const p = `${f.id}: `
      expect(ghost.enabled, p + "red figure shown").toBe(true)
      expect(controller.activeFaultId, p + "active comparison").toBe(f.id)
      expect(kit.player.phaseIndex, p + "at the Bottom Position").toBe(FAULT_PHASE_INDEX)
      expect(kit.player.isPlaying, p + "paused").toBe(false)
      expect(yawNear(VIEW_ANGLES[f.view]), p + `turned to ${f.view} view`).toBe(true)
      expect(kit.phaseLabel(), p + "view label").toBe(f.viewLabel)
      expect(kit.phaseTitle(), p + "title").toBe(f.title)
      expect(kit.cueText(), p + "red and target lines").toBe(`Red: ${f.mistake}\nWhite (target): ${f.target}`)
      expect(kit.text("MistakesLabel"), p + "return hint").toBe(COMPARE_ACTIVE_LABEL)
      expect(kit.text("Disclaimer"), p + "exaggeration note").toBe(COMPARE_NOTE)
      for (const g of SQUAT_FAULTS) {
        expect(kit.ui.getButton("Fault_" + g.id).isOn, p + `toggle ${g.id}`).toBe(g.id === f.id)
      }
    }

    const expectClosed = (via: string) => {
      const p = `exit by ${via}: `
      expect(ghost.enabled, p + "red figure hidden").toBe(false)
      expect(controller.activeFaultId, p + "no active comparison").toBe("")
      expect(kit.text("MistakesLabel"), p + "row label restored").toBe(COMPARE_LABEL)
      expect(kit.text("Disclaimer"), p + "disclaimer restored").toBe(DISCLAIMER)
      expect(kit.phaseLabel().startsWith("PHASE "), p + "phase label restored").toBe(true)
      for (const g of SQUAT_FAULTS) {
        expect(kit.ui.getButton("Fault_" + g.id).isOn, p + `toggle ${g.id} off`).toBe(false)
      }
    }

    expect(ghost.enabled, "red figure hidden at launch").toBe(false)
    await kit.tap("Start")
    await sleep(500)

    // Knees: from the default 35° view to the front.
    await kit.tap("Fault_knees")
    await sleep(900)
    expectOpen(fault("knees"))
    const targetKneeX = Math.abs(local("KneeL").x)
    const redKneeX = Math.abs(local("GhostKneeL").x)
    kit.log(`knees: target |x| ${targetKneeX.toFixed(1)} cm, mistake |x| ${redKneeX.toFixed(1)} cm`)
    expect(redKneeX < targetKneeX - 2, "knees: red knees closer to the midline").toBe(true)

    // Slow and the angle buttons don't close the comparison.
    await kit.tap("Slow")
    await sleep(300)
    expect(kit.player.isSlow, "Slow on while comparing").toBe(true)
    expect(controller.activeFaultId, "Slow keeps the comparison").toBe("knees")
    await kit.tap("Slow")
    await sleep(300)
    expect(kit.player.isSlow, "Slow off again").toBe(false)
    await kit.tap("Angled")
    await sleep(900)
    expect(yawNear(VIEW_ANGLES.angled), "35° button turns the stage while comparing").toBe(true)
    expect(controller.activeFaultId, "angle button keeps the comparison").toBe("knees")
    expect(ghost.enabled, "red figure still shown after angle change").toBe(true)

    // Heels: from 35° to the side.
    await kit.tap("Fault_heels")
    await sleep(900)
    expectOpen(fault("heels"))
    const lift = local("GhostAnkleL").y - local("AnkleL").y
    kit.log(`heels: mistake ankle ${lift.toFixed(1)} cm higher`)
    expect(lift > 3, "heels: red ankle higher").toBe(true)

    // Chest: from the front to the side.
    await kit.tap("Front")
    await sleep(900)
    expect(yawNear(VIEW_ANGLES.front), "Front button turns the stage while comparing").toBe(true)
    await kit.tap("Fault_chest")
    await sleep(900)
    expectOpen(fault("chest"))
    const forward = local("GhostHead").z - local("Head").z
    kit.log(`chest: mistake head ${forward.toFixed(1)} cm further forward`)
    expect(forward > 3, "chest: red head further forward").toBe(true)

    // Exit 1: the same button again stays paused on the Bottom Position.
    await kit.tap("Fault_chest")
    await sleep(300)
    expectClosed("same button")
    expect(kit.phaseTitle(), "same button: back to the phase").toBe(SQUAT_PHASES[FAULT_PHASE_INDEX].title)
    expect(kit.player.isPlaying, "same button: still paused").toBe(false)

    // Exit 2: Play.
    await kit.tap("Fault_knees")
    await sleep(900)
    await kit.tap("PlayPause")
    await sleep(300)
    expectClosed("Play")
    expect(kit.player.isPlaying, "Play: playing again").toBe(true)

    // Exit 3: Prev steps back one phase from the Bottom Position.
    await kit.tap("Fault_knees")
    await sleep(900)
    await kit.tap("Previous")
    await sleep(900)
    expectClosed("Prev")
    expect(kit.player.phaseIndex, "Prev: one phase back").toBe(FAULT_PHASE_INDEX - 1)
    expect(kit.phaseTitle(), "Prev: phase title").toBe(SQUAT_PHASES[FAULT_PHASE_INDEX - 1].title)

    // Exit 4: Next steps forward one phase from the Bottom Position.
    await kit.tap("Fault_knees")
    await sleep(900)
    await kit.tap("Next")
    await sleep(900)
    expectClosed("Next")
    expect(kit.player.phaseIndex, "Next: one phase forward").toBe(FAULT_PHASE_INDEX + 1)
    expect(kit.phaseTitle(), "Next: phase title").toBe(SQUAT_PHASES[FAULT_PHASE_INDEX + 1].title)

    // Exit 5: Replay restarts from phase 1 and plays.
    await kit.tap("Fault_knees")
    await sleep(900)
    await kit.tap("Replay")
    await sleep(300)
    expectClosed("Replay")
    expect(kit.player.isPlaying, "Replay: playing").toBe(true)
    expect(kit.player.phaseIndex, "Replay: phase 1").toBe(0)

    kit.log("mistake comparison ok (3 patterns, 5 exits, Slow and angle keep it open)")
  }
}
