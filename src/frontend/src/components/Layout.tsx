import BottomNav from "@/components/BottomNav";
import MusicPlayer from "@/components/MusicPlayer";
import { Outlet } from "@tanstack/react-router";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-foreground flex flex-col font-body">
      {/* Top header bar */}
      <header className="sticky top-0 z-30 bg-card border-b border-orange-600/20 shadow-sm">
        <div className="flex items-center justify-between px-4 h-12">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full pulse-glow" />
            <span className="font-display text-sm font-bold tracking-[0.2em] uppercase text-foreground">
              Free<span className="text-primary">Fire</span>
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">
              Season 12
            </span>
            <span className="ml-2 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-primary text-primary-foreground rounded-sm">
              Live
            </span>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 pb-16 overflow-x-hidden">
        <Outlet />
      </main>

      {/* Floating music toggle */}
      <MusicPlayer />

      {/* Fixed bottom navigation */}
      <BottomNav />
    </div>
  );
}
