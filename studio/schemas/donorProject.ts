/**
 * Donor Project schema
 *
 * Canonical project IDs must match the Firestore `donor_projects` collection
 * AND the projectId values in Donate.tsx. The four confirmed projects are:
 *   film-equipment-fund · youth-scholarship-fund · summer-camp-launch · film-apalooza-2026
 *
 * Stripe webhook auto-increments `raised` in Firestore — this schema drives
 * the display copy (title, description, goal). Do not duplicate the raised
 * amount here; that lives in Firestore.
 */
export default {
    name: 'donorProject',
    title: 'Donor Project',
    type: 'document',
    fields: [
        {
            name: 'projectId',
            title: 'Project ID',
            type: 'slug',
            description:
                'CRITICAL: Must exactly match the Firestore document ID and the projectId in Donate.tsx. E.g. "film-equipment-fund".',
            options: { source: 'title', maxLength: 60 },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'title',
            title: 'Project Title',
            type: 'string',
            description: 'Display title shown on the Donate page fund tabs.',
            validation: (Rule: any) => Rule.required().max(80),
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 4,
            description: 'Shown in the fund selector panel. 2–4 sentences explaining what the money funds.',
            validation: (Rule: any) => Rule.required().max(600),
        },
        {
            name: 'goal',
            title: 'Fundraising Goal ($)',
            type: 'number',
            description: 'Total dollar goal for this project. E.g. 15000 for $15,000.',
            validation: (Rule: any) => Rule.required().positive().integer(),
        },
        {
            name: 'raisedSeed',
            title: 'Seed Amount ($)',
            type: 'number',
            description:
                'Offline or pre-digital donations to include in the raised total. Firestore webhook increments on top of this. Leave 0 if none.',
            initialValue: 0,
            validation: (Rule: any) => Rule.min(0),
        },
        {
            name: 'startDate',
            title: 'Campaign Start Date',
            type: 'date',
            description: 'When this fundraising campaign began.',
        },
        {
            name: 'deadline',
            title: 'Campaign Deadline',
            type: 'date',
            description: 'Leave blank for ongoing campaigns.',
        },
        {
            name: 'active',
            title: 'Active (show on Donate page)',
            type: 'boolean',
            description: 'Uncheck to hide this project from the fund selector without deleting it.',
            initialValue: true,
        },
        {
            name: 'image',
            title: 'Fund Image',
            type: 'image',
            description: 'Optional. Shown alongside the fund description.',
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
    ],
    preview: {
        select: {
            title: 'title',
            goal: 'goal',
            active: 'active',
        },
        prepare({ title, goal, active }: any) {
            const goalStr = goal ? `$${goal.toLocaleString()} goal` : 'No goal set';
            return {
                title: `${active ? '' : '🚫 '}${title}`,
                subtitle: goalStr,
            };
        },
    },
};
