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
        <main className="relative z-20 flex-1">
            <div className="min-h-screen pt-32 px-8 pb-20">
                <div className="max-w-6xl mx-auto">
                    <SectionHeader
                        title="About Dr. Obe Charity Foundation"
                        description="Bridging the healthcare gap in underserved rural communities across Nigeria"
                    />
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <VisionCard />
                        <MissionCard />
                    </div>
                    <Gallery />
                    <ChallengeCard
                        statistic={challengeData.statistic}
                        description={challengeData.description}
                        subDescription={challengeData.subDescription}
                        items={challengeData.items}
                    />
                    <div className="max-w-5xl mx-auto mb-16">
                        <SectionHeader title="Our Objectives" />
                        <div className="grid md:grid-cols-2 gap-6">
                            {objectives.map((objective) => (
                                <ObjectiveCard
                                    key={objective.title}
                                    icon={objective.icon}
                                    title={objective.title}
                                    items={objective.items}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <SectionHeader title="Our Approach" />
                        <div className="grid md:grid-cols-3 gap-6">
                            {approach.map((item, index) => (
                                <ServiceCard
                                    key={item.title}
                                    id={index + 4}
                                    icon={item.icon}
                                    title={item.title}
                                    description={item.description}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}