import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Menu, X } from "lucide-react";

import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

const desktopLinkClass = (active) =>
  cn(
    "relative px-3 py-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] transition-colors",
    active
      ? "text-foreground after:absolute after:inset-x-3 after:bottom-1 after:h-px after:bg-primary"
      : "text-muted-foreground hover:text-foreground",
  );

const mobileLinkClass = (active) =>
  cn(
    "block rounded-md px-3 py-2 font-mono text-[0.72rem] uppercase tracking-[0.18em]",
    active ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground",
  );

/**
 * Editorial top app bar with mono uppercase nav, brand-display name, theme toggle, and auth-aware links.
 */
export default function Navbar() {
  const { props, url } = usePage();
  const [open, setOpen] = useState(false);

  const isActive = (href) =>
    url === href || url.startsWith(`${href}?`) || url.startsWith(`${href}/`);

  const desktopLinks = (
    <>
      <Link href="/" prefetch className={desktopLinkClass(isActive("/"))}>
        Home
      </Link>
      <Link href="/site/about" prefetch className={desktopLinkClass(isActive("/site/about"))}>
        About
      </Link>
      <Link href="/site/contact" prefetch className={desktopLinkClass(isActive("/site/contact"))}>
        Contact
      </Link>
      {props.auth.canViewUsers && (
        <Link href="/user/index" prefetch className={desktopLinkClass(isActive("/user/index"))}>
          Users
        </Link>
      )}
      {props.auth.isGuest && (
        <Link href="/user/signup" prefetch className={desktopLinkClass(isActive("/user/signup"))}>
          Signup
        </Link>
      )}
      {props.auth.isGuest && (
        <Link href="/user/login" prefetch className={desktopLinkClass(isActive("/user/login"))}>
          Login
        </Link>
      )}
      {!props.auth.isGuest && (
        <Link
          href="/user/logout"
          method="post"
          as="button"
          className="cursor-pointer px-3 py-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
        >
          Logout ({props.auth.user?.username})
        </Link>
      )}
    </>
  );

  const mobileLinks = (
    <>
      <Link href="/" className={mobileLinkClass(isActive("/"))} onClick={() => setOpen(false)}>
        Home
      </Link>
      <Link
        href="/site/about"
        className={mobileLinkClass(isActive("/site/about"))}
        onClick={() => setOpen(false)}
      >
        About
      </Link>
      <Link
        href="/site/contact"
        className={mobileLinkClass(isActive("/site/contact"))}
        onClick={() => setOpen(false)}
      >
        Contact
      </Link>
      {props.auth.canViewUsers && (
        <Link
          href="/user/index"
          className={mobileLinkClass(isActive("/user/index"))}
          onClick={() => setOpen(false)}
        >
          Users
        </Link>
      )}
      {props.auth.isGuest && (
        <Link
          href="/user/signup"
          className={mobileLinkClass(isActive("/user/signup"))}
          onClick={() => setOpen(false)}
        >
          Signup
        </Link>
      )}
      {props.auth.isGuest && (
        <Link
          href="/user/login"
          className={mobileLinkClass(isActive("/user/login"))}
          onClick={() => setOpen(false)}
        >
          Login
        </Link>
      )}
      {!props.auth.isGuest && (
        <Link
          href="/user/logout"
          method="post"
          as="button"
          className="block w-full cursor-pointer rounded-md px-3 py-2 text-left font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
          onClick={() => setOpen(false)}
        >
          Logout ({props.auth.user?.username})
        </Link>
      )}
    </>
  );

  return (
    <header>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-6">
            <Link href="/" className="group flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-md bg-foreground text-background font-display text-sm font-medium leading-none">
                Y
              </span>
              <span className="font-display text-[1.15rem] font-medium leading-none tracking-[-0.01em] text-foreground transition-colors group-hover:text-primary">
                {props.appName}
              </span>
            </Link>

            <div className="hidden items-center gap-1 md:flex">
              {desktopLinks}
              <div className="ml-3 border-l border-border pl-3">
                <ThemeToggle />
              </div>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                aria-expanded={open}
                aria-label="Toggle navigation"
                onClick={() => setOpen((value) => !value)}
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </Button>
            </div>
          </div>
        </div>

        {open && (
          <div className="border-t border-border bg-background md:hidden">
            <div className="space-y-1 px-4 py-3">{mobileLinks}</div>
          </div>
        )}
      </nav>
    </header>
  );
}
