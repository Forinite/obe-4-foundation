//app/(components)/About/page.tsx

import { Metadata } from 'next';
import { challengeData, objectives, approach } from '@/app/constants/aboutData';
import SectionHeader from "@/app/subcomponents/AboutComponents/SectionHeader";
import VisionCard from "@/app/subcomponents/HomeComponents/VisionCard";
import MissionCard from "@/app/subcomponents/AboutComponents/MissionCard";
import Gallery from "@/app/subcomponents/AboutComponents/Gallery";
import ChallengeCard from "@/app/subcomponents/AboutComponents/ChallengeCard";
import ObjectiveCard from "@/app/subcomponents/AboutComponents/ObjectiveCard";
import ServiceCard from "@/app/subcomponents/HomeComponents/ServiceCard";

export const metadata: Metadata = {
    title: 'About | Dr. Obe Charity Foundation',
    description: 'Learn about Dr. Obe Charity Foundation’s mission, vision, and impact in transforming rural healthcare in Nigeria.',
    openGraph: {
        title: 'About | Dr. Obe Charity Foundation',
        description: 'Learn about Dr. Obe Charity Foundation’s mission, vision, and impact in transforming rural healthcare in Nigeria.',
        url: 'https://yourwebsite.com/about',
        images: ['/company-logo.png'],
    },
};

export default function About() {
    return (
        <main className="relative flex-1 bg-gradient-to-b from-white via-[#f7f7ff] to-[#f9faff] overflow-hidden">
            {/* Decorative gradient backdrop */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(255,150,200,0.15),transparent_60%),radial-gradient(circle_at_80%_40%,rgba(150,200,255,0.15),transparent_70%)]" />

            <section className="min-h-screen pt-32 px-6 md:px-10 pb-24 max-w-7xl mx-auto space-y-20">
                <div className="text-center">
                    <SectionHeader
                        title="About Dr. Obe Charity Foundation"
                        description="Bridging the healthcare gap in underserved rural communities across Nigeria"
                    />
                </div>

                {/* Vision + Mission Cards */}
                <div className="grid md:grid-cols-2 gap-10">
                    <div className="group relative bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#ffe4ec]/40 to-[#e5e5ff]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <VisionCard />
                    </div>
                    <div className="group relative bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-bl from-[#e0f3ff]/40 to-[#fbe9ff]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <MissionCard />
                    </div>
                </div>

                {/* Gallery */}
                <div className="relative">
                    <div className="absolute -inset-x-20 -top-10 h-40 bg-gradient-to-b from-[#f4f7ff]/50 to-transparent blur-2xl opacity-70 pointer-events-none" />
                    <Gallery />
                </div>

                {/* Challenge Section */}
                <div className="max-w-6xl mx-auto">
                    <ChallengeCard
                        statistic={challengeData.statistic}
                        description={challengeData.description}
                        subDescription={challengeData.subDescription}
                        items={challengeData.items}
                    />
                </div>

                {/* Objectives */}
                <div className="max-w-5xl mx-auto space-y-10">
                    <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent tracking-tight">
                        Our Objectives
                    </h1>

                    <div className="grid md:grid-cols-2 gap-8">
                        {objectives.map((objective) => (
                            <div
                                key={objective.title}
                                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#d0a9ff]/30 transition-all duration-500 p-6"
                            >
                                <ObjectiveCard
                                    icon={objective.icon}
                                    title={objective.title}
                                    items={objective.items}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Approach Section */}
                <div className="space-y-10">
                    <SectionHeader title="Our Approach" />
                    <div className="grid md:grid-cols-3 gap-8">
                        {approach.map((item, index) => (
                            <div
                                key={item.title}
                                className="group relative bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.07)] transition-all duration-500"
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#ffe5e5]/30 to-[#f0e5ff]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                                <ServiceCard
                                    id={index + 4}
                                    icon={item.icon}
                                    title={item.title}
                                    description={item.description}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
