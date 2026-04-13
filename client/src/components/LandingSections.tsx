import { motion } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";

/* ─── Scroll-Down Indicator ─── */
export const ScrollIndicator = () => {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight - 100, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="flex justify-center mt-10"
    >
      <button
        onClick={scrollToContent}
        className="flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-colors duration-300 group"
      >
        <span className="text-sm font-medium">Scroll down</span>
        <ChevronDownIcon className="h-5 w-5 animate-bounce group-hover:scale-110 transition-transform" />
      </button>
    </motion.div>
  );
};

/* ─── "Powered by" Logo Row ─── */
const techLogos = [
  { icon: "⚛", label: "React" },
  { icon: "▲", label: "Next.js" },
  { icon: "🌊", label: "Tailwind" },
  { icon: "📦", label: "Webpack" },
  { icon: "🔷", label: "TypeScript" },
  { icon: "⚡", label: "Vite" },
  { icon: "🗃️", label: "Prisma" },
  { icon: "☁️", label: "Vercel" },
  { icon: "🔐", label: "Auth.js" },
  { icon: "🧠", label: "AI" },
];

export const PoweredBySection = () => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.55, duration: 0.5 }}
    className="mt-6 flex flex-col items-center gap-4"
  >
    <p className="text-sm text-slate-400">
      Better the prompt → Better the <strong className="text-slate-200">result</strong>
    </p>
    <div className="glass-card rounded-2xl px-6 py-3 flex items-center gap-4">
      <span className="text-xs text-slate-400 font-medium">Powered by</span>
      <div className="flex items-center gap-3">
        {techLogos.map((t) => (
          <span
            key={t.label}
            title={t.label}
            className="text-lg opacity-60 hover:opacity-100 transition-opacity cursor-default"
          >
            {t.icon}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

/* ─── "How It Works" Section ─── */
export const HowItWorksSection = () => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6 }}
    className="mt-28 w-full"
  >
    <div
      className="relative overflow-hidden rounded-3xl p-8 md:p-12"
      style={{
        background:
          "linear-gradient(135deg, rgba(30,30,40,0.9) 0%, rgba(20,18,25,0.95) 50%, rgba(15,15,20,1) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Decorative gradient blobs */}
      <div
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.4), transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full opacity-15 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.4), transparent 70%)",
        }}
      />

      <p className="text-sm text-slate-400 mb-3">
        How <span className="text-blue-400 font-semibold">same</span> does it
      </p>

      <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
        One sentence in → Whole app out
      </h2>

      <p className="max-w-xl text-slate-400 text-sm md:text-base leading-relaxed">
        Say goodbye to tutorials. Forget coding headaches. Type your app idea,
        and in a blink, you get a full-stack app ready to run, connect, and
        launch — without sacrificing your sanity. Think of it as your app
        genie.
      </p>

      {/* Paper airplane decorative SVG */}
      <div className="absolute top-6 right-6 md:top-8 md:right-12 opacity-20">
        <svg
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-blue-400"
        >
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" />
        </svg>
      </div>
    </div>
  </motion.section>
);

