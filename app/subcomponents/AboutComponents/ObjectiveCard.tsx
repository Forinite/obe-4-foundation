// app/subcomponents/AboutComponents/ObjectiveCard.tsx

import {renderIcon} from "@/lib/icons";

interface ObjectiveCardProps {
    icon: string;
    title: string;
    items: string[];
}

const ObjectiveCard: React.FC<ObjectiveCardProps> = ({ icon, title, items }) => {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-white via-pink-50 to-purple-50 border border-purple-200/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-500">
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-200/10 via-transparent to-pink-200/10 opacity-60 pointer-events-none" />

            {/* Header */}
            <div className="relative flex items-center mb-5">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 text-white text-2xl shadow-md">
                    {renderIcon(icon)}
                </div>
                <h3 className="ml-4 text-lg md:text-xl font-semibold text-purple-700 tracking-wide">
                    {title}
                </h3>
            </div>

            {/* List of items */}
            <ul className="relative list-disc list-inside space-y-2 text-sm md:text-base text-gray-700/80 pl-2">
                {items.map((item, index) => (
                    <li
                        key={index}
                        className="hover:text-purple-600 transition-colors duration-300"
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ObjectiveCard;
