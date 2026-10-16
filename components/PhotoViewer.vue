<template>
  <Transition name="viewer">
    <div v-if="index !== null" ref="root" role="dialog" aria-modal="true" aria-label="Visor de fotos" class="fixed inset-0 z-50 grid grid-rows-[1fr_auto] bg-paper" @keydown="onKey">
      <div class="relative min-h-0 p-4 md:p-10">
        <img :key="current.file" :src="asset(`/work/${current.file}-1800.webp`)" :alt="current.alt" class="mx-auto h-full w-auto max-w-full object-contain" />
      </div>
      <div class="flex items-center justify-between gap-4 px-5 pb-5 text-meta md:px-10 md:pb-8">
        <p class="text-muted">{{ index + 1 }} de {{ photos.length }}</p>
        <div class="flex items-center gap-6">
          <button type="button" class="link-line" @click="step(-1)">Anterior</button>
          <button type="button" class="link-line" @click="step(1)">Siguiente</button>
          <button ref="closeBtn" type="button" class="link-line font-medium text-accent" @click="emit('close')">Cerrar</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { Photo } from '~/data/work'
import { asset } from '~/utils/asset'

const props = defineProps<{ photos: Photo[]; index: number | null }>()
const emit = defineEmits<{ close: []; change: [index: number] }>()

const root = ref<HTMLElement>()
const closeBtn = ref<HTMLButtonElement>()
const current = computed(() => props.photos[props.index ?? 0])

const step = (d: number) => emit('change', (props.index! + d + props.photos.length) % props.photos.length)
const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
  else if (e.key === 'ArrowRight') step(1)
  else if (e.key === 'ArrowLeft') step(-1)
}

let opener: HTMLElement | null = null
watch(
  () => props.index !== null,
  async (open) => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    if (open) {
      opener = document.activeElement as HTMLElement
      await nextTick()
      closeBtn.value?.focus()
    } else opener?.focus()
  },
)
onBeforeUnmount(() => (document.documentElement.style.overflow = ''))
</script>

<style scoped>
.viewer-enter-active,
.viewer-leave-active {
  transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.viewer-enter-from,
.viewer-leave-to {
  opacity: 0;
}
</style>