/* ─── Comparison Section ─── */
export const ComparisonSection = () => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6 }}
    className="mt-28 w-full flex flex-col items-center"
  >
    {/* Badge */}
    <span className="premium-chip inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-slate-300 mb-6">
      <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
      See the Difference
    </span>

    <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-3">
      AI that doesn't look AI
    </h2>
    <p className="text-slate-400 text-center max-w-lg text-sm md:text-base mb-12">
      For people, who are tired of those same blue-violet AI generated websites
      that can be smelled by miles away…
    </p>

    {/* Side-by-side comparison cards */}
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      {/* Other Tools */}
      <div className="glass-card rounded-2xl p-1 relative overflow-hidden group">
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-white/10 backdrop-blur-sm text-[11px] text-slate-300 px-2.5 py-1 rounded-md border border-white/10">
            Other Tools
          </span>
        </div>
        <div className="rounded-xl overflow-hidden h-56 bg-gradient-to-br from-indigo-950/50 to-purple-950/50 flex items-center justify-center relative">
          {/* Simulated generic AI site look */}
          <div className="absolute inset-0 bg-gradient-to-b from-violet-600/10 to-blue-600/10" />
          <div className="text-center z-10 px-6">
            <div className="h-2 w-24 mx-auto bg-violet-400/20 rounded mb-3" />
            <div className="h-3 w-44 mx-auto bg-violet-400/15 rounded mb-2" />
            <div className="h-3 w-36 mx-auto bg-violet-400/15 rounded mb-4" />
            <div className="h-8 w-28 mx-auto bg-gradient-to-r from-violet-600/30 to-blue-600/30 rounded-lg" />
          </div>
        </div>
      </div>

      {/* same.dev */}
      <div className="glass-card rounded-2xl p-1 relative overflow-hidden group ring-1 ring-blue-500/20">
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-blue-500/20 backdrop-blur-sm text-[11px] text-blue-300 px-2.5 py-1 rounded-md border border-blue-500/20 font-semibold">
            same
          </span>
        </div>
        <div className="rounded-xl overflow-hidden h-56 bg-gradient-to-br from-slate-900/80 to-slate-950/80 flex items-center justify-center relative">
          <div className="text-center z-10 px-6">
            <div className="h-2 w-20 mx-auto bg-white/10 rounded mb-3" />
            <div className="h-3 w-48 mx-auto bg-white/8 rounded mb-2" />
            <div className="h-3 w-40 mx-auto bg-white/8 rounded mb-4" />
            <div className="flex gap-2 justify-center">
              <div className="h-8 w-20 bg-white/10 rounded-lg" />
              <div className="h-8 w-20 bg-gradient-to-r from-sky-600/40 to-blue-600/40 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.section>
);

