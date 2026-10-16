<template>
  <div :id="series.id" class="mt-12 md:mt-16">
    <h3 data-heading class="mb-5 font-display text-sub md:mb-6">{{ series.title }}</h3>

    <!-- Collage: cada fila reparte el ancho según la forma de sus fotos, así todas quedan a la misma altura. -->
    <div class="collage flex flex-col gap-2">
      <div v-for="(row, r) in rows" :key="r" :class="row.length === 2 ? 'flex items-start gap-2' : 'grid grid-cols-2 gap-2 md:flex md:items-start'">
        <button
          v-for="item in row"
          :key="item.photo.file"
          type="button"
          data-reveal
          class="tile aspect-[var(--r)] overflow-hidden bg-plate last:odd:col-span-2 max-md:last:odd:aspect-[3/2]"
          :class="row.length === 2 ? '[flex:var(--r)_1_0%]' : 'md:[flex:var(--r)_1_0%]'"
          :style="{ '--r': item.photo.ratio }"
          :aria-label="`Ampliar foto: ${item.photo.alt}`"
          @click="emit('open', item.index)"
        >
          <img
            :src="asset(`/work/${item.photo.file}-900.webp`)"
            :srcset="`${asset(`/work/${item.photo.file}-900.webp`)} 900w, ${asset(`/work/${item.photo.file}-1800.webp`)} 1800w`"
            sizes="(min-width: 768px) 33vw, 50vw"
            :alt="item.photo.alt"
            loading="lazy"
            decoding="async"
            class="h-full w-full object-cover"
            :style="{ objectPosition: item.photo.pos }"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Series } from '~/data/work'
import { asset } from '~/utils/asset'

const props = defineProps<{ series: Series; offset: number }>()
const emit = defineEmits<{ open: [index: number] }>()

const rows = computed(() => {
  const out: { photo: Series['photos'][number]; index: number }[][] = []
  props.series.photos.forEach((photo, i) => (out[photo.row] ??= []).push({ photo, index: props.offset + i }))
  return out
})
</script>
