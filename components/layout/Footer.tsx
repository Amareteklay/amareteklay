import type { Locale } from "@/lib/locales";

const footerLinks = [
  { slug: "", label: "Home" },
  { slug: "about", label: "About" },
  { slug: "writing", label: "Writing" },
  { slug: "projects", label: "Projects" },
  { slug: "contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://www.linkedin.com/in/amareteklay/", label: "LinkedIn" },
  { href: "https://twitter.com/amareteklay", label: "Twitter" },
  { href: "https://github.com/amareteklay", label: "GitHub" },
];

const proWriting = { href: "https://homoadapticus.com", label: "Homo Adapticus" };

function withLocale(locale: Locale, slug: string) {
  if (!slug) return `/${locale}`;
  return `/${locale}/${slug}`;
}

export default function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-slate-200/60 bg-white/90 text-sm text-slate-600 backdrop-blur dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-4">
          {/* Intro column */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-[11px] uppercase tracking-[0.4em] text-indigo-500">Stay curious</p>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Amare Teklay</h3>
            <p className="max-w-md text-sm text-slate-600 dark:text-slate-300">
              Notes on adaptation, public health, and data practice. For deeper dives into professional
              research and client work, visit Homo Adapticus.
            </p>
            <a
              href={proWriting.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-900/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-900 transition hover:border-slate-900/40 dark:border-white/20 dark:text-white dark:hover:border-white/50"
            >
              {proWriting.label}
              <span aria-hidden className="text-slate-400">↗</span>
            </a>
          </div>

          {/* Site links */}
          <nav className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">Site</p>
            <ul className="grid gap-2 text-base text-slate-900 dark:text-white">
              {footerLinks.map((link) => (
                <li key={link.slug || "home"}>
                  <a
                    href={withLocale(locale, link.slug)}
                    className="transition-colors hover:text-indigo-500 dark:hover:text-indigo-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social links */}
          <nav className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">Connect</p>
            <ul className="grid gap-2 text-base text-slate-900 dark:text-white">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-indigo-500 dark:hover:text-indigo-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Copyright line */}
        <div className="mt-12 border-t border-slate-200/60 pt-6 text-center text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
          <p className="font-light tracking-wide">
            © {year}{" "}
            <span className="font-medium text-slate-700 dark:text-slate-200">
              Amare Teklay
            </span>{" "}
            — All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
