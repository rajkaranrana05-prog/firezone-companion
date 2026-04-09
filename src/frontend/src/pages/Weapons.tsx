import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
type Rarity = "Common" | "Rare" | "Epic" | "Legendary";
type Category =
  | "ALL"
  | "RIFLES"
  | "SMGs"
  | "SNIPERS"
  | "SHOTGUNS"
  | "PISTOLS"
  | "MELEE"
  | "LAUNCHERS";
type SortKey = "damage" | "name" | "rarity";

interface WeaponStats {
  damage: number;
  range: number;
  reloadSpeed: number;
  magazineSize: number;
}

interface Weapon {
  id: string;
  name: string;
  category: Exclude<Category, "ALL">;
  rarity: Rarity;
  description: string;
  stats: WeaponStats;
  emoji: string;
}

// ─── Weapon Data ─────────────────────────────────────────────────────────────
const WEAPONS: Weapon[] = [
  // RIFLES
  {
    id: "m4a1",
    name: "M4A1",
    category: "RIFLES",
    rarity: "Legendary",
    description:
      "Elite assault rifle with pinpoint accuracy and devastating fire rate.",
    stats: { damage: 92, range: 85, reloadSpeed: 78, magazineSize: 80 },
    emoji: "🔫",
  },
  {
    id: "ak47",
    name: "AK-47",
    category: "RIFLES",
    rarity: "Epic",
    description:
      "Iconic workhorse — raw stopping power with manageable recoil.",
    stats: { damage: 88, range: 75, reloadSpeed: 65, magazineSize: 70 },
    emoji: "🔫",
  },
  {
    id: "famas",
    name: "FAMAS",
    category: "RIFLES",
    rarity: "Rare",
    description:
      "Burst-fire bullpup with blistering close-to-mid range performance.",
    stats: { damage: 70, range: 68, reloadSpeed: 80, magazineSize: 60 },
    emoji: "🔫",
  },
  {
    id: "groza",
    name: "Groza",
    category: "RIFLES",
    rarity: "Legendary",
    description:
      "High-damage bullpup that shreds through armor at close range.",
    stats: { damage: 96, range: 65, reloadSpeed: 72, magazineSize: 65 },
    emoji: "🔫",
  },
  {
    id: "an94",
    name: "AN94",
    category: "RIFLES",
    rarity: "Epic",
    description:
      "Two-round hyperburst fires before the recoil kicks — clinical at range.",
    stats: { damage: 84, range: 80, reloadSpeed: 68, magazineSize: 72 },
    emoji: "🔫",
  },
  {
    id: "m14",
    name: "M14",
    category: "RIFLES",
    rarity: "Common",
    description:
      "Semi-auto marksman rifle — reliable at medium range for new operatives.",
    stats: { damage: 75, range: 78, reloadSpeed: 60, magazineSize: 50 },
    emoji: "🔫",
  },
  // SMGs
  {
    id: "mp40",
    name: "MP40",
    category: "SMGs",
    rarity: "Legendary",
    description: "Classic wartime legend with unmatched hip-fire dominance.",
    stats: { damage: 78, range: 55, reloadSpeed: 88, magazineSize: 85 },
    emoji: "🔫",
  },
  {
    id: "ump",
    name: "UMP",
    category: "SMGs",
    rarity: "Rare",
    description: "Versatile SMG balanced between mobility and firepower.",
    stats: { damage: 65, range: 58, reloadSpeed: 82, magazineSize: 78 },
    emoji: "🔫",
  },
  {
    id: "thompson",
    name: "Thompson",
    category: "SMGs",
    rarity: "Epic",
    description: "Drum-mag beast that dumps damage at terrifying speed.",
    stats: { damage: 72, range: 50, reloadSpeed: 75, magazineSize: 95 },
    emoji: "🔫",
  },
  {
    id: "p90",
    name: "P90",
    category: "SMGs",
    rarity: "Rare",
    description: "Futuristic bullpup SMG with massive 50-round magazine.",
    stats: { damage: 60, range: 60, reloadSpeed: 85, magazineSize: 98 },
    emoji: "🔫",
  },
  // SNIPERS
  {
    id: "awm",
    name: "AWM",
    category: "SNIPERS",
    rarity: "Legendary",
    description:
      "One-shot kill potential — the apex predator of the battlefield.",
    stats: { damage: 100, range: 100, reloadSpeed: 30, magazineSize: 20 },
    emoji: "🎯",
  },
  {
    id: "kar98k",
    name: "Kar98K",
    category: "SNIPERS",
    rarity: "Epic",
    description: "WW2 bolt-action precision — still deadly in skilled hands.",
    stats: { damage: 90, range: 95, reloadSpeed: 35, magazineSize: 25 },
    emoji: "🎯",
  },
  {
    id: "m82b",
    name: "M82B",
    category: "SNIPERS",
    rarity: "Legendary",
    description:
      "Anti-materiel rifle that penetrates cover and destroys vehicles.",
    stats: { damage: 98, range: 98, reloadSpeed: 25, magazineSize: 18 },
    emoji: "🎯",
  },
  {
    id: "svd",
    name: "SVD",
    category: "SNIPERS",
    rarity: "Rare",
    description: "Semi-auto DMR for follow-up shots at extreme ranges.",
    stats: { damage: 80, range: 90, reloadSpeed: 50, magazineSize: 40 },
    emoji: "🎯",
  },
  // SHOTGUNS
  {
    id: "m1014",
    name: "M1014",
    category: "SHOTGUNS",
    rarity: "Rare",
    description: "Semi-auto shotgun for rapid room-clearing operations.",
    stats: { damage: 82, range: 30, reloadSpeed: 58, magazineSize: 50 },
    emoji: "💥",
  },
  {
    id: "spas12",
    name: "SPAS-12",
    category: "SHOTGUNS",
    rarity: "Epic",
    description: "Pump-action devastator — max spread damage at close range.",
    stats: { damage: 90, range: 25, reloadSpeed: 45, magazineSize: 40 },
    emoji: "💥",
  },
  {
    id: "mag7",
    name: "MAG-7",
    category: "SHOTGUNS",
    rarity: "Common",
    description: "Compact shotgun ideal for fast-entry breach tactics.",
    stats: { damage: 75, range: 28, reloadSpeed: 62, magazineSize: 35 },
    emoji: "💥",
  },
  // PISTOLS
  {
    id: "deagle",
    name: "Desert Eagle",
    category: "PISTOLS",
    rarity: "Rare",
    description: "High-caliber sidearm with one-tap headshot potential.",
    stats: { damage: 70, range: 55, reloadSpeed: 65, magazineSize: 30 },
    emoji: "🔫",
  },
  {
    id: "glock17",
    name: "Glock 17",
    category: "PISTOLS",
    rarity: "Common",
    description: "Reliable starter pistol — consistent and easy to control.",
    stats: { damage: 45, range: 45, reloadSpeed: 75, magazineSize: 55 },
    emoji: "🔫",
  },
  {
    id: "m1873",
    name: "M1873",
    category: "PISTOLS",
    rarity: "Common",
    description: "Old-school revolver with surprising punch in close quarters.",
    stats: { damage: 60, range: 42, reloadSpeed: 40, magazineSize: 20 },
    emoji: "🔫",
  },
  // MELEE
  {
    id: "bat",
    name: "Bat",
    category: "MELEE",
    rarity: "Common",
    description: "Simple but brutal — delivers blunt trauma in silence.",
    stats: { damage: 55, range: 10, reloadSpeed: 100, magazineSize: 100 },
    emoji: "🏏",
  },
  {
    id: "pan",
    name: "Pan",
    category: "MELEE",
    rarity: "Legendary",
    description:
      "The legendary iron skillet — protects your behind and crushes skulls.",
    stats: { damage: 80, range: 10, reloadSpeed: 100, magazineSize: 100 },
    emoji: "🍳",
  },
  {
    id: "katana",
    name: "Katana",
    category: "MELEE",
    rarity: "Epic",
    description: "Razor-sharp blade forged in honor — swift and lethal.",
    stats: { damage: 90, range: 15, reloadSpeed: 100, magazineSize: 100 },
    emoji: "⚔️",
  },
  {
    id: "machete",
    name: "Machete",
    category: "MELEE",
    rarity: "Common",
    description: "Jungle-forged tool of survival — reliable in any terrain.",
    stats: { damage: 65, range: 12, reloadSpeed: 100, magazineSize: 100 },
    emoji: "🗡️",
  },
  // LAUNCHERS
  {
    id: "m79",
    name: "M79",
    category: "LAUNCHERS",
    rarity: "Epic",
    description: "Grenade launcher for devastating area-denial suppression.",
    stats: { damage: 95, range: 70, reloadSpeed: 30, magazineSize: 10 },
    emoji: "💣",
  },
  {
    id: "rpg7",
    name: "RPG-7",
    category: "LAUNCHERS",
    rarity: "Legendary",
    description:
      "Rocket-propelled obliteration — vaporizes vehicles and clusters.",
    stats: { damage: 100, range: 80, reloadSpeed: 20, magazineSize: 5 },
    emoji: "🚀",
  },
];

