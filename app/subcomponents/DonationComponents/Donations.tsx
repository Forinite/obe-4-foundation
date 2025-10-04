//app/subcomponents/DonationComponents/Donations.tsx
import { donationHeader, impactStats, donationMethods, importantNotes } from '@/app/constants/donationData';
import DonationHeader from "@/app/subcomponents/DonationComponents/DonationHeader";
import ImpactCard from "@/app/subcomponents/DonationComponents/ImpactCard";
import DonationMethodCard from "@/app/subcomponents/DonationComponents/DonationMethodCard";
import ImportantNote from "@/app/subcomponents/DonationComponents/ImportantNote";
import {Building, Building2, CreditCard, DollarSign} from "lucide-react";

const Donations: React.FC = () => {


    return (
        <main className="relative z-20 flex-1">
            <div className="pt-32 px-4 sm:px-8 pb-20 select-none min-h-screen">
                <div className="max-w-6xl mx-auto">
                    <DonationHeader />
                    <div className="grid md:grid-cols-3 gap-6 mt-12 mb-8">
                        {impactStats.map((stat, index) => (
                            <ImpactCard
                                key={index}
                                icon={stat.icon}
                                value={stat.value}
                                label={stat.label}
                            />
                        ))}
                    </div>
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center text-cyan-400">
                            Choose Your Preferred Donation Method
                        </h2>
                        <div className="grid lg:grid-cols-2 gap-8">
                            {donationMethods.map((method, index) => (
                                <DonationMethodCard
                                    key={index}
                                    title={method.title}
                                    subtitle={method.subtitle}
                                    icon={method.icon}
                                    gradient={method.gradient}
                                    details={method.details}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="mt-16 max-w-4xl mx-auto">
                        <div className="bg-background/50 backdrop-blur-sm border border-cyan-400/20 rounded-2xl p-8">
                            <h3 className="text-xl font-semibold mb-6 text-cyan-400 text-center">
                                Important Notes
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6 text-sm text-foreground/70">
                                <div className="space-y-3">
                                    {importantNotes.slice(0, 3).map((note, index) => (
                                        <ImportantNote key={index} text={note} />
                                    ))}
                                </div>
                                <div className="space-y-3">
                                    {importantNotes.slice(3).map((note, index) => (
                                        <ImportantNote key={index} text={note} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Donations;