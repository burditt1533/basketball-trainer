import { Workout } from '../utils/generateWorkout.js';
import { courtZones } from '../utils/courtZones.js';
import { getRandomPointInPolygon } from '../utils/canvas.js';
import smallMan from '../assets/small-man2.png'

export const a2b = {
  workouts: [
    { title: "Cross over"},
  ]
}

export class A2b extends Workout {
  constructor() {
    super();
  }
  title = "A 2 B"

  workouts = a2b.workouts
  workout = this.workouts[this.getRandomInteger(0, this.workouts.length - 1)]
  direction = null
  finish = this.getFinish()

  getPre () {
    const pre = [
      'Jab step',
      'Pump fake',
      'fake pass',
      'low sweep',
      'high sweep',
      null
    ]
    const preWeights = [ 7, 1, 1, 10, 10, 8 ]
    let move = pre.selectWeightedRandom(preWeights)
    move = !!move ? move + ',' : ''
    return move
  }

  getMove1 () {
    this.direction = ['right', 'left', null].randomItem()
    const dribbles = [1, 2].randomItem()
    return `${dribbles} ${'dribble'.pluralize(dribbles)} ${this.direction ?? ''}`
  }

  getMove2 (move1) {
    const move2 = [
      'hesi',
      'skip hesi',
      'killer crossover',
      'cross',
      'tween',
      'tween tween',
      'behind the back',
      'spin',
      'snatch',
      null
    ]
    let move = move2.randomItem()
    move = !!move && !!move1 ? `${move},` : ''
    return move
  }

  getFinish () {
    const finishes = [
      'Pull up',
      'Layup',
      'Floater',
      'Reverse Layup',
      'Fadeaway',
      'Inside Hand Layup',
      'Wrong foot Layup',
      'Finger Roll Layup'
    ]
    const finishesWeights = [10, 10, 5, 1, 4, 3, 3, 1]
    let move = finishes.selectWeightedRandom(finishesWeights)
    const hand = ['right', 'left'].randomItem()
    const group = ['Fadeaway', 'Pull up']

    // working on getting it in the correct hand
    // if(!group.includes(move)) {
    //   move = `${hand} hand ${move}`
    // } 
    return move
  }

  addSpotsToCanvas = (canvasCtx, canvas, smallPlayer) => {
    let prevId = null
    for (let i = 0; i < this.numberOfSpots; i++) {
      const leftMost = [13, 21, 29, 37, 45]
      const rightMost = [20, 28, 36, 44, 52]
      const prevFiltered = leftMost.includes(prevId) ? prevId : prevId - 1
      const nextFiltered = rightMost.includes(prevId) ? prevId : prevId + 1
      const whichWay = this.direction === "right" ? nextFiltered : prevFiltered
      const randomZoneId = i === 1 ? whichWay : this.permittedZones.randomItem()
      const randomZone = courtZones.find((localZone) => localZone.id === randomZoneId)
      const permittedSpots = this.permittedSpots || randomZone.points
      let randomPoint = null

      if (i === 2) {
        const theBasketCoords = {x: 476/4, y: 229/4}
        randomPoint = theBasketCoords
      } else if(i === 1) {
        // make this a random point next to first point, left or right
        randomPoint = getRandomPointInPolygon(permittedSpots)
      } else {
        randomPoint = getRandomPointInPolygon(permittedSpots)
        // this.addPlayerImage(canvasCtx, canvas, randomPoint)

        
        const allPlayers = document.querySelectorAll('.small-man');
        const allPaths = document.querySelectorAll('.route-path');
        allPlayers.forEach(player => player.remove())
        allPaths.forEach(path => path.remove())
        
        const ballImage = document.querySelector('.bball-image');
        const rect = ballImage.getBoundingClientRect();
        const scaler = rect.width/1120
        
        const rotate = 15 || this.getRandomInteger(0, 360)
        const container = document.querySelector('.container');
        const newImage = document.createElement('img');
        const left = randomPoint.x * 4 - 28
        const top = randomPoint.y * 4 - 110
        newImage.src = smallMan;
        newImage.classList = 'small-man';
        newImage.style.left = `${left * scaler}px`
        newImage.style.top = `${top * scaler}px`
        newImage.style.filter = `hue-rotate(${rotate}deg)`
        container.appendChild(newImage);
      }
      this.path.push(randomPoint)
      prevId = randomZoneId
    }
    
    this.drawRoute(canvasCtx)
  }

