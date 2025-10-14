//app/subcomponents/AboutComponents/Gallery.tsx
'use client';

import Image from 'next/image';
import { galleryImages } from '@/app/constants/galleryImages';

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

const Gallery: React.FC = () => {
    return (
        <section className="relative py-20 px-6 sm:px-8 md:px-10 overflow-hidden">
            <style>{styles}</style>

            <div className="absolute inset-0 bg-gradient-to-b from-pink-50 via-purple-50 to-sky-50 opacity-60 -z-10" />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(255,200,255,0.3),transparent_70%),radial-gradient(circle_at_80%_80%,rgba(150,220,255,0.3),transparent_70%)] -z-10" />

            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500 bg-clip-text text-transparent">
                Our Impact Gallery
            </h2>

            <div className="mx-auto block h-[550px] sm:h-[650px] md:h-[720px] overflow-hidden rounded-3xl">
                <div className="flex size-full items-center justify-center">
                    <div className="w-[92vw] max-w-[1250px] scale-[0.75] sm:scale-[0.85] md:scale-100 transition-all">
                        <div
                            className="relative top-[250px] right-[50%] grid size-full origin-top-left grid-cols-4 gap-6 sm:gap-8"
                            style={{ transform: 'rotateX(45deg) rotateZ(-45deg)' }}
                        >
                            {[0, 1, 2, 3].map((col) => {
                                const start = col * 8;
                                const end = start + 8;
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
                                        {galleryImages.slice(start, end).map((image, index) => (
                                            <div
                                                key={index}
                                                className="relative w-[150px] sm:w-[200px] md:w-[260px] group perspective"
                                            >
                                                <div className="transition-transform duration-500 group-hover:rotate-[-3deg] group-hover:scale-[1.05]">
                                                    <Image
                                                        src={image.src}
                                                        alt={`gallery image ${index + 1}`}
                                                        width={970}
                                                        height={700}
                                                        className="aspect-[970/700] rounded-xl object-cover shadow-lg ring-1 ring-gray-200 hover:ring-pink-300/50 transition-all duration-500"
                                                        loading="lazy"
                                                    />
                                                    {/* soft overlay glow */}
                                                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-pink-100/40 via-transparent to-sky-100/30" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