// ─── Constants ────────────────────────────────────────────────────────────────
const CATEGORIES: Category[] = [
  "ALL",
  "RIFLES",
  "SMGs",
  "SNIPERS",
  "SHOTGUNS",
  "PISTOLS",
  "MELEE",
  "LAUNCHERS",
];

const RARITY_ORDER: Record<Rarity, number> = {
  Legendary: 4,
  Epic: 3,
  Rare: 2,
  Common: 1,
};

const RARITY_STYLES: Record<
  Rarity,
  { badge: string; border: string; glow: string; text: string }
> = {
  Legendary: {
    badge: "bg-amber-500/20 text-amber-400 border border-amber-500/40",
    border: "border-amber-500/60",
    glow: "hover:shadow-[0_0_20px_rgba(251,191,36,0.4)]",
    text: "text-amber-400",
  },
  Epic: {
    badge: "bg-purple-500/20 text-purple-400 border border-purple-500/40",
    border: "border-purple-500/50",
    glow: "hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]",
    text: "text-purple-400",
  },
  Rare: {
    badge: "bg-blue-500/20 text-blue-400 border border-blue-500/40",
    border: "border-blue-500/50",
    glow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]",
    text: "text-blue-400",
  },
  Common: {
    badge: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40",
    border: "border-emerald-500/40",
    glow: "hover:shadow-[0_0_16px_rgba(52,211,153,0.3)]",
    text: "text-emerald-400",
  },
};

