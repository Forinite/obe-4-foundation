//app/subcomponents/FooterComponents/SocialLinks.tsx


import {LinkedinIcon, TwitterIcon} from "lucide-react";

const socialLinks = [
    { href: 'https://twitter.com', label: 'Twitter', icon: TwitterIcon },
    { href: 'https://linkedin.com', label: 'LinkedIn', icon: LinkedinIcon },
];

const SocialLinks: React.FC = () => {
    return (
        <div className="flex space-x-4">
            {socialLinks.map((link) => (
                <a
                    key={link.href}
                    href={link.href}
                    className="p-2 rounded-lg bg-accent/50 hover:bg-accent transition-colors duration-200 group"
                    aria-label={link.label}
                >
                    <link.icon className="h-5 w-5 text-foreground/70 group-hover:text-cyan-400 transition-colors duration-200" />
                </a>
            ))}
        </div>
    );
};

export default SocialLinks;