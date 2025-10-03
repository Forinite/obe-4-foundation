//app/subcomponents/AboutComponents/Gallery.tsx
'use client';

import Image from 'next/image';
import { galleryImages } from '@/app/constants/galleryImages';

// Define CSS for animations
const styles = `
  @keyframes slideUp {
    0% { transform: translateY(19.1922px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(19.1922px); }
  }
  @keyframes slideDown {
    0% { transform: translateY(-77.2146px); }
    50% { transform: translateY(-37.2146px); }
    100% { transform: translateY(-77.2146px); }
  }
  @media (prefers-reduced-motion: reduce) {
    .animate-[slideUp_20s_ease-in-out_infinite],
    .animate-[slideDown_20s_ease-in-out_infinite] {
      animation: none;
    }
  }
`;

const Gallery: React.FC = () => {
    return (
        <div className="relative z-10 mb-16">
            <style>{styles}</style>
            <h2 className="text-3xl font-semibold mb-8 text-center">Our Impact Gallery</h2>
            <div className="mx-auto block h-[500px] sm:h-[600px] md:h-[700px] overflow-hidden rounded-2xl">
                <div className="flex size-full items-center justify-center">
                    <div className="w-[90vw] max-w-[1200px] scale-[0.65] sm:scale-[0.8] md:scale-[0.9] lg:scale-100">
                        <div
                            className="relative top-[200px] sm:top-[300px] md:top-[350px] right-[50%] grid size-full origin-top-left grid-cols-4 gap-4 sm:gap-6 md:gap-8"
                            style={{ transform: 'rotateX(45deg) rotateY(0deg) rotateZ(-45deg)' }}
                        >
                            {/* Column 1: Slide Up */}
                            <div
                                className="flex flex-col items-start gap-4 sm:gap-6 md:gap-8 animate-[slideUp_20s_ease-in-out_infinite]"
                                style={{ transform: 'translateY(19.1922px)' }}
                            >
                                <div
                                    className="absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)] bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)] [background-size:var(--width)_var(--height)] [mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)] [mask-composite:exclude] z-30 dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)] -left-2 sm:-left-4"
                                    style={{
                                        '--background': '#ffffff',
                                        '--color': 'rgba(0, 0, 0, 0.2)',
                                        '--height': '5px',
                                        '--width': '1px',
                                        '--fade-stop': '90%',
                                        '--offset': '80px',
                                        '--color-dark': 'rgba(255, 255, 255, 0.2)',
                                    } as React.CSSProperties}
                                />
                                {galleryImages.slice(0, 8).map((image) => (
                                    <div key={image.alt} className="relative w-[150px] sm:w-[200px] md:w-[250px]">
                                        <div
                                            className="absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))] bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)] [background-size:var(--width)_var(--height)] [mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)] [mask-composite:exclude] z-30 dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)] -top-2 sm:-top-4"
                                            style={{
                                                '--background': '#ffffff',
                                                '--color': 'rgba(0, 0, 0, 0.2)',
                                                '--height': '1px',
                                                '--width': '5px',
                                                '--fade-stop': '90%',
                                                '--offset': '20px',
                                                '--color-dark': 'rgba(255, 255, 255, 0.2)',
                                            } as React.CSSProperties}
                                        />
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            width={970}
                                            height={700}
                                            className="aspect-[970/700] rounded-lg object-cover ring ring-gray-950/5 hover:shadow-2xl cursor-pointer hover:ring-cyan-400/50 transition-all duration-300 w-full"
                                            loading="lazy"
                                            tabIndex={0}
                                        />
                                    </div>
                                ))}
                            </div>
                            {/* Column 2: Slide Down */}
                            <div
                                className="flex flex-col items-start gap-4 sm:gap-6 md:gap-8 animate-[slideDown_20s_ease-in-out_infinite]"
                                style={{ transform: 'translateY(-77.2146px)' }}
                            >
                                <div
                                    className="absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)] bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)] [background-size:var(--width)_var(--height)] [mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)] [mask-composite:exclude] z-30 dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)] -left-2 sm:-left-4"
                                    style={{
                                        '--background': '#ffffff',
                                        '--color': 'rgba(0, 0, 0, 0.2)',
                                        '--height': '5px',
                                        '--width': '1px',
                                        '--fade-stop': '90%',
                                        '--offset': '80px',
                                        '--color-dark': 'rgba(255, 255, 255, 0.2)',
                                    } as React.CSSProperties}
                                />
                                {galleryImages.slice(8, 16).map((image) => (
                                    <div key={image.alt} className="relative w-[150px] sm:w-[200px] md:w-[250px]">
                                        <div
                                            className="absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))] bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)] [background-size:var(--width)_var(--height)] [mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)] [mask-composite:exclude] z-30 dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)] -top-2 sm:-top-4"
                                            style={{
                                                '--background': '#ffffff',
                                                '--color': 'rgba(0, 0, 0, 0.2)',
                                                '--height': '1px',
                                                '--width': '5px',
                                                '--fade-stop': '90%',
                                                '--offset': '20px',
                                                '--color-dark': 'rgba(255, 255, 255, 0.2)',
                                            } as React.CSSProperties}
                                        />
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            width={970}
                                            height={700}
                                            className="aspect-[970/700] rounded-lg object-cover ring ring-gray-950/5 hover:shadow-2xl cursor-pointer hover:ring-cyan-400/50 transition-all duration-300 w-full"
                                            loading="lazy"
                                            tabIndex={0}
                                        />
                                    </div>
                                ))}
                            </div>
                            {/* Column 3: Slide Up */}
                            <div
                                className="flex flex-col items-start gap-4 sm:gap-6 md:gap-8 animate-[slideUp_20s_ease-in-out_infinite]"
                                style={{ transform: 'translateY(19.1922px)' }}
                            >
                                <div
                                    className="absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)] bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)] [background-size:var(--width)_var(--height)] [mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)] [mask-composite:exclude] z-30 dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)] -left-2 sm:-left-4"
                                    style={{
                                        '--background': '#ffffff',
                                        '--color': 'rgba(0, 0, 0, 0.2)',
                                        '--height': '5px',
                                        '--width': '1px',
                                        '--fade-stop': '90%',
                                        '--offset': '80px',
                                        '--color-dark': 'rgba(255, 255, 255, 0.2)',
                                    } as React.CSSProperties}
                                />
                                {galleryImages.slice(16, 24).map((image) => (
                                    <div key={image.alt} className="relative w-[150px] sm:w-[200px] md:w-[250px]">
                                        <div
                                            className="absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))] bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)] [background-size:var(--width)_var(--height)] [mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)] [mask-composite:exclude] z-30 dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)] -top-2 sm:-top-4"
                                            style={{
                                                '--background': '#ffffff',
                                                '--color': 'rgba(0, 0, 0, 0.2)',
                                                '--height': '1px',
                                                '--width': '5px',
                                                '--fade-stop': '90%',
                                                '--offset': '20px',
                                                '--color-dark': 'rgba(255, 255, 255, 0.2)',
                                            } as React.CSSProperties}
                                        />
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            width={970}
                                            height={700}
                                            className="aspect-[970/700] rounded-lg object-cover ring ring-gray-950/5 hover:shadow-2xl cursor-pointer hover:ring-cyan-400/50 transition-all duration-300 w-full"
                                            loading="lazy"
                                            tabIndex={0}
                                        />
                                    </div>
                                ))}
                            </div>
                            {/* Column 4: Slide Down */}
                            <div
                                className="flex flex-col items-start gap-4 sm:gap-6 md:gap-8 animate-[slideDown_20s_ease-in-out_infinite]"
                                style={{ transform: 'translateY(-77.2146px)' }}
                            >
                                <div
                                    className="absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)] bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)] [background-size:var(--width)_var(--height)] [mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)] [mask-composite:exclude] z-30 dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)] -left-2 sm:-left-4"
                                    style={{
                                        '--background': '#ffffff',
                                        '--color': 'rgba(0, 0, 0, 0.2)',
                                        '--height': '5px',
                                        '--width': '1px',
                                        '--fade-stop': '90%',
                                        '--offset': '80px',
                                        '--color-dark': 'rgba(255, 255, 255, 0.2)',
                                    } as React.CSSProperties}
                                />
                                {galleryImages.slice(24, 32).map((image) => (
                                    <div key={image.alt} className="relative w-[150px] sm:w-[200px] md:w-[250px]">
                                        <div
                                            className="absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))] bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)] [background-size:var(--width)_var(--height)] [mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)] [mask-composite:exclude] z-30 dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)] -top-2 sm:-top-4"
                                            style={{
                                                '--background': '#ffffff',
                                                '--color': 'rgba(0, 0, 0, 0.2)',
                                                '--height': '1px',
                                                '--width': '5px',
                                                '--fade-stop': '90%',
                                                '--offset': '20px',
                                                '--color-dark': 'rgba(255, 255, 255, 0.2)',
                                            } as React.CSSProperties}
                                        />
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            width={970}
                                            height={700}
                                            className="aspect-[970/700] rounded-lg object-cover ring ring-gray-950/5 hover:shadow-2xl cursor-pointer hover:ring-cyan-400/50 transition-all duration-300 w-full"
                                            loading="lazy"
                                            tabIndex={0}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;