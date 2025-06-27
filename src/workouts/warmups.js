import { Workout } from '../utils/generateWorkout.js';
import { courtZones } from '../utils/courtZones.js';

export const warmups = {
  workouts: [
    {
      title: "Form shots (close range)",
      zones: [2, 3, 4, 5]
    },
    { title: "Dribble around the court" },
    { title: "Dribble down and back" },
    { title: "Jog around the court" },
    { title: "Karaoke Down and back" },
    { title: "High Knees Down and back" },
    { title: "Butt kicks Down and back" },
    { title: "Zig Zag Dribble down and back" },
    { title: "Between the legs down and back" },
  ]
}

export class Warmups extends Workout {
  constructor() {
    super();
  }
  title = "Warmups"

  workouts = warmups.workouts
  workout = this.workouts[this.getRandomInteger(0, this.workouts.length - 1)]

  // workout params
  numberOfSpots = this.workout.numberOfSpots || 1
  permittedZones = this.workout.permittedZones || courtZones.filter((zone) => zone.id < 9 ).map((zone) => zone.id)
  actions = this.workout.actions || ["Make", "Attempt"]
  minMakeAmount = this.workout.minMakeAmount || 5
  maxMakeAmount = this.workout.maxMakeAmount || 10
  minAttemptAmount = this.workout.minAttemptAmount || 10
  maxAttemptAmount = this.workout.maxAttemptAmount || 15
  minInARow = this.workout.minInARow || 3
  maxInARow = this.workout.maxInARow || 6
  maxPerTimedPeriod = this.workout.maxPerTimedPeriod || 10
  addedDifficulties = this.workout.addedDifficulties || [
    "Using Heavy Ball",
    "In A Row",
  ]
  frequency = this.workout.frequency || 8
  isStandalone = this.workout.isStandalone ?? false
  isTimeable = this.workout.isTimeable ?? false

  
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
