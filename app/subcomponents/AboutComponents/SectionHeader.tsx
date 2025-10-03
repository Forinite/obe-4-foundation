//app/subcomponents/AboutComponents/SectionHeader.tsx


interface SectionHeaderProps {
    title: string;
    description?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => {
    return (
        <div className="relative text-center mb-16 z-10">
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                {title}
            </h1>
            {description && (
                <p className="text-xl text-foreground/70 max-w-3xl mx-auto">{description}</p>
            )}
        </div>
    );
};

export default SectionHeader;