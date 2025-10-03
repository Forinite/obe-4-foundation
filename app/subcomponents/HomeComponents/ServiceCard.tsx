//app/subcomponents/HomeComponents/ServiceCard.tsx

interface ServiceCardProps {
    id: number;
    icon: string;
    title: string;
    description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ id, icon, title, description }) => {
    return (
        <div className={`bg-background/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-4 md:p-6 text-center w-full ${id ==3? 'md:col-span-2 lg:col-span-1' : ''}`} >
            <div className="text-2xl md:text-3xl mb-2">{icon}</div>
            <h3 className="font-semibold mb-2 text-cyan-400 text-base md:text-lg">{title}</h3>
            <p className="text-foreground/70 text-sm md:text-base">{description}</p>
        </div>
    );
};

export default ServiceCard;