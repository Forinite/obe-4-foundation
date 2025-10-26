//app/subcomponents/DonationComponents/Donations.tsx

import {
    donationHeader,
    impactStats,
    importantNotes,
} from '@/app/constants/donationData';
import DonationHeader from '@/app/subcomponents/DonationComponents/DonationHeader';
import ImpactCard from '@/app/subcomponents/DonationComponents/ImpactCard';
import ImportantNote from '@/app/subcomponents/DonationComponents/ImportantNote';
import DonationForm from '@/app/subcomponents/DonationComponents/DonationForm';

const Donations: React.FC = () => {
    return (
        <main className="relative z-20 flex-1">
            <div className="pt-32 px-4 sm:px-8 pb-20 select-none min-h-screen">
                <div className="max-w-6xl mx-auto">
                    <DonationHeader />

                    <section className="grid md:grid-cols-3 gap-6 mt-12 mb-8">
                        {impactStats.map((stat, i) => (
                            <ImpactCard
                                key={i}
                                icon={stat.icon}
                                value={stat.value}
                                label={stat.label}
                            />
                        ))}
                    </section>

                    <section className="max-w-5xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center text-cyan-400">
                            Choose Your Preferred Donation Method
                        </h2>
                        <DonationForm />
                    </section>

                    <section className="mt-16 max-w-4xl mx-auto">
                        <div className="bg-background/50 backdrop-blur-sm border border-cyan-400/20 rounded-2xl p-8">
                            <h3 className="text-xl font-semibold mb-6 text-cyan-400 text-center">
                                Important Notes
                            </h3>
                            <ul className="grid md:grid-cols-2 gap-6 text-sm text-foreground/70 list-disc list-inside">
                                {importantNotes.map((note, i) => (
                                    <ImportantNote key={i} text={note} />
                                ))}
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default Donations;