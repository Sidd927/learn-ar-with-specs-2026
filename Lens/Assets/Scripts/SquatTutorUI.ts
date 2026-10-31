import Event, {PublicApi} from "SpectaclesInteractionKit.lspkg/Utils/Event"
import {BackPlate} from "SpectaclesUIKit.lspkg/Scripts/BackPlate"
import {Button} from "SpectaclesUIKit.lspkg/Scripts/Components/Button/Button"
import {FlexItem} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexItem"
import {FlexLayout} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexLayout"
import {
  FlexAlign, FlexAlignSelf, FlexDirection, FlexJustify
} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexTypes"
import {
  COMPARE_ACTIVE_LABEL, COMPARE_LABEL, COMPARE_NOTE, COMPLETE_MESSAGE, COMPLETE_TITLE, DISCLAIMER,
  INTRO_BODY, PHASE_COUNT, SQUAT_FAULTS, SquatFault, VIEW_ANGLES
} from "./SquatPhases"

// ── Typography: the single source of truth for text size + weight ────────────
// `Component.Text.size` is the em-square height (em cm = size / 43.886), calibrated
// for the SnapOS system font at 110 cm. Panels here sit at PANEL_DISTANCE, so every
// role is scaled by distance / 110.
const FONT_SIZE_SCALE = 1.0
type TextRole = "Title1" | "Title2" | "HeadlineXL" | "Headline1" | "Headline2"
  | "Subheadline" | "Button" | "Callout" | "Body" | "Caption"
const TYPE_SCALE: Record<TextRole, {size: number; weight: number}> = {
  Title1: {size: 105, weight: 700},
  Title2: {size: 93, weight: 700},
  HeadlineXL: {size: 62, weight: 700},
  Headline1: {size: 54, weight: 700},
  Headline2: {size: 48, weight: 700},
  Subheadline: {size: 41, weight: 700},
  Button: {size: 39, weight: 500},
  Callout: {size: 39, weight: 700},
  Body: {size: 39, weight: 500},
  Caption: {size: 38, weight: 500}
}
const PANEL_DISTANCE = 155
function roleSize(role: TextRole, distanceCm: number = PANEL_DISTANCE): number {
  return TYPE_SCALE[role].size * FONT_SIZE_SCALE * (distanceCm / 110)
}
function applyTextRole(t: Text, role: TextRole, distanceCm: number = PANEL_DISTANCE): void {
  t.size = roleSize(role, distanceCm)
  ;(t as Text & {weight?: number}).weight = TYPE_SCALE[role].weight
}

// Children get a FlexItem and are picked up by FlexLayout's auto-discovery at start
// (autoDiscoverItemsOnStart). Calling addItems() before the layout initializes throws.
const LAYOUT_Z_LIFT = 0.02
const BUTTON_LABEL_Z = 0.08
const CONTENT_Z = 0.6

const DOT_MESH = requireAsset("../Meshes/MannequinSphere.mesh") as RenderMesh
const DOT_ON_MAT = requireAsset("../Materials/CueHighlight.mat") as Material
const DOT_OFF_MAT = requireAsset("../Materials/StandColumnMaterial.mat") as Material

export type ViewAngle = "front" | "angled" | "side"

/**
 * All Squat Tutor UI: the intro card and Start button, then the phase cue card
 * (left of the mannequin) and the control panel (right of the mannequin).
 * Main → UI through the set* methods; UI → main through the on* events.
 */
@component
export class SquatTutorUI extends BaseScriptComponent {
  @ui.label("Squat Tutor UI — cue card and controls (UIKit)")
  @ui.separator
  @ui.group_start("Layout")
  @input
  @hint("Card / panel centre offset to each side of the mannequin (cm)")
  sideOffset: number = 33

  @input
  @hint("Height of the card / panel centres relative to eye level at start (cm)")
  panelHeight: number = -26

  @input
  @hint("Distance of the cards / panels from the user's start position (cm)")
  panelDistance: number = 155

  @input
  @hint("Cue card width (cm)")
  @widget(new SliderWidget(20, 40, 0.5))
  cardWidth: number = 21

  @input
  @hint("Control panel width (cm)")
  @widget(new SliderWidget(20, 40, 0.5))
  panelWidth: number = 20
  @ui.group_end

