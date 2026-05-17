"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Bot, MessageSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useApiClient } from "@/lib/api-client";

type ChatMessage = {
  role: "user" | "model";
  content: string;
};

/**
 * Premium Floating AI Onboarding & HR Copilot Chatbot.
 * Placed globally in the HRMS layout.
 */
export function AiCopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      content: "Hello! I am your MKX AI HR Copilot. Ask me anything about your workforce, or let me help you draft emails and announcements!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const api = useApiClient();

  const suggestions = [
    "Who is active in Sales?",
    "Who is on leave today?",
    "Draft a staff welcome email",
  ];

  // Auto-scroll messages to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 80);
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const chatHistory = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const { data, error } = await api.post<any>("/api/hrms/ai-chat", { messages: chatHistory }, {
        silent: true
      });

      if (!error && data?.text) {
        setMessages((prev) => [...prev, { role: "model", content: data.text }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "model", content: "I encountered an error connecting to my cognitive processing network. Please verify your internet connection or try again." },
        ]);
      }
    } catch (err) {
      console.error("AI Copilot Chat error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Helper function to parse basic markdown bolds (**bold**) and bullet lists (* item)
   * into gorgeous native JSX elements.
   */
  const renderFormattedContent = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, lineIdx) => {
      // Parse bullet points
      const bulletMatch = line.match(/^(\s*)([*+-]|\d+\.)\s+(.*)$/);
      let isBullet = false;
      let content = line;

      if (bulletMatch) {
        isBullet = true;
        content = bulletMatch[3];
      }

      // Parse bolds (**bold text**)
      const parts = [];
      let currentIndex = 0;
      const boldRegex = /\*\*(.*?)\*\*/g;
      let match;

      while ((match = boldRegex.exec(content)) !== null) {
        const matchIndex = match.index;
        if (matchIndex > currentIndex) {
          parts.push(content.substring(currentIndex, matchIndex));
        }
        parts.push(
          <strong key={matchIndex} className="font-bold text-indigo-900 dark:text-indigo-200">
            {match[1]}
          </strong>
        );
        currentIndex = boldRegex.lastIndex;
      }

      if (currentIndex < content.length) {
        parts.push(content.substring(currentIndex));
      }

      if (isBullet) {
        return (
          <div key={lineIdx} className="flex items-start gap-1.5 ml-2.5 mt-1">
            <span className="text-indigo-500 font-bold">•</span>
            <span className="leading-relaxed">{parts}</span>
          </div>
        );
      }

      return (
        <p key={lineIdx} className={lineIdx > 0 ? "mt-1.5 leading-relaxed" : "leading-relaxed"}>
          {parts}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Sliding Chat Window */}
      {isOpen && (
        <Card className="mb-4 w-[360px] sm:w-[400px] h-[500px] shadow-2xl border border-indigo-500/20 bg-card/95 backdrop-blur flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          <CardHeader className="p-4 border-b border-border/40 bg-gradient-to-r from-indigo-500/10 via-transparent to-transparent flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="bg-indigo-600 dark:bg-indigo-500 p-1.5 rounded-lg text-white">
                  <Sparkles className="h-4 w-4 animate-pulse" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-card animate-pulse" />
              </div>
              <div>
                <CardTitle className="text-sm font-bold text-foreground">MKX AI HR Copilot</CardTitle>
                <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                  Agent Online
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-full text-muted-foreground hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          {/* Messages Area */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2.5 max-w-[85%] ${
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                {msg.role === "model" && (
                  <div className="flex-shrink-0 h-6.5 w-6.5 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/10">
                    <Bot className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl shadow-sm ${
                    msg.role === "user"
                      ? "bg-indigo-600 text-white dark:bg-indigo-500 rounded-tr-none"
                      : "bg-muted text-foreground/90 rounded-tl-none border border-border/30"
                  }`}
                >
                  {renderFormattedContent(msg.content)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2.5 max-w-[85%] mr-auto">
                <div className="flex-shrink-0 h-6.5 w-6.5 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/10">
                  <Bot className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="p-3 bg-muted rounded-2xl rounded-tl-none border border-border/30 flex items-center gap-1">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-indigo-500" />
                  <span className="text-[10px] text-muted-foreground font-medium">Synthesizing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Suggested prompts tags */}
          {messages.length === 1 && !isLoading && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {suggestions.map((sug, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(sug)}
                  className="text-[10px] font-semibold bg-indigo-500/10 hover:bg-indigo-500/25 border border-indigo-500/15 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded-full transition-all text-left"
                >
                  {sug}
                </button>
              ))}
            </div>
          )}

          {/* Form Input Area */}
          <CardFooter className="p-4 border-t border-border/40 bg-background/50">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              className="flex w-full items-center gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about team headcount or draft documents..."
                disabled={isLoading}
                className="flex-1 bg-background/50 border-border/50 text-xs focus-visible:ring-indigo-500"
              />
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                size="icon"
                className="bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors h-8.5 w-8.5 flex-shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}

      {/* Launcher Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-2xl flex items-center justify-center group hover:scale-105 transition-all duration-300 relative border border-indigo-400/20"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <MessageSquare className="h-6 w-6 group-hover:rotate-6 transition-transform" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 border border-card shadow">
              <Sparkles className="h-2.5 w-2.5 text-white animate-pulse" />
            </span>
          </>
        )}
      </Button>
    </div>
  );
}
