//app/(component)/HomePage.tsx

import Link from "next/link";
import { Calendar, HeartPulse, Stethoscope, Users } from "lucide-react";
import VisionCard from "@/app/subcomponents/HomeComponents/VisionCard";
import MissionCard from "@/app/subcomponents/HomeComponents/MissionCard";
import ServiceCard from "@/app/subcomponents/HomeComponents/ServiceCard";
import { services } from "@/app/constants/homeData";

export const dynamic = "force-static";

export default function HomePage() {
    return (
        <main className="relative min-h-screen w-full overflow-hidden bg-[#060b14] text-gray-200">
            {/* Particle & gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a1624] via-[#09101d] to-[#050910]" />
            <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 60 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-cyan-400/40 rounded-full blur-sm"
                        style={{
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `float ${3 + Math.random() * 5}s ease-in-out ${Math.random() * 5}s infinite`,
                        }}
                    />
                ))}
            </div>

            {/* Hero */}
            <section className="relative z-10 flex flex-col items-center justify-center text-center pt-28 pb-20 px-6 md:px-12">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg mb-4">
                    Dr. Obe Charity Foundation
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    Transforming rural healthcare in Nigeria through compassionate, preventive, and emergency medical services.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                    <Link
                        href="/donations"
                        className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg shadow-cyan-400/20 hover:scale-105 transition-transform"
                    >
                        💙 Support Our Mission
                    </Link>
                    <Link
                        href="/about"
                        className="border border-cyan-400/50 text-cyan-400 px-8 py-3 rounded-full font-semibold hover:bg-cyan-400/10 transition-all"
                    >
                        Learn More
                    </Link>
                </div>
            </section>

            {/* Vision + Mission */}
            <section className="relative z-10 px-6 md:px-12 py-10 max-w-6xl mx-auto space-y-12">
                <VisionCard />
                <MissionCard />
            </section>

            {/* Services */}
            <section className="relative z-10 py-20 px-6 md:px-12 border-t border-cyan-400/10">
                <h2 className="text-center text-3xl sm:text-4xl font-bold mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Our Core Services
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {services.map((service, i) => (
                        <ServiceCard key={i} id={i + 1} icon={service.icon} title={service.title} description={service.description} />
                    ))}
                </div>
            </section>

            {/* Highlights */}
            <section className="relative z-10 py-20 border-t border-cyan-400/10 bg-[#070e18]/70">
                <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center text-gray-300">
                    {[
                        { icon: <HeartPulse className="w-6 h-6 text-cyan-400 mx-auto" />, label: "Lives Impacted", value: "10,000+" },
                        { icon: <Stethoscope className="w-6 h-6 text-cyan-400 mx-auto" />, label: "Volunteers", value: "150+" },
                        { icon: <Calendar className="w-6 h-6 text-cyan-400 mx-auto" />, label: "Communities Served", value: "45" },
                        { icon: <Users className="w-6 h-6 text-cyan-400 mx-auto" />, label: "Partnerships", value: "25+" },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="bg-[#0b1625]/60 rounded-2xl py-6 backdrop-blur-sm border border-cyan-400/10 shadow-sm hover:shadow-cyan-400/10 transition-all hover:-translate-y-1"
                        >
                            {stat.icon}
                            <h3 className="text-2xl font-bold mt-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                {stat.value}
                            </h3>
                            <p className="text-sm opacity-70">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}

