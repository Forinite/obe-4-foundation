//app/(component)/HomePage.tsx

import Link from 'next/link';
import VisionCard from "@/app/subcomponents/HomeComponents/VisionCard";
import MissionCard from "@/app/subcomponents/HomeComponents/MissionCard";
import ServiceCard from "@/app/subcomponents/HomeComponents/ServiceCard";
import {services} from "@/app/constants/homeData";


const HomePage: React.FC = () => {
    return (
        <main className="relative z-20 flex-1">
            {/*<HeroBackground />*/}

            <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 pt-32 max-w-screen">
                <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start relative z-30">
                    <div className="relative text-center">
                        <h1 className="text-4xl sm:text-6xl font-bold mb-4 relative z-10 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                            Dr. Obe Charity Foundation
                        </h1>
                        <p className="text-lg sm:text-xl text-foreground/80 max-w-screen mx-auto relative z-10 mb-6">
                            Transforming Rural Healthcare in Nigeria Through Preventive & Emergency Medical Services
                        </p>
                        <div className="absolute inset-0 -z-10 bg-cyan-400/20 blur-2xl rounded-full pointer-events-none"></div>
                    </div>
                    <div className="text-center sm:text-left relative z-10 cursor-default max-w-4xl">
                        <div className="space-y-6 mb-8">
                            <VisionCard />
                            <MissionCard />
                        </div>
                        <div className="grid lg:grid-cols-3 md:grid-cols-2  gap-4 text-sm mb-8">
                            {services.map((service, index) => (
                                <ServiceCard
                                    key={index}
                                    id={index + 1}
                                    icon={service.icon}
                                    title={service.title}
                                    description={service.description}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-4 items-center flex-col sm:flex-row relative z-10">
                        <Link
                            href="/donations"
                            className="rounded-md border border-solid border-transparent transition-colors flex items-center justify-center bg-gradient-to-r from-cyan-400 to-cyan-500 text-white gap-2 hover:from-cyan-500 hover:to-cyan-600 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto hover:shadow-lg hover:shadow-cyan-400/30 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2"
                        >
                            💙 Support Our Mission
                        </Link>
                        <Link
                            href="/about"
                            className="rounded-md border border-solid border-cyan-400 transition-colors flex items-center justify-center hover:bg-cyan-400/10 hover:border-cyan-400 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px] hover:shadow-lg hover:shadow-cyan-400/10 backdrop-blur-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2"
                        >
                            Learn More
                        </Link>
                    </div>
                </main>
                <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center relative z-10"></footer>
            </div>
        </main>
    );
};

export default HomePage;