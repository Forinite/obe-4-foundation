//app/subcomponents/HomeComponents/MissionCard.tsx

import { Target } from "lucide-react";
import { missionInfo, missionStatements } from "@/app/constants/homeData";

export default function MissionCard() {
    return (
        <div className="relative bg-white/80 dark:bg-[#0b121d]/80 backdrop-blur-md border border-cyan-400/10 rounded-2xl p-6 md:p-8 overflow-hidden transition-all hover:shadow-lg hover:shadow-cyan-400/10 hover:-translate-y-1">
            {/* Subtle background aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/10 via-transparent to-emerald-300/10 blur-3xl" />

            {/* Motion glow pulse */}
            <div className="absolute -bottom-10 right-10 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" />

            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 rounded-full bg-emerald-400/10 text-emerald-400">
                        <Target className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                        Our Mission
                    </h2>
                </div>

                {/* Mission Statements */}
                <div className="space-y-4 text-black dark:text-gray-300 mb-6 leading-relaxed">
                    {missionStatements.map((item, index) => (
                        <p key={index}>{item}</p>
                    ))}
                </div>

                {/* Circular progress visual */}
                <div className="flex items-center gap-5 mb-6">
                    <div className="relative w-20 h-20">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                className="stroke-gray-200 dark:stroke-gray-700"
                                strokeWidth="10"
                                fill="none"
                            />
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                stroke="url(#progress-gradient)"
                                strokeWidth="10"
                                strokeLinecap="round"
                                fill="none"
                                strokeDasharray="283"
                                strokeDashoffset={`${283 - (283 * missionInfo.percentage) / 100}`}
                                className="transition-all duration-700"
                            />
                            <defs>
                                <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#22d3ee" />
                                    <stop offset="100%" stopColor="#14b8a6" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-cyan-500">
              {missionInfo.percentage}
            </span>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{missionInfo.text}</p>
                    </div>
                </div>

                {/* Bullet list */}
                <ul className="text-sm text-gray-700 dark:text-gray-400 space-y-2 list-disc list-inside leading-relaxed">
                    {missionInfo.list.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>

                {/* Accent underline */}
                <div className="mt-6 w-20 h-[2px] bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full" />
            </div>
        </div>
    );
}
