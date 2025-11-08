//app/subcomponents/AboutComponents/MissionCard.tsx

import { missionStatements } from "@/app/constants/homeData";
interface MissionCardProps {
    missionStatements: string[];
}

const MissionCard: React.FC<MissionCardProps> = ({ missionStatements }) => {
    return (
        <div className="relative group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-500 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_left,rgba(255,100,150,0.15),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(180,120,255,0.15),transparent_60%)]" />
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-tr from-pink-200/50 to-purple-200/30 rounded-full blur-3xl opacity-60 group-hover:opacity-90 transition-opacity duration-700" />

            <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500 bg-clip-text text-transparent">
                    Our Mission
                </h2>

                <div className="space-y-4">
                    {missionStatements.slice(0, 1).map((item, index) => (
                        <p
                            key={index}
                            className="text-gray-700 leading-relaxed text-[15px] sm:text-base tracking-wide"
                        >
                            {item}
                        </p>
                    ))}
                </div>

                <div className="mt-6 h-[2px] w-24 bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 rounded-full" />
            </div>
        </div>
    );
};

export default MissionCard;
