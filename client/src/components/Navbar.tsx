import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authClient } from "@/lib/auth-client";
import { UserButton } from "@daveyplate/better-auth-ui";
import api from "@/configs/axios";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRightIcon, MenuIcon, XIcon } from "lucide-react";

const navItems = [
  { label: "Home", to: "/" },
  { label: "My Projects", to: "/projects" },
  { label: "Community", to: "/community" },
  { label: "Pricing", to: "/pricing" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
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

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="sticky top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-xl"
      >
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-4 py-4 md:px-10 xl:px-14">
          <Link to="/" className="flex items-center gap-2">
            <img src={assets.logo} alt="same.dev logo" className="h-5 sm:h-7" />
          </Link>

          <div className="hidden items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1.5 md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-white/14 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {!session?.user ? (
              <button
                onClick={() => navigate("/auth/signin")}
                className="group inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-linear-to-r from-sky-600 to-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:from-sky-500 hover:to-blue-500"
              >
                Get Started
                <ArrowRightIcon
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            ) : (
              <>
                <button className="hidden rounded-full border border-white/15 bg-white/7 px-4 py-1.5 text-xs text-slate-200 sm:block">
                  Credits <span className="ml-1 text-cyan-300">{credits}</span>
                </button>
                <UserButton size="icon" />
              </>
            )}

            <button
              className="inline-flex rounded-full border border-white/15 bg-white/5 p-2.5 text-slate-100 transition-all duration-300 hover:bg-white/12 md:hidden"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <XIcon size={18} /> : <MenuIcon size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-100 bg-slate-950/75 backdrop-blur-sm md:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.32, ease: "easeOut" }}
              className="ml-auto flex h-full w-72 flex-col gap-2 border-l border-white/10 bg-slate-950/95 p-6 text-slate-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm tracking-[0.25em] text-slate-400">
                  NAVIGATION
                </p>
                <button
                  className="rounded-full border border-white/15 p-2 transition-colors hover:bg-white/10"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <XIcon size={16} />
                </button>
              </div>

              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl border border-transparent bg-white/5 px-4 py-3 text-sm font-medium transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
