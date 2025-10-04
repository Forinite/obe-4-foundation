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
            validation: (Rule) => Rule.required(),
            description: 'Enter an emoji (e.g., 🏥) or icon identifier (e.g., Heart)',
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