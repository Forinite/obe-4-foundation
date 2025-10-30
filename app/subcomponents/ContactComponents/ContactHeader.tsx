//app/subcomponents/ContactComponents/ContactHeader.tsx

import { cn } from "@/lib/utils";

interface ContactHeaderProps {
    className?: string;
}

const ContactHeader: React.FC<ContactHeaderProps> = ({ className }) => {
    return (
        <header
            className={cn(
                "relative text-center mb-20 py-10 sm:py-16 overflow-hidden rounded-3xl",
                "bg-gradient-to-br from-pink-100/70 via-white/90 to-purple-100/60 backdrop-blur-md",
                "shadow-[0_4px_40px_-10px_rgba(175,100,255,0.2)] border border-pink-200/50",
                className
            )}
        >
            {/* Decorative shapes */}
            <div className="absolute inset-0 overflow-hidden -z-10">
                <div className="absolute top-0 left-1/4 w-40 h-40 bg-pink-300/40 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/3 w-56 h-56 bg-purple-300/30 rounded-full blur-3xl animate-pulse delay-200" />
            </div>

            {/* Header text */}
            <h1 className="text-3xl sm:text-5xl px-4 font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent tracking-tight">
                Partner With Our Mission
            </h1>
            <p className="text-base sm:text-lg px-4 text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Join us in transforming rural healthcare across Nigeria. Whether you’re
                looking to volunteer, donate, or collaborate, we’d love to hear from you.
            </p>
        </header>
    );
};

export default ContactHeader;