/* ─── Bento Features Grid ─── */
export const FeaturesSection = () => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6 }}
    className="mt-28 w-full flex flex-col items-center"
  >
    {/* Heading */}
    <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-3 italic">
      Turn Your Prompts Into Reality
    </h2>
    <p className="text-slate-400 text-center max-w-lg text-sm md:text-base mb-12">
      same is packed with features designed to help you build and deploy
      applications faster than ever before.
    </p>

    {/* ── Top row: 3 equal cards ── */}
    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
      {/* Card 1 – Built in 10 Days */}
      <div className="glass-card hover-lift rounded-2xl p-6 flex flex-col gap-4">
        {/* Mini bar chart */}
        <div className="flex items-end gap-[3px] h-20">
          {[20, 30, 25, 40, 50, 45, 60, 70, 65, 80, 90, 85, 95, 100].map(
            (h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-t from-sky-600 to-sky-400 opacity-80"
                style={{ height: `${h}%` }}
              />
            )
          )}
        </div>
        <div>
          <p className="text-slate-300">
            <span className="text-2xl font-bold text-sky-400">10</span>{" "}
            <span className="text-xs text-slate-400">Days of Rapid Progress</span>
          </p>
        </div>
        <h3 className="text-base font-semibold text-white">
          Built by 1 Dropout in 10 Days
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          Showcasing the power of rapid development from a simple idea to a
          fully functional product.
        </p>
      </div>

      {/* Card 2 – Unlimited & Secure */}
      <div className="glass-card hover-lift rounded-2xl p-6 flex flex-col items-center gap-4">
        <div className="flex flex-col items-center justify-center h-20">
          <div className="rounded-xl border border-white/15 p-4 mb-2">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-sky-400"
            >
              <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <span className="text-[11px] text-slate-400 border border-white/10 rounded-md px-2 py-0.5">
            Unlimited Projects
          </span>
        </div>
        <h3 className="text-base font-semibold text-white text-center">
          Unlimited & Secure Projects
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed text-center">
          Create as many projects as you need. All your data is private and
          protected.
        </p>
      </div>

      {/* Card 3 – Affordable Pricing */}
      <div className="glass-card hover-lift rounded-2xl p-6 flex flex-col gap-4">
        <div className="flex items-end justify-center gap-6 h-20">
          {/* $9 Cost small bar */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 rounded-md bg-white/10 border border-white/10 p-2 flex items-center justify-center">
              <span className="text-xs text-slate-300 font-bold">$</span>
            </div>
            <span className="text-[10px] text-slate-500">$9 Cost</span>
          </div>
          {/* 10x ROI tall bar */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-16 rounded-md bg-gradient-to-t from-sky-600 to-sky-400" />
            <span className="text-[10px] text-slate-500">10x ROI</span>
          </div>
        </div>
        <h3 className="text-base font-semibold text-white">
          Affordable Pricing, Better ROI
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          Our pricing is designed to provide a massive return on your
          investment.
        </p>
      </div>
    </div>

    {/* ── Bottom row: 2 wider cards ── */}
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Card 4 – Advanced AI Models */}
      <div className="glass-card hover-lift rounded-2xl p-6 flex flex-col gap-4">
        <div className="flex gap-3 h-44">
          {/* Prompt panel */}
          <div className="flex-1 rounded-xl border border-white/10 bg-black/40 p-4 flex flex-col">
            <span className="text-[10px] font-mono text-slate-500 mb-2">
              // PROMPT
            </span>
            <p className="text-xs font-mono text-slate-300 leading-relaxed flex-1">
              "Create a modern pricing card component for a SaaS product."
            </p>
            <div className="mt-auto border-t border-white/10 pt-3 flex items-center gap-3">
              <span className="text-lg">🤖</span>
              <span className="text-base font-bold text-red-400">G</span>
              <span className="text-base font-bold text-slate-300">AI</span>
            </div>
          </div>
          {/* Preview panel */}
          <div className="w-28 rounded-xl border border-white/10 bg-white/[0.03]" />
        </div>
        <h3 className="text-base font-semibold text-white">
          Advanced AI Models
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          Transform simple text prompts into complex, ready-to-use components
          instantly.
        </p>
      </div>

      {/* Card 5 – One-Click Deployment */}
      <div className="glass-card hover-lift rounded-2xl p-6 flex flex-col gap-4">
        <div className="rounded-xl border border-white/10 bg-black/60 p-4 h-44 flex flex-col">
          {/* Traffic light dots */}
          <div className="flex gap-1.5 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          {/* Terminal lines */}
          <div className="font-mono text-xs space-y-1.5 text-slate-400">
            <p>
              <span className="text-green-400">$</span> npm run deploy
            </p>
            <p>
              <span className="text-slate-500">&gt;</span> same@0.1.0 deploy
              /Users/same/app
            </p>
            <p>
              <span className="text-slate-500">&gt;</span> e2b-deploy --sandbox
            </p>
            <p className="text-green-400 mt-2">✓ Deployed successfully</p>
          </div>
        </div>
        <h3 className="text-base font-semibold text-white">
          One-Click Sandbox Deployment
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          We handle the infrastructure with E2B sandboxes, so you can forget
          about Vercel and Netlify hassles.
        </p>
      </div>
    </div>
  </motion.section>
);

