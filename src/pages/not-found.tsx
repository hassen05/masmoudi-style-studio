import { SiteHeader } from "@/components/site-chrome";
import { RouterLink } from "@/lib/site-router";
import { usePageMeta } from "@/lib/use-page-meta";

export default function NotFoundPage() {
  usePageMeta({
    title: "Page not found — Marco Benucci",
    description: "The page you requested could not be found.",
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader variant="inner" />

      <section className="px-6 md:px-12 py-20 md:py-32">
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow text-muted-foreground">404</p>
          <h1 className="font-display text-5xl md:text-7xl mt-4">Page not found</h1>
          <p className="mt-6 text-foreground/70 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <RouterLink
              to="/"
              className="rounded-full bg-primary px-5 py-3 text-sm text-primary-foreground transition hover:bg-accent"
            >
              Go home
            </RouterLink>
            <RouterLink
              to="/collections"
              className="rounded-full border border-border/70 px-5 py-3 text-sm transition hover:border-foreground"
            >
              Browse collections
            </RouterLink>
          </div>
        </div>
      </section>
    </main>
  );
}
