import { RouterLink } from "@/lib/site-router";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  variant?: "home" | "inner";
};

export function BrandMark({ className }: { className?: string }) {
  return (
    <RouterLink
      to="/"
      className={cn("font-display text-2xl tracking-wide leading-none", className)}
      aria-label="Marco Benucci home"
    >
      Marco Benucci
      <span className="text-accent">.</span>
    </RouterLink>
  );
}

export function SiteHeader({ variant = "inner" }: SiteHeaderProps) {
  if (variant === "home") {
    return (
      <header className="fixed top-0 inset-x-0 z-50">
        <div className="mx-auto flex items-center justify-between gap-4 px-6 md:px-12 py-5 backdrop-blur-md bg-background/70 border-b border-border/60">
          <BrandMark />

          <nav className="hidden lg:flex items-center gap-10 eyebrow text-foreground/70">
            <a href="#collections" className="hover:text-foreground transition">
              Collections
            </a>
            <a href="#lookbook" className="hover:text-foreground transition">
              Lookbook
            </a>
            <a href="#story" className="hover:text-foreground transition">
              Atelier
            </a>
            <a href="#contact" className="hover:text-foreground transition">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-4 eyebrow text-foreground/70">
            <RouterLink
              to="/collections"
              className="hidden sm:inline text-foreground/70 transition hover:text-foreground"
              activeClassName="text-foreground"
            >
              Boutique
            </RouterLink>
            <RouterLink
              to="/admin"
              className="hidden sm:inline text-foreground/70 transition hover:text-foreground"
              activeClassName="text-foreground"
            >
              Admin
            </RouterLink>
            <button className="hidden md:inline text-foreground/70 transition hover:text-foreground">
              Rechercher
            </button>
            <button className="text-foreground/70 transition hover:text-foreground">
              Panier<span className="ml-1 text-accent">(0)</span>
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex items-center justify-between gap-4 px-6 md:px-12 py-4">
        <BrandMark className="text-xl md:text-2xl" />

        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.28em]">
          <RouterLink
            to="/"
            className="rounded-full border border-border/70 px-3 py-1.5 text-foreground/60 transition hover:border-foreground hover:text-foreground"
            activeClassName="border-foreground bg-secondary/40 text-foreground"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/collections"
            className="rounded-full border border-border/70 px-3 py-1.5 text-foreground/60 transition hover:border-foreground hover:text-foreground"
            activeClassName="border-foreground bg-secondary/40 text-foreground"
          >
            Collections
          </RouterLink>
          <RouterLink
            to="/admin"
            className="rounded-full border border-border/70 px-3 py-1.5 text-foreground/60 transition hover:border-foreground hover:text-foreground"
            activeClassName="border-foreground bg-secondary/40 text-foreground"
          >
            Admin
          </RouterLink>
        </div>
      </div>
    </header>
  );
}