  @ui.group_start("Text")
  @input
  @hint("Intro title")
  introTitle: string = "Squat Tutor"


  @input
  @hint("Accent colour for phase labels")
  @widget(new ColorWidget())
  accentColor: vec4 = new vec4(1.0, 0.78, 0.38, 1)

  @input
  @hint("Primary text colour")
  @widget(new ColorWidget())
  textColor: vec4 = new vec4(1, 1, 1, 1)

  @input
  @hint("Secondary text colour")
  @widget(new ColorWidget())
  subtleColor: vec4 = new vec4(1, 1, 1, 0.6)
  @ui.group_end

  // ---- Events (UI → main) ----
  private _onStart = new Event<void>()
  private _onPrevious = new Event<void>()
  private _onPlayPause = new Event<void>()
  private _onNext = new Event<void>()
  private _onSlow = new Event<void>()
  private _onReplay = new Event<void>()
  private _onAngle = new Event<ViewAngle>()
  private _onFault = new Event<string>()
  get onStart(): PublicApi<void> { return this._onStart.publicApi() }
  get onPrevious(): PublicApi<void> { return this._onPrevious.publicApi() }
  get onPlayPause(): PublicApi<void> { return this._onPlayPause.publicApi() }
  get onNext(): PublicApi<void> { return this._onNext.publicApi() }
  get onSlow(): PublicApi<void> { return this._onSlow.publicApi() }
  get onReplay(): PublicApi<void> { return this._onReplay.publicApi() }
  get onAngle(): PublicApi<ViewAngle> { return this._onAngle.publicApi() }
  /** Fires with a fault id when a "Common mistakes" button is pressed. */
  get onFault(): PublicApi<string> { return this._onFault.publicApi() }

  // ---- Built elements ----
  private introCard!: SceneObject
  private startPanel!: SceneObject
  private cueCard!: SceneObject
  private controlPanel!: SceneObject
  private phaseLabel!: Text
  private titleText!: Text
  private cueText!: Text
  private compareLabel!: Text
  private disclaimerText!: Text
  private dots: RenderMeshVisual[] = []
  private buttons: Record<string, Button> = {}
  private buttonLabels: Record<string, Text> = {}
  private playLabel!: Text
  private slowLabel!: Text

  private pendingInit = 0
  private ready = false
  private showingIntro = true
  private _onReady = new Event<void>()
  /** Fires once every UIKit element has initialized (state can be pushed safely after this). */
  get onReady(): PublicApi<void> { return this._onReady.publicApi() }
  get isReady(): boolean { return this.ready }

  onAwake(): void {
    const left = this.slot("LeftSlot", -1)
    const right = this.slot("RightSlot", 1)
    this.introCard = this.buildIntroCard(left)
    this.cueCard = this.buildCueCard(left)
    this.startPanel = this.buildStartPanel(right)
    this.controlPanel = this.buildControlPanel(right)
  }

  // ---- Main → UI ---------------------------------------------------------

  /** Before Start: intro + Start. After: cue card + controls. */
  showIntro(show: boolean): void {
    this.showingIntro = show
    if (!this.ready) return
    this.introCard.enabled = show
    this.startPanel.enabled = show
    this.cueCard.enabled = !show
    this.controlPanel.enabled = !show
  }

  setPhase(index: number, title: string, cue: string): void {
    this.phaseLabel.text = `PHASE ${index + 1} OF ${PHASE_COUNT}`
    this.titleText.text = title
    this.cueText.text = cue
    for (let i = 0; i < this.dots.length; i++) {
      this.dots[i].mainMaterial = i <= index ? DOT_ON_MAT : DOT_OFF_MAT
    }
  }

  /** Show a mistake comparison on the cue card (or null to clear the toggle highlights). */
  showFault(fault: SquatFault | null): void {
    for (const f of SQUAT_FAULTS) this.setOn("Fault_" + f.id, fault !== null && f.id === fault.id)
    this.compareLabel.text = fault ? COMPARE_ACTIVE_LABEL : COMPARE_LABEL
    this.disclaimerText.text = fault ? COMPARE_NOTE : DISCLAIMER
    if (!fault) return
    this.phaseLabel.text = fault.viewLabel
    this.titleText.text = fault.title
    this.cueText.text = `Red: ${fault.mistake}\nWhite (target): ${fault.target}`
  }

