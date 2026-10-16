<template>
  <figure data-reveal class="relative aspect-[9/16] overflow-hidden bg-plate md:aspect-auto md:h-[min(80svh,760px)]">
    <video ref="el" :src="asset(video.reel)" :poster="asset(video.reelPoster)" class="absolute inset-0 h-full w-full object-cover" muted loop playsinline preload="none" aria-label="Edición final, video vertical" />
    <figcaption class="pointer-events-none absolute left-3 top-3 bg-paper/90 px-3 py-1 text-meta text-ink">Edición final</figcaption>
    <button
      type="button"
      class="absolute bottom-3 left-3 grid h-11 w-11 place-items-center rounded-full bg-paper text-ink transition-transform duration-300 ease-out-expo hover:scale-105"
      :aria-label="playing ? 'Pausar reel' : 'Reproducir reel'"
      @click="toggle"
    >
      <svg v-if="!playing" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M4 2.5v11l9-5.5z" /></svg>
      <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" /></svg>
    </button>
  </figure>
</template>

<script setup lang="ts">
import { video } from '~/data/work'
import { asset } from '~/utils/asset'

const el = ref<HTMLVideoElement>()
const playing = ref(false)
const toggle = () => (playing.value ? el.value?.pause() : el.value?.play().catch(() => {}))

onMounted(() => {
  const v = el.value!
  v.addEventListener('play', () => (playing.value = true))
  v.addEventListener('pause', () => (playing.value = false))
  // Se pausa al salir de pantalla para no gastar batería ni datos.
  new IntersectionObserver(([e]) => {
    if (!e.isIntersecting && playing.value) v.pause()
  }, { threshold: 0.1 }).observe(v)
})
</script>
