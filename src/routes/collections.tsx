import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

type Clothing = {
  id: string
  name: string
  description?: string
  price?: string
  image?: string
  collection?: string
}

export const Route = createFileRoute('/collections')({
  head: () => ({
    meta: [{ title: 'Collections — Marco Benucci' }],
  }),
  component: CollectionsPage,
})

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9 } },
}

function CollectionsPage() {
  const [items, setItems] = useState<Clothing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/clothes')
        if (!res.ok) throw new Error('Failed to load')
        const data = await res.json()
        if (!cancelled) setItems(data)
      } catch (e) {
        console.error(e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <main className="bg-background text-foreground min-h-screen px-6 md:px-12 py-24 md:py-36">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="eyebrow text-muted-foreground">— La Boutique</p>
          <h1 className="font-display text-5xl md:text-6xl mt-4">Toutes les pièces</h1>
          <p className="text-foreground/70 max-w-lg mt-4">Toutes les pièces ajoutées depuis le panneau d'administration.</p>
        </div>

        {loading ? (
          <p className="text-foreground/70">Chargement…</p>
        ) : items.length === 0 ? (
          <p className="text-foreground/70">Aucune pièce disponible. Ajoutez des articles via l'admin.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((item) => (
              <motion.article
                key={item.id}
                className="group bg-card overflow-hidden rounded-md"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <div className="aspect-[3/4] bg-muted overflow-hidden">
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-lg leading-none">{item.name}</h3>
                      {item.description ? <p className="text-sm text-foreground/70 mt-2">{item.description}</p> : null}
                    </div>
                    <div className="eyebrow text-accent">{item.price}</div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default CollectionsPage
