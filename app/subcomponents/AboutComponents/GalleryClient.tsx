// app/subcomponents/AboutComponents/GalleryClient.tsx
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

    const openModal = (index: number) => {
        setCurrentIndex(index);
        setIsOpen(true);
    };

    const closeModal = () => setIsOpen(false);

    const next = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const prev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

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

    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);


    const currentImage = images[currentIndex];

    // --- Swipe Navigation ---
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);

    const minSwipeDistance = 60; // minimum movement required

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEndX(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        const distance = touchStartX - touchEndX;

        if (Math.abs(distance) < minSwipeDistance) return;

        if (distance > 0) next();      // swipe left → next
        else prev();                   // swipe right → previous
    };


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
                                                            alt={image.caption || 'Gallery image'}
                                                            width={970}
                                                            height={700}
                                                            className="aspect-[970/700] rounded-xl object-cover shadow-lg ring-1 ring-gray-200 hover:ring-pink-300/50 transition-all"
                                                            loading="lazy"
                                                        />
                                                        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-pink-100/40 via-transparent to-sky-100/30" />
                                                        {/* CAPTION — Only if exists */}
                                                        {image.caption && (
                                                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-b-xl">
                                                                <p className="text-white text-xs sm:text-sm font-medium leading-tight line-clamp-2">
                                                                    {image.caption}
                                                                </p>
                                                            </div>
                                                        )}
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

            {/* MODAL VIEWER — Now with caption */}
            {isOpen && currentImage && (
                <div
                    className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-0 sm:p-6"
                    // onTouchStart={onTouchStart}
                    // onTouchMove={onTouchMove}
                    // onTouchEnd={onTouchEnd}
                >
                {/* Close */}
                    <button
                        onClick={closeModal}
                        className="absolute top-5 right-5 text-white/85 hover:text-white transition z-30"
                    >
                        <X size={36} />
                    </button>

                    {/* IMAGE COUNTER */}
                    <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/90 text-sm sm:text-base font-medium z-30">
                        {currentIndex + 1} / {images.length}
                    </div>

                    {/* Navigation */}
                    <div className={"block"}>
                        <button
                            onClick={prev}
                            className="absolute left-3 sm:left-10 text-white/70 hover:text-white transition z-30"
                        >
                            <ChevronLeft size={48} />
                        </button>

                        <button
                            onClick={next}
                            className="absolute right-3 sm:right-10 text-white/70 hover:text-white transition z-30"
                        >
                            <ChevronRight size={48} />
                        </button>
                    </div>



                    {/* MODAL CONTENT — WhatsApp style */}
                    <div className="flex flex-col w-full max-w-[900px] h-full py-8 px-4 sm:px-0 items-center">


                        {/* IMAGE (full height minus caption area) */}
                        <div className="flex-1 w-full flex items-center justify-center overflow-hidden">

                            <Image
                                src={urlFor(currentImage.image).width(1800).height(1200).url()}
                                alt={currentImage.caption || 'Gallery image'}
                                width={1800}
                                height={1200}
                                className="max-h-[80vh] w-auto h-auto object-contain rounded-lg shadow-2xl animate-zoomIn"
                                priority
                            />
                        </div>

                        {/* CAPTION — WhatsApp style */}
                        {currentImage.caption && (
                            <div className="w-full absolute bottom-10 max-w-[800px] mt-4 px-4">
                                <div className=" bg-white/10  text-white/95 py-3 px-4 rounded-2xl backdrop-blur-md lg:bg-black lg:border lg:border-white lg:rounded-[0px] shadow-lg max-h-[25vh] overflow-y-auto text-center text-sm sm:text-base leading-relaxed ">
                                    {currentImage.caption}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}



            {/* Animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes zoomIn {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
                .animate-zoomIn { animation: zoomIn 0.4s ease-out; }
            `}</style>
        </section>
    );
}