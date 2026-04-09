import { Crosshair, MapPin, Package, Shield, Users } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Tip = {
  text: string;
  featured?: boolean;
};

type Category = {
  id: string;
  label: string;
  icon: React.ReactNode;
  tips: Tip[];
};

const CATEGORIES: Category[] = [
  {
    id: "survival",
    label: "Survival",
    icon: <Shield size={18} />,
    tips: [
      { text: "Land in less populated zones early game", featured: true },
      { text: "Always keep a medkit" },
      { text: "Use tall grass and bushes for cover" },
      { text: "Move with the zone — never wait until last second" },
      { text: "Avoid open fields without cover" },
      { text: "Loot quickly and relocate" },
      { text: "Listen for footsteps to detect enemies" },
      { text: "Keep vehicles for quick zone rotations" },
    ],
  },
  {
    id: "combat",
    label: "Combat",
    icon: <Crosshair size={18} />,
    tips: [
      { text: "Crouch while shooting for accuracy", featured: true },
      { text: "Use grenades to flush campers" },
      { text: "Aim for headshots — they deal double damage" },
      { text: "Heal between fights using corners" },
      { text: "Third-partying weakened squads is valid strategy" },
      { text: "Use smoke grenades to revive teammates" },
      { text: "Never reload in the open" },
    ],
  },
  {
    id: "team",
    label: "Team Play",
    icon: <Users size={18} />,
    tips: [
      { text: "Communicate zone positions constantly", featured: true },
      { text: "Never leave a knocked teammate" },
      { text: "Share ammo and medkits proactively" },
      { text: "Have one designated driver" },
      { text: "Assign roles (scout/fragger/support)" },
      { text: "Rush with numbers advantage" },
    ],
  },
  {
    id: "zone",
    label: "Zone",
    icon: <MapPin size={18} />,
    tips: [
      { text: "Be inside the zone before it closes fully", featured: true },
      { text: "Anticipate next zone from map center" },
      { text: "Cross dangerous zones in vehicles" },
      { text: "Use zone shrink to force enemies into your sights" },
      { text: "Stock up heals before final zones" },
      { text: "Position uphill in final ring" },
    ],
  },
  {
    id: "loadout",
    label: "Loadout",
    icon: <Package size={18} />,
    tips: [
      { text: "AR + Sniper is the meta combo", featured: true },
      { text: "Always carry 2x scope minimum" },
      { text: "M1014 dominates close quarters" },
      { text: "Pan blocks rear-facing bullets" },
      { text: "Grenades are underrated — carry 3" },
      { text: "Gloo Walls save lives in the open" },
      { text: "Swap weapon classes between zones" },
    ],
  },
];

const ICON_COLOR: Record<string, string> = {
  survival: "#ff6a00",
  combat: "#ff3c00",
  team: "#ff9f00",
  zone: "#ffd700",
  loadout: "#ff6a00",
};

