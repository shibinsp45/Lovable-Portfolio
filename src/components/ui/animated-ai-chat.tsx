"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import {
  ArrowUpIcon,
  Paperclip,
  XIcon,
  LoaderIcon,
  Mail,
  Linkedin,
  Command,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

function useAutoResizeTextarea({ minHeight, maxHeight }: { minHeight: number; maxHeight?: number }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const ta = textareaRef.current;
      if (!ta) return;
      if (reset) {
        ta.style.height = `${minHeight}px`;
        return;
      }
      ta.style.height = `${minHeight}px`;
      const next = Math.max(minHeight, Math.min(ta.scrollHeight, maxHeight ?? Infinity));
      ta.style.height = `${next}px`;
    },
    [minHeight, maxHeight]
  );
  useEffect(() => {
    if (textareaRef.current) textareaRef.current.style.height = `${minHeight}px`;
  }, [minHeight]);
  return { textareaRef, adjustHeight };
}

export interface AnimatedAIChatProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  onSend?: (message: string) => void;
}

export function AnimatedAIChat({
  title = "Let's start a conversation",
  subtitle = "Type your message — I'll get back to you soon",
  placeholder = "Tell me about your project...",
  onSend,
}: AnimatedAIChatProps) {
  const [value, setValue] = useState("");
  const [attachments, setAttachments] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({ minHeight: 60, maxHeight: 200 });

  const handleSend = () => {
    if (!value.trim()) return;
    setIsSending(true);
    setTimeout(() => {
      onSend?.(value.trim());
      const body = encodeURIComponent(value.trim());
      window.location.href = `mailto:shibinsp45@gmail.com?subject=${encodeURIComponent("Let's talk")}&body=${body}`;
      setIsSending(false);
      setValue("");
      adjustHeight(true);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) handleSend();
    }
  };

  const handleAttachFile = () => {
    const name = `attachment-${Math.floor(Math.random() * 1000)}.pdf`;
    setAttachments((prev) => [...prev, name]);
  };

  const removeAttachment = (i: number) =>
    setAttachments((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      {/* Ambient orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 left-1/4 w-72 h-72 bg-primary/10 rounded-full filter blur-[96px] animate-pulse" />
        <div className="absolute -bottom-10 right-1/4 w-72 h-72 bg-accent/10 rounded-full filter blur-[96px] animate-pulse [animation-delay:700ms]" />
      </div>

      <motion.div
        className="relative z-10 space-y-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="inline-block"
          >
            <h3
              className="text-2xl md:text-3xl font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 to-foreground/50 pb-1"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              {title}
            </h3>
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "100%", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
          </motion.div>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>

        <motion.div
          className="relative backdrop-blur-2xl bg-card/40 rounded-2xl border border-border/30 shadow-2xl"
          initial={{ scale: 0.98 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="p-4">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                adjustHeight();
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              placeholder={placeholder}
              className={cn(
                "w-full px-4 py-3 resize-none bg-transparent border-none",
                "text-foreground text-sm focus:outline-none",
                "placeholder:text-muted-foreground/60 min-h-[60px]"
              )}
              style={{ overflow: "hidden", fontFamily: "'Poppins', sans-serif" }}
            />
          </div>

          <AnimatePresence>
            {attachments.length > 0 && (
              <motion.div
                className="px-4 pb-3 flex gap-2 flex-wrap"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {attachments.map((file, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 text-xs bg-muted/40 py-1.5 px-3 rounded-lg text-muted-foreground"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <span>{file}</span>
                    <button
                      onClick={() => removeAttachment(index)}
                      className="text-muted-foreground/60 hover:text-foreground transition-colors"
                    >
                      <XIcon className="w-3 h-3" />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="p-3 border-t border-border/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1">
              <motion.button
                type="button"
                onClick={handleAttachFile}
                whileTap={{ scale: 0.94 }}
                aria-label="Attach file"
                className="p-2 text-muted-foreground hover:text-foreground rounded-lg transition-colors relative group"
              >
                <Paperclip className="w-4 h-4" />
              </motion.button>

              <div className="h-5 w-px bg-border/40 mx-1" />

              {/* Social icons */}
              <motion.a
                href="mailto:shibinsp45@gmail.com"
                aria-label="Email"
                whileTap={{ scale: 0.94 }}
                whileHover={{ scale: 1.08 }}
                className="p-2 text-muted-foreground hover:text-primary rounded-lg transition-colors"
              >
                <Mail className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="https://wa.me/8606129072"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                whileTap={{ scale: 0.94 }}
                whileHover={{ scale: 1.08 }}
                className="p-2 text-muted-foreground hover:text-primary rounded-lg transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/shibinsp45/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                whileTap={{ scale: 0.94 }}
                whileHover={{ scale: 1.08 }}
                className="p-2 text-muted-foreground hover:text-primary rounded-lg transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-1 text-[10px] text-muted-foreground/60">
                <Command className="w-3 h-3" /> + Enter
              </div>
              <motion.button
                type="button"
                onClick={handleSend}
                disabled={!value.trim() || isSending}
                whileTap={{ scale: 0.94 }}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all",
                  value.trim() && !isSending
                    ? "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30"
                    : "bg-muted/40 text-muted-foreground cursor-not-allowed"
                )}
              >
                {isSending ? (
                  <>
                    <LoaderIcon className="w-4 h-4 animate-spin" />
                    <span>Sending</span>
                  </>
                ) : (
                  <>
                    <span>Send</span>
                    <ArrowUpIcon className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/70">
          <Sparkles className="w-3 h-3" />
          <span>Powered by good vibes</span>
        </div>
      </motion.div>
    </div>
  );
}

export default AnimatedAIChat;
