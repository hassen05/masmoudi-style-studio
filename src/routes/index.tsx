import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import hero from "@/assets/hero.jpg";
import lingerie from "@/assets/collection-lingerie.jpg";
import nightwear from "@/assets/collection-nightwear.jpg";
import loungewear from "@/assets/collection-loungewear.jpg";
import look1 from "@/assets/lookbook-1.jpg";
import look2 from "@/assets/lookbook-2.jpg";
import story from "@/assets/story.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Masmoudi — Maison de Lingerie & Nuit" },
      {
        name: "description",
        content:
          "Masmoudi crafts refined lingerie, nightwear and loungewear. A Tunisian maison rooted in savoir-faire, silk and lace.",
      },
      { property: "og:title", content: "Masmoudi — Maison de Lingerie & Nuit" },
      {
        property: "og:description",
        content: "Refined lingerie, nightwear and loungewear from a Tunisian maison.",
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
      <div className="mx-auto flex items-center justify-between px-6 md:px-12 py-5 backdrop-blur-md bg-background/60 border-b border-border/60">
        <a href="#" className="font-display text-2xl tracking-wide leading-none">
          masmoudi
          <span className="text-accent">.</span>
        </a>
        <nav className="hidden md:flex items-center gap-10 eyebrow text-foreground/80">
          <a href="#collections" className="hover:text-foreground transition">Collections</a>
          <a href="#lookbook" className="hover:text-foreground transition">Lookbook</a>
          <a href="#story" className="hover:text-foreground transition">Maison</a>
          <a href="#contact" className="hover:text-foreground transition">Contact</a>
        </nav>
        <div className="flex items-center gap-6 eyebrow">
          <button className="hidden sm:inline text-foreground/80 hover:text-foreground transition">Search</button>
          <button className="text-foreground/80 hover:text-foreground transition">
            Bag<span className="ml-1 text-accent">(0)</span>
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
          alt="Masmoudi silk slip"
          className="h-full w-full object-cover kenburns"
          width={1280}
          height={1600}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/10 to-background/80" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative h-full flex flex-col justify-end px-6 md:px-12 pb-16 md:pb-24"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.4 }}
          className="eyebrow text-foreground/80"
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
          {["L'art", "du", "silence."].map((word, i) => (
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
          <p className="max-w-md text-foreground/75 leading-relaxed">
            Une maison tunisienne dédiée à la lingerie, au vêtement de nuit et au confort de l'intime.
            Soie, dentelle, coton — taillés à la main.
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
              Notre histoire
            </a>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute top-1/2 right-6 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 rotate-90 origin-center eyebrow text-foreground/60">
        <span className="h-12 w-px bg-foreground/30" />
        <span>Scroll</span>
      </div>
    </section>
  );
}

function Marquee() {
  const words = ["Soie", "·", "Dentelle de Calais", "·", "Coton d'Égypte", "·", "Savoir-faire 1978", "·", "Tunis — Paris", "·"];
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
    name: "Lingerie",
    tagline: "Dentelle florale, bretelles satin",
    pieces: "24 pièces",
    image: lingerie,
  },
  {
    index: "02",
    name: "Nuit",
    tagline: "Chemises et nuisettes en soie lavée",
    pieces: "18 pièces",
    image: nightwear,
  },
  {
    index: "03",
    name: "Intérieur",
    tagline: "Loungewear, kimonos, peignoirs",
    pieces: "12 pièces",
    image: loungewear,
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
            Trois univers, <em className="italic text-accent">une seule promesse.</em>
          </motion.h2>
        </div>
        <p className="text-foreground/70 max-w-sm leading-relaxed">
          Chaque pièce est pensée pour se porter près du corps comme une seconde peau —
          discrète, durable, profondément féminine.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {collections.map((c, i) => (
          <motion.a
            key={c.index}
            href="#"
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
              <div className="absolute top-4 left-4 eyebrow text-cream mix-blend-difference">
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
    <section id="lookbook" className="px-6 md:px-12 py-24 md:py-36 bg-noir text-cream relative overflow-hidden">
      <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
        <div className="col-span-12 md:col-span-5">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="eyebrow text-cream/60"
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
            Détails, <em className="italic text-blush">matières, lumière.</em>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-8 text-cream/75 max-w-md leading-relaxed"
          >
            Photographié à Sidi Bou Saïd, le lookbook hiver capture la rencontre entre
            la lumière méditerranéenne et la délicatesse de nos pièces signature.
          </motion.p>
          <motion.a
            href="#"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mt-10 eyebrow border-b border-cream/40 pb-1 hover:border-cream"
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
          <img src={story} alt="Atelier Masmoudi" loading="lazy" width={1200} height={1400} className="h-full w-full object-cover" />
        </motion.div>

        <div className="col-span-12 md:col-span-6 md:pl-8">
          <p className="eyebrow text-muted-foreground">— La maison</p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="font-display text-5xl md:text-6xl leading-[1.02] mt-5"
          >
            Depuis 1978, l'intime <em className="italic text-accent">prend forme</em> à Tunis.
          </motion.h2>
          <div className="mt-8 space-y-5 text-foreground/75 leading-relaxed max-w-lg">
            <p>
              Fondée par Habiba Masmoudi dans la médina, notre maison cultive un même geste
              depuis trois générations : assembler la dentelle à la main, ajuster chaque
              bretelle, faire de chaque pièce un objet de soin.
            </p>
            <p>
              Aujourd'hui, nos ateliers à La Marsa emploient quarante artisanes. Nous travaillons
              uniquement avec des soieries de Côme, du coton d'Égypte et de la dentelle de Calais.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
            {[
              { k: "47", l: "Années" },
              { k: "40", l: "Artisanes" },
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
    <section id="contact" className="px-6 md:px-12 py-24 md:py-32 bg-secondary/60 border-y border-border">
      <div className="max-w-3xl mx-auto text-center">
        <p className="eyebrow text-muted-foreground">— Le journal</p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="font-display text-5xl md:text-7xl leading-[1] mt-5"
        >
          Recevez nos <em className="italic text-accent">confidences.</em>
        </motion.h2>
        <p className="mt-6 text-foreground/70 max-w-lg mx-auto">
          Nouvelles collections, rendez-vous d'atelier et éditoriaux. Une lettre par mois,
          jamais plus.
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
    <footer className="px-6 md:px-12 py-16 bg-noir text-cream">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
        <div className="col-span-2">
          <div className="font-display text-3xl">masmoudi<span className="text-blush">.</span></div>
          <p className="mt-5 text-cream/60 max-w-xs text-sm leading-relaxed">
            Maison de lingerie, nuit et intérieur. Tunis, depuis 1978.
          </p>
        </div>
        <div>
          <div className="eyebrow text-cream/50 mb-5">Boutique</div>
          <ul className="space-y-3 text-cream/85 text-sm">
            <li><a href="#" className="hover:text-blush transition">Lingerie</a></li>
            <li><a href="#" className="hover:text-blush transition">Nuit</a></li>
            <li><a href="#" className="hover:text-blush transition">Intérieur</a></li>
            <li><a href="#" className="hover:text-blush transition">Cartes cadeaux</a></li>
          </ul>
        </div>
        <div>
          <div className="eyebrow text-cream/50 mb-5">Maison</div>
          <ul className="space-y-3 text-cream/85 text-sm">
            <li><a href="#" className="hover:text-blush transition">Notre histoire</a></li>
            <li><a href="#" className="hover:text-blush transition">Ateliers</a></li>
            <li><a href="#" className="hover:text-blush transition">Boutiques</a></li>
            <li><a href="#" className="hover:text-blush transition">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-cream/15 flex flex-col md:flex-row justify-between gap-4 eyebrow text-cream/50">
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
