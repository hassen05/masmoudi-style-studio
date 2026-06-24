/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

export type AppRoute = "/" | "/collections" | "/admin";
type KnownRoute = AppRoute;

type RouterContextValue = {
  route: AppRoute | "not-found";
  path: string;
  href: (to: KnownRoute) => string;
  navigate: (to: KnownRoute) => void;
};

const ROUTES = new Set<KnownRoute>(["/", "/collections", "/admin"]);
const BASE_PATH =
  import.meta.env.BASE_URL === "/" ? "" : import.meta.env.BASE_URL.replace(/\/$/, "");

const RouterContext = createContext<RouterContextValue | null>(null);

function normalizePath(pathname: string) {
  let nextPath = pathname;

  if (BASE_PATH) {
    if (nextPath === BASE_PATH) {
      nextPath = "/";
    } else if (nextPath.startsWith(`${BASE_PATH}/`)) {
      nextPath = nextPath.slice(BASE_PATH.length);
    }
  }

  if (nextPath.length > 1 && nextPath.endsWith("/")) {
    nextPath = nextPath.slice(0, -1);
  }

  return nextPath || "/";
}

function routeFromPath(pathname: string): AppRoute | "not-found" {
  const normalized = normalizePath(pathname);
  return ROUTES.has(normalized as KnownRoute) ? (normalized as AppRoute) : "not-found";
}

function hrefForRoute(route: KnownRoute) {
  if (!BASE_PATH) {
    return route;
  }

  return route === "/" ? `${BASE_PATH}/` : `${BASE_PATH}${route}`;
}

function currentPathname() {
  if (typeof window === "undefined") {
    return "/";
  }

  return window.location.pathname;
}

export function SpaRouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(() => normalizePath(currentPathname()));

  useEffect(() => {
    const handlePopState = () => {
      setPath(normalizePath(window.location.pathname));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const value = useMemo<RouterContextValue>(() => {
    const route = routeFromPath(path);

    return {
      route,
      path,
      href: hrefForRoute,
      navigate: (to: KnownRoute) => {
        if (typeof window === "undefined") {
          return;
        }

        const nextHref = hrefForRoute(to);
        if (window.location.pathname === nextHref) {
          return;
        }

        window.history.pushState({}, "", nextHref);
        setPath(normalizePath(window.location.pathname));
        window.scrollTo(0, 0);
      },
    };
  }, [path]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useSpaRouter() {
  const context = useContext(RouterContext);

  if (!context) {
    throw new Error("useSpaRouter must be used inside SpaRouterProvider");
  }

  return context;
}

type RouterLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: KnownRoute;
  activeClassName?: string;
};

export function RouterLink({ to, activeClassName, className, onClick, ...props }: RouterLinkProps) {
  const { path, href, navigate } = useSpaRouter();
  const isActive = path === to;
  const { ["aria-current"]: ariaCurrent, ...restProps } = props;

  return (
    <a
      href={href(to)}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) {
          return;
        }
        if (
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.altKey ||
          event.shiftKey
        ) {
          return;
        }
        event.preventDefault();
        navigate(to);
      }}
      className={cn(className, isActive && activeClassName)}
      aria-current={isActive ? "page" : ariaCurrent}
      {...restProps}
    />
  );
}
