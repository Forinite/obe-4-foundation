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
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'caption',
            title: 'Caption / Description',
            type: 'string',
            description: 'Optional: Short description, event name, date, location, etc.',
            validation: (Rule) => Rule.max(200).warning('Keep it short for best display'),
        }),
    ],
    preview: {
        select: {
            media: 'image',
            title: 'caption',
            subtitle: '_id',
        },
        prepare({ media, title, subtitle }) {
            return {
                title: title || 'No caption',
                subtitle: subtitle?.slice(-8),
                media,
            };
        },
    },
});