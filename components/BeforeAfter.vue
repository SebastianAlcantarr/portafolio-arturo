<template>
  <div class="grid gap-8 md:grid-cols-12 md:gap-6">
    <div class="flex flex-col gap-6 md:col-span-3 md:justify-between">
      <div class="flex flex-col gap-4">
        <h3 data-heading class="font-display text-sub">{{ video.title }}</h3>
        <p class="text-muted">{{ video.note }}</p>
        <ul class="flex flex-col gap-2 text-meta">
          <li class="flex items-center gap-2"><span class="h-2 w-2 rounded-full bg-muted" />Antes: sin gradar</li>
          <li class="flex items-center gap-2"><span class="h-2 w-2 rounded-full bg-accent" />Después: color corregido</li>
        </ul>
      </div>

      <div class="flex flex-col items-start gap-4">
        <div class="flex gap-1 rounded-full border border-rule p-1 text-meta" role="tablist" aria-label="Vista de comparación">
          <button v-for="v in views" :key="v.id" type="button" role="tab" :aria-selected="view === v.id" class="rounded-full px-4 py-1.5 transition-colors duration-300" :class="view === v.id ? 'bg-accent text-paper' : 'text-muted hover:text-ink'" @click="view = v.id">
            {{ v.label }}
          </button>
        </div>
        <button type="button" class="link-line text-meta" @click="toggle">{{ playing ? 'Pausar' : 'Reproducir' }}</button>
        <p class="text-meta text-muted">{{ view === 'deslizar' ? 'Arrastra la línea o usa las flechas.' : 'Los dos videos avanzan juntos.' }}</p>
      </div>
    </div>

    <div ref="box" data-reveal class="md:col-span-5">
      <!-- Vista 1: deslizar -->
      <div v-if="view === 'deslizar'" ref="stage" class="relative aspect-[4/5] md:aspect-auto md:h-[min(80svh,760px)] cursor-ew-resize touch-pan-y select-none overflow-hidden bg-plate" @pointerdown="start">
        <video :src="asset(video.before)" :poster="asset(video.beforePoster)" class="absolute inset-0 h-full w-full object-cover object-[50%_35%]" muted loop playsinline preload="metadata" aria-label="Video sin gradar" />
        <video :src="asset(video.after)" :poster="asset(video.afterPoster)" class="absolute inset-0 h-full w-full object-cover object-[50%_35%]" :style="{ clipPath: `inset(0 0 0 ${pos}%)` }" muted loop playsinline preload="metadata" aria-label="Video con color corregido" />
        <span class="pointer-events-none absolute left-3 top-3 bg-paper/90 px-3 py-1 text-meta text-ink">Antes</span>
        <span class="pointer-events-none absolute right-3 top-3 bg-accent px-3 py-1 text-meta text-paper">Después</span>
        <div role="slider" tabindex="0" aria-label="Comparar antes y después" aria-valuemin="0" aria-valuemax="100" :aria-valuenow="Math.round(pos)" class="absolute inset-y-0 z-10 w-px -translate-x-1/2 bg-white outline-offset-8" :style="{ left: `${pos}%` }" @keydown="onKey">
          <span class="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#0B1B3A] shadow-[0_6px_20px_-6px_rgb(0_0_0/0.35)]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 5 2.5 10 7 15M13 5l4.5 5L13 15" /></svg>
          </span>
        </div>
      </div>

      <!-- Vista 2: lado a lado -->
      <div v-else class="grid grid-cols-2 gap-3 md:h-[min(80svh,760px)]">
        <figure class="relative aspect-[9/16] overflow-hidden bg-plate md:aspect-auto md:h-full">
          <video :src="asset(video.before)" :poster="asset(video.beforePoster)" class="absolute inset-0 h-full w-full object-cover" muted loop playsinline preload="metadata" aria-label="Video sin gradar" />
          <figcaption class="pointer-events-none absolute left-3 top-3 bg-paper/90 px-3 py-1 text-meta text-ink">Antes</figcaption>
        </figure>
        <figure class="relative aspect-[9/16] overflow-hidden bg-plate md:aspect-auto md:h-full">
          <video :src="asset(video.after)" :poster="asset(video.afterPoster)" class="absolute inset-0 h-full w-full object-cover" muted loop playsinline preload="metadata" aria-label="Video con color corregido" />
          <figcaption class="pointer-events-none absolute left-3 top-3 bg-accent px-3 py-1 text-meta text-paper">Después</figcaption>
        </figure>
      </div>
    </div>

    <div class="md:col-span-4"><ReelVertical /></div>
  </div>
</template>

<script setup lang="ts">
import { video } from '~/data/work'
import { asset } from '~/utils/asset'

const views = [
  { id: 'deslizar', label: 'Deslizar' },
  { id: 'lado', label: 'Lado a lado' },
] as const
const view = ref<'deslizar' | 'lado'>('deslizar')
const box = ref<HTMLElement>()
const stage = ref<HTMLElement>()
const pos = ref(50)
const playing = ref(false)
let dragging = false
let lastT = 0

const vids = () => Array.from(box.value?.querySelectorAll('video') ?? []) as HTMLVideoElement[]

const setFromEvent = (e: PointerEvent) => {
  const r = stage.value!.getBoundingClientRect()
  pos.value = Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100))
}
const move = (e: PointerEvent) => dragging && setFromEvent(e)
const end = () => {
  dragging = false
  window.removeEventListener('pointermove', move)
  window.removeEventListener('pointerup', end)
}
const start = (e: PointerEvent) => {
  dragging = true
  setFromEvent(e)
  window.addEventListener('pointermove', move)
  window.addEventListener('pointerup', end)
}
const onKey = (e: KeyboardEvent) => {
  const step = e.shiftKey ? 10 : 2
  if (e.key === 'ArrowLeft') pos.value = Math.max(0, pos.value - step)
  else if (e.key === 'ArrowRight') pos.value = Math.min(100, pos.value + step)
  else return
  e.preventDefault()
}

const toggle = () => {
  playing.value = !playing.value
  vids().forEach((v) => (playing.value ? v.play().catch(() => {}) : v.pause()))
}

// Al cambiar de vista los videos se vuelven a montar: se retoma el mismo segundo y estado.
watch(view, async () => {
  await nextTick()
  vids().forEach((v) => {
    v.currentTime = lastT
    if (playing.value) v.play().catch(() => {})
  })
})

let raf = 0
onMounted(() => {
  const sync = () => {
    const [master, ...rest] = vids()
    if (master) {
      lastT = master.currentTime
      rest.forEach((v) => Math.abs(v.currentTime - lastT) > 0.06 && (v.currentTime = lastT))
    }
    raf = requestAnimationFrame(sync)
  }
  raf = requestAnimationFrame(sync)
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    new IntersectionObserver(([entry], io) => {
      if (entry.isIntersecting) {
        if (!playing.value) toggle()
        io.disconnect()
      }
    }, { threshold: 0.4 }).observe(box.value!)
  }
})
onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  end()
})
</script>