  setComplete(): void {
    this.phaseLabel.text = "COMPLETE"
    this.titleText.text = COMPLETE_TITLE
    this.cueText.text = COMPLETE_MESSAGE
    for (const d of this.dots) d.mainMaterial = DOT_ON_MAT
  }

  setPlaying(playing: boolean, complete: boolean): void {
    if (this.playLabel) this.playLabel.text = playing ? "Pause" : "Play"
  }

  setSlow(slow: boolean): void {
    if (this.slowLabel) this.slowLabel.text = slow ? "Slow 0.5x: on" : "Slow 0.5x"
    this.setOn("Slow", slow)
  }

  setAngle(angle: ViewAngle): void {
    this.setOn("Front", angle === "front")
    this.setOn("Angled", angle === "angled")
    this.setOn("Side", angle === "side")
  }

  setStepBounds(canPrevious: boolean, canNext: boolean): void {
    this.setInactive("Previous", !canPrevious)
    this.setInactive("Next", !canNext)
  }

  // ---- Panels --------------------------------------------------------------

  private slot(name: string, side: number): SceneObject {
    const so = this.obj(this.sceneObject, name, new vec3(side * this.sideOffset, this.panelHeight, -this.panelDistance))
    // Turn each panel to face the user's start position.
    const yaw = Math.atan2(this.sideOffset, this.panelDistance) * -side
    so.getTransform().setLocalRotation(quat.angleAxis(yaw, vec3.up()))
    so.createComponent("Component.Canvas")
    return so
  }

  private panel(parent: SceneObject, name: string, width: number, gap: number, pad: number): {root: SceneObject; column: SceneObject} {
    const root = this.obj(parent, name)
    const plate = root.createComponent(BackPlate.getTypeName()) as BackPlate
    const content = this.obj(root, "Content", new vec3(0, 0, CONTENT_Z))
    const flex = content.createComponent(FlexLayout.getTypeName()) as FlexLayout
    flex.width = width
    flex.height = -1
    flex.direction = FlexDirection.Column
    flex.alignItems = FlexAlign.Stretch
    flex.justifyContent = FlexJustify.Start
    flex.rowGap = gap
    flex.paddingTop = pad
    flex.paddingBottom = pad
    flex.paddingLeft = pad
    flex.paddingRight = pad
    flex.onLayoutComplete.add((r) => {
      plate.size = new vec2(r.containerWidth, r.containerHeight)
    })
    return {root, column: content}
  }

  private buildIntroCard(parent: SceneObject): SceneObject {
    const {root, column} = this.panel(parent, "IntroCard", this.cardWidth, 0.8, 1.6)
    this.textRow(column, "IntroLabel", "BODYWEIGHT SQUAT", "Caption", 2.0, this.accentColor)
    this.textRow(column, "IntroTitle", this.introTitle, "Headline1", 3.4, this.textColor)
    this.textRow(column, "IntroBody", INTRO_BODY, "Body", 6.6, this.subtleColor, true)
    this.textRow(column, "IntroDisclaimer", DISCLAIMER, "Caption", 3.6, this.subtleColor, true)
    return root
  }

  private buildStartPanel(parent: SceneObject): SceneObject {
    const {root, column} = this.panel(parent, "StartPanel", this.panelWidth, 0.8, 1.6)
    this.textRow(column, "StartHint", "Pinch Start to watch the full squat", "Caption", 2.4, this.subtleColor, true)
    const row = this.row(column, 5.6)
    this.addButton(row, "Start", "Start", this.panelWidth - 3.2, 5.0, "Primary", () => this._onStart.invoke())
    return root
  }

