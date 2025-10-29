<template>
  <div recreation>
    <!-- Lottie elements -->
    <div class="full draggable" ref="lottie1" style="top: 5%; left: 0%; height: 75vh"></div>
    <div class="full draggable" ref="lottie2" style="top: 5%; left: 72.5%; height: 85vh"></div>
    <div class="lottie-item draggable" ref="lottie3" style="top: 15%; left: 25%"></div>
    <div class="lottie-item draggable" ref="lottie4" style="top: 50%; left: 45%"></div>

    <!-- Images -->
    <div class="draggable" style="top: 40%; left: 25%">
      <img src="@/assets/socks.svg" alt="socks" />
    </div>
    <div class="draggable" style="top: 40%; left: 60%;">
      <img src="@/assets/letters.svg" alt="letters" style="height:20vw;" />
    </div>

    <!-- Video -->
    <div class="draggable" ref="videoElement" style="top: 10%; left: 50%">
      <video autoplay muted loop playsinline preload="auto">
        <source :src="videoUrl" type="video/webm" />
      </video>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import lottie from 'lottie-web'
import videoFile from '@/assets/lotties/5.webm'
import lottie1Data from '@/assets/lotties/1.json'
import lottie2Data from '@/assets/lotties/2.json'
import lottie3Data from '@/assets/lotties/3.json'
import lottie4Data from '@/assets/lotties/4.json'

const lottie1 = ref(null)
const lottie2 = ref(null)
const lottie3 = ref(null)
const lottie4 = ref(null)
const videoElement = ref(null)
const videoUrl = ref(videoFile)
let animations = []
let cleanupFns = []

function makeDraggable(el) {
  if (!el) return
  el.style.position = 'absolute'
  el.style.cursor = 'grab'
  el.style.touchAction = 'none'

  el.querySelectorAll('img, video').forEach(child => {
    child.draggable = false
    child.style.pointerEvents = 'none'
    child.style.userSelect = 'none'
    child.addEventListener('pointerdown', e => e.preventDefault())
  })

  let offsetX = 0
  let offsetY = 0
  let isDragging = false

  const createTrail = (x, y) => {
    const clone = el.cloneNode(true)
    clone.classList.add('drag-trail')
    clone.style.left = `${x}px`
    clone.style.top = `${y}px`
    clone.style.pointerEvents = 'none'
    clone.style.userSelect = 'none'
    clone.style.zIndex = `${Math.floor(Math.random() * 50) + 1}`
    el.parentElement.appendChild(clone)
    clone.addEventListener('animationend', () => clone.remove())
  }

  const onPointerDown = (e) => {
    isDragging = true
    el.style.cursor = 'grabbing'
    el.classList.add('dragging')
    offsetX = e.clientX - el.offsetLeft
    offsetY = e.clientY - el.offsetTop
    el.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e) => {
    if (!isDragging) return
    const x = e.clientX - offsetX
    const y = e.clientY - offsetY
    el.style.left = `${x}px`
    el.style.top = `${y}px`
    if (Math.random() > 0.6) createTrail(x, y)
  }

  const onPointerUp = (e) => {
    isDragging = false
    el.style.cursor = 'grab'
    el.classList.remove('dragging')
    el.releasePointerCapture(e.pointerId)
  }

  el.addEventListener('pointerdown', onPointerDown)
  el.addEventListener('pointermove', onPointerMove)
  el.addEventListener('pointerup', onPointerUp)

  cleanupFns.push(() => {
    el.removeEventListener('pointerdown', onPointerDown)
    el.removeEventListener('pointermove', onPointerMove)
    el.removeEventListener('pointerup', onPointerUp)
  })
}

onMounted(() => {
  animations = [
    lottie.loadAnimation({ container: lottie1.value, renderer: 'svg', loop: true, autoplay: true, animationData: lottie1Data }),
    lottie.loadAnimation({ container: lottie2.value, renderer: 'svg', loop: true, autoplay: true, animationData: lottie2Data }),
    lottie.loadAnimation({ container: lottie3.value, renderer: 'svg', loop: true, autoplay: true, animationData: lottie3Data }),
    lottie.loadAnimation({ container: lottie4.value, renderer: 'svg', loop: true, autoplay: true, animationData: lottie4Data })
  ]

  document.querySelectorAll('.draggable').forEach(makeDraggable)
})

onUnmounted(() => {
  animations.forEach(a => a?.destroy())
  cleanupFns.forEach(fn => fn())
})
</script>

<style scoped>
[recreation] {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.draggable {
  position: absolute;
  cursor: grab;
  user-select: none;
  touch-action: none;
  z-index: 5;
  transition: transform 0.15s ease;
}

.dragging {
  transform: scale(1.05);
}

.lottie-item {
  width: 250px;
  height: 250px;
}

.full {
  width: 400px;
  height: 400px;
}

video {
  width: 300px;
  height: auto;
}

.drag-trail {
  position: absolute;
  transform: scale(0.95);
  pointer-events: none;
  user-select: none;
}

img,
video,
svg {
  user-select: none;
  pointer-events: none;
}
</style>
