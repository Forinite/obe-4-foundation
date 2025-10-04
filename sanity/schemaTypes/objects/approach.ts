//sanity/schemaTypes/objects/approach.ts

import { defineField, defineType } from "sanity";

export default defineType({
    name: 'approach',
    title: 'Approach',
    type: 'object',
    fields: [
        defineField({
            name: 'icon',
            title: 'Icon',
            type: 'string',
            validation: (Rule) => Rule.required(),
            description: 'Enter an emoji (e.g., 🚑) or icon identifier (e.g., Heart)',
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
            media: 'icon',
        },
    },
});