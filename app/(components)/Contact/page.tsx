
import ContactHeader from "@/app/subcomponents/ContactComponents/ContactHeader";
import ContactInfoCard from "@/app/subcomponents/ContactComponents/ContactInfoCard";
import ContactForm from "@/app/subcomponents/ContactComponents/ContactForm";
import FAQCard from "@/app/subcomponents/ContactComponents/FAQCard";
import {contactInfo, faqs} from "@/app/constants/contactData";


const Contact: React.FC = () => {


    return (
        <main className="relative z-20 flex-1">
            <div className="pt-32 px-4 sm:px-8 pb-20 select-none">
                <div className="max-w-6xl mx-auto">
                    <ContactHeader />
                    <div className="grid lg:grid-cols-3 gap-8 sm:gap-12 relative z-10">
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
                        <div className="lg:col-span-2">
                            <ContactForm />
                        </div>
                    </div>
                    <div className="mt-16 sm:mt-20 relative z-10">
                        <h2 className="text-2xl sm:text-3xl font-semibold mb-8 sm:mb-12 text-center cursor-default">
                            Frequently Asked Questions
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                            {faqs.map((faq, index) => (
                                <FAQCard key={index} question={faq.question} answer={faq.answer} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Contact;