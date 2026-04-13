import api from "@/configs/axios";
import { authClient } from "@/lib/auth-client";
import { ArrowUpRightIcon, Loader2Icon, SparklesIcon } from "lucide-react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const logoItems = [
  {
    src: "https://saasly.prebuiltui.com/assets/companies-logo/framer.svg",
    label: "Framer",
  },
  {
    src: "https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg",
    label: "Huawei",
  },
  {
    src: "https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg",
    label: "Instagram",
  },
  {
    src: "https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg",
    label: "Microsoft",
  },
  {
    src: "https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg",
    label: "Walmart",
  },
];

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
    <section className="section-shell relative overflow-hidden px-4 pb-24 pt-16 md:pt-22 lg:px-14">
      <div className="aurora-spot animate-aurora -left-20 top-16 h-80 w-80 bg-cyan-400/45" />
      <div className="aurora-spot animate-aurora -right-16 top-52 h-80 w-80 bg-blue-500/30 [animation-delay:1.2s]" />
      <div className="aurora-spot animate-aurora bottom-12 left-1/2 h-72 w-72 -translate-x-1/2 bg-sky-600/30 [animation-delay:2.2s]" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex w-full max-w-6xl flex-col items-center"
      >
        <motion.a
          href="https://prebuiltui.com"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="premium-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-slate-200 sm:text-sm"
        >
          <span className="rounded-full bg-linear-to-r from-sky-500 to-blue-500 px-2.5 py-1 text-[11px] font-semibold text-white">
            NEW
          </span>
          Try 30 days free trial option
          <ArrowUpRightIcon size={14} />
        </motion.a>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mt-7 max-w-4xl text-center text-4xl font-semibold leading-tight text-gradient sm:text-5xl md:text-6xl md:leading-[1.02]"
        >
          Make anything with AI. Launch premium websites in minutes.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="mt-5 max-w-2xl text-center text-base leading-7 text-slate-300 md:text-lg"
        >
          From rough ideas to deployable pages, same.dev helps you generate,
          refine, and publish with production-level speed.
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
              <SparklesIcon size={12} className="text-cyan-300" />
              Same Core Model
            </div>

            <button
              disabled={loading}
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-200/20 bg-linear-to-r from-sky-600 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:from-sky-500 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {!loading ? (
                <>
                  Create with AI
                  <ArrowUpRightIcon
                    size={15}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </>
              ) : (
                <>
                  Creating
                  <Loader2Icon className="size-4 animate-spin text-white" />
                </>
              )}
            </button>
          </div>
        </motion.form>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.46 }}
          className="mt-14 text-sm text-slate-400"
        >
          Over 600,000+ projects crafted with same
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.58 }}
          className="mt-8 grid w-full max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5"
        >
          {logoItems.map((item) => (
            <div
              key={item.label}
              className="hover-lift glass-card flex h-16 items-center justify-center rounded-2xl p-4"
            >
              <img
                className="h-6 w-auto opacity-75"
                src={item.src}
                alt={item.label}
              />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;
