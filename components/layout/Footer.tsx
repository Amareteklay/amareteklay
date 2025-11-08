const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/writing", label: "Writing" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://www.linkedin.com/in/amareteklay/", label: "LinkedIn" },
  { href: "https://twitter.com/amareteklay", label: "Twitter" },
  { href: "https://github.com/amareteklay", label: "GitHub" },
];

const proWriting = { href: "https://homoadapticus.com", label: "Homo Adapticus" };

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 pb-10">
      <div className="container">
        <div className="surface-card px-6 py-10 text-sm text-slate-600 dark:text-slate-300">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_0.9fr]">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.4em] text-indigo-500">Stay curious</p>
              <p className="text-2xl font-semibold text-slate-900 dark:text-white">Amare Teklay</p>
              <p className="max-w-sm text-slate-600 dark:text-slate-300">
                Notes on adaptation, public health, and data practice. For deeper dives into professional research and
                client work, visit Homo Adapticus.
              </p>
              <a
                href={proWriting.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-900/15 px-5 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-slate-900 transition hover:border-slate-900/40 dark:border-white/20 dark:text-white dark:hover:border-white/50"
              >
                {proWriting.label}
                <span aria-hidden>&gt;</span>
              </a>
            </div>

            <nav className="space-y-3">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Site</p>
              <div className="grid gap-2 text-base text-slate-900 dark:text-white">
                {footerLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="transition-colors hover:text-indigo-500 dark:hover:text-indigo-400"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </nav>

            <nav className="space-y-3">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Connect</p>
              <div className="grid gap-2 text-base text-slate-900 dark:text-white">
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-indigo-500 dark:hover:text-indigo-400"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </nav>
          </div>

          <div className="mt-10 border-t border-white/20 pt-6 text-[11px] uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            Copyright {year} Amare Teklay -- All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
