//sanity/schemaTypes/gallery.ts

import { defineField, defineType } from "sanity";

export default defineType({
    name: 'galleryImage',
    title: 'Gallery Image',
    type: 'document',
    fields: [
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            media: 'image',
        },
    },
});