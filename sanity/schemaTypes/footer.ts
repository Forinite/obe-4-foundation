//sanity/schemaTypes/footer.ts

import { defineField, defineType } from "sanity";

export default defineType({
    name: 'footer',
    title: 'Footer',
    type: 'document',
    fields: [
        // defineField({
        //     name: 'quickLinks',
        //     title: 'Quick Links',
        //     type: 'array',
        //     of: [{ type: 'link' }],
        //     validation: (Rule) => Rule.required().min(1),
        //     description: 'Links to main pages (e.g., Home, About, Contact)',
        // }),
        defineField({
            name: 'programLinks',
            title: 'Program Links',
            type: 'array',
            of: [{ type: 'link' }],
            validation: (Rule) => Rule.required().min(1),
            description: 'Links to program sections (e.g., Mobile Healthcare, Emergency Response)',
        }),
    ],
    preview: {
        select: {
            title: 'programLinks.0.label',
        },
    },
});