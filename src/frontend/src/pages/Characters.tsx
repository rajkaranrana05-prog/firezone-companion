import { Input } from "@/components/ui/input";
import { useGameStore } from "@/store/gameStore";
import { Search, Star, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = "Healer" | "Fighter" | "Support" | "Scout" | "Tank" | "Assassin";
type Rarity = "Common" | "Rare" | "Epic" | "Legendary";

interface Character {
  id: string;
  name: string;
  role: Role;
  rarity: Rarity;
  ability: string;
  abilityDescription: string;
  stats: { hp: number; speed: number; agility: number };
  emoji: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CHARACTERS: Character[] = [
  {
    id: "alok",
    name: "Alok (DJ)",
    role: "Healer",
    rarity: "Legendary",
    ability: "Drop the Beat",
    abilityDescription:
      "Creates a 5m aura that boosts movement speed 15% and restores 5 HP/s for 10s.",
    stats: { hp: 72, speed: 78, agility: 80 },
    emoji: "🎧",
  },
  {
    id: "chrono",
    name: "Chrono",
    role: "Tank",
    rarity: "Legendary",
    ability: "Time Turner",
    abilityDescription:
      "Creates a force field that blocks 600 damage while allowing fire outward.",
    stats: { hp: 90, speed: 65, agility: 60 },
    emoji: "⏱️",
  },
  {
    id: "wukong",
    name: "Wukong",
    role: "Assassin",
    rarity: "Epic",
    ability: "Camouflage",
    abilityDescription:
      "Transforms into a bush and stealth — breaks when attacking or taking damage.",
    stats: { hp: 75, speed: 82, agility: 88 },
    emoji: "🐒",
  },
  {
    id: "kelly",
    name: "Kelly",
    role: "Scout",
    rarity: "Common",
    ability: "Dash",
    abilityDescription:
      "Increases sprinting speed by 6% — Awakening upgrade one-shots sprinting enemies.",
    stats: { hp: 60, speed: 95, agility: 90 },
    emoji: "⚡",
  },
  {
    id: "hayato",
    name: "Hayato",
    role: "Fighter",
    rarity: "Epic",
    ability: "Bushido",
    abilityDescription:
      "Every 10% decrease in max HP increases armor penetration by 7.5%.",
    stats: { hp: 85, speed: 70, agility: 72 },
    emoji: "⚔️",
  },
  {
    id: "moco",
    name: "Moco",
    role: "Scout",
    rarity: "Epic",
    ability: "Hacker's Eye",
    abilityDescription:
      "Tags enemies shot, sharing their info to the entire team for 2 seconds.",
    stats: { hp: 58, speed: 80, agility: 85 },
    emoji: "👾",
  },
  {
    id: "jota",
    name: "Jota",
    role: "Fighter",
    rarity: "Rare",
    ability: "Sustained Raids",
    abilityDescription:
      "Instantly restores 40 HP upon eliminating an enemy with a firearm.",
    stats: { hp: 80, speed: 74, agility: 70 },
    emoji: "🔫",
  },
  {
    id: "skyler",
    name: "Skyler",
    role: "Fighter",
    rarity: "Legendary",
    ability: "Riptide Rhythm",
    abilityDescription:
      "Sonic wave destroys gloo walls in range and boosts HP recovery from gloo walls.",
    stats: { hp: 82, speed: 72, agility: 68 },
    emoji: "🌊",
  },
  {
    id: "antonio",
    name: "Antonio",
    role: "Tank",
    rarity: "Rare",
    ability: "Gangster's Spirit",
    abilityDescription:
      "Starts every match with a bonus 35 HP on top of base max HP.",
    stats: { hp: 95, speed: 60, agility: 55 },
    emoji: "🛡️",
  },
  {
    id: "notora",
    name: "Notora",
    role: "Healer",
    rarity: "Rare",
    ability: "Racer's Blessing",
    abilityDescription:
      "Restores 5 HP every 4 seconds to all vehicle passengers including self.",
    stats: { hp: 70, speed: 65, agility: 62 },
    emoji: "🏍️",
  },
  {
    id: "paloma",
    name: "Paloma",
    role: "Support",
    rarity: "Common",
    ability: "Arms-dealing",
    abilityDescription:
      "AR ammo doesn't take up inventory space — carry unlimited assault rifle rounds.",
    stats: { hp: 65, speed: 70, agility: 68 },
    emoji: "🎒",
  },
  {
    id: "misha",
    name: "Misha",
    role: "Scout",
    rarity: "Rare",
    ability: "Turbo Witch",
    abilityDescription:
      "Increases driving speed 10% and grants immunity to vehicle collision damage.",
    stats: { hp: 58, speed: 88, agility: 80 },
    emoji: "🚗",
  },
  {
    id: "ford",
    name: "Ford",
    role: "Tank",
    rarity: "Common",
    ability: "Iron Will",
    abilityDescription: "Reduces damage taken outside the safe zone by 24%.",
    stats: { hp: 92, speed: 58, agility: 52 },
    emoji: "🪖",
  },
  {
    id: "maxim",
    name: "Maxim",
    role: "Support",
    rarity: "Common",
    ability: "Gluttony",
    abilityDescription:
      "Boosts mushroom eating speed 20% and reduces medkit use time by 25%.",
    stats: { hp: 75, speed: 62, agility: 60 },
    emoji: "🍄",
  },
  {
    id: "shani",
    name: "Shani",
    role: "Support",
    rarity: "Epic",
    ability: "Gear Recycle",
    abilityDescription:
      "Killing an enemy restores 30 points of armor durability instantly.",
    stats: { hp: 72, speed: 65, agility: 68 },
    emoji: "🔧",
  },
  {
    id: "caroline",
    name: "Caroline",
    role: "Fighter",
    rarity: "Rare",
    ability: "Agility",
    abilityDescription:
      "Increases movement speed by 8% while holding a shotgun in close quarters.",
    stats: { hp: 68, speed: 85, agility: 88 },
    emoji: "💥",
  },
  {
    id: "miguel",
    name: "Miguel",
    role: "Fighter",
    rarity: "Rare",
    ability: "Crazy Slayer",
    abilityDescription:
      "Gains 80 EP per kill — perfect for relentless aggressive combat styles.",
    stats: { hp: 78, speed: 72, agility: 75 },
    emoji: "🥊",
  },
  {
    id: "olivia",
    name: "Olivia",
    role: "Healer",
    rarity: "Common",
    ability: "Healing Touch",
    abilityDescription:
      "Revived teammates gain an extra 30 HP on top of normal revive amount.",
    stats: { hp: 68, speed: 60, agility: 62 },
    emoji: "💊",
  },
  {
    id: "rafael",
    name: "Rafael",
    role: "Assassin",
    rarity: "Epic",
    ability: "Dead Silent",
    abilityDescription:
      "Makes sniper and marksman rifles silenced — enemies can't hear your shots.",
    stats: { hp: 65, speed: 75, agility: 82 },
    emoji: "🎯",
  },
  {
    id: "laura",
    name: "Laura",
    role: "Scout",
    rarity: "Rare",
    ability: "Sharp Shooter",
    abilityDescription:
      "Increases accuracy by 30% while scoped in with any ranged weapon.",
    stats: { hp: 62, speed: 72, agility: 78 },
    emoji: "🔭",
  },
  {
    id: "andrew",
    name: "Andrew",
    role: "Tank",
    rarity: "Common",
    ability: "Armor Specialist",
    abilityDescription:
      "Reduces armor damage by 12% — armor lasts significantly longer in battles.",
    stats: { hp: 88, speed: 58, agility: 55 },
    emoji: "🦾",
  },
  {
    id: "kla",
    name: "Kla",
    role: "Fighter",
    rarity: "Rare",
    ability: "Muay Thai",
    abilityDescription:
      "Increases fist damage by 400% — punch enemies for massive burst damage.",
    stats: { hp: 82, speed: 78, agility: 85 },
    emoji: "🥋",
  },
  {
    id: "nikita",
    name: "Nikita",
    role: "Fighter",
    rarity: "Common",
    ability: "Firearms Expert",
    abilityDescription:
      "Increases SMG reload speed by 24% — ideal for spray-and-pray playstyles.",
    stats: { hp: 75, speed: 72, agility: 70 },
    emoji: "🔩",
  },
  {
    id: "dasha",
    name: "Dasha",
    role: "Support",
    rarity: "Epic",
    ability: "Partying On",
    abilityDescription:
      "Reduces max recoil 10%, recoil build-up 32%, and fall damage by 30%.",
    stats: { hp: 70, speed: 68, agility: 72 },
    emoji: "🎪",
  },
  {
    id: "xayne",
    name: "Xayne",
    role: "Fighter",
    rarity: "Legendary",
    ability: "Xtreme Encounter",
    abilityDescription:
      "Gains 80 temp HP and 100% damage bonus to gloo walls and shields for 15s.",
    stats: { hp: 88, speed: 76, agility: 80 },
    emoji: "🔥",
  },
];

const ROLES: Array<"All" | Role> = [
  "All",
  "Healer",
  "Fighter",
  "Support",
  "Scout",
  "Tank",
  "Assassin",
];

// ─── Style Maps ───────────────────────────────────────────────────────────────

const rarityBorder: Record<Rarity, string> = {
  Common: "border-[oklch(0.45_0_0)]",
  Rare: "border-[oklch(0.5_0.15_250)]",
  Epic: "border-[oklch(0.52_0.2_290)]",
  Legendary: "border-[oklch(0.72_0.18_85)]",
};

const rarityBadge: Record<Rarity, string> = {
  Common:
    "bg-[oklch(0.28_0_0)] text-[oklch(0.65_0_0)] border border-[oklch(0.4_0_0)]",
  Rare: "bg-[oklch(0.2_0.1_250)] text-[oklch(0.68_0.15_250)] border border-[oklch(0.42_0.15_250)]",
  Epic: "bg-[oklch(0.18_0.1_290)] text-[oklch(0.72_0.2_290)] border border-[oklch(0.48_0.2_290)]",
  Legendary:
    "bg-[oklch(0.22_0.1_85)] text-[oklch(0.88_0.18_90)] border border-[oklch(0.68_0.18_85)]",
};

const rarityHoverGlow: Record<Rarity, string> = {
  Common: "hover:shadow-[0_0_10px_oklch(0.45_0_0/0.3)]",
  Rare: "hover:shadow-[0_0_16px_oklch(0.52_0.15_250/0.5)]",
  Epic: "hover:shadow-[0_0_18px_oklch(0.55_0.2_290/0.55)]",
  Legendary: "hover:shadow-[0_0_22px_oklch(0.72_0.18_85/0.6)]",
};

const roleBadge: Record<Role, string> = {
  Healer:
    "bg-[oklch(0.2_0.1_150)] text-[oklch(0.68_0.18_150)] border border-[oklch(0.42_0.15_150)]",
  Fighter:
    "bg-[oklch(0.2_0.1_22)] text-[oklch(0.72_0.2_22)] border border-[oklch(0.48_0.15_22)]",
  Support:
    "bg-[oklch(0.2_0.08_240)] text-[oklch(0.7_0.15_240)] border border-[oklch(0.42_0.12_240)]",
  Scout:
    "bg-[oklch(0.2_0.1_180)] text-[oklch(0.68_0.18_180)] border border-[oklch(0.42_0.15_180)]",
  Tank: "bg-[oklch(0.22_0.04_0)] text-[oklch(0.78_0.04_0)] border border-[oklch(0.42_0.04_0)]",
  Assassin:
    "bg-[oklch(0.18_0.08_310)] text-[oklch(0.68_0.18_310)] border border-[oklch(0.42_0.15_310)]",
};

// ─── StatBar ─────────────────────────────────────────────────────────────────

function StatBar({
  label,
  value,
  delay,
}: { label: string; value: number; delay: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-12 text-[9px] font-bold uppercase tracking-wider text-muted-foreground shrink-0">
        {label}
      </span>
      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.7, ease: "easeOut", delay }}
        />
      </div>
      <span className="w-7 text-[9px] font-mono text-right text-muted-foreground">
        {value}
      </span>
    </div>
  );
}

