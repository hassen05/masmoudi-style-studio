import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import hero from "@/assets/hero.jpg";
import tailoring from "@/assets/collection-lingerie.jpg";
import denim from "@/assets/collection-nightwear.jpg";
import knitwear from "@/assets/collection-loungewear.jpg";
import look1 from "@/assets/lookbook-1.jpg";
import look2 from "@/assets/lookbook-2.jpg";
import story from "@/assets/story.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Marco Benucci — Maison de Tailleur" },
      {
        name: "description",
        content:
          "Marco Benucci — maison tunisienne de prêt-à-porter masculin. Tailleur, denim et maille taillés à la main depuis 1978.",
      },
      { property: "og:title", content: "Marco Benucci — Maison de Tailleur" },
      {
        property: "og:description",
        content: "Prêt-à-porter masculin. Tailleur, denim, maille. Tunis, depuis 1978.",
      },
      { property: "og:image", content: hero },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: hero },
    ],
  }),
  component: Home,
});

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto flex items-center justify-between px-6 md:px-12 py-5 backdrop-blur-md bg-background/70 border-b border-border/60">
        <a href="#" className="font-display text-2xl tracking-wide leading-none">
          Marco Benucci
          <span className="text-accent">.</span>
        </a>
        <nav className="hidden md:flex items-center gap-10 eyebrow text-foreground/70">
          <a href="#collections" className="hover:text-foreground transition">Collections</a>
          <a href="#lookbook" className="hover:text-foreground transition">Lookbook</a>
          <a href="#story" className="hover:text-foreground transition">Atelier</a>
          <a href="#contact" className="hover:text-foreground transition">Contact</a>
        </nav>
        <div className="flex items-center gap-6 eyebrow">
          <button className="hidden sm:inline text-foreground/70 hover:text-foreground transition">Rechercher</button>
          <button className="text-foreground/70 hover:text-foreground transition">
            Panier<span className="ml-1 text-accent">(0)</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={hero}
          alt="Marco Benucci — manteau en laine"
          className="h-full w-full object-cover kenburns"
          width={1280}
          height={1600}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/20 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/10 to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative h-full flex flex-col justify-end px-6 md:px-12 pb-16 md:pb-24"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.4 }}
          className="eyebrow text-foreground/70"
        >
          Collection Hiver — 2025
        </motion.p>

        <motion.h1
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
          }}
          className="font-display text-[14vw] md:text-[9.5vw] leading-[0.95] tracking-tight mt-4 max-w-[14ch]"
        >
          {["Taillé", "pour", "durer."].map((word, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 60 },
                show: { opacity: 1, y: 0, transition: { duration: 1.1, ease } },
              }}
              className="inline-block mr-[0.25em]"
            >
              {i === 2 ? <em className="italic text-accent">{word}</em> : word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 1.2 }}
          className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <p className="max-w-md text-foreground/70 leading-relaxed">
            Une maison tunisienne dédiée au vestiaire masculin. Tailleur, denim brut, maille
            lourde — coupés à la main, pensés pour traverser les saisons.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#collections"
              className="group relative inline-flex items-center gap-3 bg-primary text-primary-foreground px-7 py-4 eyebrow overflow-hidden"
            >
              <span className="relative z-10">Découvrir</span>
              <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
              <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </a>
            <a href="#story" className="eyebrow border-b border-foreground/30 pb-1 hover:border-foreground transition">
              L'atelier
            </a>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute top-1/2 right-6 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 rotate-90 origin-center eyebrow text-foreground/50">
        <span className="h-12 w-px bg-foreground/30" />
        <span>Scroll</span>
      </div>
    </section>
  );
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
    "·",
  ];
  return (
    <div className="py-8 md:py-12 border-y border-border overflow-hidden bg-secondary/40">
      <div className="marquee-track font-display italic text-4xl md:text-6xl text-foreground/70 whitespace-nowrap">
        {[...words, ...words, ...words, ...words].map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </div>
    </div>
  );
}

