// "use client";
// import { useState } from "react";
// import { Bot, Loader2, Send } from "lucide-react";
// import { askAiAssistant } from "@/api/adminChat";

// export default function AdminAiAssistant() {
//   const [query, setQuery] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleAction = async () => {
//     if (!query.trim() || loading) return;
//     setLoading(true);
//     try {
//       const data = await askAiAssistant(query);
//       setAnswer(data.text);
//     } catch (err) {
//       setAnswer("Could not reach the AI. Please check your admin session.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mt-12 max-w-2xl bg-[#360212] p-8 text-white shadow-2xl border-l-4 border-[#fe5457]">
//       <div className="flex items-center gap-4 mb-6">
//         <Bot className="text-[#fe5457]" size={32} />
//         <div>
//           <h2 className="font-serif text-xl font-bold">Admin Intelligence</h2>
//           <p className="text-[#d791be] text-[10px] uppercase tracking-[0.2em]">Real-time Store Analysis</p>
//         </div>
//       </div>

//       <div className="flex gap-2">
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Ask about sales, stock, or trends..."
//           className="flex-1 px-4 py-3 bg-white/10 border border-white/20 focus:border-[#fe5457] outline-none text-sm transition-all"
//         />
//         <button 
//           onClick={handleAction}
//           disabled={loading}
//           className="bg-[#fe5457] px-6 py-3 hover:bg-[#9f002b] transition-colors flex items-center justify-center min-w-25"
//         >
//           {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
//         </button>
//       </div>

//       {answer && (
//         <div className="mt-6 p-5 bg-white/5 border border-white/10 text-sm leading-relaxed animate-in fade-in duration-500">
//           <p className="text-[#fe5457] font-bold text-[10px] uppercase mb-2 tracking-widest">AI Response</p>
//           <div className="font-light">{answer}</div>
//         </div>
//       )}
//     </div>
//   );
// }
// Version 1


"use client";
import { useState, useEffect, useRef } from "react";
import { Bot, Loader2, Send, RotateCcw } from "lucide-react";
import { askAiAssistant } from "@/api/adminChat";
import api from "@/api/axios";

type ChatMessage = {
  role: string;
  content: string;
};

export default function AdminAiAssistant() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [typingIndex, setTypingIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. Load history from Django on mount
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await api.get<ChatMessage[]>("/ai/history/");
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to load chat history", err);
      }
    };
    loadHistory();
  }, []);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAction = async () => {
    // if (!query.trim() || loading) return;
    const trimmedQuery = query.trim();
    if (!trimmedQuery || loading) return;

    const userMessage = { role: "user", content: trimmedQuery };
    setMessages((prev) => [...prev, userMessage,{ role: "assistant", content: "..." }]);
    setQuery("");
    setLoading(true);

    try {
      // Pass the current message AND the history to the API
      const data = await askAiAssistant(trimmedQuery, messages);
      const aiMessage = { role: "assistant", content: data.text };

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = aiMessage;
        return updated;
      });

      // setTypingIndex(messages.length + 1);
      // setMessages((prev) => [...prev, aiMessage]);
      // await api.post("/ai/history/save/", userMessage);
      // await api.post("/ai/history/save/", aiMessage);
      if (userMessage.content !== "...") {
        await api.post("/ai/history/save/", userMessage).catch(() => null);
      }
      if (aiMessage.content !== "...") {
        await api.post("/ai/history/save/", aiMessage).catch(() => null);
      }
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "assistant", content: "Session expired or unauthorized. Please re-login to consult the AI." };
        return updated;
        // [...prev, { role: "assistant", content: "Error connecting to AI." }]
      });
    } finally {
      setLoading(false);
    }
  };

  const clearDisplay = () => {
    if (confirm("Clear current chat view? (History remains in DB)")) {
      setMessages([]);
    }
  };

  return (
    <div className="mt-3 max-w-3xl md:max-w-2xl bg-[#360212] py-3 px-2 md:px-8 text-white shadow-2xl border-l-4 border-[#fe5457]">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Bot className="text-[#fe5457]" size={32} />
          <div>
            <h2 className="font-serif text-xl font-bold">Admin Intelligence</h2>
            <p className="text-[#d791be] text-[10px] uppercase tracking-[0.2em]">Real-time Store Analysis</p>
          </div>
        </div>
        <button onClick={clearDisplay} className="text-[#d791be] hover:text-[#fe5457] transition-all p-2">
          <RotateCcw size={16} />
        </button>
      </div>

      {/* CHAT DISPLAY AREA */}
      <div className="mb-6 max-h-110 md:max-h-200 overflow-y-auto space-y-4 custom-scrollbar transition-all">
        {messages.map((m, i) => (
         <div 
            key={i} 
            className={`p-5 border border-white/10 ${
              m.role === "user" 
                ? "bg-white/10 ml-8 border-l-2 border-l-[#d791be]" 
                : "bg-white/5 mr-8 border-l-2 border-l-[#fe5457]"
            }`}
          >
            <p className={`font-bold text-[9px] uppercase mb-2 tracking-[0.2em] ${m.role === "user" ? "text-[#d791be]" : "text-[#fe5457]"
              }`}>
              {m.role === "user" ? "Administrator" : "DoubleJoy AI"}
            </p>
            <div className="font-light text-sm leading-relaxed whitespace-pre-wrap">
              {m.content}
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      <div className="flex gap-1 overflow-hidden">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAction()}
          placeholder="Analyze store performance..."
          className="basis-[75%] px-1 md:px-4 py-3 bg-white/5 border border-white/10 focus:border-[#fe5457] focus:bg-white/10 outline-none text-sm transition-all placeholder:text-white/20"
        />
        <button
          onClick={handleAction}
          disabled={loading}
          className="basis-[25%] bg-[#fe5457] px-0 md:px-4 py-3 hover:bg-[#9f002b] transition-colors flex items-center justify-center md:min-w-25 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
        </button>
      </div>
    </div>
  );
}