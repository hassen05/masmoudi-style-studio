import hero from '@/assets/hero.jpg'
import look1 from '@/assets/lookbook-1.jpg'
import look2 from '@/assets/lookbook-2.jpg'

export type Clothing = {
  id: string
  name: string
  description?: string
  price?: string
  image?: string
  collection?: string
}

// Example items. In the future the admin panel should persist and serve these.
export const clothes: Clothing[] = [
  {
    id: 'mas-001',
    name: 'Manteau en laine — Navy',
    description: "Manteau long en laine vierge, coupe tailleur.",
    price: '€480',
    image: hero,
    collection: 'Tailleur',
  },
  {
    id: 'mas-002',
    name: 'Pull torsadé — Écru',
    description: 'Maille lourde, col roulé.',
    price: '€160',
    image: look1,
    collection: 'Maille',
  },
  {
    id: 'mas-003',
    name: 'Veste denim — Brut',
    description: 'Veste en selvedge denim, intérieur surpiqué.',
    price: '€220',
    image: look2,
    collection: 'Denim',
  },
]

export default clothes
