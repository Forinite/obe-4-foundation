// /sanity/schemaTypes/objects/visionStatement.ts
import { defineType, defineField } from 'sanity';
import { Eye } from 'lucide-react';

export default defineType({
    name: 'visionStatement',
    title: 'Vision Statement',
    type: 'object',
    icon: Eye,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Short title for this vision statement (e.g., "Saving Lives Daily")',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 4,
            description: 'Main description text for the vision statement section.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'points',
            title: 'Key Points',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'List of specific goals or focus areas under this vision.',
        }),
    ],
});
