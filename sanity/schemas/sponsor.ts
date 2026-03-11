export default {
    name: 'sponsor',
    title: 'Sponsor / Partner',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Organization Name',
            type: 'string',
            validation: (Rule: any) => Rule.required().max(100),
        },
        {
            name: 'logo',
            title: 'Logo',
            type: 'image',
            description: 'Preferably SVG or PNG with transparent background.',
            options: { hotspot: false },
            fields: [
                {
                    name: 'alt',
                    title: 'Alt Text',
                    type: 'string',
                    description: 'E.g. "JC Lighting logo". Required for accessibility.',
                    validation: (Rule: any) =>
                        Rule.required().warning('Alt text required for WCAG 2.1 AA.'),
                },
            ],
        },
        {
            name: 'website',
            title: 'Website URL',
            type: 'url',
            validation: (Rule: any) =>
                Rule.uri({ scheme: ['http', 'https'] }).optional(),
        },
        {
            name: 'tier',
            title: 'Sponsorship / Partner Tier',
            type: 'string',
            options: {
                list: [
                    { title: 'Title Sponsor', value: 'title' },
                    { title: 'Program Sponsor', value: 'program' },
                    { title: 'Community Partner', value: 'community' },
                    { title: 'In-Kind Donor', value: 'in-kind' },
                    { title: 'Founding Partner', value: 'founding' },
                ],
                layout: 'radio',
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'description',
            title: 'Partnership Description',
            type: 'text',
            rows: 3,
            description: 'Optional. 1–2 sentences describing the partnership. Shown on the Partners section.',
        },
        {
            name: 'featured',
            title: 'Featured on Homepage',
            type: 'boolean',
            description: 'Show this partner in the homepage partners strip.',
            initialValue: false,
        },
        {
            name: 'active',
            title: 'Active Partner',
            type: 'boolean',
            description: 'Uncheck to hide from the site without deleting.',
            initialValue: true,
        },
        {
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Lower numbers appear first in partner lists.',
            initialValue: 99,
            validation: (Rule: any) => Rule.integer().positive(),
        },
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'tier',
            media: 'logo',
            active: 'active',
        },
        prepare({ title, subtitle, media, active }: any) {
            const tierLabels: Record<string, string> = {
                title: 'Title Sponsor',
                program: 'Program Sponsor',
                community: 'Community Partner',
                'in-kind': 'In-Kind Donor',
                founding: 'Founding Partner',
            };
            return {
                title: `${active ? '' : '🚫 '}${title}`,
                subtitle: tierLabels[subtitle] ?? subtitle,
                media,
            };
        },
    },
};
