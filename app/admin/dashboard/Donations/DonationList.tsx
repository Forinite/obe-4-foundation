// app/admin/Donations/DonationList.tsx

'use client';

import React, { useState, useMemo } from "react";
import { Search, Info, Filter } from "lucide-react";
import DonationDetailModal from "@/app/(components)/adminComponents/Donations/DonationDetailModal";

interface Donation {
    _id: string;
    donorName: string;
    donorEmail: string;
    message?: string;
    amount: number;
    currency: string;
    paymentMethod: string;
    status: string;
    transactionId: string;
    date: string;
}

export default function DonationList({ initialDonations }: { initialDonations: Donation[] }) {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<"all" | "completed" | "pending" | "failed">("all");
    const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);

    const filteredDonations = useMemo(() => {
        return initialDonations.filter(d => {
            const matchesSearch =
                d.donorName.toLowerCase().includes(search.toLowerCase()) ||
                d.donorEmail.toLowerCase().includes(search.toLowerCase()) ||
                d.transactionId.toLowerCase().includes(search.toLowerCase());
            const matchesFilter = filter === "all" || d.status === filter;
            return matchesSearch && matchesFilter;
        });
    }, [initialDonations, search, filter]);

    const badgeColor = (status: string) => {
        switch (status) {
            case "completed": return "bg-green-100 text-green-700";
            case "pending": return "bg-yellow-100 text-yellow-700";
            case "failed": return "bg-red-100 text-red-700";
            default: return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <div className="bg-white/5 rounded-2xl shadow-md p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
                <div className="flex items-center bg-white/10 rounded-lg px-3 py-2 w-full md:w-1/3">
                    <Search className="w-4 h-4 text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Search donations..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-transparent w-full outline-none text-sm"
                    />
                </div>
                <div className="flex gap-2">
                    {["all", "completed", "pending", "failed"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f as any)}
                            className={`px-3 py-1 rounded-full text-sm capitalize ${
                                filter === f ? "bg-purple-600 text-white" : "bg-white/10 hover:bg-white/20"
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="text-left border-b border-white/10 text-gray-400">
                    <tr>
                        <th className="py-2">Donor</th>
                        <th className="py-2">Email</th>
                        <th className="py-2">Amount</th>
                        <th className="py-2">Method</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Date</th>
                        <th className="py-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredDonations.map((d) => (
                        <tr key={d._id} className="border-b border-white/5 hover:bg-white/5 transition">
                            <td className="py-2 font-medium">{d.donorName || "Anonymous"}</td>
                            <td className="py-2">{d.donorEmail}</td>
                            <td className="py-2">{d.currency} {d.amount.toLocaleString()}</td>
                            <td className="py-2">{d.paymentMethod}</td>
                            <td className="py-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${badgeColor(d.status)}`}>
                    {d.status}
                  </span>
                            </td>
                            <td className="py-2">{new Date(d.date).toLocaleString()}</td>
                            <td className="py-2">
                                <button
                                    onClick={() => setSelectedDonation(d)}
                                    className="text-purple-500 hover:text-purple-700"
                                >
                                    <Info className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {filteredDonations.length === 0 && (
                    <p className="text-center text-gray-400 py-6">No donations found.</p>
                )}
            </div>

            {selectedDonation && (
                <DonationDetailModal
                    donation={selectedDonation}
                    onClose={() => setSelectedDonation(null)}
                />
            )}
        </div>
    );
}
