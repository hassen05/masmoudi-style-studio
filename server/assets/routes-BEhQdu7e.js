import { t as hero_default } from "./hero-Om2SNPE5.js";
import { useRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { motion, useScroll, useTransform } from "motion/react";
//#region src/assets/collection-lingerie.jpg
var collection_lingerie_default = "/masmoudi-style-studio/assets/collection-lingerie-BnD00Sxp.jpg";
//#endregion
//#region src/assets/collection-nightwear.jpg
var collection_nightwear_default = "/masmoudi-style-studio/assets/collection-nightwear-ByC7goHp.jpg";
//#endregion
//#region src/assets/collection-loungewear.jpg
var collection_loungewear_default = "/masmoudi-style-studio/assets/collection-loungewear-CbDgd7tX.jpg";
//#endregion
//#region src/assets/lookbook-1.jpg
var lookbook_1_default = "/masmoudi-style-studio/assets/lookbook-1-CpRDcWSA.jpg";
//#endregion
//#region src/assets/lookbook-2.jpg
var lookbook_2_default = "/masmoudi-style-studio/assets/lookbook-2-CFPg17ta.jpg";
//#endregion
//#region src/assets/story.jpg
var story_default = "/masmoudi-style-studio/assets/story-TIWClSRM.jpg";
//#endregion
//#region src/routes/index.tsx?tsr-split=component
var ease = [
	.22,
	1,
	.36,
	1
];
var fadeUp = {
	hidden: {
		opacity: 0,
		y: 24
	},
	show: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .9,
			ease
		}
	}
};
function Nav() {
	return /* @__PURE__ */ jsx("header", {
		className: "fixed top-0 inset-x-0 z-50",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto flex items-center justify-between px-6 md:px-12 py-5 backdrop-blur-md bg-background/70 border-b border-border/60",
			children: [
				/* @__PURE__ */ jsxs("a", {
					href: "#",
					className: "font-display text-2xl tracking-wide leading-none",
					children: ["masmoudi", /* @__PURE__ */ jsx("span", {
						className: "text-accent",
						children: "."
					})]
				}),
				/* @__PURE__ */ jsxs("nav", {
					className: "hidden md:flex items-center gap-10 eyebrow text-foreground/70",
					children: [
						/* @__PURE__ */ jsx("a", {
							href: "#collections",
							className: "hover:text-foreground transition",
							children: "Collections"
						}),
						/* @__PURE__ */ jsx("a", {
							href: "#lookbook",
							className: "hover:text-foreground transition",
							children: "Lookbook"
						}),
						/* @__PURE__ */ jsx("a", {
							href: "#story",
							className: "hover:text-foreground transition",
							children: "Atelier"
						}),
						/* @__PURE__ */ jsx("a", {
							href: "#contact",
							className: "hover:text-foreground transition",
							children: "Contact"
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-6 eyebrow",
					children: [/* @__PURE__ */ jsx("button", {
						className: "hidden sm:inline text-foreground/70 hover:text-foreground transition",
						children: "Rechercher"
					}), /* @__PURE__ */ jsxs("button", {
						className: "text-foreground/70 hover:text-foreground transition",
						children: ["Panier", /* @__PURE__ */ jsx("span", {
							className: "ml-1 text-accent",
							children: "(0)"
						})]
					})]
				})
			]
		})
	});
}
function Hero() {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"]
	});
	const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
	const opacity = useTransform(scrollYProgress, [0, .8], [1, 0]);
	return /* @__PURE__ */ jsxs("section", {
		ref,
		className: "relative h-[100svh] min-h-[640px] overflow-hidden",
		children: [
			/* @__PURE__ */ jsxs(motion.div, {
				style: { y },
				className: "absolute inset-0",
				children: [
					/* @__PURE__ */ jsx("img", {
						src: hero_default,
						alt: "Masmoudi — manteau en laine",
						className: "h-full w-full object-cover kenburns",
						width: 1280,
						height: 1600
					}),
					/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-background/30 via-background/20 to-background" }),
					/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background/70 via-background/10 to-transparent" })
				]
			}),
			/* @__PURE__ */ jsxs(motion.div, {
				style: { opacity },
				className: "relative h-full flex flex-col justify-end px-6 md:px-12 pb-16 md:pb-24",
				children: [
					/* @__PURE__ */ jsx(motion.p, {
						initial: {
							opacity: 0,
							y: 16
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .8,
							ease,
							delay: .4
						},
						className: "eyebrow text-foreground/70",
						children: "Collection Hiver — 2025"
					}),
					/* @__PURE__ */ jsx(motion.h1, {
						initial: "hidden",
						animate: "show",
						variants: {
							hidden: {},
							show: { transition: {
								staggerChildren: .08,
								delayChildren: .5
							} }
						},
						className: "font-display text-[14vw] md:text-[9.5vw] leading-[0.95] tracking-tight mt-4 max-w-[14ch]",
						children: [
							"Taillé",
							"pour",
							"durer."
						].map((word, i) => /* @__PURE__ */ jsx(motion.span, {
							variants: {
								hidden: {
									opacity: 0,
									y: 60
								},
								show: {
									opacity: 1,
									y: 0,
									transition: {
										duration: 1.1,
										ease
									}
								}
							},
							className: "inline-block mr-[0.25em]",
							children: i === 2 ? /* @__PURE__ */ jsx("em", {
								className: "italic text-accent",
								children: word
							}) : word
						}, i))
					}),
					/* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							y: 16
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .8,
							ease,
							delay: 1.2
						},
						className: "mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6",
						children: [/* @__PURE__ */ jsx("p", {
							className: "max-w-md text-foreground/70 leading-relaxed",
							children: "Une maison tunisienne dédiée au vestiaire masculin. Tailleur, denim brut, maille lourde — coupés à la main, pensés pour traverser les saisons."
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-6",
							children: [/* @__PURE__ */ jsxs("a", {
								href: "#collections",
								className: "group relative inline-flex items-center gap-3 bg-primary text-primary-foreground px-7 py-4 eyebrow overflow-hidden",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "relative z-10",
										children: "Découvrir"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "relative z-10 transition-transform group-hover:translate-x-1",
										children: "→"
									}),
									/* @__PURE__ */ jsx("span", { className: "absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" })
								]
							}), /* @__PURE__ */ jsx("a", {
								href: "#story",
								className: "eyebrow border-b border-foreground/30 pb-1 hover:border-foreground transition",
								children: "L'atelier"
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "absolute top-1/2 right-6 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 rotate-90 origin-center eyebrow text-foreground/50",
				children: [/* @__PURE__ */ jsx("span", { className: "h-12 w-px bg-foreground/30" }), /* @__PURE__ */ jsx("span", { children: "Scroll" })]
			})
		]
	});
}
function Marquee() {
	const words = [
		"Laine de Biella",
		"·",
		"Selvedge du Japon",
		"·",
		"Cuir tanné végétal",
		"·",
		"Savoir-faire 1978",
		"·",
		"Tunis — Milano",
		"·"
	];
	return /* @__PURE__ */ jsx("div", {
		className: "py-8 md:py-12 border-y border-border overflow-hidden bg-secondary/40",
		children: /* @__PURE__ */ jsx("div", {
			className: "marquee-track font-display italic text-4xl md:text-6xl text-foreground/70 whitespace-nowrap",
			children: [
				...words,
				...words,
				...words,
				...words
			].map((w, i) => /* @__PURE__ */ jsx("span", { children: w }, i))
		})
	});
}
var collections = [
	{
		index: "01",
		name: "Tailleur",
		tagline: "Costumes, vestes, manteaux en laine",
		pieces: "26 pièces",
		image: collection_lingerie_default
	},
	{
		index: "02",
		name: "Denim",
		tagline: "Selvedge brut, vestes en cuir",
		pieces: "14 pièces",
		image: collection_nightwear_default
	},
	{
		index: "03",
		name: "Maille",
		tagline: "Cols roulés, cardigans, pulls torsadés",
		pieces: "18 pièces",
		image: collection_loungewear_default
	}
];
function Collections() {
	return /* @__PURE__ */ jsxs("section", {
		id: "collections",
		className: "px-6 md:px-12 py-24 md:py-36",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-24",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(motion.p, {
				initial: { opacity: 0 },
				whileInView: { opacity: 1 },
				viewport: { once: true },
				transition: { duration: .6 },
				className: "eyebrow text-muted-foreground",
				children: "— Les Collections"
			}), /* @__PURE__ */ jsxs(motion.h2, {
				variants: fadeUp,
				initial: "hidden",
				whileInView: "show",
				viewport: {
					once: true,
					margin: "-100px"
				},
				className: "font-display text-5xl md:text-7xl leading-[1] mt-4 max-w-3xl",
				children: ["Trois vestiaires, ", /* @__PURE__ */ jsx("em", {
					className: "italic text-accent",
					children: "une même rigueur."
				})]
			})] }), /* @__PURE__ */ jsx("p", {
				className: "text-foreground/70 max-w-sm leading-relaxed",
				children: "Chaque pièce est coupée pour tenir l'épaule, tomber juste, et vieillir avec celui qui la porte. Rien de superflu."
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8",
			children: collections.map((c, i) => /* @__PURE__ */ jsxs(motion.a, {
				href: "/collections",
				variants: fadeUp,
				initial: "hidden",
				whileInView: "show",
				viewport: {
					once: true,
					margin: "-80px"
				},
				transition: {
					duration: .9,
					ease,
					delay: i * .12
				},
				className: "group block",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "relative aspect-[3/4] overflow-hidden bg-muted",
					children: [
						/* @__PURE__ */ jsx("img", {
							src: c.image,
							alt: c.name,
							loading: "lazy",
							width: 900,
							height: 1100,
							className: "h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
						}),
						/* @__PURE__ */ jsx("div", {
							className: "absolute top-4 left-4 eyebrow text-foreground mix-blend-difference",
							children: c.index
						}),
						/* @__PURE__ */ jsx("div", {
							className: "absolute bottom-4 right-4 px-3 py-1 bg-background/85 backdrop-blur-sm eyebrow",
							children: c.pieces
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-end justify-between mt-5",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
						className: "font-display text-3xl md:text-4xl leading-none",
						children: c.name
					}), /* @__PURE__ */ jsx("p", {
						className: "text-sm text-muted-foreground mt-2",
						children: c.tagline
					})] }), /* @__PURE__ */ jsx("span", {
						className: "eyebrow border-b border-foreground/40 pb-0.5 group-hover:border-foreground group-hover:text-foreground transition",
						children: "Voir"
					})]
				})]
			}, c.index))
		})]
	});
}
function Lookbook() {
	return /* @__PURE__ */ jsx("section", {
		id: "lookbook",
		className: "px-6 md:px-12 py-24 md:py-36 bg-secondary/40 border-y border-border relative overflow-hidden",
		children: /* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-12 gap-6 md:gap-10 items-end",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "col-span-12 md:col-span-5",
				children: [
					/* @__PURE__ */ jsx(motion.p, {
						initial: { opacity: 0 },
						whileInView: { opacity: 1 },
						viewport: { once: true },
						className: "eyebrow text-muted-foreground",
						children: "— Lookbook 2025"
					}),
					/* @__PURE__ */ jsxs(motion.h2, {
						variants: fadeUp,
						initial: "hidden",
						whileInView: "show",
						viewport: { once: true },
						className: "font-display text-5xl md:text-7xl leading-[1] mt-5",
						children: ["La matière, ", /* @__PURE__ */ jsx("em", {
							className: "italic text-accent",
							children: "le geste, l'ombre."
						})]
					}),
					/* @__PURE__ */ jsx(motion.p, {
						variants: fadeUp,
						initial: "hidden",
						whileInView: "show",
						viewport: { once: true },
						className: "mt-8 text-foreground/70 max-w-md leading-relaxed",
						children: "Photographié entre Tunis et Milan, le lookbook hiver met en avant les laines lourdes, les cuirs patinés et le détail d'un poignet bien coupé."
					}),
					/* @__PURE__ */ jsxs(motion.a, {
						href: "#",
						variants: fadeUp,
						initial: "hidden",
						whileInView: "show",
						viewport: { once: true },
						className: "inline-flex items-center gap-3 mt-10 eyebrow border-b border-foreground/40 pb-1 hover:border-foreground",
						children: ["Feuilleter le lookbook ", /* @__PURE__ */ jsx("span", { children: "→" })]
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "col-span-12 md:col-span-7 grid grid-cols-2 gap-4 md:gap-6",
				children: [/* @__PURE__ */ jsx(motion.div, {
					initial: {
						opacity: 0,
						y: 40
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: {
						once: true,
						margin: "-80px"
					},
					transition: {
						duration: 1,
						ease
					},
					className: "aspect-[4/5] overflow-hidden mt-12",
					children: /* @__PURE__ */ jsx("img", {
						src: lookbook_1_default,
						alt: "",
						loading: "lazy",
						width: 800,
						height: 1e3,
						className: "h-full w-full object-cover"
					})
				}), /* @__PURE__ */ jsx(motion.div, {
					initial: {
						opacity: 0,
						y: 40
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: {
						once: true,
						margin: "-80px"
					},
					transition: {
						duration: 1,
						ease,
						delay: .15
					},
					className: "aspect-[4/5] overflow-hidden",
					children: /* @__PURE__ */ jsx("img", {
						src: lookbook_2_default,
						alt: "",
						loading: "lazy",
						width: 800,
						height: 1e3,
						className: "h-full w-full object-cover"
					})
				})]
			})]
		})
	});
}
function Story() {
	return /* @__PURE__ */ jsx("section", {
		id: "story",
		className: "px-6 md:px-12 py-24 md:py-36",
		children: /* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-12 gap-8 md:gap-12 items-center",
			children: [/* @__PURE__ */ jsx(motion.div, {
				initial: {
					opacity: 0,
					scale: 1.02
				},
				whileInView: {
					opacity: 1,
					scale: 1
				},
				viewport: {
					once: true,
					margin: "-80px"
				},
				transition: {
					duration: 1.2,
					ease
				},
				className: "col-span-12 md:col-span-6 aspect-[4/5] overflow-hidden",
				children: /* @__PURE__ */ jsx("img", {
					src: story_default,
					alt: "Atelier Masmoudi",
					loading: "lazy",
					width: 1200,
					height: 1400,
					className: "h-full w-full object-cover"
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "col-span-12 md:col-span-6 md:pl-8",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "eyebrow text-muted-foreground",
						children: "— L'atelier"
					}),
					/* @__PURE__ */ jsxs(motion.h2, {
						variants: fadeUp,
						initial: "hidden",
						whileInView: "show",
						viewport: { once: true },
						className: "font-display text-5xl md:text-6xl leading-[1.02] mt-5",
						children: [
							"Depuis 1978, le tailleur ",
							/* @__PURE__ */ jsx("em", {
								className: "italic text-accent",
								children: "se transmet"
							}),
							" à Tunis."
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-8 space-y-5 text-foreground/70 leading-relaxed max-w-lg",
						children: [/* @__PURE__ */ jsx("p", { children: "Fondée par Lasaad Masmoudi dans la médina, notre maison cultive le même geste depuis trois générations : tracer la craie, monter l'épaule à la main, ajuster l'aplomb d'une veste sur l'homme qui la portera." }), /* @__PURE__ */ jsx("p", { children: "Aujourd'hui, nos ateliers de La Marsa réunissent trente-deux tailleurs. Nous ne travaillons qu'avec des laines de Biella, du denim selvedge japonais et des cuirs tannés végétal." })]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8",
						children: [
							{
								k: "47",
								l: "Années"
							},
							{
								k: "32",
								l: "Tailleurs"
							},
							{
								k: "100%",
								l: "Fait main"
							}
						].map((s) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "font-display text-4xl md:text-5xl",
							children: s.k
						}), /* @__PURE__ */ jsx("div", {
							className: "eyebrow text-muted-foreground mt-2",
							children: s.l
						})] }, s.l))
					})
				]
			})]
		})
	});
}
function Newsletter() {
	return /* @__PURE__ */ jsx("section", {
		id: "contact",
		className: "px-6 md:px-12 py-24 md:py-32 bg-secondary/40 border-y border-border",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-3xl mx-auto text-center",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "eyebrow text-muted-foreground",
					children: "— Le journal"
				}),
				/* @__PURE__ */ jsxs(motion.h2, {
					variants: fadeUp,
					initial: "hidden",
					whileInView: "show",
					viewport: { once: true },
					className: "font-display text-5xl md:text-7xl leading-[1] mt-5",
					children: ["Le carnet de ", /* @__PURE__ */ jsx("em", {
						className: "italic text-accent",
						children: "l'atelier."
					})]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-6 text-foreground/70 max-w-lg mx-auto",
					children: "Nouvelles coupes, essayages privés, éditoriaux. Une lettre par mois, jamais plus."
				}),
				/* @__PURE__ */ jsxs("form", {
					onSubmit: (e) => e.preventDefault(),
					className: "mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto",
					children: [/* @__PURE__ */ jsx("input", {
						type: "email",
						placeholder: "votre.email@maison.com",
						className: "flex-1 bg-transparent border-b border-foreground/40 px-1 py-3 focus:outline-none focus:border-foreground placeholder:text-foreground/40",
						required: true
					}), /* @__PURE__ */ jsxs("button", {
						type: "submit",
						className: "group relative bg-primary text-primary-foreground px-7 py-3 eyebrow overflow-hidden",
						children: [/* @__PURE__ */ jsx("span", {
							className: "relative z-10",
							children: "S'inscrire"
						}), /* @__PURE__ */ jsx("span", { className: "absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" })]
					})]
				})
			]
		})
	});
}
function Footer() {
	return /* @__PURE__ */ jsxs("footer", {
		className: "px-6 md:px-12 py-16 bg-background border-t border-border",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "col-span-2",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "font-display text-3xl",
						children: ["masmoudi", /* @__PURE__ */ jsx("span", {
							className: "text-accent",
							children: "."
						})]
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-5 text-foreground/60 max-w-xs text-sm leading-relaxed",
						children: "Maison de tailleur. Vestiaire masculin. Tunis, depuis 1978."
					})]
				}),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
					className: "eyebrow text-foreground/50 mb-5",
					children: "Boutique"
				}), /* @__PURE__ */ jsxs("ul", {
					className: "space-y-3 text-foreground/80 text-sm",
					children: [
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
							href: "#",
							className: "hover:text-accent transition",
							children: "Tailleur"
						}) }),
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
							href: "#",
							className: "hover:text-accent transition",
							children: "Denim"
						}) }),
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
							href: "#",
							className: "hover:text-accent transition",
							children: "Maille"
						}) }),
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
							href: "#",
							className: "hover:text-accent transition",
							children: "Sur-mesure"
						}) })
					]
				})] }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
					className: "eyebrow text-foreground/50 mb-5",
					children: "Maison"
				}), /* @__PURE__ */ jsxs("ul", {
					className: "space-y-3 text-foreground/80 text-sm",
					children: [
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
							href: "#",
							className: "hover:text-accent transition",
							children: "Notre histoire"
						}) }),
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
							href: "#",
							className: "hover:text-accent transition",
							children: "Ateliers"
						}) }),
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
							href: "#",
							className: "hover:text-accent transition",
							children: "Boutiques"
						}) }),
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
							href: "#",
							className: "hover:text-accent transition",
							children: "Contact"
						}) })
					]
				})] })
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between gap-4 eyebrow text-foreground/50",
			children: [/* @__PURE__ */ jsx("span", { children: "© 2025 Maison Masmoudi" }), /* @__PURE__ */ jsx("span", { children: "Tunis · Paris · Milano" })]
		})]
	});
}
function Home() {
	return /* @__PURE__ */ jsxs("main", {
		className: "bg-background text-foreground",
		children: [
			/* @__PURE__ */ jsx(Nav, {}),
			/* @__PURE__ */ jsx(Hero, {}),
			/* @__PURE__ */ jsx(Marquee, {}),
			/* @__PURE__ */ jsx(Collections, {}),
			/* @__PURE__ */ jsx(Lookbook, {}),
			/* @__PURE__ */ jsx(Story, {}),
			/* @__PURE__ */ jsx(Newsletter, {}),
			/* @__PURE__ */ jsx(Footer, {})
		]
	});
}
//#endregion
export { Home as component };
