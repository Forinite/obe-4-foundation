// sanity/schemaTypes/adminUser.ts

export default {
    name: 'adminUser',
    type: 'document',
    title: 'Admin User',
    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Name',
        },
        {
            name: 'email',
            type: 'string',
            title: 'Email',
            validation: (Rule: any) => Rule.required().email(),
        },
        {
            name: 'password',
            type: 'string',
            title: 'Password (hashed)',
            hidden: true,
        },
    ],
};