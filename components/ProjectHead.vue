<template>
  <header class="grid gap-4 md:grid-cols-12 md:gap-6">
    <p class="font-display text-sub text-accent md:col-span-1">{{ index }}</p>
    <div class="md:col-span-6">
      <h2 data-heading class="text-series">{{ title }}</h2>
    </div>
    <div class="flex flex-col gap-3 md:col-span-4 md:col-start-9 md:self-end">
      <p v-if="status" class="text-meta font-medium text-accent">{{ status }}</p>
      <p class="text-muted"><slot /></p>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{ index: string; title: string; status?: string }>()
</script>
