// app/admin/dashboard/Home/HomeSection.tsx
'use client';

import { useHomeData } from '@/app/hooks/useHomeData';
import MissionStatementCard from '@/app/(components)/adminComponents/Home/MissionStatementCard';
import MissionInfoCard from '@/app/(components)/adminComponents/Home/MissionInfoCard';
import ServiceCard from '@/app/(components)/adminComponents/Home/ServiceCard';
import { Plus, RefreshCw, Info } from 'lucide-react';

export default function HomeSection() {
    const { data, loading, error, refetch } = useHomeData();

    const openAddModal = (type: 'mission' | 'info' | 'service') => {
        console.log(`Open modal to add ${type}`);
    };

    if (loading)
        return (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500 animate-pulse">
                <RefreshCw className="w-6 h-6 mb-3 animate-spin text-cyan-500" />
                <p>Loading home data...</p>
            </div>
        );

    if (error)
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4 bg-red-50 dark:bg-gray-800/30 rounded-xl border border-red-100 dark:border-gray-700">
                <Info className="w-6 h-6 text-red-500" />
                <p className="text-red-600 dark:text-red-400">{error}</p>
                <button
                    onClick={refetch}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-sm transition-all hover:shadow-md"
                >
                    Try Again
                </button>
            </div>
        );

    if (!data)
        return (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500 italic">
                <Info className="w-6 h-6 mb-2 text-cyan-500" />
                No home data available.
            </div>
        );

    return (
        <div className="space-y-12 animate-fadeIn">
            {/* Mission Statements */}
            <section className="p-6 bg-white/80 dark:bg-gray-900/50 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                        Mission Statements
                    </h3>
                    <button
                        onClick={() => openAddModal('mission')}
                        className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 px-3 py-1.5 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 hover:shadow-[0_0_10px_rgba(34,211,238,0.3)] transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Add
                    </button>
                </div>
                {data.missionStatements?.length > 0 ? (
                    <div className="space-y-4">
                        {data.missionStatements.map((statement, index) => (
                            <MissionStatementCard key={index} statement={statement} index={index} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 italic flex items-center gap-2">
                        <Info className="w-4 h-4 text-cyan-400" />
                        No mission statements found.
                    </p>
                )}
            </section>

            {/* Mission Info */}
            <section className="p-6 bg-white/80 dark:bg-gray-900/50 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                        Mission Info
                    </h3>
                    <button
                        onClick={() => openAddModal('info')}
                        className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 px-3 py-1.5 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 hover:shadow-[0_0_10px_rgba(34,211,238,0.3)] transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Add
                    </button>
                </div>
                {data.missionInfo ? (
                    <MissionInfoCard data={data.missionInfo} />
                ) : (
                    <p className="text-gray-500 italic flex items-center gap-2">
                        <Info className="w-4 h-4 text-cyan-400" />
                        No mission info available.
                    </p>
                )}
            </section>

            {/* Services */}
            <section className="p-6 bg-white/80 dark:bg-gray-900/50 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                        Services
                    </h3>
                    <button
                        onClick={() => openAddModal('service')}
                        className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 px-3 py-1.5 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 hover:shadow-[0_0_10px_rgba(34,211,238,0.3)] transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Add
                    </button>
                </div>
                {data.services?.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.services.map((service, index) => (
                            <ServiceCard key={index} service={service} index={index} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 italic flex items-center gap-2">
                        <Info className="w-4 h-4 text-cyan-400" />
                        No services listed yet.
                    </p>
                )}
            </section>
        </div>
    );
}
