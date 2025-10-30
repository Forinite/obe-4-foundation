// app/admin/dashboard/page.tsx

import HomeDashboard from '@/app/admin/dashboard/Home/page';


// Define navigation items
const navItems = [
    { name: 'Home', key: 'home' },
    { name: 'About', key: 'about' },
    { name: 'Contact', key: 'contact' },
    { name: 'Donations', key: 'donations' },
    { name: 'Footer', key: 'footer' },
];

export default function Dashboard() {

    return (

            <HomeDashboard />
    );
}