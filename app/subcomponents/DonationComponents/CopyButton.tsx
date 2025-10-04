//app/subcomponents/DonationComponents/CopyButton.tsx


'use client';

import { useState } from 'react';
import { Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
    text: string;
    label: string;
    className?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text, label, className }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative">
            <button
                onClick={handleCopy}
                className={cn(
                    'ml-3 p-2 rounded-lg bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/50',
                    className,
                )}
                aria-label={`Copy ${label}`}
            >
                <Copy className="h-4 w-4" aria-hidden="true" />
                {copied && (
                    <span className="absolute text-xs text-green-500 ml-2">Copied!</span>
                )}
            </button>
        </div>
    );
};

export default CopyButton;