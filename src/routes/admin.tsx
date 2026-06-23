import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/admin')({
  head: () => ({ meta: [{ title: 'Admin — Marco Benucci' }] }),
  component: AdminPage,
})

type Clothing = {
  id: string
  name: string
  description?: string
  price?: string
  image?: string
  collection?: string
}

function AdminPage() {
  const [items, setItems] = useState<Clothing[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name: '', description: '', price: '', image: '', collection: '' })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editFields, setEditFields] = useState<Record<string, string>>({})

  async function load() {
    setLoading(true)
    try {
      const res = await fetch('/api/clothes')
      const data = await res.json()
      setItems(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function handleCreate(e?: Event) {
    try {
      if (form.name.trim() === '') return
      const res = await fetch('/api/clothes', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setForm({ name: '', description: '', price: '', image: '', collection: '' })
        await load()
      } else {
        console.error('Create failed', await res.text())
      }
    } catch (err) {
      console.error(err)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cette pièce ?')) return
    try {
      const res = await fetch(`/api/clothes/${id}`, { method: 'DELETE' })
      if (res.status === 204) await load()
      else console.error('Delete failed', res.status)
    } catch (e) {
      console.error(e)
    }
  }

  function startEdit(item: Clothing) {
    setEditingId(item.id)
    setEditFields({ name: item.name || '', description: item.description || '', price: item.price || '', image: item.image || '', collection: item.collection || '' })
  }

  async function saveEdit(id: string) {
    try {
      const res = await fetch(`/api/clothes/${id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(editFields),
      })
      if (res.ok) {
        setEditingId(null)
        setEditFields({})
        await load()
      } else {
        console.error('Update failed', await res.text())
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <main className="bg-background text-foreground min-h-screen px-6 md:px-12 py-24 md:py-36">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-display text-4xl mb-4">Admin — Produits</h1>

        <section className="mb-8">
          <h2 className="eyebrow text-muted-foreground mb-2">Ajouter une pièce</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nom" className="px-3 py-2 border" />
            <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Prix" className="px-3 py-2 border" />
            <input value={form.collection} onChange={(e) => setForm({ ...form, collection: e.target.value })} placeholder="Collection" className="px-3 py-2 border" />
            <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="Image URL (optionnel)" className="px-3 py-2 border" />
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="px-3 py-2 border md:col-span-2" />
          </div>
          <div className="mt-3">
            <button onClick={() => handleCreate()} className="bg-primary text-primary-foreground px-4 py-2">Ajouter</button>
          </div>
        </section>

        <section>
          <h2 className="eyebrow text-muted-foreground mb-4">Toutes les pièces</h2>
          {loading ? (
            <p>Chargement…</p>
          ) : items.length === 0 ? (
            <p>Aucune pièce.</p>
          ) : (
            <div className="space-y-4">
              {items.map((it) => (
                <div key={it.id} className="flex items-start gap-4 border p-3 rounded">
                  <div className="w-24 h-32 bg-muted flex-shrink-0 overflow-hidden">
                    {it.image ? <img src={it.image} alt={it.name} className="w-full h-full object-cover" /> : <div className="p-2 text-muted-foreground">No image</div>}
                  </div>
                  <div className="flex-1">
                    {editingId === it.id ? (
                      <div className="space-y-2">
                        <input value={editFields.name ?? ''} onChange={(e) => setEditFields({ ...editFields, name: e.target.value })} className="w-full px-2 py-1 border" />
                        <input value={editFields.price ?? ''} onChange={(e) => setEditFields({ ...editFields, price: e.target.value })} className="w-full px-2 py-1 border" />
                        <input value={editFields.collection ?? ''} onChange={(e) => setEditFields({ ...editFields, collection: e.target.value })} className="w-full px-2 py-1 border" />
                        <textarea value={editFields.description ?? ''} onChange={(e) => setEditFields({ ...editFields, description: e.target.value })} className="w-full px-2 py-1 border" />
                        <div className="flex gap-2">
                          <button onClick={() => saveEdit(it.id)} className="bg-primary text-primary-foreground px-3 py-1">Enregistrer</button>
                          <button onClick={() => { setEditingId(null); setEditFields({}) }} className="px-3 py-1 border">Annuler</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-display">{it.name}</div>
                            <div className="text-sm text-foreground/70">{it.collection} — {it.price}</div>
                          </div>
                          <div className="eyebrow text-muted-foreground">{it.id}</div>
                        </div>
                        <p className="mt-2 text-foreground/70">{it.description}</p>
                        <div className="mt-3 flex gap-2">
                          <button onClick={() => startEdit(it)} className="px-3 py-1 border">Modifier</button>
                          <button onClick={() => handleDelete(it.id)} className="px-3 py-1 border text-red-600">Supprimer</button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default AdminPage
