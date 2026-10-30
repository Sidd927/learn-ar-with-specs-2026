import {SquatPose} from "./SquatPhases"

const DEG = Math.PI / 180

/** Joint data produced by solving a pose, in Mannequin local space (cm). */
interface LegSolution {
  hip: vec3
  knee: vec3
  ankle: vec3
}

/**
 * Poses the articulated mannequin built in the scene.
 *
 * Legs use analytic two-bone IK from the hip to a fixed, planted ankle, with
 * the knee bending toward the toes, so the feet never slide or lift. The
 * torso, neck, and arms are driven by simple joint angles.
 */
@component
export class MannequinRig extends BaseScriptComponent {
  @ui.label("Mannequin Rig — poses the jointed figure")
  @ui.separator
  @input
  @hint("Pelvis joint (child of Mannequin)")
  pelvis: SceneObject

  @input
  @hint("Spine joint (child of Pelvis)")
  spine: SceneObject

  @input
  @hint("Neck joint (child of Spine)")
  neck: SceneObject

  @input
  @hint("Left and right shoulder joints (children of Spine)")
  shoulderL: SceneObject

  @input
  shoulderR: SceneObject

  @input
  @hint("Hip joints (children of Pelvis)")
  hipL: SceneObject

  @input
  hipR: SceneObject

  @input
  @hint("Knee joints (children of the hips)")
  kneeL: SceneObject

  @input
  kneeR: SceneObject

  @input
  @hint("Ankle joints (children of the knees)")
  ankleL: SceneObject

  @input
  ankleR: SceneObject

  @input
  @hint("Knee arrow cues, repositioned to follow the knees")
  kneeArrowL: SceneObject

  @input
  kneeArrowR: SceneObject

  @ui.group_start("Proportions (cm)")
  @input
  @hint("Hip joint to knee joint")
  thighLength: number = 15.5

  @input
  @hint("Knee joint to ankle joint")
  shinLength: number = 15.5

  @input
  @hint("Ankle joint height above the stand")
  ankleHeight: number = 2.6

  @input
  @hint("Half the distance between the ankles")
  ankleHalfWidth: number = 6.5

  @input
  @hint("Hip joint offset from the pelvis (x is per side)")
  hipOffset: vec3 = new vec3(4.5, -1.5, 0)

  @input
  @hint("Toe-out angle per foot (degrees); knees bend along this direction")
  toeOutDeg: number = 12
  @ui.group_end

  private currentPose: SquatPose | null = null

  onAwake(): void {
    const required: [string, SceneObject][] = [
      ["pelvis", this.pelvis], ["spine", this.spine], ["neck", this.neck],
      ["shoulderL", this.shoulderL], ["shoulderR", this.shoulderR],
      ["hipL", this.hipL], ["hipR", this.hipR], ["kneeL", this.kneeL], ["kneeR", this.kneeR],
      ["ankleL", this.ankleL], ["ankleR", this.ankleR]
    ]
    for (const [name, so] of required) {
      if (!so) console.error("[MannequinRig] Missing joint input: " + name)
    }
  }

  /** Apply a pose to every joint. */
  applyPose(pose: SquatPose): void {
    if (!this.pelvis) return
    this.currentPose = pose
    this.pelvis.getTransform().setLocalPosition(new vec3(0, pose.pelvisY, pose.pelvisZ))
    this.pelvis.getTransform().setLocalRotation(quat.quatIdentity())

    const lean = pose.torsoLeanDeg * DEG
    this.spine.getTransform().setLocalRotation(quat.angleAxis(lean, vec3.right()))
    // Keep the head close to level so the gaze stays forward.
    this.neck.getTransform().setLocalRotation(quat.angleAxis(-lean * 0.55, vec3.right()))

    // Arms reach forward relative to the world, so subtract the torso lean.
    const arm = quat.angleAxis(-(pose.armReachDeg * DEG) - lean, vec3.right())
    this.shoulderL.getTransform().setLocalRotation(arm)
    this.shoulderR.getTransform().setLocalRotation(arm)

    this.applyLeg(-1, pose, this.hipL, this.kneeL, this.ankleL, this.kneeArrowL)
    this.applyLeg(1, pose, this.hipR, this.kneeR, this.ankleR, this.kneeArrowR)
  }

