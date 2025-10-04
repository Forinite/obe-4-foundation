//sanity/schemaTypes/contact.ts

import { defineField, defineType, defineArrayMember } from "sanity";

export default defineType({
    name: 'contact',
    title: 'Contact Page',
    type: 'document',
    fields: [
        defineField({
            name: 'generalInfo',
            title: 'General Info',
            type: 'object',
            fields: [
                defineField({
                    name: 'address1',
                    title: 'Address 1',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'address2',
                    title: 'Address 2',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'phone1',
                    title: 'Phone 1',
                    type: 'string',
                    validation: (Rule) => Rule.required().regex(/^\+\d{1,3}\s?\d{9,}$/, { name: 'phone' }),
                }),
                defineField({
                    name: 'phone2',
                    title: 'Phone 2',
                    type: 'string',
                    validation: (Rule) => Rule.required().regex(/^\+\d{1,3}\s?\d{9,}$/, { name: 'phone' }),
                }),
                defineField({
                    name: 'email',
                    title: 'Email',
                    type: 'string',
                    validation: (Rule) => Rule.required().email(),
                }),
                defineField({
                    name: 'twitter',
                    title: 'Twitter URL',
                    type: 'url',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'linkedin',
                    title: 'LinkedIn URL',
                    type: 'url',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'openDays',
                    title: 'Open Days',
                    type: 'array',
                    of: [{ type: 'openDay' }],
                    validation: (Rule) => Rule.required().min(1),
                }),
                defineField({
                    name: 'charity',
                    title: 'Charity Name',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
                }),
            ],
        }),
        defineField({
            name: 'faqs',
            title: 'FAQs',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'question',
                            title: 'Question',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'answer',
                            title: 'Answer',
                            type: 'text',
                            validation: (Rule) => Rule.required(),
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'question',
                            subtitle: 'answer',
                        },
                    },
                }),
            ],
            validation: (Rule) => Rule.required().min(1),
        }),
    ],
    preview: {
        select: {
            title: 'generalInfo.email',
        },
    },
});