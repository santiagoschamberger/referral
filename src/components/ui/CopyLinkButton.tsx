import React, { useState } from 'react';
import { Copy, CheckCircle } from 'lucide-react';

interface CopyLinkButtonProps {
  link: string;
  className?: string;
}

export default function CopyLinkButton({ link, className = '' }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center text-gray-400 hover:text-gray-300 focus:outline-none ${className}`}
      title="Copy referral link"
    >
      {copied ? (
        <CheckCircle className="h-5 w-5 text-green-500" />
      ) : (
        <Copy className="h-5 w-5" />
      )}
    </button>
  );
}