// ─── Stat Bar ────────────────────────────────────────────────────────────────
interface StatBarProps {
  label: string;
  value: number;
  color: string;
}

function StatBar({ label, value, color }: StatBarProps) {
  return (
    <div className="space-y-0.5">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className="text-[10px] font-mono text-foreground/70">
          {value}%
        </span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        />
      </div>
    </div>
  );
}

// ─── Weapon Card ─────────────────────────────────────────────────────────────
interface WeaponCardProps {
  weapon: Weapon;
  index: number;
}

function WeaponCard({ weapon, index }: WeaponCardProps) {
  const styles = RARITY_STYLES[weapon.rarity];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.35,
        delay: (index % 6) * 0.07,
        ease: "easeOut",
      }}
      data-ocid={`weapon-card-${weapon.id}`}
      className={`relative bg-card rounded border ${styles.border} ${styles.glow} transition-all duration-300 p-3 flex flex-col gap-2 cursor-pointer group`}
    >
      {/* Top row: emoji + name/category + rarity badge */}
      <div className="flex items-start gap-3">
        <div className="w-14 h-14 flex items-center justify-center text-4xl bg-muted rounded shrink-0 group-hover:scale-110 transition-transform duration-300">
          {weapon.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={`font-display font-bold text-sm uppercase tracking-wide ${styles.text} truncate`}
          >
            {weapon.name}
          </h3>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">
            {weapon.category}
          </p>
          <Badge
            className={`text-[9px] px-1.5 py-0 rounded font-bold uppercase tracking-wider ${styles.badge}`}
          >
            {weapon.rarity}
          </Badge>
        </div>
      </div>

      {/* Description */}
      <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
        {weapon.description}
      </p>

      {/* Stat bars */}
      <div className="space-y-1.5">
        <StatBar
          label="Damage"
          value={weapon.stats.damage}
          color="bg-gradient-to-r from-red-600 to-orange-500"
        />
        <StatBar
          label="Range"
          value={weapon.stats.range}
          color="bg-gradient-to-r from-blue-600 to-sky-400"
        />
        <StatBar
          label="Reload"
          value={weapon.stats.reloadSpeed}
          color="bg-gradient-to-r from-emerald-600 to-green-400"
        />
        <StatBar
          label="Magazine"
          value={weapon.stats.magazineSize}
          color="bg-gradient-to-r from-yellow-600 to-amber-400"
        />
      </div>
    </motion.div>
  );
}

