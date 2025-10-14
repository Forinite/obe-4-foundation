//app/subcomponents/FooterComponents/ProgramLinks.tsx

import Link from "next/link";
import { programLinks } from "@/app/constants/footerLinks";

const ProgramLinks: React.FC = () => {
    return (
        <div>
            <h3 className="font-semibold text-blue-400 mb-4 text-lg">Our Programs</h3>
            <ul className="space-y-3">
                {programLinks.map((link) => (
                    <li key={link.href} className="group relative">
                        <Link
                            href={link.href}
                            className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm flex items-center gap-2"
                        >
                            <span className="inline-block w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProgramLinks;
