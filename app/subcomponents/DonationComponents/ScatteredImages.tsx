// app/subcomponents/DonationComponents/ScatteredImages.tsx
// app/subcomponents/DonationComponents/ScatteredImages.tsx
import React from 'react';
import Image from 'next/image';
import { galleryImages } from '@/app/constants/galleryImages';
import {getGalleryImages} from "@/lib/sanity";
import {urlFor} from "@/lib/sanityImage";

const ribbonColors = [
    'from-cyan-500 to-pink-500',
    'from-emerald-500 to-teal-500',
    'from-amber-500 to-orange-500',
    'from-violet-500 to-purple-500',
    'from-cyan-500 to-blue-500',
    'from-lime-500 to-green-500',
];

const positions = [
    // Top row
    { position: '-top-[5%] left-[2%]', top: '5%', left: '2%', rotate: '-32deg', delay: 0, ribbon: 0 },
    { position: '-top-[8%] left-[18%]', top: '8%', left: '18%', rotate: '-18deg', delay: 0.1, ribbon: 1 },
    { position: '-top-[16%] left-[38%]', top: '4%', left: '38%', rotate: '-38deg', delay: 0.2, ribbon: 2 },
    { position: '-top-[14%] right-[38%]', top: '10%', right: '38%', rotate: '28deg', delay: 0.3, ribbon: 3 },
    { position: '-top-[7%] right-[18%]', top: '6%', right: '18%', rotate: '15deg', delay: 0.4, ribbon: 4 },
    { position: '-top-[5%] right-[3%]', top: '8%', right: '2%', rotate: '-25deg', delay: 0.5, ribbon: 5 },

    // Bottom row
    { position: '-bottom-[8%] left-[5%]', bottom: '8%', left: '5%', rotate: '32deg', delay: 0.6, ribbon: 0 },
    { position: '-bottom-[12%] left-[22%]', bottom: '12%', left: '22%', rotate: '-22deg', delay: 0.7, ribbon: 1 },
    { position: '-bottom-[16%] left-[42%]', bottom: '6%', left: '42%', rotate: '40deg', delay: 0.8, ribbon: 2 },
    { position: '-bottom-[18%] right-[42%]', bottom: '10%', right: '42%', rotate: '-30deg', delay: 0.9, ribbon: 3 },
    { position: '-bottom-[8%]  right-[22%]', bottom: '8%', right: '22%', rotate: '20deg', delay: 1, ribbon: 4 },
    { position: '-bottom-[8%] right-[5%]', bottom: '10%', right: '5%', rotate: '-35deg', delay: 1.1, ribbon: 5 },
];

export default async function ScatteredImages() {
    const images = await getGalleryImages();

    return (

    <div className="absolute inset-0 pointer-events-none ">
            {positions.map((pos, i) => {
                const imgIndex = i % galleryImages.length;
                const ribbon = ribbonColors[pos.ribbon];

                return (
                    <div className={`group absolute ${pos.position} ${pos.rotate} w-28 perspective-1000`}>
                        <div className="relative transition-all duration-500 group-hover:-translate-y-2 group-hover:-rotate-[36deg] -rotate-[20deg] preserve-3d " >
                            <div className="relative bg-white p-2 rounded-xl shadow-2xl ring-1 ring-black/5 before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-t before:from-black/5 before:mix-blend-overlay " style={{borderRadius: '50% 50% 30% 30%'}}>
                                <div className={`absolute -top-1 -right-1 z-10 p-2 text-[10px] font-bold text-white bg-gradient-to-r ${ribbon} rounded-full shadow-lg animate-pulse`}></div>
                                <div className="overflow-hidden rounded-lg ring-1 ring-black/10 bg-gradient-to-br from-neutral-100 to-neutral-50 " style={{borderRadius: '80% 80% 50% 50%'}}>
                                    <Image src={urlFor(images[imgIndex].image).url()} alt="Latest" width={1080} height={1080} className="w-full h-24 object-cover transition-transform duration-700 group-hover:scale-110"/>
                                </div>
                            </div>
                            <div className="absolute inset-0 blur-2xl opacity-30 bg-cyan-400  scale-90 -z-10 animate-ping"/>
                        </div>
                    </div>

                )})};
            </div>
            )}