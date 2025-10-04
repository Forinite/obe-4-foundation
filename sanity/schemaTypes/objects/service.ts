//sanity/schemaTypes/objects/service.ts

import { defineField, defineType } from "sanity";

export default defineType({
    name: 'service',
    title: 'Service',
    type: 'object',
    fields: [
        defineField({
            name: 'icon',
            title: 'Icon',
            type: 'string',
            description: 'Enter an emoji (e.g., 🚑) or icon identifier (e.g., Heart)',
            // Removed validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'description',
            // media: 'icon',
        },
    },
});