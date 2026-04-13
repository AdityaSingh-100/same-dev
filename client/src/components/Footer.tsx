import { assets } from "@/assets/assets";
import { GithubIcon, LinkedinIcon, SendIcon, TwitterIcon } from "lucide-react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "My Projects", to: "/projects" },
  { label: "Community", to: "/community" },
  { label: "Pricing", to: "/pricing" },
];

const resources = [
  { label: "Docs", href: "#" },
  { label: "Changelog", href: "#" },
  { label: "Support", href: "#" },
  { label: "Roadmap", href: "#" },
];

const socialLinks = [
  { label: "GitHub", href: "#", Icon: GithubIcon },
  { label: "Twitter", href: "#", Icon: TwitterIcon },
  { label: "LinkedIn", href: "#", Icon: LinkedinIcon },
];

const Footer = () => {
  const onSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Subscribed to product updates");
    event.currentTarget.reset();
  };

  return (
    <footer className="relative mt-20 border-t border-white/10 bg-slate-950/55 px-4 pb-8 pt-14 backdrop-blur-xl md:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-300/60 to-transparent" />

      <div className="mx-auto grid w-full max-w-[1400px] gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-5">
          <img src={assets.logo} alt="same.dev logo" className="h-6" />
          <p className="max-w-xs text-sm leading-6 text-slate-400">
            Build polished websites by chatting with AI, iterate quickly, and
            ship with confidence.
          </p>
          <div className="flex items-center gap-2">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="rounded-full border border-white/15 bg-white/5 p-2 text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-200/40 hover:bg-cyan-200/10 hover:text-white"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
            Quick Links
          </h3>
          <div className="mt-5 flex flex-col gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-slate-400 transition-all duration-300 hover:translate-x-1 hover:text-cyan-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
            Resources
          </h3>
          <div className="mt-5 flex flex-col gap-3">
            {resources.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-slate-400 transition-all duration-300 hover:translate-x-1 hover:text-cyan-200"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
            Stay Updated
          </h3>
          <p className="mt-5 text-sm text-slate-400">
            Product notes, new components, and launch announcements once a
            month.
          </p>
          <form className="mt-4 flex items-center gap-2" onSubmit={onSubscribe}>
            <input
              type="email"
              placeholder="you@domain.com"
              required
              className="premium-input w-full rounded-xl px-3 py-2.5 text-sm text-slate-100 outline-none transition-all duration-300 placeholder:text-slate-500"
            />
            <button
              type="submit"
              className="rounded-xl border border-cyan-200/25 bg-linear-to-r from-sky-600 to-blue-600 p-2.5 text-white transition-all duration-300 hover:scale-105 hover:from-sky-500 hover:to-blue-500"
              aria-label="Subscribe"
            >
              <SendIcon size={16} />
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto mt-12 flex w-full max-w-[1400px] flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
        <p>Copyright © 2026 same.dev. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="transition-colors duration-300 hover:text-slate-200"
          >
            Privacy
          </a>
          <a
            href="#"
            className="transition-colors duration-300 hover:text-slate-200"
          >
            Terms
          </a>
          <a
            href="#"
            className="transition-colors duration-300 hover:text-slate-200"
          >
            Cookies
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