/* ─── Pricing Section (Home Page) ─── */
export const PricingSectionHome = () => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6 }}
    className="mt-28 w-full flex flex-col items-center scroll-mt-24"
  >
    <span className="premium-chip inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-slate-300 mb-6">
      <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
      Simple Pricing
    </span>

    <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-3">
      Choose Your Plan
    </h2>
    <p className="text-slate-400 text-center max-w-lg text-sm md:text-base mb-12">
      Start free. Upgrade when you need more power.
    </p>

    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
      {/* Free Tier */}
      <div className="glass-card hover-lift rounded-2xl p-6 flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Free</h3>
          <p className="text-sm text-slate-400 mt-1">Get started for free</p>
        </div>
        <div className="flex items-end gap-1">
          <span className="text-4xl font-bold text-white">$0</span>
          <span className="text-sm text-slate-400 mb-1">/month</span>
        </div>
        <ul className="flex-1 space-y-3 text-sm text-slate-300">
          <li className="flex items-center gap-2">
            <span className="text-green-400">✓</span> 3 projects
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Basic AI models
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Community support
          </li>
        </ul>
        <button className="mt-4 w-full rounded-full border border-white/20 bg-white/5 py-2.5 text-sm font-semibold text-slate-200 transition-all duration-300 hover:bg-white/10">
          Get Started
        </button>
      </div>

      {/* Pro Tier - Highlighted */}
      <div className="glass-card hover-lift rounded-2xl p-6 flex flex-col gap-4 ring-1 ring-sky-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-gradient-to-l from-sky-500 to-blue-600 px-3 py-1 rounded-bl-lg text-[10px] font-bold text-white uppercase tracking-wider">
          Popular
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Pro</h3>
          <p className="text-sm text-slate-400 mt-1">For serious builders</p>
        </div>
        <div className="flex items-end gap-1">
          <span className="text-4xl font-bold text-white">$9</span>
          <span className="text-sm text-slate-400 mb-1">/month</span>
        </div>
        <ul className="flex-1 space-y-3 text-sm text-slate-300">
          <li className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Unlimited projects
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Advanced AI models
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Priority support
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-400">✓</span> One-click deploy
          </li>
        </ul>
        <button className="mt-4 w-full rounded-full bg-gradient-to-r from-sky-500 to-blue-600 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/20 hover:-translate-y-0.5">
          Upgrade to Pro
        </button>
      </div>

      {/* Enterprise Tier */}
      <div className="glass-card hover-lift rounded-2xl p-6 flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Enterprise</h3>
          <p className="text-sm text-slate-400 mt-1">For teams at scale</p>
        </div>
        <div className="flex items-end gap-1">
          <span className="text-4xl font-bold text-white">Custom</span>
        </div>
        <ul className="flex-1 space-y-3 text-sm text-slate-300">
          <li className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Everything in Pro
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Custom integrations
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Dedicated support
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-400">✓</span> SLA guarantee
          </li>
        </ul>
        <button className="mt-4 w-full rounded-full border border-white/20 bg-white/5 py-2.5 text-sm font-semibold text-slate-200 transition-all duration-300 hover:bg-white/10">
          Contact Sales
        </button>
      </div>
    </div>
  </motion.section>
);

/* ─── Contact Section (Home Page) ─── */
export const ContactSectionHome = () => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6 }}
    className="mt-28 w-full flex flex-col items-center scroll-mt-24"
  >
    <span className="premium-chip inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-slate-300 mb-6">
      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
      Get in Touch
    </span>

    <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-3">
      Let's Talk
    </h2>
    <p className="text-slate-400 text-center max-w-lg text-sm md:text-base mb-12">
      Have a question, feedback, or want to collaborate? Drop us a message.
    </p>

    <div className="w-full max-w-xl">
      <div
        className="glass-card rounded-2xl p-8"
        style={{
          background:
            "linear-gradient(135deg, rgba(30,30,40,0.9) 0%, rgba(20,18,25,0.95) 50%, rgba(15,15,20,1) 100%)",
        }}
      >
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-300 font-medium">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="premium-input rounded-xl px-4 py-3 text-sm text-slate-100 bg-transparent outline-none placeholder:text-slate-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-300 font-medium">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="premium-input rounded-xl px-4 py-3 text-sm text-slate-100 bg-transparent outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-300 font-medium">Message</label>
            <textarea
              rows={4}
              placeholder="Tell us what you're thinking..."
              className="premium-input rounded-xl px-4 py-3 text-sm text-slate-100 bg-transparent outline-none placeholder:text-slate-500 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-sky-500 to-blue-600 py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/20 hover:-translate-y-0.5"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  </motion.section>
);

/* ─── CTA Section ─── */
export const CTASection = () => (
  <motion.section
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6 }}
    className="mt-28 mb-10 flex items-center justify-center w-full"
  >
    <p
      className="
        text-5xl md:text-7xl
        font-semibold
        text-center
        tracking-tighter
        cursor-pointer
        text-white
        transition-all
        duration-300
        ease-in-out
        hover:underline
        hover:-translate-y-2
      "
    >
      Stop Dreaming.{" "}
      <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
        Start Building.
      </span>
    </p>
  </motion.section>
);
