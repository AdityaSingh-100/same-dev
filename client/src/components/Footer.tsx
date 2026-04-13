import { assets } from "@/assets/assets";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const socialLinks = [
  { label: "GitHub", href: "#", Icon: GithubIcon },
  { label: "LinkedIn", href: "#", Icon: LinkedinIcon },
  { label: "Twitter", href: "#", Icon: TwitterIcon },
  { label: "YouTube", href: "#", Icon: YoutubeIcon },
];

const Footer = () => {
  return (
    <footer className="relative mt-20 bg-black/50 px-4 pb-8 pt-10 backdrop-blur-xl md:px-8">
      {/* Top row: Logo + Links   |   Email */}
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <img src={assets.logo} alt="same.dev logo" className="h-5" />
          </Link>
          <Link
            to="#"
            className="text-sm text-slate-400 transition-colors duration-300 hover:text-white"
          >
            Terms
          </Link>
          <Link
            to="#"
            className="text-sm text-slate-400 transition-colors duration-300 hover:text-white"
          >
            Privacy
          </Link>
        </div>

        <a
          href="mailto:hello@same.dev"
          className="text-sm font-medium text-slate-300 transition-colors duration-300 hover:text-white"
        >
          same.dev@gmail.com
        </a>
      </div>

      {/* Divider */}
      <div className="mx-auto my-6 w-full max-w-[1400px] border-t border-white/10" />

      {/* Bottom row: Copyright  |  Social icons */}
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-4 text-xs text-slate-500 sm:flex-row">
        <p>© 2025 same.dev. All rights reserved.</p>

        <div className="flex items-center gap-3">
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="rounded-full p-1.5 text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
