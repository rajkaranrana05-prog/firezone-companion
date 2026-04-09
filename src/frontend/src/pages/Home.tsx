import { useNavigate } from "@tanstack/react-router";
import {
  ChevronRight,
  Flame,
  Shield,
  Sword,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Particle {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

// ─── Stat card data ────────────────────────────────────────────────────────────
const STAT_CARDS = [
  {
    icon: Users,
    value: "25+",
    label: "Heroes",
    sub: "Unlockable Characters",
    colorFrom: "rgba(255,106,0,0.12)",
    colorTo: "rgba(255,100,0,0.04)",
    borderColor: "rgba(255,106,0,0.4)",
    glowColor: "rgba(255,106,0,0.35)",
    accentColor: "#ff6a00",
    lineGradient: "linear-gradient(to bottom, #ff6a00, #ff9500)",
    iconBorder: "rgba(255,106,0,0.3)",
  },
  {
    icon: Target,
    value: "40+",
    label: "Weapons",
    sub: "Guns, Blades & More",
    colorFrom: "rgba(255,215,0,0.12)",
    colorTo: "rgba(255,180,0,0.04)",
    borderColor: "rgba(255,215,0,0.4)",
    glowColor: "rgba(255,215,0,0.25)",
    accentColor: "#ffd700",
    lineGradient: "linear-gradient(to bottom, #ffd700, #ffb347)",
    iconBorder: "rgba(255,215,0,0.3)",
  },
  {
    icon: Zap,
    value: "100+",
    label: "Pro Tips",
    sub: "Tactics & Strategies",
    colorFrom: "rgba(239,68,68,0.12)",
    colorTo: "rgba(220,38,38,0.04)",
    borderColor: "rgba(239,68,68,0.4)",
    glowColor: "rgba(220,38,38,0.3)",
    accentColor: "#ef4444",
    lineGradient: "linear-gradient(to bottom, #ef4444, #ff6a00)",
    iconBorder: "rgba(239,68,68,0.3)",
  },
];

const QUICK_NAV = [
  {
    label: "Characters",
    to: "/characters",
    icon: Users,
    accent: "#ff6a00",
    bg: "rgba(255,106,0,0.08)",
    border: "rgba(255,106,0,0.3)",
  },
  {
    label: "Weapons",
    to: "/weapons",
    icon: Sword,
    accent: "#ffd700",
    bg: "rgba(255,215,0,0.08)",
    border: "rgba(255,215,0,0.3)",
  },
  {
    label: "Pro Tips",
    to: "/tips",
    icon: Zap,
    accent: "#ef4444",
    bg: "rgba(239,68,68,0.08)",
    border: "rgba(239,68,68,0.3)",
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles: Particle[] = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 8,
        duration: Math.random() * 6 + 5,
        color: i % 3 === 0 ? "#ffd700" : i % 3 === 1 ? "#ff6a00" : "#ff9040",
      })),
    [],
  );

  return (
    <div
      className="min-h-screen flex flex-col overflow-x-hidden pb-24"
      style={{ backgroundColor: "#0a0a0f" }}
    >
      {/* ── HERO SECTION ─────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#0a0a0f" }}
      >
        {/* Background hero image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/generated/hero-battle.dim_800x1000.jpg"
            alt="FIREZONE battle"
            className="w-full h-full object-cover object-top opacity-50"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, #0a0a0f 0%, transparent 25%, transparent 60%, #0a0a0f 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 30%, #0a0a0f 90%)",
            }}
          />
        </div>

        {/* Floating Particles */}
        {mounted && (
          <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
            {particles.map((p) => (
              <div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  left: `${p.x}%`,
                  bottom: "-10px",
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: p.color,
                  boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                  animation: `float-up ${p.duration}s ${p.delay}s infinite linear`,
                  opacity: 0,
                }}
              />
            ))}
          </div>
        )}

        {/* Fire glow ring */}
        <div
          className="absolute z-10 pointer-events-none"
          style={{
            width: "340px",
            height: "340px",
            borderRadius: "50%",
            boxShadow:
              "0 0 80px 30px rgba(255,106,0,0.35), 0 0 160px 60px rgba(255,100,0,0.15), 0 0 40px 8px rgba(255,200,0,0.2)",
            border: "1px solid rgba(255,106,0,0.2)",
            background:
              "radial-gradient(circle, rgba(255,106,0,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Hero content */}
        <div className="relative z-20 flex flex-col items-center text-center px-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 mb-6"
          >
            <Flame className="w-4 h-4" style={{ color: "#ff9040" }} />
            <span
              className="text-xs font-bold uppercase"
              style={{ color: "#ff9040", letterSpacing: "0.3em" }}
            >
              Game Companion
            </span>
            <Flame className="w-4 h-4" style={{ color: "#ff9040" }} />
          </motion.div>

          {/* FIREZONE title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            className="font-display font-black uppercase leading-none select-none"
            style={{
              fontSize: "clamp(4rem, 18vw, 7rem)",
              letterSpacing: "-0.02em",
              background:
                "linear-gradient(135deg, #ff6a00 0%, #ffb347 40%, #ffd700 70%, #ff6a00 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 30px rgba(255,106,0,0.7))",
            }}
          >
            FIREZONE
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="font-bold uppercase mt-3"
            style={{
              letterSpacing: "0.4em",
              fontSize: "clamp(0.65rem, 3.5vw, 0.85rem)",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            ULTIMATE GAME COMPANION
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-4 mb-8 h-px w-40"
            style={{
              background:
                "linear-gradient(to right, transparent, #ff6a00, #ffd700, #ff6a00, transparent)",
            }}
          />

          {/* Enter Battle CTA */}
          <motion.button
            data-ocid="enter-battle-btn"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.75,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate({ to: "/characters" })}
            className="pulse-glow relative overflow-hidden flex items-center gap-3 px-10 py-4 font-black uppercase text-sm"
            style={{
              background: "linear-gradient(135deg, #ff6a00, #ff9500, #ffd700)",
              color: "#0a0a0f",
              border: "none",
              borderRadius: "2px",
              letterSpacing: "0.15em",
              clipPath:
                "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
            }}
          >
            <Sword className="w-5 h-5" />
            ENTER BATTLE
            <ChevronRight className="w-5 h-5" />
          </motion.button>

          {/* Quick nav links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="flex items-center gap-6 mt-6 text-xs uppercase font-bold"
            style={{ letterSpacing: "0.15em" }}
          >
            {["Characters", "Weapons", "Tips"].map((label) => (
              <motion.button
                key={label}
                whileHover={{ color: "#ff6a00" }}
                onClick={() =>
                  navigate({ to: `/${label.toLowerCase()}` as "/" })
                }
                className="transition-colors duration-200"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {label}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 z-20 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, #0a0a0f)",
          }}
        />
      </section>

      {/* ── STAT CARDS SECTION ───────────────────────────────────────────────── */}
      <section className="relative z-10 px-4 -mt-8 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-1">
            <div
              className="h-1 w-8"
              style={{
                background: "linear-gradient(to right, #ff6a00, #ffd700)",
              }}
            />
            <span
              className="text-xs font-black uppercase"
              style={{ color: "#ff6a00", letterSpacing: "0.25em" }}
            >
              Arsenal Overview
            </span>
          </div>
          <h2
            className="font-black uppercase text-2xl"
            style={{
              color: "rgba(255,255,255,0.95)",
              letterSpacing: "-0.01em",
            }}
          >
            BATTLE STATS
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-3">
          {STAT_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                data-ocid={`stat-card-${card.label.toLowerCase()}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.12,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                whileHover={{ scale: 1.02 }}
                className="relative flex items-center gap-4 p-4"
                style={{
                  background: `linear-gradient(to right, ${card.colorFrom}, ${card.colorTo})`,
                  border: `1px solid ${card.borderColor}`,
                  boxShadow: `0 0 24px ${card.glowColor}`,
                  borderRadius: "2px",
                }}
              >
                {/* Accent line */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1"
                  style={{
                    background: card.lineGradient,
                    borderRadius: "2px 0 0 2px",
                  }}
                />
                <div
                  className="flex-shrink-0 w-12 h-12 flex items-center justify-center"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${card.iconBorder}`,
                    borderRadius: "2px",
                    color: card.accentColor,
                  }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span
                      className="font-black text-2xl leading-none"
                      style={{
                        color: card.accentColor,
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {card.value}
                    </span>
                    <span
                      className="font-black uppercase text-base"
                      style={{
                        color: "rgba(255,255,255,0.9)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {card.label}
                    </span>
                  </div>
                  <p
                    className="text-xs mt-0.5 font-bold uppercase"
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      letterSpacing: "0.2em",
                    }}
                  >
                    {card.sub}
                  </p>
                </div>
                <Shield
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: "rgba(255,255,255,0.08)" }}
                />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── QUICK ACCESS SECTION ─────────────────────────────────────────────── */}
      <section className="px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-5"
        >
          <div className="flex items-center gap-3 mb-1">
            <div
              className="h-1 w-8"
              style={{
                background: "linear-gradient(to right, #ffd700, #ff6a00)",
              }}
            />
            <span
              className="text-xs font-black uppercase"
              style={{ color: "#ffd700", letterSpacing: "0.25em" }}
            >
              Quick Access
            </span>
          </div>
          <h2
            className="font-black uppercase text-2xl"
            style={{
              color: "rgba(255,255,255,0.95)",
              letterSpacing: "-0.01em",
            }}
          >
            EXPLORE
          </h2>
        </motion.div>

        <div className="grid grid-cols-3 gap-3">
          {QUICK_NAV.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                data-ocid={`quick-nav-${item.label.toLowerCase().replace(" ", "-")}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.4,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate({ to: item.to as "/" })}
                className="flex flex-col items-center gap-3 py-5 px-2"
                style={{
                  background: item.bg,
                  border: `1px solid ${item.border}`,
                  boxShadow: `0 0 16px ${item.border}`,
                  borderRadius: "2px",
                }}
              >
                <Icon className="w-7 h-7" style={{ color: item.accent }} />
                <span
                  className="text-xs font-black uppercase"
                  style={{ color: item.accent, letterSpacing: "0.1em" }}
                >
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* ── Particle float-up animation ──────────────────────────────────────── */}
      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          10% { opacity: 0.9; }
          80% { opacity: 0.5; }
          100% {
            transform: translateY(-110vh) scale(0.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
