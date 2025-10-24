//app/subcomponents/HomeComponents/VisionCard.tsx
import { Eye } from 'lucide-react';
import { VisionStatement } from '@/app/types';

interface VisionCardProps {
    visionStatement?: VisionStatement;
}

export default function VisionCard({
                                       visionStatement = { title: 'No Title', description: 'No vision statement available.', goals: [] }
                                   }: VisionCardProps) {
    console.log(visionStatement);

    return (
        <div className="relative bg-white/80 dark:bg-[#0b121d]/80 backdrop-blur-md border border-cyan-400/10 rounded-2xl p-6 md:p-8 overflow-hidden transition-all hover:shadow-lg hover:shadow-cyan-400/10 hover:-translate-y-1">
            {/* Soft aura */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/10 via-transparent to-cyan-400/10 blur-3xl" />

            {/* Floating glow orb */}
            <div className="absolute top-6 right-6 w-16 h-16 bg-cyan-400/20 rounded-full blur-2xl animate-pulse" />

            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 rounded-full bg-cyan-400/10 text-cyan-400">
                        <Eye className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        {visionStatement.title || 'Our Vision'}
                    </h2>
                </div>

                {/* Description */}
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    {visionStatement.description}
                </p>

                {/* Sub highlight */}
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
                    <span className="text-sm font-medium text-emerald-400">
                        Saving Lives Daily
                    </span>
                </div>

                {/* List */}
                <ul className="text-sm text-gray-700 dark:text-gray-400 space-y-2 list-disc list-inside leading-relaxed">
                    {visionStatement.goals.length > 0 ? (
                        visionStatement.goals.map((goal, index) => (
                            <li key={index}>{goal}</li>
                        ))
                    ) : (
                        <li>No points available.</li>
                    )}
                </ul>

                {/* Accent underline */}
                <div className="mt-6 w-20 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
            </div>
        </div>
    );
}