type Collection = {
  index: string;
  name: string;
  tagline: string;
  pieces: string;
  image: string;
};

const collections: Collection[] = [
  {
    index: "01",
    name: "Tailleur",
    tagline: "Costumes, vestes, manteaux en laine",
    pieces: "26 pièces",
    image: tailoring,
  },
  {
    index: "02",
    name: "Denim",
    tagline: "Selvedge brut, vestes en cuir",
    pieces: "14 pièces",
    image: denim,
  },
  {
    index: "03",
    name: "Maille",
    tagline: "Cols roulés, cardigans, pulls torsadés",
    pieces: "18 pièces",
    image: knitwear,
  },
];

function Collections() {
  return (
    <section id="collections" className="px-6 md:px-12 py-24 md:py-36">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-24">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="eyebrow text-muted-foreground"
          >
            — Les Collections
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="font-display text-5xl md:text-7xl leading-[1] mt-4 max-w-3xl"
          >
            Trois vestiaires, <em className="italic text-accent">une même rigueur.</em>
          </motion.h2>
        </div>
        <p className="text-foreground/70 max-w-sm leading-relaxed">
          Chaque pièce est coupée pour tenir l'épaule, tomber juste, et vieillir avec celui
          qui la porte. Rien de superflu.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {collections.map((c, i) => (
          <motion.a
            key={c.index}
            href="/collections"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease, delay: i * 0.12 }}
            className="group block"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-muted">
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                width={900}
                height={1100}
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 eyebrow text-foreground mix-blend-difference">
                {c.index}
              </div>
              <div className="absolute bottom-4 right-4 px-3 py-1 bg-background/85 backdrop-blur-sm eyebrow">
                {c.pieces}
              </div>
            </div>
            <div className="flex items-end justify-between mt-5">
              <div>
                <h3 className="font-display text-3xl md:text-4xl leading-none">{c.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{c.tagline}</p>
              </div>
              <span className="eyebrow border-b border-foreground/40 pb-0.5 group-hover:border-foreground group-hover:text-foreground transition">
                Voir
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

function Lookbook() {
  return (
    <section id="lookbook" className="px-6 md:px-12 py-24 md:py-36 bg-secondary/40 border-y border-border relative overflow-hidden">
      <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
        <div className="col-span-12 md:col-span-5">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="eyebrow text-muted-foreground"
          >
            — Lookbook 2025
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="font-display text-5xl md:text-7xl leading-[1] mt-5"
          >
            La matière, <em className="italic text-accent">le geste, l'ombre.</em>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-8 text-foreground/70 max-w-md leading-relaxed"
          >
            Photographié entre Tunis et Milan, le lookbook hiver met en avant les laines
            lourdes, les cuirs patinés et le détail d'un poignet bien coupé.
          </motion.p>
          <motion.a
            href="#"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mt-10 eyebrow border-b border-foreground/40 pb-1 hover:border-foreground"
          >
            Feuilleter le lookbook <span>→</span>
          </motion.a>
        </div>

        <div className="col-span-12 md:col-span-7 grid grid-cols-2 gap-4 md:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease }}
            className="aspect-[4/5] overflow-hidden mt-12"
          >
            <img src={look1} alt="" loading="lazy" width={800} height={1000} className="h-full w-full object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease, delay: 0.15 }}
            className="aspect-[4/5] overflow-hidden"
          >
            <img src={look2} alt="" loading="lazy" width={800} height={1000} className="h-full w-full object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="px-6 md:px-12 py-24 md:py-36">
      <div className="grid grid-cols-12 gap-8 md:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease }}
          className="col-span-12 md:col-span-6 aspect-[4/5] overflow-hidden"
        >
          <img src={story} alt="Atelier Marco Benucci" loading="lazy" width={1200} height={1400} className="h-full w-full object-cover" />
        </motion.div>

        <div className="col-span-12 md:col-span-6 md:pl-8">
          <p className="eyebrow text-muted-foreground">— L'atelier</p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="font-display text-5xl md:text-6xl leading-[1.02] mt-5"
          >
            Depuis 1978, le tailleur <em className="italic text-accent">se transmet</em> à Tunis.
          </motion.h2>
          <div className="mt-8 space-y-5 text-foreground/70 leading-relaxed max-w-lg">
            <p>
              Fondée par Lasaad Masmoudi dans la médina, notre maison cultive le même geste depuis
              trois générations : tracer la craie, monter l'épaule à la main, ajuster l'aplomb
              d'une veste sur l'homme qui la portera.
            </p>
            <p>
              Aujourd'hui, nos ateliers de La Marsa réunissent trente-deux tailleurs. Nous ne
              travaillons qu'avec des laines de Biella, du denim selvedge japonais et des cuirs
              tannés végétal.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
            {[
              { k: "47", l: "Années" },
              { k: "32", l: "Tailleurs" },
              { k: "100%", l: "Fait main" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-4xl md:text-5xl">{s.k}</div>
                <div className="eyebrow text-muted-foreground mt-2">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section id="contact" className="px-6 md:px-12 py-24 md:py-32 bg-secondary/40 border-y border-border">
      <div className="max-w-3xl mx-auto text-center">
        <p className="eyebrow text-muted-foreground">— Le journal</p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="font-display text-5xl md:text-7xl leading-[1] mt-5"
        >
          Le carnet de <em className="italic text-accent">l'atelier.</em>
        </motion.h2>
        <p className="mt-6 text-foreground/70 max-w-lg mx-auto">
          Nouvelles coupes, essayages privés, éditoriaux. Une lettre par mois, jamais plus.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="votre.email@maison.com"
            className="flex-1 bg-transparent border-b border-foreground/40 px-1 py-3 focus:outline-none focus:border-foreground placeholder:text-foreground/40"
            required
          />
          <button
            type="submit"
            className="group relative bg-primary text-primary-foreground px-7 py-3 eyebrow overflow-hidden"
          >
            <span className="relative z-10">S'inscrire</span>
            <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 md:px-12 py-16 bg-background border-t border-border">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
        <div className="col-span-2">
          <div className="font-display text-3xl">Marco Benucci<span className="text-accent">.</span></div>
          <p className="mt-5 text-foreground/60 max-w-xs text-sm leading-relaxed">
            Maison de tailleur. Vestiaire masculin. Tunis, depuis 1978.
          </p>
        </div>
        <div>
          <div className="eyebrow text-foreground/50 mb-5">Boutique</div>
          <ul className="space-y-3 text-foreground/80 text-sm">
            <li><a href="#" className="hover:text-accent transition">Tailleur</a></li>
            <li><a href="#" className="hover:text-accent transition">Denim</a></li>
            <li><a href="#" className="hover:text-accent transition">Maille</a></li>
            <li><a href="#" className="hover:text-accent transition">Sur-mesure</a></li>
          </ul>
        </div>
        <div>
          <div className="eyebrow text-foreground/50 mb-5">Maison</div>
          <ul className="space-y-3 text-foreground/80 text-sm">
            <li><a href="#" className="hover:text-accent transition">Notre histoire</a></li>
            <li><a href="#" className="hover:text-accent transition">Ateliers</a></li>
            <li><a href="#" className="hover:text-accent transition">Boutiques</a></li>
            <li><a href="#" className="hover:text-accent transition">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between gap-4 eyebrow text-foreground/50">
        <span>© 2025 Maison Masmoudi</span>
        <span>Tunis · Paris · Milano</span>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <main className="bg-background text-foreground">
      <Nav />
      <Hero />
      <Marquee />
      <Collections />
      <Lookbook />
      <Story />
      <Newsletter />
      <Footer />
    </main>
  );
}
