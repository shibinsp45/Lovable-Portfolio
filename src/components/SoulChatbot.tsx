import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, ArrowDown } from "lucide-react";
import soulIcon from "@/assets/soul-icon.jpg";
import ReactMarkdown from "react-markdown";
import { useChatSounds } from "@/hooks/use-chat-sounds";
import { MessageSquare, Linkedin, Instagram, FileText } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const contactChips = [
  { label: "WhatsApp", icon: MessageSquare, url: "https://wa.me/918606129072" },
  { label: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/shibinsp45/" },
  { label: "Instagram", icon: Instagram, url: "https://www.instagram.com/shibin_sp45/" },
  { label: "Resume", icon: FileText, url: "https://drive.google.com/drive/folders/1FMTzFedlti8jhFb-k_y83SzHGbcjUjvF" },
];

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/soul-chat`;

const quickQuestions = [
  "What do you do?",
  "Tell me about your projects",
  "What are your skills?",
  "How to contact you?",
  "Where have you worked?",
  "Show his resume",
];

const followUpSuggestions: Record<string, string[]> = {
  default: ["Your skills?", "Show resume", "Contact info"],
  projects: ["Tell me more", "Which is your favorite?", "Any recent work?"],
  skills: ["Your projects?", "Where did you work?", "Show resume"],
  contact: ["WhatsApp number?", "LinkedIn?", "Instagram?"],
  work: ["Current role?", "Your projects?", "Skills you use?"],
  resume: ["Your projects?", "Contact info", "Tell me about yourself"],
};

function getSuggestions(lastAssistantMsg: string): string[] {
  const lower = lastAssistantMsg.toLowerCase();
  if (lower.includes("project") || lower.includes("fudit") || lower.includes("invoice") || lower.includes("groplan")) return followUpSuggestions.projects;
  if (lower.includes("figma") || lower.includes("skill") || lower.includes("design system")) return followUpSuggestions.skills;
  if (lower.includes("mail") || lower.includes("email") || lower.includes("whatsapp") || lower.includes("contact")) return followUpSuggestions.contact;
  if (lower.includes("webcastle") || lower.includes("nuren") || lower.includes("kreative") || lower.includes("work")) return followUpSuggestions.work;
  if (lower.includes("resume") || lower.includes("drive.google")) return followUpSuggestions.resume;
  return followUpSuggestions.default;
}

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Message[];
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (msg: string) => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (!resp.ok) {
    const data = await resp.json().catch(() => null);
    onError(data?.error || "Something went wrong. Please try again.");
    return;
  }

  if (!resp.body) {
    onError("No response received.");
    return;
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let done = false;

  while (!done) {
    const { done: readerDone, value } = await reader.read();
    if (readerDone) break;
    buffer += decoder.decode(value, { stream: true });

    let newlineIndex: number;
    while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
      let line = buffer.slice(0, newlineIndex);
      buffer = buffer.slice(newlineIndex + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;
      const jsonStr = line.slice(6).trim();
      if (jsonStr === "[DONE]") { done = true; break; }
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) onDelta(content);
      } catch {
        buffer = line + "\n" + buffer;
        break;
      }
    }
  }

  if (buffer.trim()) {
    for (let raw of buffer.split("\n")) {
      if (!raw) continue;
      if (raw.endsWith("\r")) raw = raw.slice(0, -1);
      if (!raw.startsWith("data: ")) continue;
      const jsonStr = raw.slice(6).trim();
      if (jsonStr === "[DONE]") continue;
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) onDelta(content);
      } catch { /* ignore */ }
    }
  }

  onDone();
}

const SoulChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { playOpen, playClose, playSend, playReceive, playBubble } = useChatSounds();

  useEffect(() => {
    if (bubbleDismissed || isOpen) return;
    const handleScroll = () => {
      if (window.scrollY > 600 && !showBubble) {
        setShowBubble(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showBubble, bubbleDismissed, isOpen]);

  useEffect(() => {
    if (showBubble && !bubbleDismissed) {
      playBubble();
      const timer = setTimeout(() => {
        setShowBubble(false);
        setBubbleDismissed(true);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [showBubble, bubbleDismissed]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    playSend();
    const userMsg: Message = { role: "user", content: text.trim() };
    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      await streamChat({
        messages: allMessages,
        onDelta: upsert,
        onDone: () => { setIsLoading(false); playReceive(); },
        onError: (msg) => {
          setMessages((prev) => [...prev, { role: "assistant", content: `⚠️ ${msg}` }]);
          setIsLoading(false);
        },
      });
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "⚠️ Something went wrong. Please try again." }]);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Popup bubble */}
      <AnimatePresence>
        {showBubble && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 bg-card/30 border border-border/20 backdrop-blur-2xl rounded-2xl rounded-br-sm px-4 py-3 shadow-2xl shadow-primary/10 max-w-[220px] cursor-pointer overflow-hidden"
            onClick={() => { setShowBubble(false); setBubbleDismissed(true); setIsOpen(true); playOpen(); }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.05] via-transparent to-transparent pointer-events-none rounded-2xl" />
            <p className="text-sm text-foreground relative z-10" style={{ fontFamily: "'Poppins', sans-serif" }}>
              hey 👋 I'm <span className="text-primary font-semibold">Soul</span>, can I help you?
            </p>
            <button
              onClick={(e) => { e.stopPropagation(); setShowBubble(false); setBubbleDismissed(true); }}
              className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-card/60 backdrop-blur-xl border border-border/30 flex items-center justify-center text-muted-foreground hover:text-foreground text-[10px]"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <motion.button
          onClick={() => { const next = !isOpen; setIsOpen(next); setShowBubble(false); setBubbleDismissed(true); next ? playOpen() : playClose(); }}
          className="h-14 w-14 rounded-full shadow-lg shadow-primary/25 overflow-hidden relative group border border-border/20"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                className="absolute inset-0 bg-card/40 backdrop-blur-2xl flex items-center justify-center border border-border/30 rounded-full"
              >
                <X className="h-5 w-5 text-foreground" />
              </motion.div>
            ) : (
              <motion.div
                key="icon"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="absolute inset-0"
              >
                <img src={soulIcon} alt="Soul" className="h-full w-full object-cover rounded-full dark:invert" />
                {/* Online indicator */}
                <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-background" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="fixed z-50 flex flex-col border border-border/20 bg-background/70 backdrop-blur-3xl shadow-2xl shadow-black/20 overflow-hidden inset-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[400px] sm:h-[min(520px,70vh)] sm:rounded-2xl"
          >
            {/* Header */}
            <div className="px-5 py-4 flex items-center gap-3 border-b border-border/15 bg-card/20 backdrop-blur-xl">
              <div className="relative">
                <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-primary/20">
                  <img src={soulIcon} alt="Soul" className="w-full h-full object-cover dark:invert" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-background" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-foreground tracking-tight" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                  Soul
                </h4>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <p className="text-[11px] text-muted-foreground">Online now</p>
                </div>
              </div>
              <button
                onClick={() => { setIsOpen(false); playClose(); }}
                className="w-8 h-8 rounded-lg bg-card/40 backdrop-blur-xl border border-border/20 hover:bg-card/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-4 scroll-smooth">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full gap-5 py-8">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-primary/10 shadow-lg">
                    <img src={soulIcon} alt="Soul" className="w-full h-full object-cover dark:invert" />
                  </div>
                  <div className="text-center space-y-1.5">
                    <h3 className="text-base font-semibold text-foreground" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                      hey, I'm Soul 👋
                    </h3>
                    <p className="text-xs text-muted-foreground max-w-[240px]">
                      Shibin's AI assistant. Ask me anything about his work, skills, or projects.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center mt-1">
                    {quickQuestions.map((q) => (
                      <motion.button
                        key={q}
                        onClick={() => sendMessage(q)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="text-xs px-4 py-2 rounded-xl border border-border/20 bg-card/30 backdrop-blur-xl text-muted-foreground hover:bg-card/50 hover:text-foreground hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-200"
                      >
                        {q}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-6 h-6 rounded-lg overflow-hidden flex-shrink-0 mt-0.5 ring-1 ring-border/30">
                      <img src={soulIcon} alt="Soul" className="w-full h-full object-cover dark:invert" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] text-[13px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary/90 backdrop-blur-xl text-primary-foreground rounded-2xl rounded-br-md px-4 py-2.5 shadow-md shadow-primary/10"
                        : "text-foreground"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none [&_p]:m-0 [&_p]:mb-1.5 [&_p:last-child]:mb-0 [&_ul]:m-0 [&_ol]:m-0 [&_li]:text-[13px]">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Follow-up suggestions after last assistant message */}
              {!isLoading && messages.length > 0 && messages[messages.length - 1]?.role === "assistant" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex flex-wrap gap-1.5 pl-8"
                >
                  {getSuggestions(messages[messages.length - 1].content).map((q) => (
                    <motion.button
                      key={q}
                      onClick={() => sendMessage(q)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="text-[11px] px-3 py-1.5 rounded-xl border border-border/20 bg-card/30 backdrop-blur-xl text-muted-foreground hover:bg-card/50 hover:text-foreground hover:border-primary/30 hover:shadow-sm hover:shadow-primary/5 transition-all duration-200"
                    >
                      {q}
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5"
                >
                  <div className="w-6 h-6 rounded-lg overflow-hidden flex-shrink-0 mt-0.5 ring-1 ring-border/30">
                    <img src={soulIcon} alt="Soul" className="w-full h-full object-cover dark:invert" />
                  </div>
                  <div className="flex items-center gap-1 py-2">
                    <motion.span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} />
                    <motion.span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
                    <motion.span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input area - Gemini/ChatGPT style */}
            <div className="p-3 border-t border-border/15 bg-card/10 backdrop-blur-xl">
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                className="relative flex items-end bg-card/30 backdrop-blur-2xl border border-border/20 rounded-2xl focus-within:border-primary/40 focus-within:ring-1 focus-within:ring-primary/20 focus-within:shadow-md focus-within:shadow-primary/5 transition-all duration-200"
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Message Soul..."
                  disabled={isLoading}
                  rows={1}
                  className="flex-1 bg-transparent resize-none px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none disabled:opacity-50 max-h-[120px]"
                  style={{ scrollbarWidth: "none" }}
                />
                <motion.button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="m-1.5 h-8 w-8 rounded-xl bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground flex items-center justify-center transition-colors duration-200 shrink-0"
                >
                  <ArrowDown className="h-4 w-4 rotate-[-90deg]" />
                </motion.button>
              </form>
              <p className="text-[10px] text-muted-foreground/40 text-center mt-2">
                Soul can make mistakes. Verify important info.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SoulChatbot;
