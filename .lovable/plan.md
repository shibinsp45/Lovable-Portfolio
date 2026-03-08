

# Add Sound Effects to Soul Chatbot

Use the Web Audio API to generate lightweight synthesized sounds — no external files or API calls needed.

## Sounds to Add
1. **Chat open** — soft ascending tone (pop/bubble)
2. **Chat close** — soft descending tone
3. **Message sent** — quick subtle "whoosh"
4. **Message received** — gentle notification ping
5. **Bubble popup** — soft pop when the greeting bubble appears

## Implementation

Create a `useChatSounds` hook using `AudioContext` and `OscillatorNode` to synthesize short tones with gain envelopes. Each sound is a small function that creates an oscillator, plays briefly, and auto-cleans up.

### Where sounds trigger in `SoulChatbot.tsx`:
- **Open/close**: In the floating button `onClick` and header close button
- **Send**: At the start of `sendMessage()`
- **Receive**: In `streamChat`'s `onDone` callback
- **Bubble**: When `showBubble` becomes true (in the scroll effect)

No new dependencies required. Pure Web Audio API with graceful fallback (sounds won't block if AudioContext is unavailable).

