/**
 * getProjectBalances — public Cloud Function
 *
 * Returns the current `raised` and `donationCount` values for all
 * restricted donor projects. Read from Firestore `donor_projects` collection.
 *
 * No auth required — these are public fundraising progress numbers.
 * Response is cached for 60 seconds via Cache-Control header.
 */

import * as functions from 'firebase-functions/v2/https';
import { db } from '../lib/firebase';

// Canonical project IDs — must match Donate.tsx RESTRICTED_PROJECTS
const PROJECT_IDS = [
  'film-equipment-fund',
  'youth-scholarship-fund',
  'summer-camp-launch',
  'film-apalooza-2026',
] as const;

export interface ProjectBalance {
  id: string;
  raised: number;       // cents (Stripe units)
  donationCount: number;
  lastDonationAt: string | null; // ISO string or null
}

export const getProjectBalances = functions.onRequest(
  {
    cors: true,
    region: 'us-central1',
    maxInstances: 20,
    memory: '128MiB',
    timeoutSeconds: 15,
  },
  async (req, res) => {
    if (req.method !== 'GET') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const results: ProjectBalance[] = await Promise.all(
        PROJECT_IDS.map(async (id) => {
          const snap = await db.collection('donor_projects').doc(id).get();
          if (!snap.exists) {
            return { id, raised: 0, donationCount: 0, lastDonationAt: null };
          }
          const data = snap.data()!;
          return {
            id,
            raised:         (data.raised         as number) ?? 0,
            donationCount:  (data.donationCount   as number) ?? 0,
            lastDonationAt: data.lastDonationAt?.toDate?.().toISOString() ?? null,
          };
        })
      );

      // Cache for 60s on CDN, 30s stale-while-revalidate
      res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=30');
      res.status(200).json({ balances: results });
    } catch (error) {
      console.error('getProjectBalances error:', error);
      res.status(500).json({ error: 'Failed to fetch balances' });
    }
  }
);