// ─── CharacterCard ────────────────────────────────────────────────────────────

function CharacterCard({ char, index }: { char: Character; index: number }) {
  const toggleFavorite = useGameStore((s) => s.toggleFavorite);
  const isFav = useGameStore((s) => s.isFavorite(char.id));
  const baseDelay = index * 0.045;

  return (
    <motion.div
      data-ocid={`character-card-${char.id}`}
      initial={{ opacity: 0, y: 28, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: baseDelay,
        ease: [0.34, 1.1, 0.64, 1],
      }}
      className={[
        "relative flex flex-col rounded-lg border-2 bg-card overflow-hidden",
        "transition-all duration-300",
        isFav
          ? "border-primary shadow-[0_0_24px_oklch(0.63_0.22_40/0.75)] pulse-glow"
          : [rarityBorder[char.rarity], rarityHoverGlow[char.rarity]].join(" "),
      ].join(" ")}
    >
      {/* Favorite button */}
      <button
        type="button"
        data-ocid={`fav-btn-${char.id}`}
        aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        onClick={() => toggleFavorite(char.id)}
        className="absolute top-2 right-2 z-10 p-1 rounded-full transition-smooth hover:scale-125 active:scale-95"
      >
        <Star
          size={14}
          className={
            isFav ? "fill-primary text-primary" : "text-muted-foreground"
          }
        />
      </button>

      {/* Avatar area */}
      <div className="relative flex items-center justify-center h-[72px] bg-gradient-to-b from-[oklch(0.17_0_0)] to-card">
        <span className="text-4xl select-none">{char.emoji}</span>
        <span
          className={`absolute top-2 left-2 text-[8px] font-black tracking-widest px-1.5 py-0.5 rounded ${rarityBadge[char.rarity]}`}
        >
          {char.rarity.toUpperCase()}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-2.5 flex-1">
        {/* Name */}
        <h3 className="font-display font-black text-[12px] text-foreground uppercase tracking-wide leading-tight truncate pr-3">
          {char.name}
        </h3>

        {/* Role badge */}
        <span
          className={`self-start text-[8px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider ${roleBadge[char.role]}`}
        >
          {char.role}
        </span>

        {/* Ability */}
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1">
            <Zap size={9} className="text-primary shrink-0" />
            <span className="text-[10px] font-bold text-primary truncate">
              {char.ability}
            </span>
          </div>
          <p className="text-[9px] text-muted-foreground leading-relaxed line-clamp-3">
            {char.abilityDescription}
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-1.5 mt-auto pt-2 border-t border-border">
          <StatBar label="HP" value={char.stats.hp} delay={baseDelay + 0.1} />
          <StatBar
            label="Speed"
            value={char.stats.speed}
            delay={baseDelay + 0.15}
          />
          <StatBar
            label="Agility"
            value={char.stats.agility}
            delay={baseDelay + 0.2}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Characters() {
  const [search, setSearch] = useState("");
  const [activeRole, setActiveRole] = useState<"All" | Role>("All");

  const filtered = useMemo(() => {
    return CHARACTERS.filter((c) => {
      const matchesRole = activeRole === "All" || c.role === activeRole;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.ability.toLowerCase().includes(q);
      return matchesRole && matchesSearch;
    });
  }, [search, activeRole]);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Sticky header */}
      <div className="sticky top-0 z-20 bg-card border-b border-border shadow-md">
        <div className="px-4 pt-4 pb-2">
          <motion.h1
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="font-display font-black text-xl uppercase tracking-widest text-foreground"
          >
            ⚔️ Character Roster
          </motion.h1>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            {CHARACTERS.length} operatives available
          </p>
        </div>

        {/* Search input */}
        <div className="px-4 pb-2">
          <div className="relative">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <Input
              data-ocid="character-search"
              placeholder="Search name or ability..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-8 text-xs bg-muted border-border focus:border-primary"
            />
          </div>
        </div>

        {/* Role filter row */}
        <div
          data-ocid="role-filter-bar"
          className="flex gap-1.5 px-4 pb-3 overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {ROLES.map((role) => (
            <button
              type="button"
              key={role}
              data-ocid={`filter-${role.toLowerCase()}`}
              onClick={() => setActiveRole(role)}
              className={[
                "shrink-0 px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider transition-all duration-200",
                activeRole === role
                  ? "bg-primary text-primary-foreground shadow-[0_0_12px_oklch(0.63_0.22_40/0.55)]"
                  : "bg-muted text-muted-foreground hover:bg-muted/60 hover:text-foreground",
              ].join(" ")}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      <div className="px-4 py-1.5">
        <span className="text-[10px] text-muted-foreground">
          {filtered.length} operative{filtered.length !== 1 ? "s" : ""} found
        </span>
      </div>

      {/* Character grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 px-4">
          {filtered.map((char, i) => (
            <CharacterCard key={char.id} char={char} index={i} />
          ))}
        </div>
      ) : (
        <motion.div
          data-ocid="characters-empty-state"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 gap-3 px-4"
        >
          <span className="text-5xl">🔍</span>
          <p className="font-display font-black text-sm uppercase tracking-wider text-foreground">
            No operatives found
          </p>
          <p className="text-muted-foreground text-xs text-center max-w-xs">
            Try adjusting your search query or switching role filters.
          </p>
          <button
            type="button"
            data-ocid="clear-filters-btn"
            onClick={() => {
              setSearch("");
              setActiveRole("All");
            }}
            className="mt-2 px-4 py-2 rounded bg-primary text-primary-foreground text-xs font-black uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95"
          >
            Clear Filters
          </button>
        </motion.div>
      )}
    </div>
  );
}
