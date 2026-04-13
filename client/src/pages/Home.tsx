import api from "@/configs/axios";
import { authClient } from "@/lib/auth-client";
import { ArrowUpRightIcon, Loader2Icon, SparklesIcon } from "lucide-react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BackgroundBeams } from "@/components/background-beamts";
import {
  ScrollIndicator,
  PoweredBySection,
  HowItWorksSection,
  ComparisonSection,
  FeaturesSection,
  PricingSectionHome,
  ContactSectionHome,
  CTASection,
} from "@/components/LandingSections";

const Home = () => {
  const { data: session } = authClient.useSession();
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!session?.user) {
        return toast.error("Please sign in to create a project");
      } else if (!input.trim()) {
        return toast.error("Please enter a message");
      }
      setLoading(true);
      const { data } = await api.post("/api/user/project", {
        initial_prompt: input,
      });
      setLoading(false);
      navigate(`/projects/${data.projectId}`);
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
  };

  return (
    <section className="section-shell relative overflow-hidden px-4 pb-24 pt-16 md:pt-10 lg:px-14">
      <div className="min-h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center"
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="premium-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-slate-200 sm:text-sm"
          >
            🌟 Give us a star on GitHub
            <ArrowUpRightIcon size={14} />
          </motion.a>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-7 max-w-4xl text-center text-4xl font-semibold leading-tight text-gradient sm:text-5xl md:text-6xl md:leading-[1.02]"
          >
            Build anything with AI at the Speed of Thought
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="mt-5 max-w-2xl text-center text-base leading-7 text-slate-300 md:text-lg"
          >
            From prompt to production-ready code — powered by{" "}
            <strong className="italic text-white">AI</strong>
          </motion.p>

          <motion.form
            onSubmit={onSubmitHandler}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.34 }}
            className="glass-card mt-12 w-full max-w-3xl rounded-3xl p-4 sm:p-6"
          >
            <div className="premium-input rounded-2xl p-3.5 sm:p-4">
              <textarea
                onChange={(e) => setInput(e.target.value)}
                value={input}
                className="min-h-28 w-full resize-none bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500 sm:min-h-30 sm:text-base"
                placeholder="Create a marketplace for freelancers with bidding and payment system"
                required
              />
            </div>

            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="premium-chip inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs text-slate-300">
                <SparklesIcon size={12} className="text-zinc-300" />
                Same Core v2
              </div>

              <div className="flex items-center gap-2">
                {!loading ? (
                  <>
                    <span className="hidden items-center gap-1 rounded-lg border border-white/15 bg-white/5 px-2 py-1 text-[11px] text-slate-400 sm:inline-flex">
                      ⌘ + Enter
                    </span>
                    <button
                      disabled={loading}
                      className="inline-flex items-center justify-center rounded-full bg-white p-2.5 text-black transition-all duration-300 hover:scale-[1.05] hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <ArrowUpRightIcon size={16} />
                    </button>
                  </>
                ) : (
                  <button
                    disabled
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black"
                  >
                    Creating
                    <Loader2Icon className="size-4 animate-spin text-black" />
                  </button>
                )}
              </div>
            </div>
          </motion.form>

          {/* Powered-by tagline + tech icons */}
          <PoweredBySection />

          <ScrollIndicator />
        </motion.div>
        <BackgroundBeams />
      </div>

      {/* ─── Content sections below the hero ─── */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-4">
        <HowItWorksSection />
        <ComparisonSection />
        <div id="features">
          <FeaturesSection />
        </div>

        <div id="contact">
          <ContactSectionHome />
        </div>
        <CTASection />
      </div>
    </section>
  );
};

export default Home;
