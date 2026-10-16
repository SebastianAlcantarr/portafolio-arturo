<template>
  <header class="fixed inset-x-0 top-0 z-30 border-b border-transparent bg-paper transition-colors duration-500" :class="{ '!border-rule': scrolled }">
    <nav class="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-3 md:px-10" aria-label="Principal">
      <a href="#inicio" class="font-display text-xl font-light tracking-tight">{{ site.name }}</a>
      <ul class="flex items-center gap-5 text-meta md:gap-9">
        <li class="hidden sm:block"><a href="#proyectos" class="link-line">Proyectos</a></li>
        <li class="hidden sm:block"><a href="#video" class="link-line">Video</a></li>
        <li><a href="#contacto" class="link-line text-accent">Contacto</a></li>
        <li><ThemeToggle /></li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { site } from '~/data/site'

const scrolled = ref(false)
onMounted(() => {
  const onScroll = () => (scrolled.value = window.scrollY > 24)
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
})
</script>
