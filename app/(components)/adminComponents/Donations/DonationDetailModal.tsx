// app/(components)/adminComponents/Donations/DonationDetailModal.tsx
'use client';

import React from "react";
import Modal from "@/app/admin/components/Modal";
import { X } from "lucide-react";

export default function DonationDetailModal({ donation, onClose }: any) {
    if (!donation) return null;

    return (
        <Modal
            isOpen={!!donation}
            onClose={onClose}
            title="Donation Details"
        >
            <div className="px-2 md:px-4 py-3 space-y-4 text-sm sm:text-base overflow-y-auto max-h-[75vh]">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        {donation.donorName || "Anonymous Donor"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                        <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </button>
                </div>

                {/* Details Card */}
                <div className="bg-gray-50 dark:bg-gray-800/40 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <Detail label="Email" value={donation.donorEmail || "Not provided"} />
                    <Detail
                        label="Amount"
                        value={`${donation.currency}${donation.amount.toLocaleString()}`}
                        highlight
                    />
                    <Detail label="Method" value={donation.paymentMethod} />
                    <Detail
                        label="Status"
                        value={donation.status}
                        statusColor={donation.status === "Success" ? "emerald" : "orange"}
                    />
                    <Detail label="Transaction ID" value={donation.transactionId} />
                    <Detail
                        label="Date"
                        value={new Date(donation.date).toLocaleString()}
                    />
                </div>

                {/* Optional Message */}
                {donation.message && (
                    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl p-4">
                        <h4 className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-1">
                            Donor Message
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            {donation.message}
                        </p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="mt-5 flex justify-center">
                <button
                    onClick={onClose}
                    className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium shadow-sm transition-all"
                >
                    Close
                </button>
            </div>
        </Modal>
    );
}

// Small reusable detail display component
function Detail({ label, value, highlight, statusColor }: any) {
    const textColor = highlight
        ? "text-emerald-600 dark:text-emerald-400 font-semibold"
        : "text-gray-700 dark:text-gray-300";

    const statusClasses = statusColor
        ? statusColor === "emerald"
            ? "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/40 px-2 py-0.5 rounded-md text-xs font-medium"
            : "text-orange-600 bg-orange-100 dark:bg-orange-900/40 px-2 py-0.5 rounded-md text-xs font-medium"
        : textColor;

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1 border-b last:border-none border-gray-100 dark:border-gray-700">
            <span className="text-gray-500 dark:text-gray-400 text-sm">{label}</span>
            <span className={statusClasses}>{value}</span>
        </div>
    );
}
