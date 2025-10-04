//sanity/schemaTypes/objects/challengeItem.ts

import { defineField, defineType } from "sanity";

export default defineType({
    name: 'challengeItem',
    title: 'Challenge Item',
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
            name: 'text',
            title: 'Text',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'text',
            // media: 'icon',
        },
    },
});