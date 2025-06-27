import { Workout } from '../utils/generateWorkout.js';
import { courtZones } from '../utils/courtZones.js';

export const combos = {
  workouts: [
    { title: "Crossover to Pull-Up Jumper" },
    { title: "Behind-the-Back to Step-Back Jumper" },
    { title: "Spin Move into Mid-Range Shot" },
    { title: "In-and-Out Dribble to Fadeaway" },
    { title: "Hesitation Dribble to Floater" },
    { title: "Between-the-Legs to Three-Point Shot" },
    { title: "Step-Back Dribble Jumper" },
    { title: "Double Crossover to Pull-Up" },
    { title: "Jab Step to Quick Shot" },
    { title: "Euro Step Dribble to Layup" },
    { title: "Stop-and-Pop Jump Shot" },
    { title: "Dribble Spin to Hook Shot" },
    { title: "Change of Pace Dribble to Shot" },
    { title: "Walk-Back Dribble to Jumper" },
    { title: "Two-Ball Dribble into Shot" },
    { title: "Shammgod Dribble to Shot" },
    { title: "Spin and Fadeaway Jumper" },
    { title: "Quick Pull-Up from Dribble" },
    { title: "Floater after Hesitation Dribble" },
    { title: "Dribble Penetration into Step-Back" },
    { title: "Zigzag Layup Drill (with dribbling)" },
    { title: "Layup Lines" },
    { title: "Figure 8 Layup Drill" },
    { title: "Crossover to Layup Drill" },
    { title: "Ball Screen Layups", description: "simulate pick-and-roll" },
    { title: "2-on-1 Fast Break Layups" },
    { title: "Off-the-dribble shooting" },
    { title: "Pick-and-roll shooting simulation" }
  ]
}

export class Combos extends Workout {
  constructor() {
    super();
  }
  title = "Combos"

  workouts = combos.workouts
  workout = this.workouts[this.getRandomInteger(0, this.workouts.length - 1)]

  //workout params
  numberOfSpots = this.workout.numberOfSpots || 1
  permittedZones = this.workout.permittedZones || courtZones.filter((zone) => zone.id < 13 ).map((zone) => zone.id )
  actions = this.workout.actions || ["Make", "Attempt"]
  minMakeAmount = this.workout.minMakeAmount || 5
  maxMakeAmount = this.workout.maxMakeAmount || 10
  minAttemptAmount = this.workout.minAttemptAmount || 10
  maxAttemptAmount = this.workout.maxAttemptAmount || 15
  minInARow = this.workout.minInARow || 3
  maxInARow = this.workout.maxInARow || 6
  maxPerTimedPeriod = this.workout.maxPerTimedPeriod || 10
  addedDifficulties = this.workout.addedDifficulties || [
    "Over Defender",
    "With Contact",
    "Using Heavy Ball",
    "In A Row",
    "around defender",
    "no backboard",
  ]
  frequency = this.workout.frequency || 8
  isStandalone = this.workout.isStandalone || false

  
  // formatWorkout () {

  //   return {
  //     rules,
  //     permittedZones: this.permittedZones(),
  //     workout: this.workout,
  //     permittedSpots: this.permittedSpots(),
  //     numberOfSpots: this.numberOfSpots()
  //   }
  // }
}
