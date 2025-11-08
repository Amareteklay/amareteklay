"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/writing", label: "Writing" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  function toggleTheme() {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(next);
  }
  const isDark = resolvedTheme === "dark";

  return (
    <header className="sticky top-4 z-40">
      <div className="container">
        <div className="surface-card flex h-16 items-center justify-between gap-6 px-5 lg:px-8">
          <Link href="/" className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-[0.5em] text-indigo-500">
              Portfolio
            </span>
            <span className="text-lg font-semibold">Amare Teklay</span>
          </Link>

          <nav className="hidden md:flex items-center gap-2 text-sm font-medium">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-slate-600 transition hover:text-slate-900 dark:text-slate-200 dark:hover:text-white",
                    active && "bg-slate-900/5 text-slate-900 dark:bg-white/10 dark:text-white border border-black/5 dark:border-white/15"
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-1 items-center justify-end gap-3">
            <nav className="md:hidden flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em]">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white",
                    pathname === l.href && "text-slate-900 dark:text-white"
                  )}
                >
                  {l.label[0]}
                </Link>
              ))}
            </nav>
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
              className="group relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/30 bg-slate-900/90 text-white shadow-lg transition hover:scale-105 dark:border-white/20 dark:bg-white/90 dark:text-slate-900"
            >
              <span className="sr-only">Toggle theme</span>
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
