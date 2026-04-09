import React, { useState, useRef, useEffect } from "react";
import UserMessage from "./UserMessage";
import ArenaResponse from "./ArenaResponse";
import axios from "axios";
import { motion } from "framer-motion";

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (!inputValue.trim()) return;

      const response = await axios.post("http://localhost:3000/invoke", {
        input: inputValue,
      });

      const data = response.data;

      const newMessage = {
        id: Date.now(),
        problem: inputValue,
        // simulate the delay or instantly add dummy response
        ...data.result,
      };

      setMessages([...messages, newMessage]);
      setLoading(false);
      setInputValue("");
    } catch (error) {
      setLoading(false);
      setError("Due to more traffic, Please try again");
    }
  };

  return (
    <div className="flex flex-col h-screen font-sans bg-linear-to-br from-slate-50 via-white to-indigo-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-indigo-950">
      {/* Header */}
      <header className="py-4 px-6 md:px-8 border-b border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            AI Chat Arena
          </h1>
          <span className="hidden md:block text-xs text-zinc-500">
            Compare two AI solutions
          </span>
        </div>
      </header>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mx-4 md:mx-8 mt-4 p-4 rounded-lg border border-red-200/70 dark:border-red-900/70 bg-red-50 dark:bg-red-950/30 flex items-center gap-3"
        >
          <svg
            className="w-5 h-5 text-red-600 dark:text-red-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-red-700 dark:text-red-300 text-sm">
            {error}
          </span>
          <button
            onClick={() => setError("")}
            className="ml-auto text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
          >
            ✕
          </button>
        </motion.div>
      )}

      {/* Main */}
      <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6 md:py-8 w-full max-w-6xl mx-auto flex flex-col gap-8">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center p-10 rounded-3xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl shadow-xl"
            >
              <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-zinc-800 dark:text-zinc-100">
                Welcome to the Arena ⚔️
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400">
                Ask a coding problem and see two solutions compete.
              </p>
            </motion.div>
          </div>
        ) : (
          messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              {/* User Message Card */}
              <div className="rounded-2xl p-4 md:p-5 shadow-sm">
                <UserMessage message={msg.problem} />
              </div>

              {/* Arena Response Card */}
              <div className="rounded-2xl border border-violet-200/60 dark:border-violet-900/40 bg-white/80 dark:bg-zinc-900/70 backdrop-blur p-4 md:p-5 shadow-md">
                <ArenaResponse
                  solution1={msg.solution_1}
                  solution2={msg.solution_2}
                  judge={msg.judge}
                />
              </div>
            </motion.div>
          ))
        )}
        <div ref={endOfMessagesRef} />
      </main>

      {/* Input */}
      <div className="p-4 md:p-6 border-t border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 md:gap-3 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 md:px-4 py-2 shadow-lg focus-within:ring-2 focus-within:ring-violet-500"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a coding question..."
              className="flex-1 bg-transparent outline-none text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 px-2 py-2"
            />

            <button
              type="submit"
              disabled={!inputValue.trim() || loading}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2 text-white bg-linear-to-r from-blue-600 to-violet-600 hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 min-w-25"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  <span className="text-sm">Sending...</span>
                </>
              ) : (
                <>
                  <span className="hidden sm:block text-sm font-medium">
                    Send
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
