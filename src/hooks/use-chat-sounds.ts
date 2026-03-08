const getCtx = (() => {
  let ctx: AudioContext | null = null;
  return () => {
    if (!ctx) try { ctx = new AudioContext(); } catch { return null; }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  };
})();

function tone(freq: number, dur: number, type: OscillatorType = "sine", vol = 0.12) {
  const ctx = getCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  gain.gain.setValueAtTime(vol, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + dur);
}

export function useChatSounds() {
  const playOpen = () => {
    tone(600, 0.12, "sine", 0.1);
    setTimeout(() => tone(900, 0.1, "sine", 0.08), 60);
  };

  const playClose = () => {
    tone(800, 0.12, "sine", 0.08);
    setTimeout(() => tone(500, 0.1, "sine", 0.06), 60);
  };

  const playSend = () => {
    tone(700, 0.08, "triangle", 0.06);
    setTimeout(() => tone(1100, 0.06, "triangle", 0.04), 40);
  };

  const playReceive = () => {
    tone(880, 0.1, "sine", 0.08);
    setTimeout(() => tone(1200, 0.12, "sine", 0.06), 80);
  };

  const playBubble = () => {
    tone(500, 0.15, "sine", 0.07);
  };

  return { playOpen, playClose, playSend, playReceive, playBubble };
}
