import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const PageHeader = ({ title, subtitle, docsUrl, chainId, blockHeight, rpcStatus, explorerUrl }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold text-white">Airchains</h2>
          <a href={docsUrl || "#"} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300"><ExternalLink className="w-5 h-5" /></a>
        </div>
        <div className="flex items-center gap-x-6 gap-y-2 flex-wrap text-sm">
          {chainId && <p><span className="text-slate-400">Chain ID: </span><span className="font-mono text-white">{chainId}</span></p>}
          {blockHeight && <p><span className="text-slate-400">Block Height: </span><span className="font-mono text-white">{blockHeight}</span></p>}
          {rpcStatus && (
            <div className="flex items-center gap-2">
              <span className="text-slate-400">RPC Status:</span>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </div>
          )}
          {explorerUrl && <a href={explorerUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-2"><ExternalLink className="w-4 h-4" /> Explorer</a>}
        </div>
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
        {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
      </div>
    </motion.div>
  );
};

export default PageHeader;