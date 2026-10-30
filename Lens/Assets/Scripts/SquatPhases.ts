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
    pose: {pelvisY: 31.2, pelvisZ: -4.4, torsoLeanDeg: 19, armReachDeg: 32}
  },
  {
    title: "Standing Finish",
    cue: "Finish tall and balanced.",
    indicator: "finish",
    pose: {pelvisY: 35.0, pelvisZ: 0.0, torsoLeanDeg: 3, armReachDeg: 4}
  }
]

export const PHASE_COUNT = SQUAT_PHASES.length

/** Timing at 1x. Five holds and four transitions: 5 * 1.5 + 4 * 1.2 = 12.3 s. */
export const HOLD_SECONDS = 1.5
export const TRANSITION_SECONDS = 1.2
/** Duration of a single Next / Previous step at 1x. */
export const STEP_SECONDS = 0.6
export const SLOW_SPEED = 0.5

export const COMPLETE_MESSAGE = "Demo complete — replay, step through, or follow along."
export const DISCLAIMER = "Demonstration only — this Lens does not assess your form."

/** Viewing angles for the turntable (degrees, 0 = facing the user). */
export const VIEW_ANGLES = {front: 0, angled: 35, side: 90}

export function lerpPose(a: SquatPose, b: SquatPose, t: number): SquatPose {
  return {
    pelvisY: a.pelvisY + (b.pelvisY - a.pelvisY) * t,
    pelvisZ: a.pelvisZ + (b.pelvisZ - a.pelvisZ) * t,
    torsoLeanDeg: a.torsoLeanDeg + (b.torsoLeanDeg - a.torsoLeanDeg) * t,
    armReachDeg: a.armReachDeg + (b.armReachDeg - a.armReachDeg) * t
  }
}

export function copyPose(p: SquatPose): SquatPose {
  return {pelvisY: p.pelvisY, pelvisZ: p.pelvisZ, torsoLeanDeg: p.torsoLeanDeg, armReachDeg: p.armReachDeg}
}

/** Smooth ease-in-out so descents start and settle gently, with no overshoot. */
export function easeInOut(t: number): number {
  const c = Math.min(Math.max(t, 0), 1)
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2
}