// ─── Weapons Page ─────────────────────────────────────────────────────────────
export default function Weapons() {
  const [activeCategory, setActiveCategory] = useState<Category>("ALL");
  const [sortKey, setSortKey] = useState<SortKey>("damage");

  const filtered = useMemo(() => {
    const list =
      activeCategory === "ALL"
        ? WEAPONS
        : WEAPONS.filter((w) => w.category === activeCategory);

    return [...list].sort((a, b) => {
      if (sortKey === "damage") return b.stats.damage - a.stats.damage;
      if (sortKey === "rarity")
        return RARITY_ORDER[b.rarity] - RARITY_ORDER[a.rarity];
      return a.name.localeCompare(b.name);
    });
  }, [activeCategory, sortKey]);

  return (
    <div className="flex flex-col min-h-full bg-background pb-24">
      {/* Sticky Header */}
      <div className="bg-card border-b border-border px-4 pt-4 pb-3 sticky top-0 z-20">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="font-display font-black text-xl uppercase tracking-widest text-foreground">
              Arsenal
            </h1>
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider">
              {filtered.length} Weapon{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Sort controls */}
          <div className="flex gap-1" data-ocid="sort-controls">
            {(["damage", "name", "rarity"] as SortKey[]).map((key) => (
              <button
                type="button"
                key={key}
                onClick={() => setSortKey(key)}
                data-ocid={`sort-${key}`}
                className={`px-2 py-1 text-[10px] font-mono uppercase tracking-wider rounded border transition-all duration-200 ${
                  sortKey === key
                    ? "bg-primary/20 border-primary text-primary"
                    : "bg-transparent border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Category tabs — horizontal scroll */}
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          data-ocid="category-tabs"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {CATEGORIES.map((cat) => {
            const count =
              cat === "ALL"
                ? WEAPONS.length
                : WEAPONS.filter((w) => w.category === cat).length;
            const isActive = activeCategory === cat;
            return (
              <button
                type="button"
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-ocid={`category-${cat.toLowerCase()}`}
                className={`shrink-0 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded border transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-[0_0_12px_oklch(0.63_0.22_40/0.6)]"
                    : "bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {cat}
                <span
                  className={`ml-1 text-[9px] ${isActive ? "opacity-80" : "opacity-50"}`}
                >
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Weapon Grid */}
      <div className="flex-1 px-3 pt-4">
        {filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-20 gap-3"
            data-ocid="weapons-empty"
          >
            <span className="text-5xl">🔫</span>
            <p className="text-muted-foreground text-sm uppercase tracking-wider">
              No weapons found
            </p>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            data-ocid="weapons-grid"
          >
            {filtered.map((weapon, index) => (
              <WeaponCard key={weapon.id} weapon={weapon} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