  private buildCueCard(parent: SceneObject): SceneObject {
    const {root, column} = this.panel(parent, "CueCard", this.cardWidth, 0.6, 1.6)
    this.phaseLabel = this.textRow(column, "PhaseLabel", `PHASE 1 OF ${PHASE_COUNT}`, "Caption", 2.0, this.accentColor)
    this.titleText = this.textRow(column, "PhaseTitle", "Starting Stance", "Headline2", 3.0, this.textColor)
    this.cueText = this.textRow(column, "PhaseCue", "", "Body", 5.8, this.textColor, true)
    this.buildDots(column)
    this.compareLabel = this.textRow(column, "MistakesLabel", COMPARE_LABEL, "Caption", 1.8, this.subtleColor)
    const faults = this.row(column, 3.6)
    const third = (this.cardWidth - 3.2 - 2 * 0.7) / 3
    for (const f of SQUAT_FAULTS) {
      this.addButton(faults, "Fault_" + f.id, f.button, third, 3.4, "PrimaryNeutral", () => this._onFault.invoke(f.id), true)
    }
    this.disclaimerText = this.textRow(column, "Disclaimer", DISCLAIMER, "Caption", 3.4, this.subtleColor, true)
    return root
  }

  private buildDots(column: SceneObject): void {
    const dotRow = this.obj(column, "ProgressDots")
    this.liftInZ(dotRow, LAYOUT_Z_LIFT)
    const item = dotRow.createComponent(FlexItem.getTypeName()) as FlexItem
    item.overrideHeight = 1.6
    const flex = dotRow.createComponent(FlexLayout.getTypeName()) as FlexLayout
    flex.direction = FlexDirection.Row
    flex.justifyContent = FlexJustify.Start
    flex.alignItems = FlexAlign.Center
    flex.columnGap = 0.9
    flex.height = 1.6
    flex.width = -1
    for (let i = 0; i < PHASE_COUNT; i++) {
      const dot = this.obj(dotRow, "Dot" + (i + 1))
      dot.getTransform().setLocalScale(new vec3(1.1, 1.1, 0.4))
      const rmv = dot.createComponent("Component.RenderMeshVisual") as RenderMeshVisual
      rmv.mesh = DOT_MESH
      rmv.mainMaterial = i === 0 ? DOT_ON_MAT : DOT_OFF_MAT
      this.dots.push(rmv)
      dot.createComponent(FlexItem.getTypeName())
    }
  }

  private buildControlPanel(parent: SceneObject): SceneObject {
    const {root, column} = this.panel(parent, "ControlPanel", this.panelWidth, 0.7, 1.2)
    const inner = this.panelWidth - 2.4
    const third = (inner - 2 * 0.7) / 3
    const half = (inner - 0.7) / 2

    this.textRow(column, "PlaybackLabel", "PLAYBACK", "Caption", 1.8, this.subtleColor)
    const r1 = this.row(column, 3.6)
    this.addButton(r1, "Previous", "< Prev", third, 3.4, "PrimaryNeutral", () => this._onPrevious.invoke())
    this.playLabel = this.addButton(r1, "PlayPause", "Pause", third, 3.4, "Primary", () => this._onPlayPause.invoke())
    this.addButton(r1, "Next", "Next >", third, 3.4, "PrimaryNeutral", () => this._onNext.invoke())

    const r2 = this.row(column, 3.6)
    this.slowLabel = this.addButton(r2, "Slow", "Slow 0.5x", half, 3.4, "PrimaryNeutral", () => this._onSlow.invoke(), true)
    this.addButton(r2, "Replay", "Replay", half, 3.4, "PrimaryNeutral", () => this._onReplay.invoke())

    this.textRow(column, "ViewLabel", "VIEW ANGLE", "Caption", 1.8, this.subtleColor)
    const r3 = this.row(column, 3.6)
    this.addButton(r3, "Front", "Front", third, 3.4, "PrimaryNeutral", () => this._onAngle.invoke("front"), true)
    this.addButton(r3, "Angled", `${VIEW_ANGLES.angled}°`, third, 3.4, "PrimaryNeutral", () => this._onAngle.invoke("angled"), true)
    this.addButton(r3, "Side", "Side", third, 3.4, "PrimaryNeutral", () => this._onAngle.invoke("side"), true)
    return root
  }

  // ---- Helpers -------------------------------------------------------------

  private obj(parent: SceneObject, name: string, position?: vec3): SceneObject {
    const so = global.scene.createSceneObject(name)
    so.setParent(parent)
    if (position) so.getTransform().setLocalPosition(position)
    return so
  }

  private liftInZ(so: SceneObject, z: number): void {
    const t = so.getTransform()
    const p = t.getLocalPosition()
    t.setLocalPosition(new vec3(p.x, p.y, p.z + z))
  }

