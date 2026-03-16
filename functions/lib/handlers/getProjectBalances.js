"use strict";
/**
 * getProjectBalances — public Cloud Function
 *
 * Returns the current `raised` and `donationCount` values for all
 * restricted donor projects. Read from Firestore `donor_projects` collection.
 *
 * No auth required — these are public fundraising progress numbers.
 * Response is cached for 60 seconds via Cache-Control header.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectBalances = void 0;
const functions = __importStar(require("firebase-functions/v2/https"));
const firebase_1 = require("../lib/firebase");
// Canonical project IDs — must match Donate.tsx RESTRICTED_PROJECTS
const PROJECT_IDS = [
    'film-equipment-fund',
    'youth-scholarship-fund',
    'summer-camp-launch',
    'film-apalooza-2026',
];
exports.getProjectBalances = functions.onRequest({
    cors: true,
    region: 'us-central1',
    maxInstances: 20,
    memory: '128MiB',
    timeoutSeconds: 15,
}, async (req, res) => {
    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }
    try {
        const results = await Promise.all(PROJECT_IDS.map(async (id) => {
            const snap = await firebase_1.db.collection('donor_projects').doc(id).get();
            if (!snap.exists) {
                return { id, raised: 0, donationCount: 0, lastDonationAt: null };
            }
            const data = snap.data();
            return {
                id,
                raised: data.raised ?? 0,
                donationCount: data.donationCount ?? 0,
                lastDonationAt: data.lastDonationAt?.toDate?.().toISOString() ?? null,
            };
        }));
        // Cache for 60s on CDN, 30s stale-while-revalidate
        res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=30');
        res.status(200).json({ balances: results });
    }
    catch (error) {
        console.error('getProjectBalances error:', error);
        res.status(500).json({ error: 'Failed to fetch balances' });
    }
});
//# sourceMappingURL=getProjectBalances.js.map