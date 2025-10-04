//app/subcomponents/AboutComponents/MissionCard.tsx

import HeroBackground from "@/app/subcomponents/HeroBackground";
import {missionInfo, missionStatements} from "@/app/constants/homeData";

const MissionCard: React.FC = () => {
    return (
        <div className="bg-background/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-6 relative overflow-hidden cursor-pointer" style={{ transform: 'none' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-cyan-400/10 rounded-lg" style={{ transform: 'none', opacity: 0.3 }}></div>
            <div className="relative z-10">
                <h2 className="text-2xl font-semibold mb-4 text-cyan-400 pr-8" style={{ transform: 'none', letterSpacing: '0em' }}>
                    Our Mission
                </h2>
                <div className="text-foreground/80 " style={{opacity: 1, transform: 'none'}}>
                    {
                        missionStatements.slice(0,1).map((item, index ) => (
                            <p key={index} className="text-foreground/80 mb-4">
                                {item}
                            </p>
                        ))
                    }

                </div>
            </div>
        </div>
    );
};

export default MissionCard;