  /** A full-width text row in a column. Wrapping rows get a fixed height for their line count. */
  private textRow(column: SceneObject, name: string, text: string, role: TextRole, height: number,
      color: vec4, wrap: boolean = false): Text {
    const so = this.obj(column, name)
    this.liftInZ(so, LAYOUT_Z_LIFT)
    const t = so.createComponent("Component.Text") as Text
    t.text = text
    t.depthTest = true
    applyTextRole(t, role)
    t.textFill.color = color
    t.horizontalAlignment = HorizontalAlignment.Left
    t.verticalAlignment = VerticalAlignment.Center
    t.horizontalOverflow = wrap ? HorizontalOverflow.Wrap : HorizontalOverflow.Overflow
    t.verticalOverflow = VerticalOverflow.Overflow
    t.layoutRect = Rect.create(-0.5, 0.5, -0.5, 0.5)
    const item = so.createComponent(FlexItem.getTypeName()) as FlexItem
    item.alignSelf = FlexAlignSelf.Stretch
    item.overrideHeight = height
    return t
  }

  private row(column: SceneObject, height: number): SceneObject {
    const so = this.obj(column, "Row")
    this.liftInZ(so, LAYOUT_Z_LIFT)
    const item = so.createComponent(FlexItem.getTypeName()) as FlexItem
    item.overrideHeight = height
    item.alignSelf = FlexAlignSelf.Stretch
    const flex = so.createComponent(FlexLayout.getTypeName()) as FlexLayout
    flex.direction = FlexDirection.Row
    flex.justifyContent = FlexJustify.SpaceBetween
    flex.alignItems = FlexAlign.Center
    flex.columnGap = 0.7
    flex.height = height
    flex.width = -1
    return so
  }

  /** UIKit Button with a width-budgeted raw Text label. Returns the label. */
  private addButton(row: SceneObject, name: string, label: string, width: number, height: number,
      style: string, onClick: () => void, toggleable: boolean = false): Text {
    const so = this.obj(row, name)
    const btn = so.createComponent(Button.getTypeName()) as Button
    btn.setVariant({theme: "SnapOS2", shape: "Capsule", style})
    if (toggleable) btn.setIsToggleable(true)
    btn.size = new vec3(width, height, 1)
    this.pendingInit++
    btn.onInitialized.add(() => {
      btn.size = new vec3(width, height, 1)
      this.pendingInit--
      if (this.pendingInit === 0) this.markReady()
    })

    const labelSo = this.obj(so, "Label", new vec3(0, 0, BUTTON_LABEL_Z))
    const t = labelSo.createComponent("Component.Text") as Text
    t.text = label
    t.depthTest = true
    applyTextRole(t, "Button")
    t.textFill.color = this.textColor
    t.horizontalAlignment = HorizontalAlignment.Center
    t.verticalAlignment = VerticalAlignment.Center
    t.horizontalOverflow = HorizontalOverflow.Overflow
    t.verticalOverflow = VerticalOverflow.Overflow
    t.layoutRect = Rect.create(-(width - 0.5) / 2, (width - 0.5) / 2, -1.2, 1.2)

    so.createComponent(FlexItem.getTypeName())
    btn.onTriggerUp.add(() => onClick())
    this.buttons[name] = btn
    this.buttonLabels[name] = t
    return t
  }

  private setOn(name: string, on: boolean): void {
    const b = this.buttons[name]
    if (b && this.ready && b.isOn !== on) b.isOn = on
  }

  private setInactive(name: string, inactive: boolean): void {
    const b = this.buttons[name]
    if (b && this.ready) b.inactive = inactive
    // UIKit's inactive state blocks input but barely changes the look; dim the label too.
    const label = this.buttonLabels[name]
    if (label) {
      const c = this.textColor
      label.textFill.color = new vec4(c.x, c.y, c.z, inactive ? 0.3 : c.w)
    }
  }

  private markReady(): void {
    if (this.ready) return
    this.ready = true
    // Panels stay enabled until every UIKit element has initialized (a disabled
    // object never starts), then the visibility state is applied.
    this.showIntro(this.showingIntro)
    this._onReady.invoke()
  }

  /** Button lookup for tests and the controller. */
  getButton(name: string): Button | null {
    return this.buttons[name] ?? null
  }
}