export default function Tips() {
  const [activeId, setActiveId] = useState(CATEGORIES[0].id);

  const activeCategory = CATEGORIES.find((c) => c.id === activeId)!;
  const iconColor = ICON_COLOR[activeId];

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 flex flex-col">
      {/* Top Banner */}
      <div
        className="relative overflow-hidden px-4 pt-5 pb-4"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.15 0.04 40) 0%, oklch(0.08 0 0) 100%)",
          borderBottom: "1px solid oklch(0.63 0.22 40 / 0.4)",
        }}
      >
        {/* Decorative fire sparks */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          {(["a", "b", "c", "d", "e", "f"] as const).map((id, i) => (
            <motion.div
              key={id}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: i % 2 === 0 ? "#ff6a00" : "#ffd700",
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 20}%`,
                opacity: 0.7,
              }}
              animate={{ y: [-4, -12, -4], opacity: [0.7, 0.2, 0.7] }}
              transition={{
                duration: 1.4 + i * 0.3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center relative z-10"
        >
          <p className="text-xs tracking-[0.3em] text-muted-foreground font-mono uppercase mb-1">
            🔥 Battlefield Intelligence 🔥
          </p>
          <h1
            className="text-3xl font-display font-black uppercase tracking-widest"
            style={{
              color: "#ffd700",
              textShadow:
                "0 0 20px oklch(0.88 0.18 90 / 0.8), 0 0 40px oklch(0.63 0.22 40 / 0.5)",
            }}
          >
            PRO TIPS
          </h1>
          <p className="text-xs text-muted-foreground mt-1 font-mono tracking-widest uppercase">
            Master every situation
          </p>
        </motion.div>
      </div>

      {/* Category Tab Bar */}
      <div
        className="sticky top-0 z-20 flex overflow-x-auto gap-1 px-2 py-2"
        style={{
          background: "oklch(0.1 0 0 / 0.97)",
          borderBottom: "1px solid oklch(0.18 0 0)",
          backdropFilter: "blur(8px)",
        }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = cat.id === activeId;
          return (
            <button
              type="button"
              key={cat.id}
              data-ocid={`tab-${cat.id}`}
              onClick={() => setActiveId(cat.id)}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-sm text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200"
              style={{
                background: isActive
                  ? "oklch(0.63 0.22 40 / 0.18)"
                  : "transparent",
                color: isActive ? ICON_COLOR[cat.id] : "oklch(0.55 0 0)",
                border: isActive
                  ? `1px solid ${ICON_COLOR[cat.id]}80`
                  : "1px solid transparent",
                boxShadow: isActive
                  ? `0 0 12px ${ICON_COLOR[cat.id]}40`
                  : "none",
              }}
              aria-label={`Filter by ${cat.label}`}
            >
              <span
                style={{
                  color: isActive ? ICON_COLOR[cat.id] : "oklch(0.45 0 0)",
                }}
              >
                {cat.icon}
              </span>
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Tips List */}
      <div className="flex-1 px-4 pt-4">
        {/* Section header */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeId}-header`}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 mb-4"
          >
            <span style={{ color: iconColor }}>{activeCategory.icon}</span>
            <h2
              className="text-sm font-mono font-black uppercase tracking-[0.2em]"
              style={{ color: iconColor }}
            >
              {activeCategory.label}
            </h2>
            <span className="ml-auto text-xs font-mono text-muted-foreground">
              {activeCategory.tips.length} TIPS
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Tips */}
        <AnimatePresence mode="wait">
          <motion.ol
            key={`${activeId}-list`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col gap-3"
          >
            {activeCategory.tips.map((tip, index) => {
              const isFeatured = tip.featured === true;
              return (
                <motion.li
                  key={tip.text}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.06,
                    duration: 0.28,
                    ease: "easeOut",
                  }}
                  className="flex items-start gap-3 rounded-sm px-4 py-3 relative overflow-hidden"
                  style={{
                    background: isFeatured
                      ? "oklch(0.14 0.03 90 / 0.6)"
                      : "oklch(0.12 0 0 / 0.8)",
                    border: isFeatured
                      ? "1px solid oklch(0.88 0.18 90 / 0.6)"
                      : "1px solid oklch(0.18 0 0)",
                    boxShadow: isFeatured
                      ? "0 0 18px oklch(0.88 0.18 90 / 0.25), inset 0 0 12px oklch(0.88 0.18 90 / 0.05)"
                      : "none",
                  }}
                  data-ocid={`tip-${activeId}-${index}`}
                >
                  {/* Featured accent strip */}
                  {isFeatured && (
                    <div
                      className="absolute left-0 top-0 bottom-0 w-[3px]"
                      style={{
                        background: "#ffd700",
                        boxShadow: "0 0 10px #ffd700aa",
                      }}
                    />
                  )}

                  {/* Number badge */}
                  <span
                    className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-sm text-xs font-mono font-black"
                    style={{
                      background: isFeatured
                        ? "oklch(0.88 0.18 90 / 0.2)"
                        : "oklch(0.63 0.22 40 / 0.15)",
                      color: isFeatured ? "#ffd700" : iconColor,
                      border: isFeatured
                        ? "1px solid oklch(0.88 0.18 90 / 0.4)"
                        : `1px solid ${iconColor}50`,
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {isFeatured && (
                      <p
                        className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-0.5"
                        style={{ color: "#ffd700" }}
                      >
                        ⭐ Featured Tip
                      </p>
                    )}
                    <p
                      className="text-sm leading-snug break-words"
                      style={{
                        color: isFeatured
                          ? "oklch(0.92 0 0)"
                          : "oklch(0.80 0 0)",
                        fontWeight: isFeatured ? 600 : 400,
                      }}
                    >
                      {tip.text}
                    </p>
                  </div>

                  {/* Category icon accent */}
                  <span
                    className="flex-shrink-0 opacity-30"
                    style={{ color: isFeatured ? "#ffd700" : iconColor }}
                  >
                    {activeCategory.icon}
                  </span>
                </motion.li>
              );
            })}
          </motion.ol>
        </AnimatePresence>

        {/* Footer label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs font-mono text-muted-foreground mt-8 mb-2 tracking-widest uppercase"
        >
          — Dominate the battlefield —
        </motion.p>
      </div>
    </div>
  );
}
