import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

// Un solo momento de autor (la portada se revela al cargar) y movimientos discretos al hacer scroll.
// Sin movimiento reducido, todo queda estático y visible.
export function useGalleryMotion() {
  let mm: gsap.MatchMedia | undefined

  onMounted(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText)
    mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ease = 'expo.out'

      const title = SplitText.create('[data-hero-title]', { type: 'lines', mask: 'lines' })
      gsap.set('[data-hero-title]', { visibility: 'visible' })

      gsap
        .timeline({ defaults: { ease } })
        .fromTo('[data-hero-photo]', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5 }, 0)
        .fromTo('[data-hero-photo] img', { scale: 1.25 }, { scale: 1.1, duration: 2 }, 0)
        .from(title.lines, { yPercent: 110, duration: 1.2, stagger: 0.12 }, 0.35)
        .fromTo('[data-hero-fade]', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 1, stagger: 0.12 }, 0.9)

      gsap.to('[data-hero-photo] img', {
        yPercent: 4,
        ease: 'none',
        scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: true },
      })

      gsap.utils.toArray<HTMLElement>('[data-heading]').forEach((el) => {
        const split = SplitText.create(el, { type: 'lines', mask: 'lines' })
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 1.1,
          ease,
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })

      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 90%',
        once: true,
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { clipPath: 'inset(100% 0% 0% 0%)', y: 28 },
            { clipPath: 'inset(0% 0% 0% 0%)', y: 0, duration: 1.2, ease, stagger: 0.12 },
          ),
      })

      document.fonts?.ready.then(() => ScrollTrigger.refresh())
    })
  })

  onBeforeUnmount(() => mm?.revert())
}
