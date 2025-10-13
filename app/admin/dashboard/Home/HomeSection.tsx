// app/admin/dashboard/Home/HomeSection.tsx

import { HomeData } from '@/app/types';

import { Plus } from 'lucide-react';
import MissionStatementCard from "@/app/(components)/adminComponents/Home/MissionStatementCard";
import MissionInfoCard from "@/app/(components)/adminComponents/Home/MissionInfoCard";
import ServiceCard from "@/app/(components)/adminComponents/Home/ServiceCard";

interface HomeSectionProps {
    data: HomeData;
}

export default function HomeSection({ data }: HomeSectionProps) {
    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Mission Statements</h3>
                    <button className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300">
                        <Plus className="w-5 h-5" />
                        Add Statement
                    </button>
                </div>
                <div className="space-y-4">
                    {data.missionStatements.map((statement, index) => (
                        <MissionStatementCard key={index} statement={statement} index={index} />
                    ))}
                </div>
            </div>
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Mission Info</h3>
                    <button className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300">
                        <Plus className="w-5 h-5" />
                        Add Mission Info
                    </button>
                </div>
                <MissionInfoCard data={data.missionInfo} />
            </div>
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Services</h3>
                    <button className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300">
                        <Plus className="w-5 h-5" />
                        Add Service
                    </button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.services.map((service, index) => (
                        <ServiceCard key={index} service={service} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}