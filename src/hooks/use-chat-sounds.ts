const getCtx = (() => {
  let ctx: AudioContext | null = null;
  return () => {
    if (!ctx) try { ctx = new AudioContext(); } catch { return null; }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  };
})();

function tone(freq: number, dur: number, type: OscillatorType = "square", vol = 0.10, delay = 0) {
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
  // Mario power-up / pipe sound – ascending arpeggio
  const playOpen = () => {
    tone(262, 0.08, "square", 0.10, 0);      // C4
    tone(330, 0.08, "square", 0.10, 0.07);    // E4
    tone(392, 0.08, "square", 0.10, 0.14);    // G4
    tone(523, 0.12, "square", 0.10, 0.21);    // C5
    tone(659, 0.10, "square", 0.08, 0.30);    // E5
    tone(784, 0.15, "square", 0.06, 0.37);    // G5
  };

  // Mario pipe-down – descending
  const playClose = () => {
    tone(784, 0.06, "square", 0.08, 0);       // G5
    tone(523, 0.06, "square", 0.08, 0.06);    // C5
    tone(392, 0.06, "square", 0.08, 0.12);    // G4
    tone(262, 0.12, "square", 0.06, 0.18);    // C4
  };

  // Mario fireball – quick rising blip
  const playSend = () => {
    tone(400, 0.04, "square", 0.07, 0);
    tone(600, 0.04, "square", 0.07, 0.03);
    tone(900, 0.04, "square", 0.06, 0.06);
    tone(1200, 0.06, "triangle", 0.05, 0.09);
  };

  // Mario coin sound – classic two-tone ping
  const playReceive = () => {
    tone(988, 0.08, "square", 0.10, 0);       // B5
    tone(1319, 0.30, "square", 0.08, 0.08);   // E6
  };

  // Mario 1-UP – short mushroom pop
  const playBubble = () => {
    tone(330, 0.06, "square", 0.08, 0);       // E4
    tone(392, 0.06, "square", 0.08, 0.06);    // G4
    tone(523, 0.06, "square", 0.08, 0.12);    // C5
    tone(659, 0.10, "square", 0.06, 0.18);    // E5
  };

  return { playOpen, playClose, playSend, playReceive, playBubble };
}
