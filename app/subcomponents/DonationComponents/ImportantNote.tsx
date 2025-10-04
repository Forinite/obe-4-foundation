//app/subcomponents/DonationComponents/ImportantNote.tsx

import { cn } from '@/lib/utils';

interface ImportantNoteProps {
    text: string;
    className?: string;
}

const ImportantNote: React.FC<ImportantNoteProps> = ({ text, className }) => {
    return (
        <div className={cn('flex items-start space-x-3', className)}>
            <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
            <p>{text}</p>
        </div>
    );
};

export default ImportantNote;