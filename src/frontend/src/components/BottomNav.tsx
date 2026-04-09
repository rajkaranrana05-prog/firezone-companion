import { useGameStore } from "@/store/gameStore";
import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Home, Sword, Users } from "lucide-react";

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  tab: string;
}

const navItems: NavItem[] = [
  { path: "/", label: "Home", icon: Home, tab: "home" },
  { path: "/characters", label: "Fighters", icon: Users, tab: "characters" },
  { path: "/weapons", label: "Arsenal", icon: Sword, tab: "weapons" },
  { path: "/tips", label: "Tactics", icon: BookOpen, tab: "tips" },
];

export default function BottomNav() {
  const { setTab } = useGameStore();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <nav
      data-ocid="bottom-nav"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#0a0a0f] border-t border-orange-600/30"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch h-16">
        {navItems.map(({ path, label, icon: Icon, tab }) => {
          const isActive =
            path === "/" ? currentPath === "/" : currentPath.startsWith(path);
          return (
            <Link
              key={path}
              to={path}
              onClick={() => setTab(tab)}
              data-ocid={`nav-${tab}`}
              className={[
                "flex-1 flex flex-col items-center justify-center gap-0.5",
                "text-xs font-display tracking-wider uppercase transition-smooth",
                "relative overflow-hidden",
                isActive
                  ? "text-orange-500"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-orange-500 rounded-full" />
              )}
              <Icon
                size={20}
                className={
                  isActive
                    ? "drop-shadow-[0_0_6px_theme(colors.orange.500)]"
                    : ""
                }
              />
              <span className="text-[10px] leading-none">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
