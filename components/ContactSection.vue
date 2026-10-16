<template>
  <footer id="contacto" class="mx-auto max-w-[1600px] px-5 pb-8 pt-16 md:px-10 md:pt-24">
    <h2 data-heading class="max-w-[18ch] text-series">Contacto</h2>

    <dl class="mt-10 grid gap-6 border-t border-rule pt-6 md:mt-14 md:grid-cols-3">
      <div v-for="i in items" :key="i.label">
        <dt class="text-meta text-muted">{{ i.label }}</dt>
        <dd class="mt-1 font-display text-2xl font-light">
          <a v-if="i.href" :href="i.href" class="link-line" :target="i.external ? '_blank' : undefined" rel="noopener">{{ i.value }}</a>
          <span v-else>{{ i.value }}</span>
        </dd>
      </div>
    </dl>

    <p class="mt-12 text-meta text-muted">© {{ year }} {{ site.name }}</p>
  </footer>
</template>

<script setup lang="ts">
import { site } from '~/data/site'

const c = site.contact
const isReal = (v: string) => !!v && !v.startsWith('[')
// Solo se muestran los datos ya completados.
const items = [
  { label: 'Correo', value: c.email, href: `mailto:${c.email}` },
  { label: 'Teléfono', value: c.phone, href: c.phoneHref },
  { label: 'Instagram', value: c.instagram, href: c.instagramUrl, external: true },
  { label: 'Ciudad', value: c.city, href: '' },
].filter((i) => isReal(i.value))
const year = new Date().getFullYear()
</script>
