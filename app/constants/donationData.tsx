//app/contants/donationData.tsx

import { Heart, Building2, DollarSign, CreditCard } from 'lucide-react';

export const donationHeader = {
    title: 'Support Our Mission',
    description:
        'Your donation helps us provide life-saving healthcare services to underserved communities in rural Nigeria',
};

export const impactStats = [
    {
        icon: Heart,
        value: '10,000+',
        label: 'Lives Impacted',
    },
    {
        icon: Building2,
        value: '50+',
        label: 'Villages Served',
    },
    {
        icon: DollarSign,
        value: '95%',
        label: 'Funds to Programs',
    },
];

export const donationMethods = [
    {
        title: 'Nigerian Naira Account',
        subtitle: 'Local Bank Transfer',
        icon: Building2,
        gradient: 'from-green-500/15 to-emerald-600/15',
        details: [
            { label: 'Account Name', value: 'Dr. Obe Charity Foundation' },
            { label: 'Account Number', value: '1312584189' },
            { label: 'Bank Name', value: 'Zenith Bank Plc' },
        ],
    },
    {
        title: 'USD Account',
        subtitle: 'Dollar Account',
        icon: DollarSign,
        gradient: 'from-blue-500/15 to-cyan-600/15',
        details: [
            { label: 'Account Number', value: '9159992005' },
            { label: 'Bank Name', value: 'Bank of America' },
        ],
    },
    {
        title: 'PayPal',
        subtitle: 'International Transfer',
        icon: CreditCard,
        gradient: 'from-purple-500/15 to-indigo-600/15',
        details: [{ label: 'Account', value: '@obecharity' }],
    },
    {
        title: 'CashApp',
        subtitle: 'Digital Donations',
        icon: () => <span className="text-lg font-bold">₿</span>, // Custom icon
        gradient: 'from-orange-500/15 to-amber-600/15',
        details: [{ label: 'Account', value: '@obecharityfoundation' }],
    },
];

export const importantNotes = [
    'All donations are tax-deductible in applicable jurisdictions',
    'All donations go directly to healthcare programs',
    'Monthly impact reports sent to all donors',
    'All transactions are secure and encrypted',
    'Email us at obefoundation4charity@gmail.com after donation',
    'Receipts and confirmations provided for all contributions',
];


export const accountCards = [
    {
        bankName: 'Zenith Bank',
        accountName: 'Dr. Obe Charity Foundation',
        accountNumber: '1312584189',
        gradient: 'from-red-500 via-gray-200 to-red-600',
        textColor: 'text-red-600',
        position: 'lg:left-0',
    },
    {
        bankName: 'Bank of America',
        accountName: 'Dr. Obe Charity Foundation',
        accountNumber: '9159992005',
        gradient: 'from-blue-500 via-gray-200 to-blue-600',
        textColor: 'text-blue-600',
        position: 'lg:right-8',
    },
    {
        bankName: 'PayPal',
        accountName: 'Dr. Obe Charity Foundation',
        accountNumber: '@obecharity',
        gradient: 'from-blue-800 via-gray-200 to-blue-900',
        textColor: 'text-blue-900',
        position: 'lg:left-8 lg:top-80',
    },
    {
        bankName: 'CashApp',
        accountName: 'Dr. Obe Charity Foundation',
        accountNumber: '@obecharityfoundation',
        gradient: 'from-orange-500 via-gray-200 to-orange-900',
        textColor: 'text-orange-600',
        position: 'lg:right-0 lg:top-80',
    },
];
