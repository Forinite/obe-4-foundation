// app/admin/Donations/DonationList.tsx
'use client';

import React, { useState, useMemo } from "react";
import {Search, Info, Calendar, Filter, DollarSignIcon, Coins, Clock} from "lucide-react";
import DonationDetailModal from "@/app/(components)/adminComponents/Donations/DonationDetailModal";
import {renderIcon} from "@/lib/icons";

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
    const [month, setMonth] = useState<string>("all");

    // 🧮 Calculate Totals
    const totals = useMemo(() => {
        const totalUSD = initialDonations
            .filter(d => d.currency === "USD" && d.status === "completed")
            .reduce((sum, d) => sum + d.amount, 0);

        const totalNGN = initialDonations
            .filter(d => d.currency === "NGN" && d.status === "completed")
            .reduce((sum, d) => sum + d.amount, 0);

        const pendingUSD = initialDonations
            .filter(d => d.currency === "USD" && d.status === "pending")
            .reduce((sum, d) => sum + d.amount, 0);

        const pendingNGN = initialDonations
            .filter(d => d.currency === "NGN" && d.status === "pending")
            .reduce((sum, d) => sum + d.amount, 0);

        return { totalUSD, totalNGN, pendingUSD, pendingNGN };
    }, [initialDonations]);

    // 🧠 Filter donations by search, status, and month
    const filteredDonations = useMemo(() => {
        return initialDonations.filter((d) => {
            const matchSearch =
                d.donorName?.toLowerCase().includes(search.toLowerCase()) ||
                d.donorEmail?.toLowerCase().includes(search.toLowerCase()) ||
                d.transactionId?.toLowerCase().includes(search.toLowerCase());
            const matchFilter = filter === "all" || d.status === filter;
            const matchMonth =
                month === "all" ||
                new Date(d.date).getMonth() === parseInt(month) &&
                new Date(d.date).getFullYear() === new Date().getFullYear();
            return matchSearch && matchFilter && matchMonth;
        });
    }, [initialDonations, search, filter, month]);

    const badgeColor = (status: string) => {
        switch (status) {
            case "completed":
                return "bg-emerald-100 text-emerald-700";
            case "pending":
                return "bg-yellow-100 text-yellow-700";
            case "failed":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    const months = [
        { value: "all", label: "All Months" },
        { value: "0", label: "January" },
        { value: "1", label: "February" },
        { value: "2", label: "March" },
        { value: "3", label: "April" },
        { value: "4", label: "May" },
        { value: "5", label: "June" },
        { value: "6", label: "July" },
        { value: "7", label: "August" },
        { value: "8", label: "September" },
        { value: "9", label: "October" },
        { value: "10", label: "November" },
        { value: "11", label: "December" },
    ];

    return (
        <>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                {[
                    { label: "Total USD", value: `$${totals.totalUSD.toLocaleString()}`, color: "bg-emerald-500/20 text-emerald-500 ", icon: <DollarSignIcon /> },
                    { label: "Total NGN", value: `₦${totals.totalNGN.toLocaleString()}`, color: "from-green-500/20 to-emerald-400/20 text-green-500" , icon: <Coins /> },
                    { label: "Pending USD", value: `$${totals.pendingUSD.toLocaleString()}`, color: "from-yellow-500/20 to-amber-400/20 text-yellow-500" , icon: <Clock /> },
                    { label: "Pending NGN", value: `₦${totals.pendingNGN.toLocaleString()}`, color: "from-blue-500/20 to-blue-400/20 text-blue-500"  , icon: <Clock /> },
                ].map((c) => (
                    <div
                        key={c.label}
                        className={`rounded-xl p-4 bg-gradient-to-r border border-neutral-300 dark:border-slate-800   text-neutral-700 dark:text-neutral-200  shadow-md hover:shadow-lg transition-all`}
                    >
                        <div>
                            <div className={`flex items-center justify-center h-8 w-8 p-1.5 rounded-sm bg-gradient-to-br ${c.color}`}>
                                 {c.icon}
                            </div>
                            <p className="md:text-xs text-[11px] opacity-90 mt-2">{c.label}</p>
                            <h3 className="md:text-lg text-sm font-semibold dark:text-white">{c.value}</h3>

                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-gradient-to-br from-emerald-50/30 to-white/10 dark:from-emerald-900/20 dark:to-black/30 rounded-2xl shadow-lg p-4 sm:p-6 backdrop-blur-lg border border-emerald-400/10">

                {/* === Summary Cards === */}


                {/* === Filters Bar === */}
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">
                    <div className="relative flex-1 max-w-xs">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search donor, email or transaction..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 pr-3 py-2 w-full rounded-lg bg-white/10 border border-emerald-400/10 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>

                    <div className="flex gap-2 justify-end">
                        <select
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            className="px-3 py-2 rounded-lg bg-white/10 border border-emerald-400/10 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                        >
                            {months.map((m) => (
                                <option key={m.value} value={m.value}>
                                    {m.label}
                                </option>
                            ))}
                        </select>

                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value as any)}
                            className="px-3 py-2 rounded-lg bg-white/10 border border-emerald-400/10 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                        >
                            {["all", "completed", "pending", "failed"].map((f) => (
                                <option key={f} value={f} className="capitalize">
                                    {f}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* === Desktop Table === */}
                <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="border-b border-white/10 text-gray-400">
                        <tr>
                            <th className="py-3 text-left">Donor</th>
                            <th className="py-3 text-left">Email</th>
                            <th className="py-3 text-left">Amount</th>
                            <th className="py-3 text-left">Method</th>
                            <th className="py-3 text-left">Status</th>
                            <th className="py-3 text-left">Date</th>
                            <th className="py-3 text-left">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredDonations.map((d) => (
                            <tr
                                key={d._id}
                                className="border-b border-white/5 hover:bg-white/5 transition-all duration-300"
                            >
                                <td className="py-3 font-medium text-foreground">{d.donorName || "Anonymous"}</td>
                                <td className="py-3">{d.donorEmail}</td>
                                <td className="py-3">{d.currency} {d.amount.toLocaleString()}</td>
                                <td className="py-3">{d.paymentMethod}</td>
                                <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${badgeColor(d.status)}`}>
                      {d.status}
                    </span>
                                </td>
                                <td className="py-3 text-gray-400">{new Date(d.date).toLocaleString()}</td>
                                <td className="py-3">
                                    <button
                                        onClick={() => setSelectedDonation(d)}
                                        className="text-emerald-500 hover:text-emerald-400 transition"
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

                {/* === Mobile Cards (unchanged) === */}
                <div className="grid sm:hidden gap-4 mt-4">
                    {filteredDonations.map((d) => (
                        <div
                            key={d._id}
                            className="p-4 bg-white/10 dark:bg-white/5 rounded-xl border border-emerald-400/10 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-semibold text-emerald-500">{d.donorName || "Anonymous"}</h3>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badgeColor(d.status)}`}>
                  {d.status}
                </span>
                            </div>
                            <p className="text-xs text-gray-400 mb-1">{d.donorEmail}</p>
                            <div className="flex justify-between items-center text-sm mt-3">
                                <div>
                                    <p className="font-medium">{d.currency} {d.amount.toLocaleString()}</p>
                                    <p className="text-xs text-gray-400">{d.paymentMethod}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedDonation(d)}
                                    className="text-emerald-500 hover:text-emerald-400 p-2 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 transition"
                                >
                                    <Info className="w-4 h-4" />
                                </button>
                            </div>
                            <p className="text-[11px] text-gray-400 mt-2">
                                {new Date(d.date).toLocaleString()}
                            </p>
                        </div>
                    ))}

                    {filteredDonations.length === 0 && (
                        <p className="text-center text-gray-400 py-6">No donations found.</p>
                    )}
                </div>
            </div>

            {/* 🔍 Detail Modal */}
            {selectedDonation && (
                <DonationDetailModal
                    donation={selectedDonation}
                    onClose={() => setSelectedDonation(null)}
                />
            )}
        </>
    );
}

