//app/contants/contactData.tsx

import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const contactInfo = [
    {
        icon: Mail,
        title: 'Email Us',
        subtitle: 'Send us an email anytime',
        content: (
            <p className="text-foreground/80 select-text cursor-text">
                <a href="mailto:obefoundation4charity@gmail.com" className="hover:underline">
                    obefoundation4charity@gmail.com
                </a>
            </p>
        ),
    },
    {
        icon: Phone,
        title: 'Call Us',
        subtitle: 'Mon-Fri from 8am to 6pm (WAT)',
        content: (
            <>
                <p className="text-foreground/80 select-text cursor-text">
                    <a href="tel:+2349030083129" className="hover:underline">+234 9030083129</a>
                </p>
                <p className="text-foreground/80 select-text cursor-text">
                    <a href="tel:+19159992005" className="hover:underline">+1 9159992005</a>
                </p>
            </>
        ),
    },
    {
        icon: MapPin,
        title: 'Visit Us',
        subtitle: 'Our headquarters and training center',
        content: (
            <>
                <address className="text-foreground/80 not-italic select-text cursor-text">
                    Dr. Obe Charity Foundation
                    <br />
                    170 Ademola Adetokunbo Crescent
                    <br />
                    Wuse 2, Abuja
                    <br />
                    Nigeria
                </address>
                <address className="text-foreground/80 not-italic select-text cursor-text">
                    Dr. Obe Charity Foundation
                    <br />
                    14361 Earl Chokiski Ave
                    <br />
                    El Paso, TX 79938
                    <br />
                    USA
                </address>
            </>
        ),
    },
    {
        icon: Clock,
        title: 'Business Hours',
        subtitle: 'When we’re available',
        content: (
            <div className="space-y-1 text-sm text-foreground/80">
                <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
            </div>
        ),
    },
];

export const faqs = [
    {
        question: 'How can I volunteer with your organization?',
        answer: 'We welcome volunteers from various backgrounds including medical professionals, educators, and community mobilizers. Contact us to learn about current volunteer opportunities.',
    },
    {
        question: 'What areas of Nigeria do you serve?',
        answer: 'We focus on underserved rural communities across Nigeria, with mobile medical units and emergency response teams reaching the most remote areas where healthcare access is limited.',
    },
    {
        question: 'How are donations used?',
        answer: 'Donations support our mobile clinics, medical supplies, staff training, emergency response equipment, and community health education programs. We provide transparent financial reporting to all donors.',
    },
    {
        question: 'Can corporations partner with you?',
        answer: 'Yes! We actively seek corporate partnerships for CSR initiatives, employee volunteering programs, and technical support. Contact us to discuss partnership opportunities.',
    },
];