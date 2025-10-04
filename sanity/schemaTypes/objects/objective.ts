//sanity/schemaTypes/objects/objective.ts

import { defineField, defineType } from "sanity";

export default defineType({
    name: 'objective',
    title: 'Objective',
    type: 'object',
    fields: [
        defineField({
            name: 'icon',
            title: 'Icon',
            type: 'string',
            description: 'Enter an emoji (e.g., 🏥) or icon identifier (e.g., Heart)',
            // Removed validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'items',
            title: 'Items',
            type: 'array',
            of: [{ type: 'string' }],
            validation: (Rule) => Rule.required().min(1),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'items.0',
        },
    },
});