//sanity/schemaTypes/donation.ts

import { defineField, defineType } from "sanity";

export default defineType({
    name: "donation",
    title: "Donation",
    type: "document",
    fields: [
        defineField({
            name: "donorName",
            title: "Donor Name",
            type: "string",
            validation: (Rule) => Rule.required().min(2).error("Donor name is required."),
        }),

        defineField({
            name: "donorEmail",
            title: "Donor Email",
            type: "string",
            validation: (Rule) =>
                Rule.required()
                    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
                        name: "email",
                        invert: false,
                    })
                    .error("Please enter a valid email address."),
        }),

        defineField({
            name: "message",
            title: "Message",
            type: "text",
            rows: 3,
            description: "Optional message from the donor",
        }),

        defineField({
            name: "amount",
            title: "Amount",
            type: "number",
            validation: (Rule) => Rule.required().positive().error("Amount must be greater than zero."),
        }),

        defineField({
            name: "currency",
            title: "Currency",
            type: "string",
            options: {
                list: [
                    { title: "Naira (₦)", value: "NGN" },
                    { title: "US Dollar ($)", value: "USD" },
                ],
            },
            initialValue: "NGN",
        }),

        defineField({
            name: "paymentMethod",
            title: "Payment Method",
            type: "string",
            options: {
                list: [
                    { title: "Paystack", value: "Paystack" },
                    { title: "PayPal", value: "PayPal" },
                    { title: "Cash App", value: "CashApp" },
                    { title: "Bank Transfer", value: "Bank Transfer" },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "status",
            title: "Status",
            type: "string",
            options: {
                list: [
                    { title: "Completed", value: "completed" },
                    { title: "Pending", value: "pending" },
                    { title: "Failed", value: "failed" },
                ],
            },
            initialValue: "pending",
        }),

        defineField({
            name: "transactionId",
            title: "Transaction ID",
            type: "string",
            description: "Payment gateway transaction reference ID",
        }),

        defineField({
            name: "metadata",
            title: "Metadata",
            type: "object",
            fields: [
                defineField({
                    name: "raw",
                    title: "Raw Payload",
                    type: "text",
                    description: "Full payment payload returned from gateway",
                }),
            ],
        }),

        defineField({
            name: "date",
            title: "Date",
            type: "datetime",
            initialValue: () => new Date().toISOString(),
        }),
    ],

    preview: {
        select: {
            title: "donorName",
            subtitle: "amount",
            status: "status",
        },
        prepare(selection) {
            const { title, subtitle, status } = selection;
            return {
                title: `${title || "Anonymous"} (${status})`,
                subtitle: `₦${subtitle || "0"}`,
            };
        },
    },
});
