/**
 * Sanity Studio — Rebuilt Village Non Profit
 * Project: 7gkqod4s | Dataset: production
 * Deploy target: studio.rebuiltvillage.org
 */

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
    name: 'rebuilt-village',
    title: 'Rebuilt Village',

    projectId: '7gkqod4s',
    dataset: 'production',

    plugins: [
        structureTool({
            structure: (S) =>
                S.list()
                    .title('Rebuilt Village CMS')
                    .items([
                        S.listItem()
                            .title('Events')
                            .child(
                                S.documentList()
                                    .title('Events')
                                    .filter('_type == "event"')
                                    .defaultOrdering([{ field: 'date', direction: 'asc' }])
                            ),
                        S.divider(),
                        S.listItem()
                            .title('Team Members')
                            .child(
                                S.documentList()
                                    .title('Team Members')
                                    .filter('_type == "teamMember"')
                                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                            ),
                        S.listItem()
                            .title('Board Members')
                            .child(
                                S.documentList()
                                    .title('Board Members')
                                    .filter('_type == "boardMember"')
                                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                            ),
                        S.divider(),
                        S.listItem()
                            .title('Blog Posts')
                            .child(
                                S.documentList()
                                    .title('Blog Posts')
                                    .filter('_type == "post"')
                                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                            ),
                        S.listItem()
                            .title('Programs')
                            .child(
                                S.documentList()
                                    .title('Programs')
                                    .filter('_type == "program"')
                                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                            ),
                        S.divider(),
                        S.listItem()
                            .title('Donor Projects')
                            .child(
                                S.documentList()
                                    .title('Donor Projects')
                                    .filter('_type == "donorProject"')
                            ),
                        S.listItem()
                            .title('Sponsors & Partners')
                            .child(
                                S.documentList()
                                    .title('Sponsors & Partners')
                                    .filter('_type == "sponsor"')
                                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                            ),
                    ]),
        }),
        visionTool(),
    ],

    schema: {
        types: schemaTypes,
    },
});
