//app/subcomponents/ContactComponents/ContactHeader.tsx

import {cn} from "@/lib/utils";


interface ContactHeaderProps {
    className?: string;
}

const ContactHeader: React.FC<ContactHeaderProps> = ({ className }) => {
    return (
        <div className={cn('text-center mb-16 relative z-10', className)}>
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 cursor-default bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Partner With Our Mission
            </h1>
            <p className="text-base sm:text-lg text-foreground/70 max-w-2xl mx-auto cursor-default">
                Join us in transforming rural healthcare in Nigeria. Whether you’re
                interested in volunteering, donating, or partnering with us, we’d love to
                hear from you.
            </p>
        </div>
    );
};

export default ContactHeader;