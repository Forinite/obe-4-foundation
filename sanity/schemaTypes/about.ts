//sanity/schemaTypes/about.ts

import { defineField, defineType } from "sanity";

export default defineType({
    name: 'about',
    title: 'About Page',
    type: 'document',
    fields: [
        defineField({
            name: 'challengeData',
            title: 'Challenge Data',
            type: 'object',
            fields: [
                defineField({
                    name: 'statistic',
                    title: 'Statistic',
                    type: 'number',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'description',
                    title: 'Description',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'subDescription',
                    title: 'Sub Description',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'items',
                    title: 'Items',
                    type: 'array',
                    of: [{ type: 'challengeItem' }],
                    validation: (Rule) => Rule.required().min(1),
                }),
            ],
        }),
        defineField({
            name: 'objectives',
            title: 'Objectives',
            type: 'array',
            of: [{ type: 'objective' }],
            validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
            name: 'approach',
            title: 'Approach',
            type: 'array',
            of: [{ type: 'approach' }],
            validation: (Rule) => Rule.required().min(1),
        }),
    ],
    preview: {
        select: {
            title: 'challengeData.description',
        },
    },
});