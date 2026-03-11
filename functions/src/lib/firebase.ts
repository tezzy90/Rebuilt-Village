/**
 * Firebase Admin SDK — singleton initializer
 *
 * Import { db } from this module in any Cloud Function handler
 * that needs Firestore access. The app is initialized once per
 * cold-start and reused across warm invocations.
 */

import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp();
}

export const db = admin.firestore();
export const FieldValue = admin.firestore.FieldValue;
