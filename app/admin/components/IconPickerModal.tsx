//app/admin/components/IconPickerModal.tsx

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { iconMap } from '@/lib/icons';

interface IconPickerModalProps {
    selected: string;
    onSelect: (icon: string) => void;
    label?: string;
    color?: 'fuchsia' | 'cyan' | 'blue' | 'emerald'; // can be extended easily
}

export default function IconPickerModal({
                                            selected,
                                            onSelect,
                                            label,
                                            color = 'fuchsia',
                                        }: IconPickerModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const icons = Object.entries(iconMap);
    const SelectedIcon = iconMap[selected] as React.FC<{ className?: string }>;

    // Define dynamic color classes
    const colorMap = {
        fuchsia: {
            text: 'text-fuchsia-600 dark:text-fuchsia-400',
            ring: 'ring-fuchsia-500',
            bg: 'bg-fuchsia-100 dark:bg-fuchsia-900/40',
            hoverRing: 'hover:ring-fuchsia-500',
        },
        cyan: {
            text: 'text-cyan-600 dark:text-cyan-400',
            ring: 'ring-cyan-500',
            bg: 'bg-cyan-100 dark:bg-cyan-900/40',
            hoverRing: 'hover:ring-cyan-500',
        },
        blue: {
            text: 'text-blue-600 dark:text-blue-400',
            ring: 'ring-blue-500',
            bg: 'bg-blue-100 dark:bg-blue-900/40',
            hoverRing: 'hover:ring-blue-500',
        },
        emerald: {
            text: 'text-emerald-600 dark:text-emerald-400',
            ring: 'ring-emerald-500',
            bg: 'bg-emerald-100 dark:bg-emerald-900/40',
            hoverRing: 'hover:ring-emerald-500',
        },
    }[color];

    return (
        <div className="relative">
            {label && (
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {label}
                </label>
            )}

            {/* Selected Icon Button */}
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className={`flex items-center justify-center w-12 h-12 border dark:border-gray-700 rounded-lg transition bg-white dark:bg-gray-900 hover:ring-2 ${colorMap.hoverRing}`}
            >
                {SelectedIcon ? (
                    <SelectedIcon className={`w-6 h-6 ${colorMap.text}`} />
                ) : (
                    <span className="text-gray-400 text-sm">?</span>
                )}
            </button>

            {/* Picker Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-xl grid grid-cols-6 gap-3 max-w-[420px] w-full max-h-[60vh] overflow-y-auto"
                        >
                            {icons.map(([key, Icon]) => {
                                const IconComponent = Icon as React.FC<{ className?: string }>;
                                const isSelected = key === selected;

                                return (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => {
                                            onSelect(key);
                                            setIsOpen(false);
                                        }}
                                        className={`relative flex items-center justify-center p-3 rounded-lg transition
                      ${
                                            isSelected
                                                ? `${colorMap.bg} ring-2 ${colorMap.ring}`
                                                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                    >
                                        <IconComponent
                                            className={`w-6 h-6 ${
                                                isSelected
                                                    ? colorMap.text
                                                    : 'text-gray-500 dark:text-gray-300'
                                            }`}
                                        />
                                        {isSelected && (
                                            <Check
                                                className={`absolute top-1 right-1 w-4 h-4 ${colorMap.text}`}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
