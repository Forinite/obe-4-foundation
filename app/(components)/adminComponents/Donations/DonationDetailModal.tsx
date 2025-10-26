// app/(components)/adminComponents/Donations/DonationDetailModal.tsx
'use client';

import React from "react";
import { X } from "lucide-react";
import Modal from "@/app/admin/components/Modal";

export default function DonationDetailModal({ donation, onClose }: any) {
    return (
        <Modal isOpen={!!donation} onClose={onClose} title="Donation Details">
            <div className="space-y-3 text-sm">
                <p><strong>Name:</strong> {donation.donorName || "Anonymous"}</p>
                <p><strong>Email:</strong> {donation.donorEmail}</p>
                <p><strong>Amount:</strong> {donation.currency}{donation.amount.toLocaleString()}</p>
                <p><strong>Method:</strong> {donation.paymentMethod}</p>
                <p><strong>Status:</strong> {donation.status}</p>
                <p><strong>Transaction ID:</strong> {donation.transactionId}</p>
                <p><strong>Date:</strong> {new Date(donation.date).toLocaleString()}</p>
                {donation.message && (
                    <div>
                        <strong>Message:</strong>
                        <p className="text-gray-400 mt-1">{donation.message}</p>
                    </div>
                )}
            </div>
            <div className="mt-6 text-right">
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
                >
                    Close
                </button>
            </div>
        </Modal>
    );
}
