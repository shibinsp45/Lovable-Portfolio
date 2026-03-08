const getCtx = (() => {
  let ctx: AudioContext | null = null;
  return () => {
    if (!ctx) try { ctx = new AudioContext(); } catch { return null; }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  };
})();

function tone(freq: number, dur: number, type: OscillatorType = "sine", vol = 0.08, delay = 0) {
  const ctx = getCtx();
  if (!ctx) return;
  const t = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  gain.gain.setValueAtTime(vol, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
  osc.connect(gain).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + dur);
}

export function useChatSounds() {
  // Soft pop – chat open
  const playOpen = () => {
    tone(480, 0.1, "sine", 0.09);
    tone(640, 0.08, "sine", 0.07, 0.06);
  };

  // Gentle drop – chat close
  const playClose = () => {
    tone(520, 0.08, "sine", 0.06);
    tone(380, 0.1, "sine", 0.05, 0.05);
  };

  // Quick whoosh – message sent
  const playSend = () => {
    tone(600, 0.06, "triangle", 0.05);
    tone(800, 0.05, "triangle", 0.04, 0.03);
  };

  // Soft ding – message received
  const playReceive = () => {
    tone(830, 0.12, "sine", 0.08);
    tone(1050, 0.1, "sine", 0.05, 0.1);
  };

  // Subtle pop – bubble appears
  const playBubble = () => {
    tone(440, 0.1, "sine", 0.06);
  };

  return { playOpen, playClose, playSend, playReceive, playBubble };
}
