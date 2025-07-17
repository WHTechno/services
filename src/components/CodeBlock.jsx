import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const CodeBlock = ({ children, title }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    toast({
        title: "✅ Tersalin!",
        description: "Perintah telah disalin ke clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6 bg-slate-900/70 rounded-lg border border-slate-700/80">
      {title && <p className="text-sm text-slate-400 px-4 pt-3">{title}</p>}
      <pre className="p-4 overflow-x-auto">
        <code data-code-block className="text-slate-300">
            {children}
        </code>
      </pre>
      <Button
        size="icon"
        variant="ghost"
        className="absolute top-2 right-2 h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={handleCopy}
      >
        {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default CodeBlock;