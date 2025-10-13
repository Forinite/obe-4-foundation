
import Donations from '@/app/subcomponents/DonationComponents/Donations';
import { Metadata } from 'next';
import Footer from "@/app/subcomponents/Footer";

export const metadata: Metadata = {
    title: 'Donate | Dr. Obe Charity Foundation',
    description:
        'Support Dr. Obe Charity Foundation by donating to provide life-saving healthcare services to underserved communities in rural Nigeria.',
    openGraph: {
        title: 'Donate | Dr. Obe Charity Foundation',
        description:
            'Your donation helps us provide life-saving healthcare services to underserved communities in rural Nigeria.',
        url: 'https://yourdomain.com/donations',
        type: 'website',
    },
};

export default function DonationsPage() {
    return (
        <>
            <Donations />
            <Footer />
        </>
    );
}