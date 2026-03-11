export default {
    name: 'teamMember',
    title: 'Team Member',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Full Name',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'role',
            title: 'Role / Title',
            type: 'string',
            description: 'E.g. "Executive Director", "Vice President", "Social Media & Marketing".',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'bio',
            title: 'Biography',
            type: 'text',
            rows: 4,
            description: '2–4 sentences. Displayed on the About page team card.',
            validation: (Rule: any) => Rule.required().max(500),
        },
        {
            name: 'headshot',
            title: 'Headshot',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    title: 'Alt Text',
                    type: 'string',
                    description: 'Describe the photo for screen readers. E.g. "Tony Golden smiling in a film studio."',
                    validation: (Rule: any) => Rule.required().warning('Alt text is required for accessibility (WCAG 2.1 AA).'),
                },
            ],
        },
        {
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Lower numbers appear first. Executive Director = 1, President = 2, etc.',
            validation: (Rule: any) => Rule.required().integer().positive(),
        },
        {
            name: 'socialLinks',
            title: 'Social Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'platform',
                            title: 'Platform',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'LinkedIn', value: 'linkedin' },
                                    { title: 'Instagram', value: 'instagram' },
                                    { title: 'Twitter / X', value: 'twitter' },
                                    { title: 'Website', value: 'website' },
                                    { title: 'IMDb', value: 'imdb' },
                                ],
                            },
                        },
                        {
                            name: 'url',
                            title: 'URL',
                            type: 'url',
                            validation: (Rule: any) => Rule.uri({ scheme: ['http', 'https'] }),
                        },
                    ],
                    preview: {
                        select: { platform: 'platform', url: 'url' },
                        prepare({ platform, url }: any) {
                            return { title: platform, subtitle: url };
                        },
                    },
                },
            ],
        },
        {
            name: 'active',
            title: 'Active Board/Staff Member',
            type: 'boolean',
            description: 'Uncheck to hide from the About page without deleting.',
            initialValue: true,
        },
    ],
    orderings: [
        {
            title: 'Display Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'role',
            media: 'headshot',
        },
    },
};
