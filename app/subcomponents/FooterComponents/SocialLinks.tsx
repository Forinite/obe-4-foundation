//app/subcomponents/FooterComponents/SocialLinks.tsx
// app/subcomponents/FooterComponents/SocialLinks.tsx
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { getContactData } from "@/lib/sanity";

interface SocialLink {
    href: string;
    icon: React.FC<any>;
    label: string;
}

export default async function SocialLinks() {
    const contactData = await getContactData();

    const { twitter, linkedin, facebook, instagram } = contactData.generalInfo;

    const socialLinks: SocialLink[] = [
        twitter && { href: twitter, icon: Twitter, label: "Twitter" },
        linkedin && { href: linkedin, icon: Linkedin, label: "LinkedIn" },
        facebook && { href: facebook, icon: Facebook, label: "Facebook" },
        instagram && { href: instagram, icon: Instagram, label: "Instagram" },
    ].filter(Boolean) as SocialLink[]; // Remove falsy entries

    // If no links, render nothing (clean footer)
    if (socialLinks.length === 0) return null;

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
                    {/* Cyan glow on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-cyan-400 blur-xl transition-opacity duration-300" />

                    <link.icon className="h-5 w-5 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300 relative z-10" />
                </a>
            ))}
        </div>
    );
}