import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { motion } from "framer-motion";

const Loading = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/";
    }, 6000);
  }, []);

  return (
    <div className="section-shell relative flex h-screen flex-col overflow-hidden">
      <div className="relative z-10 flex flex-1 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="glass-card flex flex-col items-center rounded-3xl px-8 py-7"
        >
          <Loader2Icon className="size-8 animate-spin text-zinc-300" />
          <p className="mt-4 text-sm text-slate-300">
            Preparing your workspace...
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;
