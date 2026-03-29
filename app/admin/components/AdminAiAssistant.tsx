"use client";
import { useState } from "react";
import { Bot, Loader2, Send } from "lucide-react";
import { askAiAssistant } from "@/api/adminChat";

export default function AdminAiAssistant() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    if (!query.trim() || loading) return;
    setLoading(true);
    try {
      const data = await askAiAssistant(query);
      setAnswer(data.text);
    } catch (err) {
      setAnswer("Could not reach the AI. Please check your admin session.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 max-w-2xl bg-[#360212] p-8 text-white shadow-2xl border-l-4 border-[#fe5457]">
      <div className="flex items-center gap-4 mb-6">
        <Bot className="text-[#fe5457]" size={32} />
        <div>
          <h2 className="font-serif text-xl font-bold">Admin Intelligence</h2>
          <p className="text-[#d791be] text-[10px] uppercase tracking-[0.2em]">Real-time Store Analysis</p>
        </div>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about sales, stock, or trends..."
          className="flex-1 px-4 py-3 bg-white/10 border border-white/20 focus:border-[#fe5457] outline-none text-sm transition-all"
        />
        <button 
          onClick={handleAction}
          disabled={loading}
          className="bg-[#fe5457] px-6 py-3 hover:bg-[#9f002b] transition-colors flex items-center justify-center min-w-25"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
        </button>
      </div>

      {answer && (
        <div className="mt-6 p-5 bg-white/5 border border-white/10 text-sm leading-relaxed animate-in fade-in duration-500">
          <p className="text-[#fe5457] font-bold text-[10px] uppercase mb-2 tracking-widest">AI Response</p>
          <div className="font-light">{answer}</div>
        </div>
      )}
    </div>
  );
}