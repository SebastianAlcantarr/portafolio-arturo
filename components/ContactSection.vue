<template>
  <footer id="contacto" class="mx-auto max-w-[1600px] px-5 pb-8 pt-16 md:px-10 md:pt-24">
    <h2 data-heading class="max-w-[18ch] text-series">¿Tienes un proyecto en mente? Hablemos.</h2>

    <dl class="mt-10 grid gap-6 border-t border-rule pt-6 md:mt-14 md:grid-cols-3">
      <div>
        <dt class="text-meta text-muted">Correo</dt>
        <dd class="mt-1 font-display text-2xl font-light">
          <component :is="isReal(c.email) ? 'a' : 'span'" :href="isReal(c.email) ? `mailto:${c.email}` : undefined" :class="isReal(c.email) && 'link-line'">{{ c.email }}</component>
        </dd>
      </div>
      <div>
        <dt class="text-meta text-muted">Instagram</dt>
        <dd class="mt-1 font-display text-2xl font-light">
          <component :is="c.instagramUrl ? 'a' : 'span'" :href="c.instagramUrl || undefined" :class="c.instagramUrl && 'link-line'" target="_blank" rel="noopener">{{ c.instagram }}</component>
        </dd>
      </div>
      <div>
        <dt class="text-meta text-muted">Ciudad</dt>
        <dd class="mt-1 font-display text-2xl font-light">{{ c.city }}</dd>
      </div>
    </dl>

    <p class="mt-12 text-meta text-muted">© {{ year }} {{ site.name }}</p>
  </footer>
</template>

<script setup lang="ts">
import { site } from '~/data/site'

const c = site.contact
const isReal = (v: string) => !v.startsWith('[')
const year = new Date().getFullYear()
</script>
