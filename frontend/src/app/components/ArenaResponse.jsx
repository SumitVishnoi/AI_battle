import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { motion } from 'framer-motion';





export default function ArenaResponse({ solution1, solution2, judge }) {
  const [copy, setCopy] = useState(false)
  useEffect(() => {
    hljs.highlightAll();
  }, [solution1, solution2]);

  const CodeBlock = ({ inline, children, className }) => {
    const text = String(children);
    const handleCopy = () => navigator.clipboard.writeText(text);

    return !inline ? (
      <div className="relative group my-4">
        <div className='flex justify-center items-center'>
          <button
          onClick={()=>{handleCopy; setCopy(prev=> !prev)}}
          className="absolute top-2 right-2 text-xs bg-zinc-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
        >
          {copy ? "Copied!" : "Copy"}
        </button>
        </div>
        <pre className="p-4 rounded-xl overflow-x-auto bg-black text-green-600 text-sm">
          <code className={className}>{children}</code>
        </pre>
      </div>
    ) : (
      <code className="bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded text-xs">
        {children}
      </code>
    );
  };

  const MarkdownComponents = {
    h1: (props) => <h1 className="text-xl font-bold mt-4 mb-2" {...props} />,
    h2: (props) => <h2 className="text-lg font-semibold mt-3 mb-2" {...props} />,
    p: (props) => <p className="mb-3 text-sm leading-relaxed" {...props} />,
    code: CodeBlock,
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Solutions */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Solution 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-5 text-zinc-300 bg-linear-to-br from-emerald-500/10 to-emerald-400/5 border border-emerald-400/20 shadow-lg backdrop-blur"
        >
          <h3 className="mb-4 font-semibold text-emerald-400">🟢 Solution 1</h3>
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={MarkdownComponents}>
            {solution1}
          </ReactMarkdown>
        </motion.div>

        {/* Solution 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-5 text-zinc-300 bg-linear-to-br from-violet-500/10 to-purple-400/5 border border-violet-400/20 shadow-lg backdrop-blur"
        >
          <h3 className="mb-4 font-semibold text-violet-400">🟣 Solution 2</h3>
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={MarkdownComponents}>
            {solution2}
          </ReactMarkdown>
        </motion.div>
      </div>

      {/* Judge */}
      {judge && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl p-6 bg-linear-to-r from-yellow-500/10 to-orange-400/10 border border-yellow-400/20 shadow-xl"
        >
          <h3 className="text-lg font-semibold mb-4">⚖️ Judge Result</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-black/30 rounded-xl">
              <p className="text-sm text-zinc-400">Solution 1</p>
              <p className="text-2xl font-bold text-emerald-400">
                {judge.solution_1_score}/10
              </p>
              <p className="text-xs mt-2 text-zinc-400">
                {judge.solution_1_reasoning}
              </p>
            </div>

            <div className="p-4 bg-black/30 rounded-xl">
              <p className="text-sm text-zinc-400">Solution 2</p>
              <p className="text-2xl font-bold text-violet-400">
                {judge.solution_2_score}/10
              </p>
              <p className="text-xs mt-2 text-zinc-400">
                {judge.solution_2_reasoning}
              </p>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-zinc-400">Winner</p>
            <p className="text-xl font-bold">
              {judge.solution_1_score > judge.solution_2_score
                ? '🏆 Solution 1'
                : '🏆 Solution 2'}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

