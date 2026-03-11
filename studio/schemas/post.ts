export default {
    name: 'post',
    title: 'Blog Post',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule: any) => Rule.required().max(120),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
            description: '1–2 sentence summary shown on the blog listing page and in social shares.',
            validation: (Rule: any) => Rule.required().max(300),
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'News', value: 'news' },
                    { title: 'Programs', value: 'programs' },
                    { title: 'Student Stories', value: 'student-stories' },
                    { title: 'Impact', value: 'impact' },
                    { title: 'Events', value: 'events' },
                    { title: 'Partnerships', value: 'partnerships' },
                ],
                layout: 'radio',
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'author',
            title: 'Author',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    title: 'Alt Text',
                    type: 'string',
                    description: 'Required for accessibility. Describe the image content.',
                    validation: (Rule: any) => Rule.required().warning('Alt text is required for WCAG 2.1 AA compliance.'),
                },
            ],
        },
        {
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
                { type: 'block' },
                {
                    type: 'image',
                    fields: [
                        {
                            name: 'alt',
                            title: 'Alt Text',
                            type: 'string',
                            validation: (Rule: any) => Rule.required().warning('Alt text required for accessibility.'),
                        },
                        {
                            name: 'caption',
                            title: 'Caption',
                            type: 'string',
                        },
                    ],
                    options: { hotspot: true },
                },
            ],
        },
        {
            name: 'seo',
            title: 'SEO',
            type: 'object',
            description: 'Override the default meta title and description for search engines.',
            fields: [
                {
                    name: 'metaTitle',
                    title: 'Meta Title',
                    type: 'string',
                    description: 'If blank, falls back to the post title. Max 60 characters.',
                    validation: (Rule: any) => Rule.max(60),
                },
                {
                    name: 'metaDescription',
                    title: 'Meta Description',
                    type: 'text',
                    rows: 2,
                    description: 'If blank, falls back to the excerpt. Max 160 characters.',
                    validation: (Rule: any) => Rule.max(160),
                },
            ],
        },
    ],
    preview: {
        select: {
            title: 'title',
            author: 'author',
            media: 'mainImage',
            category: 'category',
        },
        prepare({ title, author, media, category }: any) {
            return {
                title,
                subtitle: `${category ?? 'Uncategorized'} · ${author ?? 'No author'}`,
                media,
            };
        },
    },
};
