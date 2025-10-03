//app/subcomponents/AboutComponents/ObjectiveCard.tsx

interface ObjectiveCardProps {
    icon: string;
    title: string;
    items: string[];
}

const ObjectiveCard: React.FC<ObjectiveCardProps> = ({ icon, title, items }) => {
    return (
        <div className="bg-background/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-6">
            <div className="flex items-center mb-4">
                <div className="text-3xl mr-4">{icon}</div>
                <h3 className="text-lg font-medium text-cyan-400">{title}</h3>
            </div>
            <ul className="list-disc list-inside space-y-2 text-sm text-foreground/70">
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default ObjectiveCard;