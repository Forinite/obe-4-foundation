//app/subcomponents/HomeComponents/ServiceCard.tsx
'use client';
import React, { useRef } from 'react';
import CardParticles from "@/app/subcomponents/HomeComponents/CardParticles";

interface ServiceCardProps {
    id: number;
    icon: string;
    title: string;
    description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ id, icon, title, description }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative bg-black border border-sky-500/30 backdrop-blur-md rounded-2xl p-6 md:p-8 
      text-center transition-transform duration-300 ease-out overflow-hidden w-full ${
                id === 3 ? 'md:col-span-2 lg:col-span-1' : ''
            }`}
        >
            {/* floating particles behind content */}
            <CardParticles />

            {/* subtle gradient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 via-transparent to-sky-600/10 rounded-2xl pointer-events-none"></div>

            {/* card content */}
            <div className="relative z-10">
                <div className="text-4xl mb-3 text-sky-400 drop-shadow-md">{icon}</div>
                <h3 className="font-semibold mb-2 text-sky-300 text-lg md:text-xl tracking-wide">
                    {title}
                </h3>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default ServiceCard;

