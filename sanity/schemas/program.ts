export default {
    name: 'program',
    title: 'Program',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'image',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Filmmaking', value: 'filmmaking' },
                    { title: 'Editing', value: 'editing' },
                    { title: 'Acting', value: 'acting' },
                ],
            },
        },
        {
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            initialValue: false,
        }
    ],
}
