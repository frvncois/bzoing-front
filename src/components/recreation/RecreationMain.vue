<template>
  <div recreation>
    <!-- Lotties -->
    <div class="full draggable lottie1" ref="lottie1"></div>
    <div class="full draggable lottie2" ref="lottie2"></div>
    <div class="lottie-item draggable lottie3" ref="lottie3"></div>
    <div class="lottie-item draggable lottie4" ref="lottie4"></div>

    <!-- Images -->
    <div class="draggable socks">
      <img src="@/assets/socks.svg" alt="socks" />
    </div>
    <div class="draggable letters">
      <img src="@/assets/letters.svg" alt="letters" />
    </div>
    <div class="draggable cube">
      <img src="@/assets/cube.svg" alt="cube" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import lottie from 'lottie-web'
import lottie1Data from '@/assets/lotties/1.json'
import lottie2Data from '@/assets/lotties/2.json'
import lottie3Data from '@/assets/lotties/3.json'
import lottie4Data from '@/assets/lotties/4.json'

const lottie1 = ref(null)
const lottie2 = ref(null)
const lottie3 = ref(null)
const lottie4 = ref(null)

let animations = []
let cleanupFns = []
const MAX_TRAILS = 10
const activeTrails = []

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
    el.parentElement.appendChild(clone)
    activeTrails.push(clone)
    while (activeTrails.length > MAX_TRAILS) {
      const oldest = activeTrails.shift()
      oldest?.remove()
    }
    clone.addEventListener('animationend', () => clone.remove())
  }

  const onPointerDown = e => {
    isDragging = true
    el.style.cursor = 'grabbing'
    offsetX = e.clientX - el.offsetLeft
    offsetY = e.clientY - el.offsetTop
    el.setPointerCapture(e.pointerId)
  }

  const onPointerMove = e => {
    if (!isDragging) return
    const x = e.clientX - offsetX
    const y = e.clientY - offsetY
    el.style.left = `${x}px`
    el.style.top = `${y}px`
    if (Math.random() > 0.6) createTrail(x, y)
  }

  const onPointerUp = e => {
    isDragging = false
    el.style.cursor = 'grab'
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
  activeTrails.forEach(t => t.remove())
  activeTrails.length = 0
})
</script>

<style scoped>
[recreation] {
  position: absolute;
  inset: 0;
  width: 100vw;
  max-height: 100vh;
  overflow: hidden;
}

/* Generic draggable */
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

.drag-trail {
  position: absolute;
  transform: scale(0.95);
  pointer-events: none;
  user-select: none;
}

img,
svg {
  user-select: none;
  pointer-events: none;
  height: 20vw;
}

/* ────────── Element positions ────────── */
.lottie1 {
  top: 5em;
  left: 0%;
  height: 75vh;
}

.lottie2 {
  top: 5%;
  left: 72.5%;
  height: 85vh;
}

.lottie3 {
  top: 15%;
  left: 25%;
}

.lottie4 {
  top: 50%;
  left: 45%;
}

.socks {
  top: 40%;
  left: 25%;
}

.letters {
  top: 40%;
  left: 60%;
}

.cube {
  top: 20%;
  left: 50%;
}

@media only screen and (max-width: 767px) {



  [recreation] {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
}

.lottie1 {
  top: 2em;
  left: 0em;
  right: auto;
  height: 15em!important;
  width: 10.5em!important;
}

.lottie2 {
  top: 55%;
  left: 0em;
  height: 15em!important;
  width: 10em!important;
}

.lottie3 {
  top: 40%;
  left: auto;
  right: 0em;
  height: 8em!important;
  width: 8.5em!important;
}

.lottie4 {
  top: 65%;
  right: 1em;
  left: auto;
  height: 8em!important;
  width: 8em!important;
}

.socks {
  top: 10%;
  left: 65%;
  height: 15vw;
}

.letters {
  top: 35%;
  left: 05%;
}

.cube {
  top: 35%;
  left: 35%;
}

img,
svg {
  user-select: none;
  pointer-events: none;
  height: 35vw;
}
}
</style>
