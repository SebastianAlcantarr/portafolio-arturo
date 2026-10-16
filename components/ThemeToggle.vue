<template>
  <button
    type="button"
    class="group flex items-center gap-2 text-meta"
    :aria-label="`Cambiar tema. Actual: ${theme === 'azul' ? 'azul' : 'blanco'}`"
    @click="toggle"
  >
    <span class="relative grid h-7 w-12 place-items-center rounded-full border border-rule bg-plate transition-colors duration-500">
      <span class="absolute left-1 h-5 w-5 rounded-full bg-accent transition-transform duration-500 ease-out-expo" :class="theme === 'azul' ? 'translate-x-5' : 'translate-x-0'" />
    </span>
    <span class="hidden w-12 text-left text-muted group-hover:text-ink sm:inline">{{ theme === 'azul' ? 'Azul' : 'Blanco' }}</span>
  </button>
</template>

<script setup lang="ts">
const theme = ref<'blanco' | 'azul'>('blanco')

onMounted(() => {
  theme.value = document.documentElement.dataset.theme === 'azul' ? 'azul' : 'blanco'
})

const toggle = () => {
  theme.value = theme.value === 'azul' ? 'blanco' : 'azul'
  document.documentElement.dataset.theme = theme.value
  try {
    localStorage.setItem('arturo-theme', theme.value)
  } catch {}
}
</script>
