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

      <section id="crm" class="mx-auto max-w-[1600px] border-t border-rule px-5 py-16 md:px-10 md:py-24">
        <ProjectHead :index="crmProject.index" :title="crmProject.title" :status="crmProject.status">{{ crmProject.text }}</ProjectHead>
        <ul class="mt-10 grid gap-px overflow-hidden border border-rule bg-rule md:mt-14 md:grid-cols-3">
          <li v-for="f in crmProject.features" :key="f" class="bg-paper p-6 md:p-8">
            <p class="font-display text-2xl font-light md:text-3xl">{{ f }}</p>
          </li>
        </ul>
      </section>
    </main>
    <ContactSection />
    <PhotoViewer :photos="photos" :index="viewer" @close="viewer = null" @change="viewer = $event" />
  </div>
</template>

<script setup lang="ts">
import { crmProject, photoProject, projectsIntro } from '~/data/projects'
import { series } from '~/data/work'

const photos = series.flatMap((s) => s.photos)
const offsets = series.map((_, i) => series.slice(0, i).reduce((n, s) => n + s.photos.length, 0))
const viewer = ref<number | null>(null)

useGalleryMotion()
</script>
