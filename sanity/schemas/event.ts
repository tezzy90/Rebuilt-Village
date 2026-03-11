export default {
    name: 'event',
    title: 'Event',
    type: 'document',
    orderings: [
        {
            title: 'Event Date, Upcoming First',
            name: 'dateAsc',
            by: [{ field: 'date', direction: 'asc' }],
        },
    ],
    fields: [
        {
            name: 'title',
            title: 'Event Title',
            type: 'string',
            validation: (Rule: any) => Rule.required().max(120),
        },
        {
            name: 'date',
            title: 'Start Date',
            type: 'date',
            description: 'The start date of the event (YYYY-MM-DD). Used for sorting and the date badge.',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'dateEnd',
            title: 'End Date',
            type: 'date',
            description: 'Only needed for multi-day events (e.g. Film-apalooza, Summer Camp).',
        },
        {
            name: 'time',
            title: 'Time / Schedule',
            type: 'string',
            description: 'Display-ready time string. E.g. "10:00 AM – 2:00 PM" or "May 15–17 · 9:00 AM – 10:00 PM".',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'location',
            title: 'Location',
            type: 'string',
            description: 'Full venue and city. E.g. "John H. Jackson Community Center, Ocoee, FL".',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 5,
            validation: (Rule: any) => Rule.required().max(800),
        },
        {
            name: 'type',
            title: 'Event Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Workshop', value: 'workshop' },
                    { title: 'Screening', value: 'screening' },
                    { title: 'Community', value: 'community' },
                    { title: 'Festival', value: 'festival' },
                    { title: 'Fundraiser', value: 'fundraiser' },
                ],
                layout: 'radio',
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'featured',
            title: 'Featured Event',
            type: 'boolean',
            description: 'Featured events get extra visual weight on the Events page.',
            initialValue: false,
        },
        {
            name: 'registrationUrl',
            title: 'Registration / RSVP Link',
            type: 'url',
            description: 'External URL or internal path (e.g. /contact). Leave blank if no registration needed.',
            validation: (Rule: any) =>
                Rule.uri({ scheme: ['http', 'https'], allowRelative: true }).optional(),
        },
        {
            name: 'sponsoredBy',
            title: 'Sponsored / Hosted By',
            type: 'string',
            description: 'Name of the sponsoring entity if Rebuilt Village is the sponsor, not operator. E.g. "Rebuilt Village".',
        },
        {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Short audience/format labels. E.g. "All Ages", "Free", "Multi-Day", "Ages 14–18".',
            options: {
                layout: 'tags',
            },
        },
    ],
    preview: {
        select: {
            title: 'title',
            date: 'date',
            type: 'type',
            featured: 'featured',
        },
        prepare({ title, date, type, featured }: any) {
            const dateStr = date
                ? new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                  })
                : 'No date';
            return {
                title: `${featured ? '⭐ ' : ''}${title}`,
                subtitle: `${dateStr} · ${type ?? 'event'}`,
            };
        },
    },
};
