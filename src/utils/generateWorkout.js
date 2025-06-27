// import { allWorkouts } from '../workouts/workoutData.js';
import { courtZones } from './courtZones.js';
import smallMan from '../assets/small-man2.png'
import { getRandomPointInPolygon } from './canvas.js';

export class Workout {
  constructor() {

  }

  permittedZones = courtZones.map((zone) => zone.id )
  actions = ["Make", "Attempt"]
  minMakeAmount = 5
  maxMakeAmount = 10
  minAttemptAmount = 10
  maxAttemptAmount = 15
  minInARow = 3
  maxInARow = 6
  isStandalone = false
  maxPerTimedPeriod = 10
  numberOfSpots = 1
  addedDifficulties = [
    "Over Defender",
    "With Contact",
    "In A Row",
    "No backboard",
  ]
  frequency = 8 //seconds per action
  isTimeable = true
  permittedSpots = null
  route = null
  path = []


  getRandomInteger (min, max)  {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  difficulty () {
    return this.addedDifficulties[this.getRandomInteger(-1, this.addedDifficulties.length - 1)] || ''
  }

  getAmount (isInARow, isTimed) {
    let minAmount = 1
    let maxAmount = 10

    if (isInARow) {
      minAmount = this.minInARow
      maxAmount = this.maxInARow
    } else if (isTimed) {
      minAmount = this.minMakeAmount
      maxAmount = this.maxPerTimedPeriod
    } else {
      minAmount = this.minAttemptAmount
      maxAmount = this.maxAttemptAmount
    }

    return this.getRandomInteger(minAmount, maxAmount)
  }

  getRoute () {
    let formattedPath = []

    this.path.forEach(({x, y}) => {
      formattedPath.push(x * 4)
      formattedPath.push(y * 4)
    })
    return formattedPath
  }

  variation () {
    const variations = this.workout.variations || [this.workout.title]
    return variations[this.getRandomInteger(0, variations.length - 1)]
  }

  action () {
    const isHaveToMake = this.difficulty() === 'In A Row'
    return isHaveToMake ? 'Make' : this.actions[this.getRandomInteger(0, this.actions.length - 1)]
  }

  addSpotsToCanvas = (canvasCtx, canvas) => {
    for (let i = 0; i < this.numberOfSpots; i++) {
      const randomZoneId = this.permittedZones.randomItem()
      const randomZone = courtZones.find((localZone) => localZone.id === randomZoneId)
      const permittedSpots = this.permittedSpots || randomZone.points
      const randomPoint = getRandomPointInPolygon(permittedSpots)

      this.path.push(randomPoint)
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
  }
  
  addPlayerImage(canvasCtx, canvas, coordinates) {
    const scaleCooeficient = 4

    const img = new Image();
    const denominator = 1.6
    const smallManImage = {
      src: smallMan,
      height: 195/denominator,
      width: 80/denominator,
      xOffset: -28,
      yOffset: -110
    }
    img.src = smallManImage.src;
    img.onload = () => {
      canvasCtx.drawImage(
        img, coordinates.x * scaleCooeficient + smallManImage.xOffset,
        coordinates.y * scaleCooeficient + smallManImage.yOffset,
        smallManImage.width,
        smallManImage.height
      ); 
      canvasCtx.globalCompositeOperation = 'source-in';
      canvasCtx.fillStyle = 'rgba(255, 0, 0, 1)';
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
      canvasCtx.globalCompositeOperation = 'source-over';
    };
    
    // Draw a dot (small filled circle) inside the polygon
    const dotRadius = 3;
    canvasCtx.beginPath();
    canvasCtx.arc(coordinates.x * scaleCooeficient, coordinates.y * scaleCooeficient, dotRadius, 0, 2 * Math.PI, false);
    // canvasCtx.fillStyle = 'rgba(255, 0, 0, 0.9)';
    // canvasCtx.fill();
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

    
    function getQuadraticXY(t, sx, sy, cp1x, cp1y, ex, ey) {
      return {
        x: (1 - t) * (1 - t) * sx + 2 * (1 - t) * t * cp1x + t * t * ex,
        y: (1 - t) * (1 - t) * sy + 2 * (1 - t) * t * cp1y + t * t * ey
      };
    }
    const pointOnLine = getQuadraticXY(0.7, startX, startY, controlX, controlY, endX, endY)

    // Draw the curve
    canvasCtx.beginPath();
    canvasCtx.moveTo(startX, startY);
    canvasCtx.quadraticCurveTo(controlX, controlY, pointOnLine.x, pointOnLine.y);
    canvasCtx.lineWidth = 4;
    canvasCtx.stroke();
  }
  
  formatWorkout () {
    let rules = null
    const isTimed = this.isTimeable && Boolean(this.getRandomInteger(0, 1))
    const isInARow = this.difficulty() === 'In A Row'
    let amount = this.getAmount(isInARow, isTimed)
  
    if (this.isStandalone) {
      rules = `${this.variation()}`
    } else if (isTimed) {
      const x = amount * this.frequency
      let seconds = Math.ceil(x + x / 5)
      rules = [`Make ${amount}`,`${this.variation()}`, `in ${ seconds } seconds` ]
      // rules = `Make ${amount} ${this.variation()} in ${ seconds } seconds`
    } else {
      rules = [`${this.action()} ${amount}`, `${this.variation()}`, `${ this.difficulty() }`]
      // rules = `${this.action()} ${amount} ${this.variation()}${this.difficulty() ? ',': ''} ${ this.difficulty() }`
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