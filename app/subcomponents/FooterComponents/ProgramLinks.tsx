//app/subcomponents/FooterComponents/ProgramLinks.tsx


import Link from 'next/link';
import {programLinks} from "@/app/constants/footerLinks";

const ProgramLinks: React.FC = () => {
    return (
        <div>
            <h3 className="font-semibold text-foreground mb-4">Our Programs</h3>
            <ul className="space-y-3">
                {programLinks.map((link) => (
                    <li key={link.href}>
                        <Link href={link.href} className="text-foreground/70 hover:text-cyan-400 transition-colors duration-200 text-sm">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProgramLinks;