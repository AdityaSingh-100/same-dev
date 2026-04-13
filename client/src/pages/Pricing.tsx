import React from "react";
import { appPlans } from "../assets/assets";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import api from "@/configs/axios";
import { motion } from "framer-motion";
import { CheckIcon, SparklesIcon } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  price: string;
  credits: number;
  description: string;
  features: string[];
}

const Pricing = () => {
  const { data: session } = authClient.useSession();
  const [plans] = React.useState<Plan[]>(appPlans);

  const handlePurchase = async (planId: string) => {
    try {
      if (!session?.user) return toast("Please login to purchase credits");
      const { data } = await api.post("/api/user/purchase-credits", { planId });
      window.location.href = data.payment_link;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
  };

  return (
    <section className="section-shell relative px-4 pb-20 pt-14 md:px-8">
      <div className="aurora-spot animate-aurora -left-10 top-10 h-72 w-72 bg-cyan-400/35" />
      <div className="aurora-spot animate-aurora right-0 top-48 h-72 w-72 bg-blue-500/26 [animation-delay:1.2s]" />

      <div className="mx-auto w-full max-w-6xl min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mt-4 text-center"
        >
          <span className="premium-chip inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-slate-300">
            <SparklesIcon size={13} className="text-cyan-300" />
            Flexible Credits
          </span>
          <h2 className="mt-5 text-4xl font-semibold text-gradient md:text-5xl">
            Choose Your Plan
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400 md:text-base">
            Start free and scale as you grow. Pick the perfect credit bundle for
            your website generation workflow.
          </p>
        </motion.div>

        <div className="px-2 pb-4 pt-14">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {plans.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: idx * 0.12 }}
                className={`glass-card hover-lift mx-auto w-full max-w-sm rounded-3xl p-6 text-white ${idx === 1 ? "border-cyan-200/40 shadow-[0_24px_52px_rgba(8,122,168,0.28)]" : ""}`}
              >
                {idx === 1 && (
                  <span className="premium-chip mb-4 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold text-cyan-200">
                    Most Popular
                  </span>
                )}

                <h3 className="text-2xl font-semibold">{plan.name}</h3>
                <div className="my-4">
                  <span className="text-4xl font-semibold text-slate-100">
                    {plan.price}
                  </span>
                  <span className="ml-2 text-sm text-slate-300">
                    for {plan.credits} credits
                  </span>
                </div>

                <p className="mb-7 min-h-12 text-sm leading-6 text-slate-300">
                  {plan.description}
                </p>

                <ul className="mb-8 space-y-2.5 text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePurchase(plan.id)}
                  className={`w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 active:scale-[0.98] ${idx === 1 ? "bg-linear-to-r from-sky-500 to-blue-600 text-white hover:from-sky-400 hover:to-blue-500" : "border border-white/20 bg-white/8 text-slate-100 hover:bg-white/14"}`}
                >
                  Buy Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-12 max-w-xl text-center text-sm leading-6 text-slate-400">
          Project creation and revision consume{" "}
          <span className="text-slate-200">5 credits</span> each. Add credits
          whenever you need to scale your output.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