  /** Knee flexion (degrees between thigh and shin) the given pose produces. 0 = straight leg. */
  kneeFlexionForPose(pose: SquatPose): number {
    const s = this.solveLeg(-1, pose)
    const thigh = s.knee.sub(s.hip).normalize()
    const shin = s.ankle.sub(s.knee).normalize()
    return Math.acos(Math.min(Math.max(thigh.dot(shin), -1), 1)) / DEG
  }

  /** Knee flexion of the pose currently applied. */
  get kneeFlexionDeg(): number {
    return this.currentPose ? this.kneeFlexionForPose(this.currentPose) : 0
  }

  /** Measured flexion from the live joint transforms (independent of the solver). */
  measuredKneeFlexionDeg(): number {
    const h = this.hipL.getTransform().getWorldPosition()
    const k = this.kneeL.getTransform().getWorldPosition()
    const a = this.ankleL.getTransform().getWorldPosition()
    const thigh = k.sub(h).normalize()
    const shin = a.sub(k).normalize()
    return Math.acos(Math.min(Math.max(thigh.dot(shin), -1), 1)) / DEG
  }

  private toeDirection(side: number): vec3 {
    const t = this.toeOutDeg * DEG * side
    return new vec3(Math.sin(t), 0, Math.cos(t))
  }

  private solveLeg(side: number, pose: SquatPose): LegSolution {
    const hip = new vec3(side * this.hipOffset.x, pose.pelvisY + this.hipOffset.y, pose.pelvisZ + this.hipOffset.z)
    const ankle = new vec3(side * this.ankleHalfWidth, this.ankleHeight, 0)
    const reach = this.thighLength + this.shinLength
    const toAnkle = ankle.sub(hip)
    const d = Math.min(Math.max(toAnkle.length, 0.001), reach * 0.999)
    const u = toAnkle.uniformScale(1 / toAnkle.length)
    const a = (this.thighLength * this.thighLength - this.shinLength * this.shinLength + d * d) / (2 * d)
    const h = Math.sqrt(Math.max(this.thighLength * this.thighLength - a * a, 0))
    // Bend direction: forward along the toes, made perpendicular to the hip–ankle line.
    const hint = this.toeDirection(side)
    let bend = hint.sub(u.uniformScale(hint.dot(u)))
    bend = bend.length > 1e-4 ? bend.normalize() : vec3.forward()
    const knee = hip.add(u.uniformScale(a)).add(bend.uniformScale(h))
    // Keep the ankle exactly on the planted target even if the hip is out of reach.
    const plantedAnkle = knee.add(ankle.sub(knee).normalize().uniformScale(this.shinLength))
    return {hip, knee, ankle: plantedAnkle}
  }

  private applyLeg(side: number, pose: SquatPose, hip: SceneObject, knee: SceneObject,
      ankle: SceneObject, arrow: SceneObject | null): void {
    const s = this.solveLeg(side, pose)
    const down = vec3.down()
    // Pelvis is unrotated in Mannequin space, so hip local rotation == mannequin-space rotation.
    const thighRot = quat.rotationFromTo(down, s.knee.sub(s.hip).normalize())
    const shinRot = quat.rotationFromTo(down, s.ankle.sub(s.knee).normalize())
    const footRot = quat.angleAxis(this.toeOutDeg * DEG * side, vec3.up())
    hip.getTransform().setLocalRotation(thighRot)
    knee.getTransform().setLocalRotation(thighRot.invert().multiply(shinRot))
    ankle.getTransform().setLocalRotation(shinRot.invert().multiply(footRot))

    if (arrow) {
      const dir = this.toeDirection(side)
      arrow.getTransform().setLocalPosition(s.knee.add(dir.uniformScale(4.8)).add(new vec3(0, 0.6, 0)))
      arrow.getTransform().setLocalRotation(footRot.multiply(quat.angleAxis(90 * DEG, vec3.right())))
    }
  }
}
