//app/subcomponents/DonationComponents/Donations.tsx

import {
    accountCards,
    donationHeader, donationMethods,
    impactStats,
    importantNotes,
} from '@/app/constants/donationData';
import DonationHeader from '@/app/subcomponents/DonationComponents/DonationHeader';
import ImpactCard from '@/app/subcomponents/DonationComponents/ImpactCard';
import ImportantNote from '@/app/subcomponents/DonationComponents/ImportantNote';
import DonationForm from '@/app/subcomponents/DonationComponents/DonationForm';
import DonationMethodCard from "@/app/subcomponents/DonationComponents/DonationMethodCard";
import AccountCard from "@/app/subcomponents/DonationComponents/AccountCard";
import ScatteredImages from "@/app/subcomponents/DonationComponents/ScatteredImages";

const Donations: React.FC = () => {
    return (
        <main className="relative z-20 max-w-screen overflow-hidden ">
            <div className="pt-32 px-4 sm:px-8 pb-20 select-none min-h-screen">
                <div className="max-w-6xl mx-auto">
                    <div className=" relative flex flex-col items-center justify-center  z-10 my-12 min-h-[400px] my-[100px]" >
                        <DonationHeader />
                        <ScatteredImages />
                    </div>

                    <section className="grid md:grid-cols-3 gap-6 mt-40 mb-8">
                        {impactStats.map((stat, i) => (
                            <ImpactCard
                                key={i}
                                icon={stat.icon}
                                value={stat.value}
                                label={stat.label}
                            />
                        ))}
                    </section>

                    <section className="relative max-w-5xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-semibold  my-20 text-center text-cyan-400">
                            Choose Your Preferred Donation Method
                        </h2>

                        <div className=" hidden lg:block">
                            {accountCards.map((card, i) => (
                                <AccountCard key={i} {...card} />
                            ))}
                        </div>
                        <DonationForm />

                        <div className=" mt-4 grid md:grid-cols-2 gap-8 lg:hidden">
                            {accountCards.map((card, i) => (
                                <AccountCard key={i} {...card} />
                            ))}
                        </div>


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