  drawRoute (canvasCtx) {
    this.route = this.getRoute()

    // Define curve parameters
    const startX = this.route[0];
    const startY = this.route[1];
    const controlX = this.route[2];
    const controlY = this.route[3];
    const endX = this.route[4];
    const endY = this.route[5];

    const driveDistance = this.finish.includes('Layup') ? 0.8 : 0.5

    const halfPoint = getQuadraticXY(driveDistance, startX, startY, controlX, controlY, endX, endY)
    // Calculate angle for arrowhead rotation
    const angled = Math.atan2(endY - controlY, endX - controlX);

    function getQuadraticXY(t, sx, sy, cp1x, cp1y, ex, ey) {
      return {
        x: (1 - t) * (1 - t) * sx + 2 * (1 - t) * t * cp1x + t * t * ex,
        y: (1 - t) * (1 - t) * sy + 2 * (1 - t) * t * cp1y + t * t * ey
      };
    }

    const container = document.querySelector('.container');
    const ballImage = document.querySelector('.bball-image');
    const rect = ballImage.getBoundingClientRect();
    const scaler = rect.width/1120

    const svgString = `<svg height="210" width="400" xmlns="http://www.w3.org/2000/svg">
      <path d="M${startX * scaler} ${startY * scaler} Q ${controlX * scaler} ${controlY * scaler} ${halfPoint.x * scaler} ${halfPoint.y * scaler}"
      marker-end="url(#arrowhead)"
      style="fill:none; stroke:rgba(255, 0, 0, 0.7); stroke-width: ${10 * scaler}"
      stroke-linecap="round"
       />
      <defs>
       <marker id="arrowhead" markerWidth="10" markerHeight="7" 
               refX="0" refY="3.5" orient="auto">
         <polygon points="0 0, 4 3.5, 0 7" fill="rgba(255, 0, 0, 1)"/>
       </marker>
     </defs>
    </svg>`

    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = svgString;
    const newElement = tempContainer.firstElementChild; // Or access specific children
    newElement.classList = 'route-path';

    newElement.style.position = `absolute`
    newElement.style.width = `100%`
    newElement.style.height = `100%`
    newElement.style.left = `0`
    newElement.style.top = `0`


    // Append to the SVG container
    container.appendChild(newElement);

    // Draw the curve
    canvasCtx.beginPath();
    canvasCtx.moveTo(startX, startY);
    canvasCtx.quadraticCurveTo(controlX, controlY, halfPoint.x, halfPoint.y);
    canvasCtx.lineWidth = 4;
    canvasCtx.stroke();

    // Draw the arrowhead
    canvasCtx.save(); // Save the current context state
    canvasCtx.translate(halfPoint.x, halfPoint.y);
    canvasCtx.rotate(angled);
    canvasCtx.beginPath();
    canvasCtx.moveTo(10, 10);
    canvasCtx.lineTo(-25, 20);
    canvasCtx.lineTo(-25, -20);
    canvasCtx.closePath();
    canvasCtx.fillStyle = "blue";
    canvasCtx.fill();
    canvasCtx.restore(); // Restore the context state
  }

  //workout params
  numberOfSpots = this.workout.numberOfSpots || 3
  permittedZones = this.workout.permittedZones || courtZones.filter((zone) => zone.id > 13 ).map((zone) => zone.id )
  actions = this.workout.actions || ["Make", "Shoot"]
  minMakeAmount = this.workout.minMakeAmount || 5
  maxMakeAmount = this.workout.maxMakeAmount || 10
  minAttemptAmount = this.workout.minAttemptAmount || 5
  maxAttemptAmount = this.workout.maxAttemptAmount || 10
  minInARow = this.workout.minInARow || 2
  maxInARow = this.workout.maxInARow || 3
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
  
  formatWorkout () {
    let rules = null
    const isTimed = this.isTimeable && Boolean(this.getRandomInteger(0, 1))
    const isInARow = this.difficulty() === 'In A Row'
    let amount = this.getAmount(isInARow, isTimed)
    const seconds = [30, 45, 60].randomItem()
  
    const pre = this.getPre()
    const move1 = this.getMove1()
    const move2 = this.getMove2(move1)
    // const finish = this.getFinish()

    if (true) {
      rules = [pre, move1, move2, this.finish]
      // rules = `${pre} ${move1}, ${move2} ${this.finish}`
      // rules = `${pre} ${move1}, ${move2} ${finish} ${amount} times`
      // rules = `${pre} ${move1}, ${move2} ${finish} for ${seconds} seconds`
    } else if (this.isStandalone) {
      rules = `${this.variation()}`
    } else if (isTimed) {
      const x = amount * this.frequency
      let seconds = Math.ceil(x + x / 5)
      rules = `Make ${amount} ${this.variation()} in ${ seconds } seconds`
    } else {
      rules = `${this.action()} ${amount} ${this.variation()}${this.difficulty() ? ',': ''} ${ this.difficulty() }`
    }

    return {
      rules,
      permittedZones: this.permittedZones,
      workout: this.workout,
      permittedSpots: this.permittedSpots,
      numberOfSpots: this.numberOfSpots,
      addSpotsToCanvas: this.addSpotsToCanvas
    }
  }
}
