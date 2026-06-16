import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Sparkles,
  BarChart2,
  MessageCircle,
  Utensils,
  TrendingUp,
  PlusCircle,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

const features = [
  {
    icon: BarChart2,
    emoji: "🏦",
    title: "Budget Dashboard",
    desc: "See your allowance, spending & days left at a glance. Know exactly where you stand every day.",
    color: "from-emerald-500/20 to-emerald-600/10",
    border: "border-emerald-500/30",
  },
  {
    icon: PlusCircle,
    emoji: "📝",
    title: "Expense Logger",
    desc: "Log what you spend in seconds — feeding, data, transport and more. Your full history, always on hand.",
    color: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/30",
  },
  {
    icon: MessageCircle,
    emoji: "👩🏾",
    title: "Coach Ngozi",
    desc: "Your personal AI budget coach. Ask anything, get smart money advice tailored to your spending.",
    color: "from-yellow-500/20 to-yellow-600/10",
    border: "border-yellow-500/30",
  },
  {
    icon: Utensils,
    emoji: "🍛",
    title: "Daily Meal Plan",
    desc: "Affordable meal combos that fit your daily budget — no more guessing what you can afford to eat.",
    color: "from-orange-500/20 to-orange-600/10",
    border: "border-orange-500/30",
  },
  {
    icon: TrendingUp,
    emoji: "📊",
    title: "What-If Simulator",
    desc: "See how small changes — like skipping shawarma — can extend how long your money lasts.",
    color: "from-purple-500/20 to-purple-600/10",
    border: "border-purple-500/30",
  },
];

const steps = [
  { num: "01", title: "Set Your Budget", desc: "Enter your monthly allowance and feeding budget during signup." },
  { num: "02", title: "Log Your Spending", desc: "Tap Log Expense after every purchase — takes under 5 seconds." },
  { num: "03", title: "Get Coached", desc: "Coach Ngozi analyses your habits and tells you exactly what to do." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export function LandingPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0f0a] text-white overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0a0f0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#0B6623] to-[#0B6623]/70 rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#FFD700]" fill="currentColor">
              <path d="M12 2L4 7v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V7l-8-5zm0 10.5l-3.5 2.1.9-4-3.1-2.7 4.1-.4L12 3.5l1.6 3.9 4.1.4-3.1 2.7.9 4-3.5-2.1z"/>
            </svg>
          </div>
          <span className="text-lg font-semibold text-[#0B6623]" style={{ color: "#4ade80" }}>EaglePurse</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-gray-400 hover:text-white transition-colors px-4 py-2"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate(isLoggedIn ? "/dashboard" : "/signup")}
            className="text-sm bg-[#0B6623] hover:bg-[#0B6623]/90 text-white px-4 py-2 rounded-xl transition-colors"
          >
            {isLoggedIn ? "Dashboard" : "Get Started"}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 text-center overflow-hidden">
        {/* Background glow blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#0B6623]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-[#FFD700]/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B6623]/20 border border-[#0B6623]/40 text-emerald-400 text-sm mb-6"
        >
          <Sparkles className="w-4 h-4 text-[#FFD700]" />
          Built for Nigerian University Students
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-4xl mb-6"
        >
          Your student money,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#FFD700]">
            finally under control
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-lg md:text-xl text-gray-400 max-w-xl mb-10"
        >
          EaglePurse tracks your allowance, suggests affordable meals, and
          coaches you on spending — so your money lasts the whole month.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => navigate(isLoggedIn ? "/dashboard" : "/signup")}
            className="group flex items-center justify-center gap-2 px-8 py-4 bg-[#0B6623] hover:bg-[#0B6623]/90 text-white font-semibold rounded-2xl transition-all shadow-lg shadow-[#0B6623]/30 hover:shadow-[#0B6623]/50 hover:scale-105"
          >
            {isLoggedIn ? "Go to Dashboard" : "Get Started — It's Free"}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          {!isLoggedIn && (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center justify-center gap-2 px-8 py-4 border border-white/20 hover:border-white/40 text-gray-300 hover:text-white rounded-2xl transition-all"
            >
              Sign In
            </button>
          )}
        </motion.div>

        {/* Floating stat pills */}
        <div className="flex flex-wrap justify-center gap-4 mt-14">
          {[
            { label: "Budget tracked", value: "₦0 wasted" },
            { label: "AI Coach", value: "Coach Ngozi" },
            { label: "Built at", value: "Bingham University" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-center"
            >
              <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
              <p className="text-sm font-semibold text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-24 max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <p className="text-sm text-emerald-400 font-medium mb-3 uppercase tracking-widest">How It Works</p>
          <h2 className="text-3xl md:text-4xl font-bold">Three steps to money mastery</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/40 transition-colors"
            >
              <span className="text-5xl font-black text-white/10 block mb-3">{step.num}</span>
              <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-gray-400">{step.desc}</p>
              {i < steps.length - 1 && (
                <ChevronRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white/20" />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <p className="text-sm text-emerald-400 font-medium mb-3 uppercase tracking-widest">Everything You Need</p>
          <h2 className="text-3xl md:text-4xl font-bold">Five powerful tools in one app</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              className={`p-6 rounded-2xl bg-gradient-to-br ${f.color} border ${f.border} hover:scale-[1.02] transition-transform cursor-default`}
            >
              <div className="text-3xl mb-4">{f.emoji}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PRIVACY */}
      <section className="px-6 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeUp}
          className="max-w-3xl mx-auto text-center p-10 rounded-3xl bg-gradient-to-br from-[#0B6623]/20 to-transparent border border-[#0B6623]/30"
        >
          <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto mb-5" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Your data stays yours</h2>
          <p className="text-gray-300 text-base leading-relaxed mb-4">
            EaglePurse only stores your <strong className="text-white">email address</strong>,{" "}
            <strong className="text-white">allowance settings</strong>, and{" "}
            <strong className="text-white">spending records</strong> — nothing more.
          </p>
          <p className="text-gray-400 text-sm">
            Your data is <span className="text-emerald-400 font-medium">never sold</span>,{" "}
            <span className="text-emerald-400 font-medium">never shared</span>, and only used to power
            your personal budget insights. You can delete your account at any time.
          </p>
        </motion.div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-24 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to take control?</h2>
          <p className="text-gray-400 mb-8 text-lg">Free to use. Takes 2 minutes to set up.</p>
          <button
            onClick={() => navigate(isLoggedIn ? "/dashboard" : "/signup")}
            className="group inline-flex items-center gap-2 px-10 py-5 bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#1a1a1a] font-bold rounded-2xl transition-all shadow-lg shadow-[#FFD700]/20 hover:scale-105 text-lg"
          >
            {isLoggedIn ? "Go to Dashboard" : "Create Free Account"}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-6 py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-[#0B6623] to-[#0B6623]/70 rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#FFD700]" fill="currentColor">
              <path d="M12 2L4 7v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V7l-8-5zm0 10.5l-3.5 2.1.9-4-3.1-2.7 4.1-.4L12 3.5l1.6 3.9 4.1.4-3.1 2.7.9 4-3.5-2.1z"/>
            </svg>
          </div>
          <span className="text-sm font-semibold" style={{ color: "#4ade80" }}>EaglePurse</span>
        </div>
        <p className="text-xs text-gray-600">v1.0.0 · Bingham University · {new Date().getFullYear()}</p>
        <div className="flex justify-center gap-6 mt-4">
          <button onClick={() => navigate("/login")} className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Sign In</button>
          <button onClick={() => navigate("/signup")} className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Create Account</button>
        </div>
      </footer>
    </div>
  );
}
