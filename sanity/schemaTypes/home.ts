//sanity/schemaTypes/home.ts

import { defineField, defineType } from "sanity";

export default defineType({
    name: "home",
    title: "Home Page",
    type: "document",
    fields: [
        defineField({
            name: "missionStatements",
            title: "Mission Statements",
            type: "array",
            of: [{ type: "text" }],
            validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
            name: "missionInfo",
            title: "Mission Info",
            type: "object",
            fields: [
                defineField({
                    name: "percentage",
                    title: "Percentage",
                    type: "number",
                    validation: (Rule) => Rule.required().min(0).max(100),
                }),
                defineField({
                    name: "text",
                    title: "Text",
                    type: "string",
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: "list",
                    title: "List",
                    type: "array",
                    of: [{ type: "string" }],
                    validation: (Rule) => Rule.required().min(1),
                }),
            ],
        }),

        // ✅ Vision Statement - defined as a nested object (not a custom type)
        defineField({
            name: "visionStatement",
            title: "Vision Statement",
            type: "object",
            fields: [
                defineField({
                    name: "title",
                    title: "Title",
                    type: "string",
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: "mainStatement",
                    title: "Main Statement",
                    type: "text",
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: "highlight",
                    title: "Highlight",
                    type: "string",
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: "goals",
                    title: "Goals",
                    type: "array",
                    of: [{ type: "string" }],
                    validation: (Rule) => Rule.required().min(1),
                }),
            ],
        }),

        defineField({
            name: "services",
            title: "Services",
            type: "array",
            of: [{ type: "service" }],
            validation: (Rule) => Rule.required().min(1),
        }),
    ],

    preview: {
        select: {
            title: "missionInfo.text",
        },
    },
});
