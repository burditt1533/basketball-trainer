import { Workout } from '../utils/generateWorkout.js';
import { courtZones } from '../utils/courtZones.js';

export const withIc3 = {
  workouts: [
    { title: "Elbow Shots" },
    { title: "Short Corner Shots" },
  ],
}

export class WithIc3 extends Workout {
  constructor() {
    super(); // Call the parent class's constructor
  }
  title = "With IC3"

  workouts = withIc3.workouts
  workout = this.workouts[this.getRandomInteger(0, this.workouts.length - 1)]

  numberOfSpots = this.workout.numberOfSpots || 1
  permittedZones = this.workout.permittedZones || courtZones.filter((zone) => zone.id < 12 ).map((zone) => zone.id )
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
    "In A Row"
  ]
  isTimeable = true
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