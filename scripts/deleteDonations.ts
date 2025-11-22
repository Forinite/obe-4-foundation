// scripts/deleteDonations.ts or inside /app/api/delete-donations/route.ts

import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client"; // make sure this has write permissions

export async function DELETE() {
    try {
        const result = await client.delete({
            query: '*[_type == "donations"]',
        });

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("Error deleting donations:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
