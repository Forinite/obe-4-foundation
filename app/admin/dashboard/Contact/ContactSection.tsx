// app/admin/dashboard/Contact/ContactSection.tsx

import { ContactData } from '@/app/types';

import { Plus } from 'lucide-react';
import GeneralInfoCard from "@/app/(components)/adminComponents/Contact/GeneralInfoCard";
import FAQCard from "@/app/subcomponents/ContactComponents/FAQCard";

interface ContactSectionProps {
    data: ContactData;
}

export default function ContactSection({ data }: ContactSectionProps) {
    console.log(data);
    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">General Info</h3>
                    <button className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors">
                        <Plus className="w-5 h-5" />
                        <span>Edit General Info</span>
                    </button>
                </div>
                <GeneralInfoCard data={data.generalInfo} />
            </div>
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">FAQs</h3>
                    <button className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors">
                        <Plus className="w-5 h-5" />
                        <span>Add FAQ</span>
                    </button>
                </div>
                <div className="space-y-4">
                    {data.faqs.map((faq, index) => (
                        <FAQCard key={index} question={faq.question} answer={faq.answer} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}