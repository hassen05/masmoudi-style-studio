import { t as hero_default } from "./hero-Om2SNPE5.js";
import { useEffect, useState } from "react";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, useRouter } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motion } from "motion/react";
//#region src/styles.css?url
var styles_default = "/masmoudi-style-studio/assets/styles-CptPyrq-.css";
//#endregion
//#region src/lib/lovable-error-reporting.ts
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
//#endregion
//#region src/routes/__root.tsx
function NotFoundComponent() {
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	useEffect(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ jsx("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$3 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Marco Benucci — Maison de Lingerie & Nuit" },
			{
				name: "description",
				content: "Marco Benucci crafts refined lingerie, nightwear and loungewear. A Tunisian maison rooted in savoir-faire, silk and lace."
			},
			{
				property: "og:type",
				content: "website"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [children, /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$3.useRouteContext();
	return /* @__PURE__ */ jsx(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ jsx(Outlet, {})
	});
}
//#endregion
//#region src/routes/collections.tsx
var Route$2 = createFileRoute("/collections")({
	head: () => ({ meta: [{ title: "Collections — Marco Benucci" }] }),
	component: CollectionsPage
});
var fadeUp = {
	hidden: {
		opacity: 0,
		y: 24
	},
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: .9 }
	}
};
function CollectionsPage() {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		let cancelled = false;
		(async () => {
			try {
				const res = await fetch("/api/clothes");
				if (!res.ok) throw new Error("Failed to load");
				const data = await res.json();
				if (!cancelled) setItems(data);
			} catch (e) {
				console.error(e);
			} finally {
				if (!cancelled) setLoading(false);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, []);
	return /* @__PURE__ */ jsx("main", {
		className: "bg-background text-foreground min-h-screen px-6 md:px-12 py-24 md:py-36",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-6xl mx-auto",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "mb-12",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "eyebrow text-muted-foreground",
						children: "— La Boutique"
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "font-display text-5xl md:text-6xl mt-4",
						children: "Toutes les pièces"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-foreground/70 max-w-lg mt-4",
						children: "Toutes les pièces ajoutées depuis le panneau d'administration."
					})
				]
			}), loading ? /* @__PURE__ */ jsx("p", {
				className: "text-foreground/70",
				children: "Chargement…"
			}) : items.length === 0 ? /* @__PURE__ */ jsx("p", {
				className: "text-foreground/70",
				children: "Aucune pièce disponible. Ajoutez des articles via l'admin."
			}) : /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6",
				children: items.map((item) => /* @__PURE__ */ jsxs(motion.article, {
					className: "group bg-card overflow-hidden rounded-md",
					variants: fadeUp,
					initial: "hidden",
					whileInView: "show",
					viewport: { once: true },
					children: [/* @__PURE__ */ jsx("div", {
						className: "aspect-[3/4] bg-muted overflow-hidden",
						children: item.image ? /* @__PURE__ */ jsx("img", {
							src: item.image,
							alt: item.name,
							className: "w-full h-full object-cover"
						}) : /* @__PURE__ */ jsx("div", {
							className: "w-full h-full flex items-center justify-center text-muted-foreground",
							children: "No image"
						})
					}), /* @__PURE__ */ jsx("div", {
						className: "p-4",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-start justify-between gap-4",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
								className: "font-display text-lg leading-none",
								children: item.name
							}), item.description ? /* @__PURE__ */ jsx("p", {
								className: "text-sm text-foreground/70 mt-2",
								children: item.description
							}) : null] }), /* @__PURE__ */ jsx("div", {
								className: "eyebrow text-accent",
								children: item.price
							})]
						})
					})]
				}, item.id))
			})]
		})
	});
}
//#endregion
//#region src/routes/admin.tsx
var Route$1 = createFileRoute("/admin")({
	head: () => ({ meta: [{ title: "Admin — Marco Benucci" }] }),
	component: AdminPage
});
function AdminPage() {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [form, setForm] = useState({
		name: "",
		description: "",
		price: "",
		image: "",
		collection: ""
	});
	const [editingId, setEditingId] = useState(null);
	const [editFields, setEditFields] = useState({});
	async function load() {
		setLoading(true);
		try {
			setItems(await (await fetch("/api/clothes")).json());
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	}
	useEffect(() => {
		load();
	}, []);
	async function handleCreate(e) {
		try {
			if (form.name.trim() === "") return;
			const res = await fetch("/api/clothes", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(form)
			});
			if (res.ok) {
				setForm({
					name: "",
					description: "",
					price: "",
					image: "",
					collection: ""
				});
				await load();
			} else console.error("Create failed", await res.text());
		} catch (err) {
			console.error(err);
		}
	}
	async function handleDelete(id) {
		if (!confirm("Supprimer cette pièce ?")) return;
		try {
			const res = await fetch(`/api/clothes/${id}`, { method: "DELETE" });
			if (res.status === 204) await load();
			else console.error("Delete failed", res.status);
		} catch (e) {
			console.error(e);
		}
	}
	function startEdit(item) {
		setEditingId(item.id);
		setEditFields({
			name: item.name || "",
			description: item.description || "",
			price: item.price || "",
			image: item.image || "",
			collection: item.collection || ""
		});
	}
	async function saveEdit(id) {
		try {
			const res = await fetch(`/api/clothes/${id}`, {
				method: "PUT",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(editFields)
			});
			if (res.ok) {
				setEditingId(null);
				setEditFields({});
				await load();
			} else console.error("Update failed", await res.text());
		} catch (e) {
			console.error(e);
		}
	}
	return /* @__PURE__ */ jsx("main", {
		className: "bg-background text-foreground min-h-screen px-6 md:px-12 py-24 md:py-36",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-4xl mx-auto",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "font-display text-4xl mb-4",
					children: "Admin — Produits"
				}),
				/* @__PURE__ */ jsxs("section", {
					className: "mb-8",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "eyebrow text-muted-foreground mb-2",
							children: "Ajouter une pièce"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-3",
							children: [
								/* @__PURE__ */ jsx("input", {
									value: form.name,
									onChange: (e) => setForm({
										...form,
										name: e.target.value
									}),
									placeholder: "Nom",
									className: "px-3 py-2 border"
								}),
								/* @__PURE__ */ jsx("input", {
									value: form.price,
									onChange: (e) => setForm({
										...form,
										price: e.target.value
									}),
									placeholder: "Prix",
									className: "px-3 py-2 border"
								}),
								/* @__PURE__ */ jsx("input", {
									value: form.collection,
									onChange: (e) => setForm({
										...form,
										collection: e.target.value
									}),
									placeholder: "Collection",
									className: "px-3 py-2 border"
								}),
								/* @__PURE__ */ jsx("input", {
									value: form.image,
									onChange: (e) => setForm({
										...form,
										image: e.target.value
									}),
									placeholder: "Image URL (optionnel)",
									className: "px-3 py-2 border"
								}),
								/* @__PURE__ */ jsx("textarea", {
									value: form.description,
									onChange: (e) => setForm({
										...form,
										description: e.target.value
									}),
									placeholder: "Description",
									className: "px-3 py-2 border md:col-span-2"
								})
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-3",
							children: /* @__PURE__ */ jsx("button", {
								onClick: () => handleCreate(),
								className: "bg-primary text-primary-foreground px-4 py-2",
								children: "Ajouter"
							})
						})
					]
				}),
				/* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("h2", {
					className: "eyebrow text-muted-foreground mb-4",
					children: "Toutes les pièces"
				}), loading ? /* @__PURE__ */ jsx("p", { children: "Chargement…" }) : items.length === 0 ? /* @__PURE__ */ jsx("p", { children: "Aucune pièce." }) : /* @__PURE__ */ jsx("div", {
					className: "space-y-4",
					children: items.map((it) => /* @__PURE__ */ jsxs("div", {
						className: "flex items-start gap-4 border p-3 rounded",
						children: [/* @__PURE__ */ jsx("div", {
							className: "w-24 h-32 bg-muted flex-shrink-0 overflow-hidden",
							children: it.image ? /* @__PURE__ */ jsx("img", {
								src: it.image,
								alt: it.name,
								className: "w-full h-full object-cover"
							}) : /* @__PURE__ */ jsx("div", {
								className: "p-2 text-muted-foreground",
								children: "No image"
							})
						}), /* @__PURE__ */ jsx("div", {
							className: "flex-1",
							children: editingId === it.id ? /* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ jsx("input", {
										value: editFields.name ?? "",
										onChange: (e) => setEditFields({
											...editFields,
											name: e.target.value
										}),
										className: "w-full px-2 py-1 border"
									}),
									/* @__PURE__ */ jsx("input", {
										value: editFields.price ?? "",
										onChange: (e) => setEditFields({
											...editFields,
											price: e.target.value
										}),
										className: "w-full px-2 py-1 border"
									}),
									/* @__PURE__ */ jsx("input", {
										value: editFields.collection ?? "",
										onChange: (e) => setEditFields({
											...editFields,
											collection: e.target.value
										}),
										className: "w-full px-2 py-1 border"
									}),
									/* @__PURE__ */ jsx("textarea", {
										value: editFields.description ?? "",
										onChange: (e) => setEditFields({
											...editFields,
											description: e.target.value
										}),
										className: "w-full px-2 py-1 border"
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ jsx("button", {
											onClick: () => saveEdit(it.id),
											className: "bg-primary text-primary-foreground px-3 py-1",
											children: "Enregistrer"
										}), /* @__PURE__ */ jsx("button", {
											onClick: () => {
												setEditingId(null);
												setEditFields({});
											},
											className: "px-3 py-1 border",
											children: "Annuler"
										})]
									})
								]
							}) : /* @__PURE__ */ jsxs(Fragment, { children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
										className: "font-display",
										children: it.name
									}), /* @__PURE__ */ jsxs("div", {
										className: "text-sm text-foreground/70",
										children: [
											it.collection,
											" — ",
											it.price
										]
									})] }), /* @__PURE__ */ jsx("div", {
										className: "eyebrow text-muted-foreground",
										children: it.id
									})]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-2 text-foreground/70",
									children: it.description
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-3 flex gap-2",
									children: [/* @__PURE__ */ jsx("button", {
										onClick: () => startEdit(it),
										className: "px-3 py-1 border",
										children: "Modifier"
									}), /* @__PURE__ */ jsx("button", {
										onClick: () => handleDelete(it.id),
										className: "px-3 py-1 border text-red-600",
										children: "Supprimer"
									})]
								})
							] })
						})]
					}, it.id))
				})] })
			]
		})
	});
}
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter = () => import("./routes-BEhQdu7e.js");
var Route = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Masmoudi — Maison de Tailleur" },
		{
			name: "description",
			content: "Masmoudi — maison tunisienne de prêt-à-porter masculin. Tailleur, denim et maille taillés à la main depuis 1978."
		},
		{
			property: "og:title",
			content: "Masmoudi — Maison de Tailleur"
		},
		{
			property: "og:description",
			content: "Prêt-à-porter masculin. Tailleur, denim, maille. Tunis, depuis 1978."
		},
		{
			property: "og:image",
			content: hero_default
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			name: "twitter:image",
			content: hero_default
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
//#region src/routeTree.gen.ts
var CollectionsRoute = Route$2.update({
	id: "/collections",
	path: "/collections",
	getParentRoute: () => Route$3
});
var AdminRoute = Route$1.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$3
});
var rootRouteChildren = {
	IndexRoute: Route.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$3
	}),
	AdminRoute,
	CollectionsRoute
};
var routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
