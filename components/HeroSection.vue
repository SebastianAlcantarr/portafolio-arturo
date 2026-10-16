<template>
  <section id="inicio" data-hero class="mx-auto grid max-w-[1600px] grid-cols-1 gap-8 px-5 pb-10 pt-20 md:h-[100svh] md:min-h-[640px] md:grid-cols-12 md:gap-6 md:px-10 md:pb-10 md:pt-24">
    <div class="order-2 flex flex-col justify-end gap-8 md:order-1 md:col-span-6 lg:col-span-5">
      <div class="flex flex-col gap-6">
        <h1 data-hero-title class="text-display">
          {{ site.firstName }}<br />
          Hernández
        </h1>
        <p data-hero-fade class="font-display text-2xl font-light italic text-accent md:text-3xl">{{ site.role }}</p>
        <p data-hero-fade class="max-w-[30ch] text-lead text-muted">{{ site.lead }}</p>
        <div data-hero-fade class="flex flex-wrap items-center gap-x-8 gap-y-3 text-meta">
          <a href="#proyectos" class="link-line font-medium">Ver proyectos</a>
          <a href="#contacto" class="link-line font-medium text-accent">Contacto</a>
        </div>
      </div>
    </div>

    <figure data-hero-photo class="relative order-1 h-[58svh] overflow-hidden bg-plate md:order-2 md:col-span-6 md:col-start-7 md:h-auto lg:col-span-6 lg:col-start-7">
      <img
        :src="asset('/work/retrato-rojo-1-1800.webp')"
        alt="Retrato de una mujer con vestido blanco sobre fondo rojo"
        width="1800"
        height="2700"
        fetchpriority="high"
        class="absolute inset-0 h-full w-full object-cover object-[50%_25%]"
      />
    </figure>
  </section>
</template>

<script setup lang="ts">
import { site } from '~/data/site'
import { asset } from '~/utils/asset'
</script>
