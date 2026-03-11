/**
 * projectBalancesService — frontend service
 *
 * Fetches live raised amounts for restricted donor projects from
 * the /api/project-balances Cloud Function. Includes a 30s polling
 * hook for soft real-time updates on the Donate page.
 */

export interface ProjectBalance {
  id: string;
  raised: number;       // cents
  donationCount: number;
  lastDonationAt: string | null;
}

type BalanceMap = Record<string, ProjectBalance>;

export async function fetchProjectBalances(): Promise<BalanceMap> {
  const res = await fetch('/api/project-balances');
  if (!res.ok) throw new Error(`Project balances fetch failed: ${res.status}`);
  const { balances } = (await res.json()) as { balances: ProjectBalance[] };
  return Object.fromEntries(balances.map((b) => [b.id, b]));
}

/**
 * useProjectBalances — React hook
 *
 * Loads balances on mount and re-polls every `intervalMs` milliseconds.
 * Falls back gracefully to empty map if the function is unreachable
 * (e.g., during local development without emulator).
 *
 * @param intervalMs  Polling interval in ms. Default 60 000 (1 minute).
 */
import { useEffect, useState } from 'react';

export function useProjectBalances(intervalMs = 60_000): {
  balances: BalanceMap;
  loading: boolean;
} {
  const [balances, setBalances] = useState<BalanceMap>({});
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await fetchProjectBalances();
        if (!cancelled) {
          setBalances(data);
          setLoading(false);
        }
      } catch (err) {
        // Fail silently — Donate page falls back to hardcoded seed values
        console.warn('[projectBalances] fetch failed, using fallback:', err);
        if (!cancelled) setLoading(false);
      }
    }

    load();

    const timer = setInterval(load, intervalMs);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [intervalMs]);

  return { balances, loading };
}
