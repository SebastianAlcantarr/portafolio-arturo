// Cada foto vive en public/work/<archivo>-900.webp (collage) y -1800.webp (visor).
// `row` agrupa las fotos en filas del collage; `ratio` (ancho/alto) es la forma con la que se muestra.
// Dentro de una fila todas quedan a la misma altura. `pos` ajusta el encuadre cuando la foto se recorta.
export interface Photo {
  file: string
  alt: string
  row: number
  ratio: number
  pos?: string
}

export interface Series {
  id: string
  title: string
  photos: Photo[]
}

export const series: Series[] = [
  {
    id: 'gastronomia',
    title: 'Gastronomía',
    photos: [
      { file: 'galleta', alt: 'Galleta con chispas de chocolate sobre un plato azul y blanco', row: 0, ratio: 2 / 3 },
      { file: 'dona', alt: 'Dos donas azucaradas rellenas de cajeta', row: 0, ratio: 2 / 3 },
      { file: 'croissant', alt: 'Croissant dorado sobre un plato azul y blanco', row: 0, ratio: 2 / 3 },
      { file: 'limonada', alt: 'Limonada con hielo en vaso de Fortino Pizza y Café', row: 1, ratio: 1, pos: '50% 55%' },
      { file: 'pizza', alt: 'Pizza de pepperoni y carne sobre mesa de ajedrez', row: 1, ratio: 3 / 2, pos: '60% 50%' },
    ],
  },
  {
    id: 'retrato',
    title: 'Retrato',
    photos: [
      { file: 'retrato-rojo-1', alt: 'Mujer con vestido blanco y chaqueta sobre el hombro, fondo rojo', row: 0, ratio: 2 / 3 },
      { file: 'retrato-mezclilla', alt: 'Mujer con chamarra de mezclilla frente a un fondo gris degradado', row: 0, ratio: 2 / 3 },
      { file: 'retrato-rojo-2', alt: 'Mujer con vestido blanco sujetando una chaqueta negra, fondo rojo', row: 0, ratio: 2 / 3 },
      { file: 'retrato-brazos', alt: 'Retrato de una mujer con los brazos sobre la cabeza, fondo vino', row: 1, ratio: 1, pos: '50% 30%' },
      { file: 'retrato-perfume', alt: 'Mujer rociándose perfume, detalle de cuello y malla de cristales', row: 1, ratio: 3 / 2, pos: '50% 35%' },
    ],
  },
]

// Antes y después. `before` y `after` son el mismo tramo (12 s) recortado a vertical, sincronizado cuadro a cuadro.
// `reel` es la edición completa con color corregido.
export const video = {
  title: 'Antes y después',
  note: 'Mismo plano, antes y después de la corrección de color en Final Cut Pro.',
  before: '/video/antes.mp4',
  beforePoster: '/video/antes-poster.jpg',
  after: '/video/despues.mp4',
  afterPoster: '/video/despues-poster.jpg',
  reel: '/video/reel-vertical.mp4',
  reelPoster: '/video/reel-poster.jpg',
}
