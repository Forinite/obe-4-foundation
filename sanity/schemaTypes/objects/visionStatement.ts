import { defineType, defineField } from 'sanity';

export const visionStatement = defineType({
    name: 'visionStatement',
    title: 'Vision Statement',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'mainStatement',
            title: 'Main Statement',
            type: 'text',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'highlight',
            title: 'Highlight',
            type: 'string',
        }),
        defineField({
            name: 'goals',
            title: 'Goals',
            type: 'array',
            of: [{ type: 'string' }],
            validation: (Rule) => Rule.required().min(1),
        }),
    ],
});
