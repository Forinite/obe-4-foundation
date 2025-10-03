//app/subcomponents/AboutComponents/ChallengeCard.tsx

interface ChallengeCardProps {
    statistic: string;
    description: string;
    subDescription: string;
    items: { icon: string; text: string }[];
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
                                                         statistic,
                                                         description,
                                                         subDescription,
                                                         items,
                                                     }) => {
    return (
        <div className="bg-background/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-8 text-center">
            <div className="text-6xl font-bold text-red-400 mb-4">{statistic}</div>
            <p className="text-xl mb-4">{description}</p>
            <p className="text-lg text-foreground/70 mb-8">{subDescription}</p>
            <div className="grid md:grid-cols-4 gap-4">
                {items.map((item, index) => (
                    <div key={index} className="text-center">
                        <div className="text-2xl mb-2">{item.icon}</div>
                        <p className="text-sm text-foreground/70">{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChallengeCard;