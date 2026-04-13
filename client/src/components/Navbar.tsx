import React, { useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authClient } from "@/lib/auth-client";
import { UserButton } from "@daveyplate/better-auth-ui";
import api from "@/configs/axios";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDownIcon,
  GithubIcon,
} from "lucide-react";
import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  NavbarButton,
} from "@/components/ui/resizable-navbar";

const navItems = [
  { name: "Home", link: "/" },
  { name: "Pricing", link: "/pricing" },
  { name: "Guide", link: "/community" },
  { name: "Features", link: "/#features" },
];

const resourceItems = [
  { label: "My Projects", to: "/projects" },
  { label: "Community", to: "/community" },
  { label: "Docs", href: "#" },
  { label: "Changelog", href: "#" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [credits, setCredits] = useState(0);

  const { data: session } = authClient.useSession();

  const getCredits = async () => {
    try {
      const { data } = await api.get("/api/user/credits");
      setCredits(data.credits);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (session?.user) {
      getCredits();
    }
  }, [session?.user]);

  // Close resources dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        resourcesRef.current &&
        !resourcesRef.current.contains(e.target as Node)
      ) {
        setResourcesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNavItemClick = (link: string) => {
    if (link.startsWith("/#")) {
      if (pathname === "/") {
        const el = document.querySelector(link.replace("/", ""));
        el?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(link);
      }
    } else {
      navigate(link);
    }
  };

  return (
    <div className="relative w-full">
      <ResizableNavbar className="fixed inset-x-0 top-0 z-50">
        {/* ─── Desktop Navigation ─── */}
        <NavBody className="!bg-black/60 backdrop-blur-xl border border-white/5 !max-w-[1400px]">
          {/* Logo */}
          <Link to="/" className="relative z-20 flex items-center gap-2 mr-4 shrink-0">
            <img src={assets.logo} alt="same.dev logo" className="h-5 sm:h-7" />
          </Link>

          {/* Center nav items */}
          <NavItems
            items={navItems}
            className="!text-slate-400"
            onItemClick={() => {}}
          />

          {/* Right side controls */}
          <div className="relative z-20 flex items-center gap-1 shrink-0">
            {/* Resources dropdown */}
            <div className="relative" ref={resourcesRef}>
              <button
                onClick={() => setResourcesOpen((prev) => !prev)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-400 transition-all duration-300 hover:text-white"
              >
                Resources
                <ChevronDownIcon
                  size={14}
                  className={`transition-transform duration-200 ${
                    resourcesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {resourcesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-white/10 bg-neutral-950/95 p-1.5 shadow-2xl backdrop-blur-xl"
                  >
                    {resourceItems.map((item) =>
                      item.to ? (
                        <Link
                          key={item.label}
                          to={item.to}
                          onClick={() => setResourcesOpen(false)}
                          className="block rounded-lg px-3 py-2 text-sm text-slate-300 transition-all duration-200 hover:bg-white/10 hover:text-white"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          key={item.label}
                          href={item.href}
                          className="block rounded-lg px-3 py-2 text-sm text-slate-300 transition-all duration-200 hover:bg-white/10 hover:text-white"
                        >
                          {item.label}
                        </a>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* GitHub icon */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 transition-colors duration-300 hover:text-white"
            >
              <GithubIcon size={18} />
            </a>

            {/* Auth buttons */}
            {!session?.user ? (
              <NavbarButton
                variant="primary"
                onClick={() => navigate("/auth/signin")}
                className="!bg-white/10 !text-slate-200 border border-white/20 hover:!bg-white/20 !rounded-full !px-4 !py-2"
              >
                <span className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500" />
                  </span>
                  Sign Up
                </span>
              </NavbarButton>
            ) : (
              <>
                <button className="hidden rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs text-slate-200 sm:block">
                  Credits{" "}
                  <span className="ml-1 font-semibold text-white">
                    {credits}
                  </span>
                </button>
                <UserButton size="icon" />
              </>
            )}
          </div>
        </NavBody>

        {/* ─── Mobile Navigation ─── */}
        <MobileNav className="!bg-black/60 backdrop-blur-xl border border-white/5">
          <MobileNavHeader>
            <Link to="/" className="relative z-20 flex items-center gap-2">
              <img src={assets.logo} alt="same.dev logo" className="h-5" />
            </Link>

            <div className="flex items-center gap-2">
              {!session?.user ? (
                <button
                  onClick={() => navigate("/auth/signin")}
                  className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200"
                >
                  Sign Up
                </button>
              ) : (
                <UserButton size="icon" />
              )}
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            className="!bg-neutral-950 border border-white/10"
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  handleNavItemClick(item.link);
                }}
                className="relative text-slate-300 hover:text-white transition-colors w-full rounded-lg px-3 py-2 hover:bg-white/5"
              >
                <span className="block text-sm font-medium">{item.name}</span>
              </a>
            ))}
            {resourceItems
              .filter((r) => r.to)
              .map((item) => (
                <Link
                  key={item.label}
                  to={item.to!}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative text-slate-300 hover:text-white transition-colors w-full rounded-lg px-3 py-2 hover:bg-white/5"
                >
                  <span className="block text-sm font-medium">
                    {item.label}
                  </span>
                </Link>
              ))}

            {session?.user && (
              <div className="mt-2 w-full border-t border-white/10 pt-4">
                <button className="w-full rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs text-slate-200">
                  Credits{" "}
                  <span className="ml-1 font-semibold text-white">
                    {credits}
                  </span>
                </button>
              </div>
            )}
          </MobileNavMenu>
        </MobileNav>
      </ResizableNavbar>
    </div>
  );
};

export default Navbar;
