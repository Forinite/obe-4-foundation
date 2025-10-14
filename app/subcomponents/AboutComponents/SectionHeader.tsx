// app/subcomponents/AboutComponents/SectionHeader.tsx

interface SectionHeaderProps {
    title: string;
    description?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => {
    return (
        <div className="relative text-center mb-20 z-10">
            {/* Decorative paths */}
            <svg
                className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
                viewBox="0 0 800 200"
                preserveAspectRatio="none"
            >
                <path
                    d="M0,100 C200,150 400,50 800,120"
                    stroke="url(#grad1)"
                    strokeWidth="2"
                    fill="none"
                />
                <path
                    d="M0,130 C250,180 450,80 800,150"
                    stroke="url(#grad2)"
                    strokeWidth="1.5"
                    fill="none"
                    opacity="0.5"
                />
                <defs>
                    <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#ec4899" /> {/* pink-500 */}
                        <stop offset="100%" stopColor="#8b5cf6" /> {/* violet-500 */}
                    </linearGradient>
                    <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#a78bfa" /> {/* purple-400 */}
                        <stop offset="100%" stopColor="#f472b6" /> {/* pink-400 */}
                    </linearGradient>
                </defs>
            </svg>

            {/* Title */}
            <h1 className="relative text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-sm tracking-tight">
                {title}
            </h1>

            {/* Optional description */}
            {description && (
                <p className="relative text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    {description}
                </p>
            )}
        </div>
    );
};

export default SectionHeader;
