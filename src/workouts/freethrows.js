import { Workout } from '../utils/generateWorkout.js';
import { courtZones } from '../utils/courtZones.js';

export const freethrows = {
  workouts: [
    { title: "Free Throws" },
    {
      title: "Free Throw Ladder",
      description: "increase goal: 5 in a row, 6 in a row, etc.",
      addedDifficulties: [],
      isStandalone: true,
    }
  ]
}

export class Freethrows extends Workout {
  constructor() {
    super();
  }
  title = "Freethrows"

  workouts = freethrows.workouts
  workout = this.workouts[this.getRandomInteger(0, this.workouts.length - 1)]

  //workout params
  numberOfSpots = this.workout.numberOfSpots || 1
  permittedZones = this.workout.permittedZones || courtZones.filter((zone) => zone.id < 13 ).map((zone) => zone.id )
  permittedSpots = [
    {x: 156, y: 90},
    {x: 157, y: 90},
    {x: 156, y: 91}
  ]
  actions = this.workout.actions || ["Make", "Shoot"]
  minMakeAmount = this.workout.minMakeAmount || 5
  maxMakeAmount = this.workout.maxMakeAmount || 10
  minAttemptAmount = this.workout.minAttemptAmount || 10
  maxAttemptAmount = this.workout.maxAttemptAmount || 20
  minInARow = this.workout.minInARow || 3
  maxInARow = this.workout.maxInARow || 6
  maxPerTimedPeriod = this.workout.maxPerTimedPeriod || 10
  addedDifficulties = this.workout.addedDifficulties || [
    "In A Row",
    "Swish-Only",
    "partner calls out distractions",
    "sprint or 5 push-ups on miss",
    "down and back before shots",
    "5 burpees before shots",
    "10 jump and jacks before shots",
    "5 squat hops before shots",
  ]
  frequency = this.workout.frequency || 8
  isStandalone = this.workout.isStandalone || false
  isTimeable = false
  
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