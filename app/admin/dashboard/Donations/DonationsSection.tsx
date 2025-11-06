// app/admin/Donations/DonationsSection.tsx
import React from "react";
import { getDonations } from "@/lib/sanity";
import DonationList from "./DonationList";

export default async function DonationsSection() {
    const donations = await getDonations();

    return (
        <section className="w-full p-6">
            <h1 className="text-2xl font-semibold mb-6">Donations</h1>
            <DonationList initialDonations={donations} />

        </section>
    );
}
