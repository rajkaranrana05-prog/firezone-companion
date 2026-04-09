import { useGameStore } from "@/store/gameStore";
import { Music2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let oscNodes: OscillatorNode[] = [];
let lfoNode: OscillatorNode | null = null;
let lfoGain: GainNode | null = null;
let isAudioRunning = false;

function buildEpicLoop() {
  if (isAudioRunning) return;
  audioCtx = new AudioContext();
  masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(0.18, audioCtx.currentTime);
  masterGain.connect(audioCtx.destination);

  // Low drone — bass bed (110Hz sawtooth)
  const bass = audioCtx.createOscillator();
  bass.type = "sawtooth";
  bass.frequency.setValueAtTime(110, audioCtx.currentTime);
  const bassGain = audioCtx.createGain();
  bassGain.gain.setValueAtTime(0.28, audioCtx.currentTime);
  bass.connect(bassGain);
  bassGain.connect(masterGain);
  bass.start();
  oscNodes.push(bass);

  // Sub bass — deep rumble
  const sub = audioCtx.createOscillator();
  sub.type = "sine";
  sub.frequency.setValueAtTime(55, audioCtx.currentTime);
  const subGain = audioCtx.createGain();
  subGain.gain.setValueAtTime(0.35, audioCtx.currentTime);
  sub.connect(subGain);
  subGain.connect(masterGain);
  sub.start();
  oscNodes.push(sub);

  // Mid tension note (220Hz sine)
  const mid = audioCtx.createOscillator();
  mid.type = "sine";
  mid.frequency.setValueAtTime(220, audioCtx.currentTime);
  const midGain = audioCtx.createGain();
  midGain.gain.setValueAtTime(0.08, audioCtx.currentTime);
  mid.connect(midGain);
  midGain.connect(masterGain);
  mid.start();
  oscNodes.push(mid);

  // LFO tremolo — creates pulsing intensity
  lfoNode = audioCtx.createOscillator();
  lfoNode.type = "sine";
  lfoNode.frequency.setValueAtTime(1.2, audioCtx.currentTime);
  lfoGain = audioCtx.createGain();
  lfoGain.gain.setValueAtTime(0.06, audioCtx.currentTime);
  lfoNode.connect(lfoGain);
  lfoGain.connect(midGain.gain);
  lfoNode.start();

  // High shimmer — eerie harmonic texture
  const shimmer = audioCtx.createOscillator();
  shimmer.type = "sine";
  shimmer.frequency.setValueAtTime(440, audioCtx.currentTime);
  const shimGain = audioCtx.createGain();
  shimGain.gain.setValueAtTime(0.03, audioCtx.currentTime);
  shimmer.connect(shimGain);
  shimGain.connect(masterGain);
  shimmer.start();
  oscNodes.push(shimmer);

  // Slow pitch LFO on shimmer — unsettling movement
  const shimLfo = audioCtx.createOscillator();
  shimLfo.type = "sine";
  shimLfo.frequency.setValueAtTime(0.15, audioCtx.currentTime);
  const shimLfoGain = audioCtx.createGain();
  shimLfoGain.gain.setValueAtTime(20, audioCtx.currentTime);
  shimLfo.connect(shimLfoGain);
  shimLfoGain.connect(shimmer.frequency);
  shimLfo.start();
  oscNodes.push(shimLfo);

  isAudioRunning = true;
}

function stopEpicLoop() {
  for (const o of oscNodes) {
    try {
      o.stop();
    } catch (_) {
      /* already stopped */
    }
  }
  lfoNode?.stop();
  oscNodes = [];
  lfoNode = null;
  lfoGain = null;
  masterGain = null;
  audioCtx?.close();
  audioCtx = null;
  isAudioRunning = false;
}

export default function MusicPlayer() {
  const { isMusicPlaying, setMusicPlaying } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const hasStarted = useRef(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (isAudioRunning) stopEpicLoop();
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (isMusicPlaying) {
      if (!hasStarted.current || !isAudioRunning) {
        buildEpicLoop();
        hasStarted.current = true;
      } else if (masterGain && audioCtx) {
        masterGain.gain.setTargetAtTime(0.18, audioCtx.currentTime, 0.3);
      }
    } else if (masterGain && audioCtx) {
      masterGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.3);
      setTimeout(() => {
        if (!isMusicPlaying) stopEpicLoop();
      }, 1200);
      hasStarted.current = false;
    }
  }, [isMusicPlaying, mounted]);

  const handleToggle = () => {
    if (!isMusicPlaying && audioCtx?.state === "suspended") {
      audioCtx.resume();
    }
    setMusicPlaying(!isMusicPlaying);
  };

  return (
    <button
      type="button"
      data-ocid="music-player-toggle"
      onClick={handleToggle}
      aria-label={
        isMusicPlaying ? "Pause background music" : "Play background music"
      }
      className={[
        "fixed bottom-24 right-4 z-50 w-12 h-12",
        "flex items-center justify-center",
        "rounded-sm border bg-[#0a0a0f]",
        "transition-smooth",
        isMusicPlaying
          ? "text-orange-500 border-orange-600/70 pulse-glow"
          : "text-muted-foreground border-border hover:text-orange-500 hover:border-orange-600/50",
      ].join(" ")}
    >
      {isMusicPlaying ? (
        <VolumeX size={20} className="animate-pulse" />
      ) : (
        <Music2 size={20} />
      )}
    </button>
  );
}
