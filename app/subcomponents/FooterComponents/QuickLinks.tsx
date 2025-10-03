//app/subcomponents/FooterComponents/QuickLinks.tsx

import Link from 'next/link';
import {quickLinks} from "@/app/constants/footerLinks";

const QuickLinks: React.FC = () => {
    return (
        <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                    <li key={index}>
                        <Link href={link.href} className="text-foreground/70 hover:text-cyan-400 transition-colors duration-200 text-sm">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuickLinks;