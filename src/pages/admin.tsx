import { motion } from "motion/react";
import { useState } from "react";

import { SiteHeader } from "@/components/site-chrome";
import { useClothesStore } from "@/lib/clothes-store";
import { usePageMeta } from "@/lib/use-page-meta";

type Clothing = {
  id: string;
  name: string;
  description?: string;
  price?: string;
  image?: string;
  collection?: string;
};

const inputClass =
  "w-full rounded-2xl border border-border/70 bg-background/70 px-4 py-3 text-sm outline-none transition focus:border-foreground";

export default function AdminPage() {
  usePageMeta({
    title: "Admin — Marco Benucci",
    description:
      "Manage products in a lightweight client-only admin panel. Changes persist locally in the browser.",
  });

  const { items, createClothing, updateClothing, deleteClothing, resetToSeed } = useClothesStore();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    collection: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFields, setEditFields] = useState<Record<string, string>>({});

  function handleCreate() {
    const name = form.name.trim();
    if (!name) {
      return;
    }

    createClothing(form);
    setForm({ name: "", description: "", price: "", image: "", collection: "" });
  }

  function startEdit(item: Clothing) {
    setEditingId(item.id);
    setEditFields({
      name: item.name ?? "",
      description: item.description ?? "",
      price: item.price ?? "",
      image: item.image ?? "",
      collection: item.collection ?? "",
    });
  }

  function saveEdit(id: string) {
    const name = (editFields.name ?? "").trim();
    if (!name) {
      return;
    }

    updateClothing(id, {
      name,
      description: editFields.description ?? "",
      price: editFields.price ?? "",
      image: editFields.image ?? "",
      collection: editFields.collection ?? "",
    });
    setEditingId(null);
    setEditFields({});
  }

  function handleDelete(id: string) {
    if (!confirm("Supprimer cette pièce ?")) {
      return;
    }

    deleteClothing(id);
  }

  function handleReset() {
    if (!confirm("Restaurer les pièces d'exemple ?")) {
      return;
    }

    resetToSeed();
    setEditingId(null);
    setEditFields({});
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader variant="inner" />

      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr] items-start">
            <div className="space-y-8">
              <div>
                <p className="eyebrow text-muted-foreground">— Atelier privé</p>
                <h1 className="font-display text-5xl md:text-7xl mt-4">Admin Produits</h1>
                <p className="mt-5 max-w-2xl text-foreground/70 leading-relaxed">
                  Gérez les pièces sans serveur. Tout est sauvegardé localement dans le navigateur,
                  ce qui garde le site purement statique.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-border/70 bg-secondary/40 p-5">
                  <div className="eyebrow text-muted-foreground">Inventaire</div>
                  <div className="font-display text-4xl mt-3">{items.length}</div>
                </div>
                <div className="rounded-2xl border border-border/70 bg-secondary/40 p-5">
                  <div className="eyebrow text-muted-foreground">Mode</div>
                  <div className="mt-3 text-sm text-foreground/70 leading-relaxed">
                    LocalStorage + React state
                  </div>
                </div>
                <div className="rounded-2xl border border-border/70 bg-secondary/40 p-5">
                  <div className="eyebrow text-muted-foreground">Reset</div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-3 text-sm text-accent hover:text-foreground transition"
                  >
                    Restaurer les exemples
                  </button>
                </div>
              </div>

              <section className="rounded-[2rem] border border-border/70 bg-secondary/30 p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow text-muted-foreground">— Ajouter une pièce</p>
                    <h2 className="font-display text-3xl md:text-4xl mt-4">Nouveau produit</h2>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 md:col-span-2">
                    <span className="eyebrow text-muted-foreground">Nom</span>
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Manteau en laine"
                      className={inputClass}
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="eyebrow text-muted-foreground">Prix</span>
                    <input
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      placeholder="€480"
                      className={inputClass}
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="eyebrow text-muted-foreground">Collection</span>
                    <input
                      value={form.collection}
                      onChange={(e) => setForm({ ...form, collection: e.target.value })}
                      placeholder="Tailleur"
                      className={inputClass}
                    />
                  </label>

                  <label className="space-y-2 md:col-span-2">
                    <span className="eyebrow text-muted-foreground">Image URL</span>
                    <input
                      value={form.image}
                      onChange={(e) => setForm({ ...form, image: e.target.value })}
                      placeholder="https://..."
                      className={inputClass}
                    />
                  </label>

                  <label className="space-y-2 md:col-span-2">
                    <span className="eyebrow text-muted-foreground">Description</span>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="Décrivez la pièce en quelques mots."
                      className={`${inputClass} min-h-32 resize-y`}
                    />
                  </label>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleCreate}
                    className="group relative inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3 eyebrow overflow-hidden"
                  >
                    <span className="relative z-10">Ajouter la pièce</span>
                    <span className="relative z-10 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                    <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </button>
                </div>
              </section>
            </div>

            <section className="rounded-[2rem] border border-border/70 bg-card/50 p-6 md:p-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="eyebrow text-muted-foreground">— Inventaire</p>
                  <h2 className="font-display text-3xl md:text-4xl mt-4">Toutes les pièces</h2>
                </div>
                <div className="eyebrow text-muted-foreground">{items.length} items</div>
              </div>

              <div className="mt-8 space-y-4">
                {items.length === 0 ? (
                  <div className="rounded-2xl border border-border/70 bg-background/40 p-8 text-center">
                    <p className="font-display text-2xl">Aucune pièce.</p>
                    <p className="mt-3 text-sm text-foreground/70">
                      Ajoutez votre première pièce ci-contre.
                    </p>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-2xl border border-border/70 bg-background/40 p-4 md:p-5"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-start">
                        <div className="w-full md:w-28 md:shrink-0 overflow-hidden rounded-xl bg-muted aspect-[3/4]">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center p-3 text-sm text-muted-foreground">
                              No image
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          {editingId === item.id ? (
                            <div className="space-y-3">
                              <input
                                value={editFields.name ?? ""}
                                onChange={(e) =>
                                  setEditFields({ ...editFields, name: e.target.value })
                                }
                                className={inputClass}
                              />
                              <div className="grid gap-3 md:grid-cols-2">
                                <input
                                  value={editFields.price ?? ""}
                                  onChange={(e) =>
                                    setEditFields({ ...editFields, price: e.target.value })
                                  }
                                  className={inputClass}
                                />
                                <input
                                  value={editFields.collection ?? ""}
                                  onChange={(e) =>
                                    setEditFields({ ...editFields, collection: e.target.value })
                                  }
                                  className={inputClass}
                                />
                              </div>
                              <textarea
                                value={editFields.description ?? ""}
                                onChange={(e) =>
                                  setEditFields({ ...editFields, description: e.target.value })
                                }
                                className={`${inputClass} min-h-28 resize-y`}
                              />
                              <input
                                value={editFields.image ?? ""}
                                onChange={(e) =>
                                  setEditFields({ ...editFields, image: e.target.value })
                                }
                                className={inputClass}
                              />
                              <div className="flex flex-wrap gap-2">
                                <button
                                  type="button"
                                  onClick={() => saveEdit(item.id)}
                                  className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm"
                                >
                                  Enregistrer
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingId(null);
                                    setEditFields({});
                                  }}
                                  className="px-4 py-2 rounded-full text-sm border border-border/70 hover:border-foreground"
                                >
                                  Annuler
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <p className="eyebrow text-muted-foreground">
                                    {item.collection || "Pièce"}
                                  </p>
                                  <h3 className="font-display text-2xl mt-2 leading-tight">
                                    {item.name}
                                  </h3>
                                </div>
                                <div className="eyebrow text-accent whitespace-nowrap">
                                  {item.price || "Sur demande"}
                                </div>
                              </div>
                              {item.description ? (
                                <p className="mt-3 text-sm text-foreground/70 leading-relaxed">
                                  {item.description}
                                </p>
                              ) : null}
                              <div className="mt-4 flex flex-wrap gap-2">
                                <button
                                  type="button"
                                  onClick={() => startEdit(item)}
                                  className="px-4 py-2 rounded-full text-sm border border-border/70 hover:border-foreground"
                                >
                                  Modifier
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDelete(item.id)}
                                  className="px-4 py-2 rounded-full text-sm border border-border/70 text-red-300 hover:border-red-400 hover:text-red-200"
                                >
                                  Supprimer
                                </button>
                              </div>
                              <div className="mt-3 text-xs uppercase tracking-[0.28em] text-foreground/40">
                                {item.id}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
