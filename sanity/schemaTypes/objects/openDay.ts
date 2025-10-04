//sanity/schemaTypes/objects/openDay.ts

import { defineField, defineType } from "sanity";

export default defineType({
    name: 'openDay',
    title: 'Open Day',
    type: 'object',
    fields: [
        defineField({
            name: 'day',
            title: 'Day',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'time',
            title: 'Time',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'day',
            subtitle: 'time',
        },
    },
});