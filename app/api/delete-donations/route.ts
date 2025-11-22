import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function DELETE() {
    try {
        const result = await client.delete({
            query: '*[_type == "donation"]',
        });

        return NextResponse.json({ success: true, result });
    } catch (error: any) {
        console.error("Error deleting donations:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
