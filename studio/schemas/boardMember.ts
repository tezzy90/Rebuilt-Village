/**
 * Board Member schema
 *
 * Separate from teamMember intentionally — board governance data (term dates,
 * committee roles) differs from staff/operational data. Board.tsx pulls from
 * this schema; About.tsx (Cast & Crew section) pulls from teamMember.
 */
export default {
    name: 'boardMember',
    title: 'Board Member',
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
            title: 'Board Role / Title',
            type: 'string',
            description: 'E.g. "President", "Secretary", "Board Member", "Treasurer".',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'bio',
            title: 'Biography',
            type: 'text',
            rows: 4,
            description: '2–4 sentences for the Board page. Can be more detailed than the About page bio.',
            validation: (Rule: any) => Rule.required().max(600),
        },
        {
            name: 'headshot',
            title: 'Headshot',
            type: 'image',
            options: { hotspot: true },
            fields: [
                {
                    name: 'alt',
                    title: 'Alt Text',
                    type: 'string',
                    description: 'E.g. "Steve Kohn in a business setting." Required for accessibility.',
                    validation: (Rule: any) =>
                        Rule.required().warning('Alt text required for WCAG 2.1 AA.'),
                },
            ],
        },
        {
            name: 'termStart',
            title: 'Term Start Date',
            type: 'date',
            description: 'When this board member\'s current term began.',
        },
        {
            name: 'termEnd',
            title: 'Term End Date',
            type: 'date',
            description: 'Leave blank for indefinite/founding terms.',
        },
        {
            name: 'committees',
            title: 'Committees / Areas of Focus',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'E.g. "Finance", "Programs", "Fundraising", "Governance".',
            options: { layout: 'tags' },
        },
        {
            name: 'linkedIn',
            title: 'LinkedIn URL',
            type: 'url',
            validation: (Rule: any) =>
                Rule.uri({ scheme: ['http', 'https'] }).optional(),
        },
        {
            name: 'email',
            title: 'Public Contact Email',
            type: 'string',
            description: 'Optional. Shown as a mailto link on the Board page. Only add if the member consents to public display.',
            validation: (Rule: any) => Rule.email().optional(),
        },
        {
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Lower numbers appear first. Suggest: President=1, VP=2, Secretary=3, Treasurer=4, Members=5+.',
            validation: (Rule: any) => Rule.required().integer().positive(),
        },
        {
            name: 'active',
            title: 'Current Board Member',
            type: 'boolean',
            description: 'Uncheck when a member completes their term — preserves the record without displaying them.',
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
            active: 'active',
        },
        prepare({ title, subtitle, media, active }: any) {
            return {
                title: `${active ? '' : '(Alumnus) '}${title}`,
                subtitle,
                media,
            };
        },
    },
};
