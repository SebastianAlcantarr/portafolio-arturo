<template>
  <div>
    <SiteNav />
    <main>
      <HeroSection />

      <section id="proyectos" class="mx-auto max-w-[1600px] px-5 pb-16 pt-12 md:px-10 md:pb-24 md:pt-20">
        <h2 data-heading class="mb-14 max-w-[22ch] text-series md:mb-20">{{ projectsIntro.title }}</h2>

        <ProjectHead :index="photoProject.index" :title="photoProject.title">{{ photoProject.text }}</ProjectHead>
        <SeriesSection v-for="(s, i) in series" :key="s.id" :series="s" :offset="offsets[i]" @open="viewer = $event" />

        <div id="video" class="mt-16 md:mt-24">
          <BeforeAfter />
        </div>
      </section>
    </main>
    <ContactSection />
    <PhotoViewer :photos="photos" :index="viewer" @close="viewer = null" @change="viewer = $event" />
  </div>
</template>

<script setup lang="ts">
import { photoProject, projectsIntro } from '~/data/projects'
import { series } from '~/data/work'

const photos = series.flatMap((s) => s.photos)
const offsets = series.map((_, i) => series.slice(0, i).reduce((n, s) => n + s.photos.length, 0))
const viewer = ref<number | null>(null)

useGalleryMotion()
</script>
