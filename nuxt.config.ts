export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/fonts'],

  css: ['~/assets/css/main.css'],

  // @nuxt/fonts descarga las fuentes de Google en el build y las sirve desde el propio sitio.
  fonts: {
    families: [
      { name: 'Fraunces', provider: 'google', weights: [300, 400], styles: ['normal', 'italic'] },
      { name: 'Hanken Grotesk', provider: 'google', weights: [400, 500, 600] },
    ],
  },

  tailwindcss: { cssPath: false },

  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      title: 'Arturo Hernández · Fotógrafo y videógrafo',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#FFFFFF' },
        { name: 'description', content: 'Arturo Hernández, fotógrafo y videógrafo freelance. También creo herramientas digitales para negocios.' },
      ],
      // Marca el html antes de pintar para que el estado inicial de las animaciones no parpadee.
      script: [
        {
          innerHTML:
            "var d=document.documentElement;try{d.dataset.theme=localStorage.getItem('arturo-theme')==='azul'?'azul':'blanco'}catch(e){d.dataset.theme='blanco'}if(!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('motion-ok')",
        },
      ],
    },
  },
})
