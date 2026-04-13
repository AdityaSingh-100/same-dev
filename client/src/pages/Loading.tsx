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
      <div className="aurora-spot animate-aurora -left-12 top-14 h-72 w-72 bg-cyan-500/28" />
      <div className="aurora-spot animate-aurora -right-8 bottom-14 h-72 w-72 bg-blue-500/24 [animation-delay:1.4s]" />

      <div className="flex flex-1 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="glass-card flex flex-col items-center rounded-3xl px-8 py-7"
        >
          <Loader2Icon className="size-8 animate-spin text-cyan-200" />
          <p className="mt-4 text-sm text-slate-300">
            Preparing your workspace...
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;
