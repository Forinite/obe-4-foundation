//app/subcomponents/AboutComponents/ChallengeCard.tsx
'use client';
import { useEffect, useState } from 'react';

interface ChallengeCardProps {
    statistic: number;
    description: string;
    subDescription: string;
    items: { icon: string; text: string }[];
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
                                                         statistic,
                                                         description,
                                                         subDescription,
                                                         items,
                                                     }) => {
    const target = statistic
    const [value, setValue] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 2000;
        const step = (timestamp: number) => {
            start += 16;
            const progress = Math.min(start / duration, 1);
            setValue(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [target]);

    return (
        <div className="bg-background/50 backdrop-blur-sm border border-cyan-400/20 rounded-2xl p-10 text-center shadow-[0_0_25px_rgba(0,255,255,0.05)] relative overflow-hidden">
            {/* Decorative glow background */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-purple-500/10 pointer-events-none"></div>

            {/* Animated circular progress halo */}
            <div className="relative mx-auto w-48 h-48 mb-8 flex items-center justify-center">
                <svg
                    className="absolute inset-0 w-full h-full rotate-[-90deg]"
                    viewBox="0 0 36 36"
                >
                    {/* background ring */}
                    <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="rgba(0,255,255,0.15)"
                        strokeWidth="2"
                    />
                    {/* progress ring */}
                    <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="url(#grad)"
                        strokeDasharray={`${value}, 100`}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        className="transition-all duration-300 ease-out"
                    />
                    <defs>
                        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Animated counter number */}
                <span className="text-5xl font-extrabold bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,255,255,0.3)]">
          {value}%
        </span>
            </div>

            {/* Text content */}
            <p className="text-xl font-semibold mb-3 text-foreground/90">
                {description}
            </p>
            <p className="text-lg text-foreground/70 mb-10 leading-relaxed">
                {subDescription}
            </p>

            {/* Icon grid */}
            <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-br from-cyan-400/10 to-purple-500/10 hover:from-cyan-400/15 hover:to-purple-500/15 transition-all duration-300 border border-cyan-400/10"
                    >
                        <div className="text-2xl mb-2 text-cyan-400">{item.icon}</div>
                        <p className="text-sm text-foreground/80">{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChallengeCard;

