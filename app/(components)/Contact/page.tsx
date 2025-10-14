// app/(components)/Contact/page.tsx

import ContactHeader from "@/app/subcomponents/ContactComponents/ContactHeader";
import ContactInfoCard from "@/app/subcomponents/ContactComponents/ContactInfoCard";
import ContactForm from "@/app/subcomponents/ContactComponents/ContactForm";
import FAQCard from "@/app/subcomponents/ContactComponents/FAQCard";
import { contactInfo, faqs } from "@/app/constants/contactData";

const Contact: React.FC = () => {
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
                            {faqs.map((faq, index) => (
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
};

export default Contact;
