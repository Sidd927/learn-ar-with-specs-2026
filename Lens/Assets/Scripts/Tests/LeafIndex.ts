import {scenariosIndex} from "Leaf.lspkg/Scenarios/decorator/ScenarioIndexDecorator"
import {ScenarioMetadata} from "Leaf.lspkg/Scenarios/scenario/ScenarioMetadata"
import {A_PlacementScenario} from "./A_PlacementScenario"
import {B_FullDemoScenario} from "./B_FullDemoScenario"
import {C_SteppingScenario} from "./C_SteppingScenario"
import {D_PlaybackScenario} from "./D_PlaybackScenario"
import {E_AnglesScenario} from "./E_AnglesScenario"
import {F_CuesScenario} from "./F_CuesScenario"
import {G_EdgeCasesScenario} from "./G_EdgeCasesScenario"
import {H_MistakeCompareScenario} from "./H_MistakeCompareScenario"

/** Registers the Squat Tutor acceptance scenarios with LEAF. */
@component
export class LeafIndex extends BaseScriptComponent {
  @scenariosIndex
  static scenariosIndex: ScenarioMetadata[] = [
    {id: "a-placement", typename: A_PlacementScenario.getTypeName()},
    {id: "b-full-demo", typename: B_FullDemoScenario.getTypeName()},
    {id: "c-stepping", typename: C_SteppingScenario.getTypeName()},
    {id: "d-playback", typename: D_PlaybackScenario.getTypeName()},
    {id: "e-angles", typename: E_AnglesScenario.getTypeName()},
    {id: "f-cues", typename: F_CuesScenario.getTypeName()},
    {id: "g-edge-cases", typename: G_EdgeCasesScenario.getTypeName()},
    {id: "h-mistake-compare", typename: H_MistakeCompareScenario.getTypeName()}
  ]
}
