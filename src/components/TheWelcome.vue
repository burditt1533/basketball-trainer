<script setup lang="ts">
  import WelcomeItem from './WelcomeItem.vue'
  import basketballCourtZones from '../assets/Court Zones with numbers.png'
  import basketballCourt2 from '../assets/Court Zones.png'
  import BallPlayer from '../assets/player.png'
  import PlayerLayup from '../assets/player_layup.png'
  import smallMan from '../assets/small-man2.png'
  import { computed, ref, onMounted } from 'vue'
  import { getRandomPointInPolygon } from '../utils/canvas.js';
  import { courtZones } from '../utils/courtZones.js';
  import { getWorkout } from '../utils/generateWorkout.js';
  import { Workout } from '../utils/generateWorkout2.js';
  import { Shooting } from '../workouts/shooting.js';
  import { theClasses } from '../workouts/workoutClasses.js';

  const canvasCtx = ref({})
  const canvas = ref({})
  const theWorkout = ref({})
  const isShowCourtLines = ref(false)
  const scaleCooeficient = 4


  const getRandomInteger = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const generateWorkout = () => {
    //  not sure why this has to happen 1st
    theWorkout.value = getWorkout()

    const klasses = Object.keys(theClasses)
    let klassName = klasses[getRandomInteger(0, klasses.length - 1)]
    
    // const child = new Workout();
    klassName = 'A2b'
    const workoutKlass = new theClasses[klassName]();
    theWorkout.value = workoutKlass.formatWorkout()
    drawCanvas()
    theWorkout.value.addSpotsToCanvas(canvasCtx.value, canvas.value)
  }
  
  const thingy =() => {
    theWorkout.value.addSpotsToCanvas(canvasCtx.value, canvas.value)

  }

  const drawCanvas = () => {
    canvas.value = document.getElementById('myCanvas');
    canvasCtx.value = canvas.value.getContext('2d');
    canvasCtx.value.clearRect(0, 0, canvas.value.width, canvas.value.height); // Clear canvas
    // Set canvas dimensions (adjust as needed)
    canvas.value.width = 1120;
    canvas.value.height = 800;
    
    courtZones.forEach((shape) => {
      canvasCtx.value.beginPath();
      canvasCtx.value.moveTo(shape.points[0].x * scaleCooeficient, shape.points[0].y * scaleCooeficient);
      shape.points.forEach((point) => canvasCtx.value.lineTo(point.x * scaleCooeficient, point.y * scaleCooeficient))
      canvasCtx.value.closePath();
      // canvasCtx.value.stroke();
      canvasCtx.value.fillStyle = 'rgba(0, 0, 255, 0.5)';
      // canvasCtx.value.fill();
    })
  }

  onMounted(() => {
    generateWorkout()
    let points = []
    let all = []
    let idIndex = 41
    let isStartedPath = false
    const getClickPosition = (event) => {
      const rect = canvas.value.getBoundingClientRect();
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const dotRadius = 1.5;

      // canvasCtx.value.clearRect(0, 0, canvas.value.width, canvas.value.height); // Clear canvas

      canvasCtx.value.beginPath();
      canvasCtx.value.moveTo(x, y);
      points.forEach((point) => canvasCtx.value.lineTo(point.x, point.y))

      canvasCtx.value.closePath();
      canvasCtx.value.fillStyle = 'rgba(0, 255, 255, 0.5)';
      canvasCtx.value.fill();

      points.push({x, y})
      console.log("x: " + x + ", y: " + y);
    }
    // document.addEventListener('keydown', function(event) {
    //   if (event.key === 'Enter') {
    //     const formatted ={
    //       id: idIndex,
    //       title: 'unknown',
    //       points
    //     }
    //     all.push(formatted)

    //     console.log(formatted)
    //     console.log(all)

    //     points = []
    //     idIndex++
    //     canvasCtx.value.clearRect(0, 0, canvas.value.width, canvas.value.height); // Clear canvas
    //   }
      
    //   if (event.key === 'Backspace') {
    //     console.log('space')

    //     points = []
    //     canvasCtx.value.clearRect(0, 0, canvas.value.width, canvas.value.height); // Clear canvas
    //   }
    // });
    // canvas.value.addEventListener('click', getClickPosition, false);
  })
</script>

<template>
  <div class="contain-all">
    <div @click="generateWorkout" class="container">
      <img v-if="isShowCourtLines" :src="basketballCourtZones" id="bball" class="bball-image with-lines">
      <img :src="basketballCourt2" id="bball" class="bball-image">
      <canvas id="myCanvas" class="bball-canvas"></canvas>
    </div>

    <div class="rule-container">
      <h2 v-for="rule in theWorkout.rules" :key="rule">
        {{ rule }}
      </h2>
    </div>
    <div class="menu-container">
      <!-- <h2>{{ theWorkout.rules }}</h2> -->
      <!-- <button @click="generateWorkout">Generate Workout</button><br>
      <button @click="isShowCourtLines = !isShowCourtLines">Show Lines</button><br>
      <button @click="thingy">New Spot</button><br> -->
    </div>
  </div>
</template>

<style>
  h2 {
    text-align: center;
    font-size: 40px;
  }
  .menu-container {
    width: 100%;
  }
  
  .contain-all {
    display: flex;
    flex-direction: column;
  }

  .container {
    position: relative;
    height: 50vh;
    width: 100%;
  }

  .bball-image {
    z-index: 0;
    /* height: 800px; */
    width: 100%;
    max-width: 1120px;
    position: absolute;
  }

  .with-lines {
    z-index: 1;
  }

  .bball-canvas {
    position: absolute;
    z-index: 1;
    left: 0px;
    width: 100%;
    max-width: 1120px;
    transform-origin: top left;
  }

  .small-man {
    position: absolute;
    width: 50px;
    filter: hue-rotate(200deg);
  }
</style>
