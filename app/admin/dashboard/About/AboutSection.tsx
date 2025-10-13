// app/admin/dashboard/About/AboutSection.tsx

import { AboutData } from '@/app/types';

import { Plus } from 'lucide-react';
import ObjectiveCard from "@/app/(components)/adminComponents/About/ObjectiveCard";
import ApproachCard from "@/app/(components)/adminComponents/About/ApproachCard";
import ChallengeDataCard from "@/app/(components)/adminComponents/About/ChallengeDataCard";

interface AboutSectionProps {
    data: AboutData;
}

export default function AboutSection({ data }: AboutSectionProps) {
    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Challenge Data</h3>
                    <button className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors">
                        <Plus className="w-5 h-5" />
                        <span>Edit Challenge Data</span>
                    </button>
                </div>
                <ChallengeDataCard data={data.challengeData} />
            </div>
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Objectives</h3>
                    <button className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors">
                        <Plus className="w-5 h-5" />
                        <span>Add Objective</span>
                    </button>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    {data.objectives.map((objective, index) => (
                        <ObjectiveCard key={index} objective={objective} index={index} />
                    ))}
                </div>
            </div>
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Approach</h3>
                    <button className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors">
                        <Plus className="w-5 h-5" />
                        <span>Add Approach</span>
                    </button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.approach.map((approach, index) => (
                        <ApproachCard key={index} approach={approach} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}