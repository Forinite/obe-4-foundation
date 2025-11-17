// app/subcomponents/AboutComponents/GalleryClient.tsx
'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { GalleryImage } from '@/app/types';
import { urlFor } from '@/lib/sanityImage';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
    images: GalleryImage[];
}

const styles = `
  @keyframes gentleFloatUp {
    0% { transform: translateY(15px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(15px); }
  }
  @keyframes gentleFloatDown {
    0% { transform: translateY(-15px); }
    50% { transform: translateY(20px); }
    100% { transform: translateY(-15px); }
  }
  @media (prefers-reduced-motion: reduce) {
    .animate-[gentleFloatUp_25s_ease-in-out_infinite],
    .animate-[gentleFloatDown_25s_ease-in-out_infinite] {
      animation: none;
    }
  }
`;

export default function GalleryClient({ images }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Open modal
    const openModal = (index: number) => {
        setCurrentIndex(index);
        setIsOpen(true);
    };

    // Close modal
    const closeModal = () => setIsOpen(false);

    // Next / Prev
    const next = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const prev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'Escape') closeModal();
        };

        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isOpen, next, prev]);

    return (
        <section className="relative py-20 px-6 sm:px-8 md:px-10 overflow-hidden">
            <style>{styles}</style>

            {/* BG layers */}
            <div className="absolute inset-0 bg-gradient-to-b from-pink-50 via-purple-50 to-sky-50 opacity-60 -z-10" />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(255,200,255,0.3),transparent_70%),radial-gradient(circle_at_80%_80%,rgba(150,220,255,0.3),transparent_70%)] -z-10" />

            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500 bg-clip-text text-transparent">
                Our Impact Gallery
            </h2>

            {/* Floating 3D Gallery */}
            <div className="mx-auto block h-[550px] sm:h-[650px] md:h-[720px] overflow-hidden rounded-3xl">
                <div className="flex size-full items-center justify-center">
                    <div className="w-[92vw] max-w-[1250px] scale-[0.75] sm:scale-[0.85] md:scale-100 transition-all">
                        <div
                            className="relative top-[250px] right-[50%] grid size-full origin-top-left grid-cols-4 gap-6 sm:gap-8"
                            style={{ transform: 'rotateX(45deg) rotateZ(-45deg)' }}
                        >
                            {[0, 1, 2, 3].map((col) => {
                                const colImages = images.filter((_, i) => i % 4 === col);
                                const isEven = col % 2 === 0;

                                return (
                                    <div
                                        key={col}
                                        className={`flex flex-col gap-6 sm:gap-8 ${
                                            isEven
                                                ? 'animate-[gentleFloatUp_25s_ease-in-out_infinite]'
                                                : 'animate-[gentleFloatDown_25s_ease-in-out_infinite]'
                                        }`}
                                    >
                                        {colImages.map((image, index) => {
                                            const originalIndex = images.indexOf(image);

                                            return (
                                                <div
                                                    key={image._id}
                                                    onClick={() => openModal(originalIndex)}
                                                    className="relative cursor-pointer w-[150px] sm:w-[200px] md:w-[260px] group perspective"
                                                >
                                                    <div className="transition-transform duration-500 group-hover:rotate-[-3deg] group-hover:scale-[1.05]">
                                                        <Image
                                                            src={urlFor(image.image).url()}
                                                            alt="gallery tile"
                                                            width={970}
                                                            height={700}
                                                            className="aspect-[970/700] rounded-xl object-cover shadow-lg ring-1 ring-gray-200 hover:ring-pink-300/50 transition-all"
                                                            loading="lazy"
                                                        />
                                                        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-pink-100/40 via-transparent to-sky-100/30" />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* ======================= */}
            {/*        MODAL VIEWER     */}
            {/* ======================= */}
            {isOpen && (
                <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
                    {/* Close Button */}
                    <button
                        onClick={closeModal}
                        className="absolute top-6 right-6 text-white hover:text-pink-300 transition"
                    >
                        <X size={32} />
                    </button>

                    {/* Prev Button */}
                    <button
                        onClick={prev}
                        className="absolute left-4 sm:left-10 text-white hover:text-pink-300 transition"
                    >
                        <ChevronLeft size={48} />
                    </button>

                    {/* NEXT Button */}
                    <button
                        onClick={next}
                        className="absolute right-4 sm:right-10 text-white hover:text-pink-300 transition"
                    >
                        <ChevronRight size={48} />
                    </button>

                    {/* MAIN IMAGE */}
                    <div className="max-w-5xl max-h-[90vh] animate-zoomIn">
                        <Image
                            src={urlFor(images[currentIndex].image).url()}
                            alt="large preview"
                            width={1800}
                            height={1200}
                            className="w-full h-auto rounded-2xl shadow-2xl"
                        />
                    </div>
                </div>
            )}

            {/* Modal Animations */}
            <style>{`
                .animate-fadeIn {
                    animation: fadeIn .25s ease-out forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0 }
                    to { opacity: 1 }
                }

                .animate-zoomIn {
                    animation: zoomIn .25s ease-out forwards;
                }
                @keyframes zoomIn {
                    from { 
                        transform: scale(.8); 
                        opacity: 0; 
                    }
                    to { 
                        transform: scale(1); 
                        opacity: 1; 
                    }
                }
            `}</style>
        </section>
    );
}
