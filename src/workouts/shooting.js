import { Workout } from '../utils/generateWorkout.js';
import { courtZones } from '../utils/courtZones.js';

export const shooting = {
  workouts: [
    {
      title: "Spot-up shots",
      permittedZones: courtZones.filter((zone) => zone.id > 12 && zone.id < 45)
        .map((zone) => zone.id)
    },
    {
      title: "Catch and shoot threes",
      permittedZones: courtZones.filter((zone) => zone.id > 28 && zone.id < 37)
        .map((zone) => zone.id)
    },
    {
      title: "Catch and shoot mid range shots",
      permittedZones: courtZones.filter((zone) => zone.id > 12 && zone.id < 39)
        .map((zone) => zone.id)
    },
    {
      title: "Catch and shoot deep threes",
      permittedZones: courtZones.filter((zone) => zone.id > 37)
        .map((zone) => zone.id)
    },
  ]
}

export class Shooting extends Workout {
  constructor() {
    super();
  }
  title = "Catch & Shoot"
  workouts = shooting.workouts
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
