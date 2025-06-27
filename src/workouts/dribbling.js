import { Workout } from '../utils/generateWorkout.js';
import { courtZones } from '../utils/courtZones.js';

export const dribbling = {
  workouts: [
    {title: "Dribble figure 8s" },
    {title: "Cone dribbling drills" },
    {title: "Two-ball dribbling" },
    {title: "Crossover to attack" },
    {title: "Zigzag dribbling (with defender or cone)" },
    {title: "Change of pace dribbles" },
    {title: "Spin move & retreat dribbles" },
    {title: "Pound Dribbles (Right Hand)" },
    {title: "Pound Dribbles (Left Hand)" },
    {title: "Crossover Dribbles" },
    {title: "Between-the-Legs Dribbles" },
    {title: "Behind-the-Back Dribbles" },
    {title: "In-and-Out Dribbles" },
    {title: "Figure 8 Dribble" },
    {title: "Low Pound Dribbles" },
    {title: "High to Low Dribble Transitions" },
    {title: "Front V-Dribble" },
    {title: "Side V-Dribble" },
    {title: "Windshield Wiper Dribble" },
    {title: "Around the World Dribble (around legs)" },
    {title: "One-Hand Figure 8 Dribble" },
    {title: "Push-Pull Dribble (front-back)" },
    {title: "Two-Ball Pound Dribble" },
    {title: "Two-Ball Alternate Dribble" },
    {title: "Two-Ball Crossover Dribble" },
    {title: "Wraps Around Waist (no dribble)" },
    {title: "Kneeling Dribble Drill (on knees, pound dribble)" }
  ]
}

export class Dribbling extends Workout {
  constructor() {
    super();
  }
  title = "Dribbling"

  workouts = dribbling.workouts
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
    "With Contact",
    "Using Heavy Ball",
    "around defender",
    "no backboard",
  ]
  frequency = this.workout.frequency || 8
  isStandalone = this.workout.isStandalone || true

  
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
