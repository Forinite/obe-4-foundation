// app/(components)/Contact/page.tsx
import { getContactData } from '@/lib/sanity';
import { ContactData } from '@/app/types';
import ContactHeader from '@/app/subcomponents/ContactComponents/ContactHeader';
import ContactInfoCard from '@/app/subcomponents/ContactComponents/ContactInfoCard';
import ContactForm from '@/app/subcomponents/ContactComponents/ContactForm';
import FAQCard from '@/app/subcomponents/ContactComponents/FAQCard';
import {Clock, Mail, MapPin, Phone} from "lucide-react";

export const dynamic = 'force-dynamic'; // Ensure SSR

export default async function Contact() {
    const data: ContactData = await getContactData();

    if (!data) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/40 to-pink-50/40 text-center pt-32">
                No data
            </div>
        );
    }

    const contactInfo = [
        {
            icon: MapPin,
            title: 'Address',
            subtitle: `${data.generalInfo.address1}${data.generalInfo.address2 ? ', ' + data.generalInfo.address2 : ''}`,
            content: 'Visit us at our offices'
        },
        {
            icon: Phone,
            title: 'Phone',
            subtitle: `${data.generalInfo.phone1}${data.generalInfo.phone2 ? ', ' + data.generalInfo.phone2 : ''}`,
            content: 'Call us for inquiries'
        },
        {
            icon: Mail,
            title: 'Email',
            subtitle: data.generalInfo.email,
            content: 'Reach out via email'
        },
        {
            icon: Clock,
            title: 'Open Hours',
            subtitle: data.generalInfo.openDays.map((day: any) => `${day.day}: ${day.time}`).join(', '),
            content: 'Our operating hours'
        }
    ];

    return (
        <main className="relative flex-1 z-20 bg-gradient-to-b from-white via-purple-50/40 to-pink-50/40">
            {/* Subtle background decor */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-pink-200/40 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-200/30 rounded-full blur-3xl" />
            </div>

            <div className="relative pt-32 px-4 sm:px-8 pb-24">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <ContactHeader />

                    {/* Contact Info + Form */}
                    <section className="grid lg:grid-cols-3 gap-10 sm:gap-14 mt-10">
                        <div className="space-y-6 sm:space-y-8">
                            {contactInfo.map((info, index) => (
                                <ContactInfoCard
                                    key={index}
                                    icon={info.icon}
                                    title={info.title}
                                    subtitle={info.subtitle}
                                >
                                    {info.content}
                                </ContactInfoCard>
                            ))}
                        </div>

                        {/* Form */}
                        <div className="lg:col-span-2 bg-white/70 backdrop-blur-md border border-purple-200/50 rounded-2xl shadow-md p-6 sm:p-10">
                            <ContactForm />
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section className="mt-24 sm:mt-28 relative">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Find answers to some of the most common questions we receive.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
                            {data.faqs.map((faq, index) => (
                                <FAQCard key={index} question={faq.question} answer={faq.answer} />
                            ))}
                        </div>

                        {/* Decorative background element */}
                        <div className="absolute -z-10 top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-r from-pink-100 to-purple-100 rounded-full blur-3xl opacity-40" />
                    </section>
                </div>
            </div>
        </main>
    );
}
