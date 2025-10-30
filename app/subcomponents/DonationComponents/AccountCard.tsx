//app/subcomponents/DonationComponents/AccountCard.tsx

'use client';

import React from 'react';

interface AccountCardProps {
    bankName: string;
    accountName: string;
    accountNumber: string;
    gradient: string;
    textColor: string;
    position?: string; // optional for absolute positioning if needed
}

export default function AccountCard({
                                        bankName,
                                        accountName,
                                        accountNumber,
                                        gradient,
                                        textColor,
                                        position = '',
                                    }: AccountCardProps) {
    return (
        <div className={` relative lg:absolute ${position} w-fit max-w-xs mx-auto`}>
            {/* Outer glowing gradient border */}
            <div
                className={`absolute  inset-0 rounded-xl bg-gradient-to-r ${gradient} p-[2px] blur-[2px]`}
            />

            {/* Inner card */}
            <div className="relative bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 px-5 py-4 text-center shadow-md hover:shadow-lg transition-all duration-300">
                {/* Bank Name */}
                <h1 className={`text-lg font-semibold ${textColor} tracking-wide mb-1`}>
                    {bankName}
                </h1>

                {/* Account Name */}
                <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                    {accountName}
                </p>

                {/* Account Number */}
                <p className="text-gray-900 dark:text-gray-100 font-semibold text-sm tracking-wider bg-gray-100 dark:bg-gray-800 rounded-md py-1 px-3 inline-block">
                    {accountNumber}
                </p>
            </div>
        </div>
    );
}
