//app/contants/contactData.tsx

import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const generalInfo = {
    address1: `170 Ademola Adetokunbo Crescent Wuse 2, Abuja, Nigeria`,
    address2: `14361 Earl Chokiski Ave El Paso TX 79938, USA`,
    phone1: `+234 9030083129`,
    phone2: `+1 9159992005`,
    email: `obefoundation4charity@gmail.com`,
    twitter: `https://twitter.com/obefoundation4c`,
    linkedin: `https://www.linkedin.com/company/obe-foundation-4-charity`,
    openDays: [
        {day: 'Monday-Friday', time: '8:00 AM - 6:00 PM (WAT)'},
        {day: 'Saturday', time: '9:00 AM - 4:00 PM'},
        {day: 'Sunday', time: 'Closed'},
    ],
    charity: "Dr. Obe Charity Foundation",
}

export const contactInfo = [
    {
        icon: Mail,
        title: 'Email Us',
        subtitle: 'Send us an email anytime',
        content: (
            <p className="text-foreground/80 select-text cursor-text">
                <a href={`mailto:${generalInfo.email}`} className="hover:underline">
                    {generalInfo.email}
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
                    <a href={`tel:${generalInfo.phone1}`} className="hover:underline">{generalInfo.phone1}</a>
                </p>
                <p className="text-foreground/80 select-text cursor-text">
                    <a href={`tel:${generalInfo.phone1}`} className="hover:underline">{generalInfo.phone2}</a>
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
                <address className="text-foreground/80 not-italic select-text cursor-text mb-3">
                    {generalInfo.charity}
                    <br />
                    {generalInfo.address1}
                </address>
                <address className="text-foreground/80 not-italic select-text cursor-text">
                    {generalInfo.charity}
                    <br />
                    {generalInfo.address2}
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
                {generalInfo.openDays.map((day, index) => (
                    <p key={index}>{day.day}: {day.time} </p>
                ))}

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