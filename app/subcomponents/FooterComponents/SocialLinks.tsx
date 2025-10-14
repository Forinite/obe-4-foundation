//app/subcomponents/FooterComponents/SocialLinks.tsx
import { LinkedinIcon, TwitterIcon } from "lucide-react";

const socialLinks = [
    { href: "https://twitter.com", label: "Twitter", icon: TwitterIcon },
    { href: "https://linkedin.com", label: "LinkedIn", icon: LinkedinIcon },
];

const SocialLinks: React.FC = () => {
    return (
        <div className="flex space-x-4 mt-4">
            {socialLinks.map((link) => (
                <a
                    key={link.href}
                    href={link.href}
                    aria-label={link.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-gray-800/60 border border-gray-700/60
                     hover:border-cyan-400/30 hover:bg-gray-800/80
                     transition-all duration-300 group relative overflow-hidden"
                >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-cyan-400 blur-xl transition-opacity duration-300" />
                    <link.icon className="h-5 w-5 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
                </a>
            ))}
        </div>
    );
};

export default SocialLinks;
