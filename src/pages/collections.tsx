import { motion } from "motion/react";

import { SiteHeader } from "@/components/site-chrome";
import { useClothesStore } from "@/lib/clothes-store";
import { usePageMeta } from "@/lib/use-page-meta";

type ClothingCard = {
  id: string;
  name: string;
  description?: string;
  price?: string;
  image?: string;
  collection?: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85 } },
};

export default function CollectionsPage() {
  usePageMeta({
    title: "Collections — Marco Benucci",
    description:
      "Browse all pieces added through the client-side atelier admin. Product changes are stored locally in your browser.",
  });

  const { items } = useClothesStore();
  const collections = Array.from(
    new Set(
      items.map((item) => item.collection).filter((value): value is string => Boolean(value)),
    ),
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader variant="inner" />

      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-end mb-12 md:mb-16">
            <div>
              <p className="eyebrow text-muted-foreground">— La Boutique</p>
              <h1 className="font-display text-5xl md:text-7xl mt-4">Toutes les pièces</h1>
              <p className="text-foreground/70 max-w-2xl mt-5 leading-relaxed">
                Toutes les pièces ajoutées depuis l'atelier numérique. Les modifications sont
                conservées dans ce navigateur grâce au stockage local.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-4">
              <div className="rounded-2xl border border-border/70 bg-secondary/40 p-5">
                <div className="eyebrow text-muted-foreground">Articles</div>
                <div className="font-display text-4xl mt-3">{items.length}</div>
              </div>
              <div className="rounded-2xl border border-border/70 bg-secondary/40 p-5">
                <div className="eyebrow text-muted-foreground">Collections</div>
                <div className="font-display text-4xl mt-3">{collections.length}</div>
              </div>
              <div className="rounded-2xl border border-border/70 bg-secondary/40 p-5 col-span-2 sm:col-span-1">
                <div className="eyebrow text-muted-foreground">Stockage</div>
                <div className="mt-3 text-sm text-foreground/70 leading-relaxed">
                  Sauvegarde locale du navigateur, sans serveur ni API.
                </div>
              </div>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="rounded-[2rem] border border-border/70 bg-secondary/30 p-8 md:p-12 text-center">
              <p className="font-display text-3xl">Aucune pièce disponible.</p>
              <p className="mt-4 text-foreground/70">
                Ajoutez des articles depuis l'admin, puis revenez ici pour les parcourir.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {items.map((item: ClothingCard, index) => (
                <motion.article
                  key={item.id}
                  className="group overflow-hidden rounded-[1.75rem] border border-border/70 bg-card/50"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="aspect-[3/4] bg-muted overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="eyebrow text-muted-foreground truncate">
                          {item.collection ?? "Pièce"}
                        </p>
                        <h3 className="font-display text-2xl mt-2 leading-tight">{item.name}</h3>
                        {item.description ? (
                          <p className="mt-3 text-sm text-foreground/70 leading-relaxed">
                            {item.description}
                          </p>
                        ) : null}
                      </div>
                      <div className="eyebrow text-accent whitespace-nowrap">
                        {item.price ?? "Sur demande"}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
