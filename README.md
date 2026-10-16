# Portafolio de Arturo — fotografía y video

Nuxt 3 + Tailwind + GSAP. Dirección: "Galería de museo" (papel cálido, serif Fraunces, fotos grandes con aire).

- Textos de portada y contacto: `data/site.ts`. Proyectos: `data/projects.ts`. Temas (blanco y azul): tokens en `assets/css/main.css`.
- Fotos y series: `data/work.ts`. Archivos web en `public/work/` (`<nombre>-900.webp` y `-1800.webp`).
- Antes y después: `video` en `data/work.ts`. `antes.mp4` y `despues.mp4` son el mismo tramo de 12 s (recortado a vertical, sincronizado); `reel-vertical.mp4` es la edición completa.
- Animaciones (GSAP): `composables/useGalleryMotion.ts`. Respeta `prefers-reduced-motion`.
- Desarrollo: `npm run dev` · Producción: `npx nuxt generate`. Despliegue: `.github/workflows/deploy.yml` (ajusta el nombre del repo en `NUXT_APP_BASE_URL`).
