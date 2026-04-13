import {
  CircleIcon,
  ScanLineIcon,
  SquareIcon,
  TriangleIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const steps = [
  { icon: ScanLineIcon, label: "Analyzing your request…" },
  { icon: SquareIcon, label: "Generating layout structure…" },
  { icon: TriangleIcon, label: "Assembling UI components…" },
  { icon: CircleIcon, label: "Finalizing your website…" },
];

const STEP_DURATION = 45000;

const LoaderSteps = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((s) => (s + 1) % steps.length);
    }, STEP_DURATION);
    return () => clearInterval(interval);
  }, []);

  const Icon = steps[current].icon;
  return (
    <div className="section-shell relative flex h-full w-full items-center justify-center overflow-hidden text-white">
      <div className="aurora-spot animate-aurora -left-6 top-6 h-60 w-60 bg-cyan-400/36" />
      <div className="aurora-spot animate-aurora -right-10 bottom-6 h-72 w-72 bg-blue-500/30 [animation-delay:1.2s]" />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="glass-card relative z-10 flex w-[92%] max-w-md flex-col items-center rounded-3xl px-6 py-10"
      >
        <div className="relative flex h-28 w-28 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-cyan-300/35" />
          <div className="absolute inset-3 rounded-full border border-cyan-100/10" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, ease: "linear", repeat: Infinity }}
            className="absolute inset-0 rounded-full border-t border-cyan-300/70"
          />
          <Icon className="h-8 w-8 text-cyan-100" />
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={current}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.26 }}
            className="mt-7 text-center text-lg font-medium text-slate-100"
          >
            {steps[current].label}
          </motion.p>
        </AnimatePresence>

        <p className="mt-2 text-center text-xs text-slate-400">
          This may take around 2-3 minutes...
        </p>

        <div className="mt-4 flex items-center gap-1.5">
          {steps.map((_, index) => (
            <span
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${index === current ? "w-6 bg-cyan-300" : "w-2.5 bg-white/20"}`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LoaderSteps;
