import { Workout } from '../utils/generateWorkout.js';
import { courtZones } from '../utils/courtZones.js';

export const layups = {
  workouts: [
    { title: "Mikan Drill", numberOfSpots: 1, permittedZones: [2, 3, 4, 5] },
    { title: "Reverse Mikan Drill", numberOfSpots: 2 },
    { title: "Power Layups", description: "off two feet" },
    { title: "One-Dribble Layups" },
    { numberOfSpots: 4, title: "Spin Move Layups" },
    {
      title: "Euro Step Layups",
      variations: [
        "Euro Step Layups",
        "Euro Step Layups to the right",
        "Euro Step Layups to the left",
      ],
      frequency: 6,
    },
    { title: "Reverse Layups" },
    { title: "Inside Hand Layups" },
    { title: "Wrong-Foot Layups" },
    { title: "Catch on the Move to Layup" },
  ]
}

export class Layups extends Workout {
  constructor() {
    super();
  }
  title = "Layups"

  workouts = layups.workouts
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
