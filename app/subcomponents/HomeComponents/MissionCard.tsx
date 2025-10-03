//app/subcomponents/HomeComponents/MissionCard.tsx

import HeroBackground from "@/app/subcomponents/HeroBackground";

const MissionCard: React.FC = () => {
    return (
        <div className="bg-background/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-6 relative overflow-hidden cursor-pointer" style={{ transform: 'none' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-cyan-400/10 rounded-lg" style={{ transform: 'none', opacity: 0.3 }}></div>
            <div className="relative z-10">
                <h2 className="text-2xl font-semibold mb-4 text-cyan-400 pr-8" style={{ transform: 'none', letterSpacing: '0em' }}>
                    Our Mission
                </h2>
                <div className="text-foreground/80 " style={{opacity: 1, transform: 'none'}}>
                    <p className="text-foreground/80 mb-4">
                        To be the first establishment that focuses on picking young unemployed youth from the streets
                        and making them useful by equipping them with lifesaving skills needed in our society, thereby
                        providing them with employment opportunities.
                    </p>
                    <p className="mb-3">
                        With the increasing death rate in our world today, from lack of preventive and
                        emergency care, there is need to embrace an initiative that sees these needs as eminent in these
                        trying times.
                    </p>
                    <p className="mb-3">
                        Many families are unable to pay for immediate healthcare when faced with
                        emergent needs that are not usually planned for. Some interventions cannot wait, as they are
                        time sensitive. CPR, blood transfusions, oxygen supplement and IV hydrations are examples of
                        interventions that must be delivered immediately, to sustain life.
                    </p>
                    <p className="mb-3">
                        As a young nurse in Nigeria, I witnessed many incidents of avoidable deaths,
                        ranging from ignorance of preventing them to lack of proper interventions, giving rise to losses
                        of many young people who should be around today.
                    </p>
                    <p className="mb-4">
                        This not-for-profit organization has been set up to curb this menace while empowering the youth
                        who are significantly unemployed in this region. We will continue to provide free trainings and
                        employ people who have been picked up from the street and rehabilitated.
                    </p>
                    <div className="text-3xl font-bold text-cyan-400">70%</div>
                    <p className="text-sm text-foreground/70">
                        of Nigeria's rural population lacks access to basic
                        healthcare
                    </p>
                    <ul className="space-y-2 text-sm text-foreground/70">
                        <li>• Establishing mobile medical units for remote communities</li>
                        <li>• Training local healthcare workers and volunteers</li>
                        <li>• Providing essential medications and medical supplies</li>
                        <li>• Creating sustainable health education programs</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MissionCard;