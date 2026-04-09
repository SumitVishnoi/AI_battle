import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { motion } from 'framer-motion';

// export default function ArenaResponse({ solution1, solution2, judge }) {
//   useEffect(() => {
//     hljs.highlightAll();
//   }, [solution1, solution2]);

//   return (
//     <div className="flex flex-col gap-8 my-8 px-4 w-full">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Solution 1 */}
//         <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm flex flex-col transition-all hover:shadow-md">
//           <h3 className="text-sm font-semibold tracking-wide uppercase text-zinc-500 mb-6 flex items-center gap-2">
//             <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Solution 1
//           </h3>
//           <div className="text-zinc-700 dark:text-zinc-300">
//             <ReactMarkdown 
//               remarkPlugins={[remarkGfm]}
//               components={{
//                 h1: ({node, ...props}) => <h1 className="text-2xl font-bold mt-6 mb-4 text-zinc-900 dark:text-white" {...props} />,
//                 h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-5 mb-3 text-zinc-900 dark:text-white" {...props} />,
//                 h3: ({node, ...props}) => <h3 className="text-lg font-bold mt-4 mb-2 text-zinc-900 dark:text-white" {...props} />,
//                 p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-zinc-700 dark:text-zinc-300" {...props} />,
//                 ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 text-zinc-700 dark:text-zinc-300 space-y-1" {...props} />,
//                 ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 text-zinc-700 dark:text-zinc-300 space-y-1" {...props} />,
//                 a: ({node, ...props}) => <a className="text-blue-600 hover:text-blue-500 underline" {...props} />,
//                 code: ({node, inline, className, children, ...props}) => {
//                   return !inline ? (
//                     <div className="rounded-xl overflow-hidden my-4 border border-zinc-200 dark:border-zinc-800">
//                        <pre className="p-4 bg-zinc-950 overflow-x-auto text-sm text-zinc-100">
//                          <code className={className} {...props}>
//                            {children}
//                          </code>
//                        </pre>
//                     </div>
//                   ) : (
//                     <code className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-1.5 py-0.5 rounded-md text-sm font-mono" {...props}>
//                       {children}
//                     </code>
//                   )
//                 }
//               }}
//             >{solution1}</ReactMarkdown>
//           </div>
//         </div>

//         {/* Solution 2 */}
//         <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm flex flex-col transition-all hover:shadow-md">
//           <h3 className="text-sm font-semibold tracking-wide uppercase text-zinc-500 mb-6 flex items-center gap-2">
//             <span className="w-2 h-2 rounded-full bg-violet-500"></span> Solution 2
//           </h3>
//           <div className="text-zinc-700 dark:text-zinc-300">
//             <ReactMarkdown 
//               remarkPlugins={[remarkGfm]}
//               components={{
//                 h1: ({node, ...props}) => <h1 className="text-2xl font-bold mt-6 mb-4 text-zinc-900 dark:text-white" {...props} />,
//                 h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-5 mb-3 text-zinc-900 dark:text-white" {...props} />,
//                 h3: ({node, ...props}) => <h3 className="text-lg font-bold mt-4 mb-2 text-zinc-900 dark:text-white" {...props} />,
//                 p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-zinc-700 dark:text-zinc-300" {...props} />,
//                 ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 text-zinc-700 dark:text-zinc-300 space-y-1" {...props} />,
//                 ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 text-zinc-700 dark:text-zinc-300 space-y-1" {...props} />,
//                 a: ({node, ...props}) => <a className="text-blue-600 hover:text-blue-500 underline" {...props} />,
//                 code: ({node, inline, className, children, ...props}) => {
//                   return !inline ? (
//                     <div className="rounded-xl overflow-hidden my-4 border border-zinc-200 dark:border-zinc-800">
//                        <pre className="p-4 bg-zinc-950 overflow-x-auto text-sm text-zinc-100">
//                          <code className={className} {...props}>
//                            {children}
//                          </code>
//                        </pre>
//                     </div>
//                   ) : (
//                     <code className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-1.5 py-0.5 rounded-md text-sm font-mono" {...props}>
//                       {children}
//                     </code>
//                   )
//                 }
//               }}
//             >{solution2}</ReactMarkdown>
//           </div>
//         </div>
//       </div>

//       {/* Judge Panel */}
//       {judge && (
//         <div className="mt-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm">
//           <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-3 mb-6">
//             ⚖️ Judge Recommendations
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="space-y-4">
//               <div className="flex justify-between items-center bg-white dark:bg-zinc-900 px-5 py-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
//                 <span className="font-medium text-zinc-600 dark:text-zinc-400">Solution 1 Score</span>
//                 <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{judge.solution_1_score}/10</span>
//               </div>
//               <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed px-2">
//                 {judge.solution_1_reasoning}
//               </p>
//             </div>
//             <div className="space-y-4">
//                <div className="flex justify-between items-center bg-white dark:bg-zinc-900 px-5 py-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
//                 <span className="font-medium text-zinc-600 dark:text-zinc-400">Solution 2 Score</span>
//                 <span className="text-2xl font-bold text-violet-600 dark:text-violet-400">{judge.solution_2_score}/10</span>
//               </div>
//               <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed px-2">
//                 {judge.solution_2_reasoning}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




export default function ArenaResponse({ solution1, solution2, judge }) {
  useEffect(() => {
    hljs.highlightAll();
  }, [solution1, solution2]);

  const CodeBlock = ({ inline, children, className }) => {
    const text = String(children);
    const handleCopy = () => navigator.clipboard.writeText(text);

    return !inline ? (
      <div className="relative group my-4">
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 text-xs bg-zinc-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
        >
          Copy
        </button>
        <pre className="p-4 rounded-xl overflow-x-auto bg-black text-green-400 text-sm">
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
          className="rounded-2xl p-5 bg-linear-to-br from-emerald-500/10 to-emerald-400/5 border border-emerald-400/20 shadow-lg backdrop-blur"
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
          className="rounded-2xl p-5 bg-linear-to-br from-violet-500/10 to-purple-400/5 border border-violet-400/20 shadow-lg backdrop-blur"
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

