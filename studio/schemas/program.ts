export default {
    name: 'program',
    title: 'Program',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Program Title',
            type: 'string',
            validation: (Rule: any) => Rule.required().max(100),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title', maxLength: 80 },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'shortLabel',
            title: 'Badge Label',
            type: 'string',
            description: 'Short tag shown in the colored badge on the program card. E.g. "Flagship Program", "Open to All", "Specialty Sessions".',
            validation: (Rule: any) => Rule.max(40),
        },
        {
            name: 'description',
            title: 'Description (Short)',
            type: 'text',
            rows: 3,
            description: '2–3 sentences. The lead paragraph shown prominently on the program card.',
            validation: (Rule: any) => Rule.required().max(400),
        },
        {
            name: 'details',
            title: 'Details (Long)',
            type: 'text',
            rows: 5,
            description: '3–5 sentences. The secondary paragraph with more specifics about curriculum, format, and outcomes.',
            validation: (Rule: any) => Rule.max(800),
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
                    { title: 'Storytelling', value: 'storytelling' },
                    { title: 'Career Skills', value: 'career-skills' },
                    { title: 'Summer Camp', value: 'summer-camp' },
                ],
                layout: 'radio',
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'ageGroup',
            title: 'Age Group',
            type: 'string',
            description: 'E.g. "Ages 14–18", "Middle & High School", "All Ages".',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'schedule',
            title: 'Schedule',
            type: 'string',
            description: 'E.g. "July 13–24 · Weekdays 9 AM–3 PM" or "Ongoing — see Events page".',
        },
        {
            name: 'location',
            title: 'Location',
            type: 'string',
            description: 'E.g. "John H. Jackson Community Center, Ocoee, FL".',
        },
        {
            name: 'cost',
            title: 'Cost',
            type: 'string',
            description: 'E.g. "Free for all students" or "Tuition-based — scholarships available".',
            initialValue: 'Free for all students',
        },
        {
            name: 'highlights',
            title: 'Program Highlights',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Short bullet points shown on the program card. 3–6 items.',
            options: { layout: 'tags' },
        },
        {
            name: 'enrollmentUrl',
            title: 'Enrollment / Interest Link',
            type: 'url',
            description: 'External form URL or internal path like /contact. Leave blank if not yet open.',
            validation: (Rule: any) =>
                Rule.uri({ scheme: ['http', 'https'], allowRelative: true }).optional(),
        },
        {
            name: 'image',
            title: 'Program Image',
            type: 'image',
            options: { hotspot: true },
            fields: [
                {
                    name: 'alt',
                    title: 'Alt Text',
                    type: 'string',
                    validation: (Rule: any) =>
                        Rule.required().warning('Alt text required for WCAG 2.1 AA.'),
                },
            ],
        },
        {
            name: 'partnerInstitution',
            title: 'Partner Institution',
            type: 'string',
            description: 'E.g. "Dr. Phillips High School" or "John H. Jackson Community Center".',
        },
        {
            name: 'featured',
            title: 'Featured Program',
            type: 'boolean',
            description: 'Show this program prominently on the Programs page.',
            initialValue: false,
        },
        {
            name: 'active',
            title: 'Active (show on site)',
            type: 'boolean',
            initialValue: true,
        },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'category',
            media: 'image',
            active: 'active',
        },
        prepare({ title, subtitle, media, active }: any) {
            return {
                title: `${active ? '' : '🚫 '}${title}`,
                subtitle,
                media,
            };
        },
    },
};
