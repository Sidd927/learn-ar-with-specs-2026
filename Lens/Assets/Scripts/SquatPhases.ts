/**
 * Squat Tutor — single source of truth for the five demonstration phases.
 *
 * Poses are expressed in the Mannequin's local space (cm, figure faces +Z,
 * y = 0 is the top of the stand). The rig solves the legs with two-bone IK
 * from these values, so the feet stay planted for every pose and every blend.
 */

export type CueIndicator = "feet" | "knees" | "hip" | "finish"

export interface SquatPose {
  /** Pelvis height above the stand (cm). */
  pelvisY: number
  /** Pelvis forward (+) / back (−) offset from the ankles (cm). */
  pelvisZ: number
  /** Forward torso lean from vertical (degrees). */
  torsoLeanDeg: number
  /** Forward arm reach from hanging (degrees). */
  armReachDeg: number
  /** Knees drifting toward the midline, as an angle off the toe line (degrees). Fault poses only. */
  kneeInDeg?: number
  /** Heel lift off the stand (cm). Fault poses only. */
  heelLiftCm?: number
}

export type FaultView = "front" | "side"

/** A common squat mistake, shown as a translucent figure over the solid target figure. */
export interface SquatFault {
  id: string
  /** Short button label. */
  button: string
  title: string
  /** The checkpoint view a coach uses for this fault; the turntable turns to it. */
  view: FaultView
  /** What the translucent "mistake" figure shows. */
  mistake: string
  /** What the solid "target" figure shows. */
  target: string
  /** Changes applied on top of the Bottom Position to pose the mistake figure. */
  delta: {kneeInDeg?: number; heelLiftCm?: number; extraLeanDeg?: number; pelvisDropCm?: number; armReachDeltaDeg?: number}
}

export interface SquatPhase {
  title: string
  cue: string
  indicator: CueIndicator
  pose: SquatPose
}

export const SQUAT_PHASES: SquatPhase[] = [
  {
    title: "Starting Stance",
    cue: "Stand tall, feet shoulder-width apart.",
    indicator: "feet",
    pose: {pelvisY: 35.0, pelvisZ: 0.0, torsoLeanDeg: 3, armReachDeg: 4}
  },
  {
    title: "Controlled Descent",
    cue: "Lower with control; knees follow your toes.",
    indicator: "knees",
    pose: {pelvisY: 27.0, pelvisZ: -6.2, torsoLeanDeg: 32, armReachDeg: 62}
  },
  {
    title: "Bottom Position",
    cue: "Reach a comfortable depth with control.",
    indicator: "hip",
    pose: {pelvisY: 17.2, pelvisZ: -6.4, torsoLeanDeg: 42, armReachDeg: 85}
  },
  {
    title: "Rising Up",
    cue: "Rise smoothly while keeping your balance.",
    indicator: "knees",
    pose: {pelvisY: 31.2, pelvisZ: -4.4, torsoLeanDeg: 19, armReachDeg: 46}
  },
  {
    title: "Standing Finish",
    cue: "Finish tall and balanced.",
    indicator: "finish",
    pose: {pelvisY: 35.0, pelvisZ: 0.0, torsoLeanDeg: 3, armReachDeg: 4}
  }
]

export const PHASE_COUNT = SQUAT_PHASES.length

/** Phase used for mistake comparisons (Bottom Position, where all three are most visible). */
export const FAULT_PHASE_INDEX = 2

/**
 * General coaching checkpoints, viewed the way trainers look for them: knees from the
 * front, torso and heels from the side. Educational examples only; the Lens never
 * looks at or assesses the user's own movement.
 */
export const SQUAT_FAULTS: SquatFault[] = [
  {
    id: "knees",
    button: "Knees",
    title: "Knees caving in",
    view: "front",
    mistake: "knees drift inside the toes.",
    target: "knees track over the toes.",
    delta: {kneeInDeg: 18}
  },
  {
    id: "heels",
    button: "Heels",
    title: "Heels lifting",
    view: "side",
    mistake: "heels lift off the floor.",
    target: "whole foot stays planted.",
    delta: {heelLiftCm: 4.0}
  },
  {
    id: "chest",
    button: "Chest",
    title: "Chest dropping",
    view: "side",
    mistake: "chest tips far forward.",
    target: "chest up, torso controlled.",
    delta: {extraLeanDeg: 18}
  }
]

/** Bottom Position with a fault applied. */
export function faultPose(fault: SquatFault): SquatPose {
  const base = SQUAT_PHASES[FAULT_PHASE_INDEX].pose
  return {
    pelvisY: base.pelvisY - (fault.delta.pelvisDropCm ?? 0),
    pelvisZ: base.pelvisZ,
    torsoLeanDeg: base.torsoLeanDeg + (fault.delta.extraLeanDeg ?? 0),
    armReachDeg: base.armReachDeg + (fault.delta.armReachDeltaDeg ?? 0),
    kneeInDeg: fault.delta.kneeInDeg ?? 0,
    heelLiftCm: fault.delta.heelLiftCm ?? 0
  }
}

/** Timing at 1x. Five holds and four transitions: 5 * 1.5 + 4 * 1.2 = 12.3 s. */
export const HOLD_SECONDS = 1.5
export const TRANSITION_SECONDS = 1.2
/** Duration of a single Next / Previous step at 1x. */
export const STEP_SECONDS = 0.6
export const SLOW_SPEED = 0.5

export const INTRO_BODY = "Watch a squat in five phases. Then compare three common patterns with the target, each from the angle where it shows."
export const COMPLETE_TITLE = "Squat complete"
export const COMPLETE_MESSAGE = "Try Knees, Heels or Chest below to compare a common pattern, or Replay."
/** Comparison row label: idle, and while a comparison is showing. */
export const COMPARE_LABEL = "COMPARE COMMON PATTERNS"
export const COMPARE_ACTIVE_LABEL = "PINCH AGAIN TO RETURN"
/** Shown in place of the disclaimer while a comparison is showing. */
export const COMPARE_NOTE = "Exaggerated for clarity. This Lens does not assess your form."
export const DISCLAIMER = "Demonstration only — this Lens does not assess your form."

/** Viewing angles for the turntable (degrees, 0 = facing the user). */
export const VIEW_ANGLES = {front: 0, angled: 35, side: 90}

export function lerpPose(a: SquatPose, b: SquatPose, t: number): SquatPose {
  return {
    pelvisY: a.pelvisY + (b.pelvisY - a.pelvisY) * t,
    pelvisZ: a.pelvisZ + (b.pelvisZ - a.pelvisZ) * t,
    torsoLeanDeg: a.torsoLeanDeg + (b.torsoLeanDeg - a.torsoLeanDeg) * t,
    armReachDeg: a.armReachDeg + (b.armReachDeg - a.armReachDeg) * t,
    kneeInDeg: (a.kneeInDeg ?? 0) + ((b.kneeInDeg ?? 0) - (a.kneeInDeg ?? 0)) * t,
    heelLiftCm: (a.heelLiftCm ?? 0) + ((b.heelLiftCm ?? 0) - (a.heelLiftCm ?? 0)) * t
  }
}

export function copyPose(p: SquatPose): SquatPose {
  return {pelvisY: p.pelvisY, pelvisZ: p.pelvisZ, torsoLeanDeg: p.torsoLeanDeg, armReachDeg: p.armReachDeg,
    kneeInDeg: p.kneeInDeg, heelLiftCm: p.heelLiftCm}
}

/** Smooth ease-in-out so descents start and settle gently, with no overshoot. */
export function easeInOut(t: number): number {
  const c = Math.min(Math.max(t, 0), 1)
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2
}
