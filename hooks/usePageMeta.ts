import { useEffect } from 'react';

/**
 * Sets the page <title> and <meta name="description"> on mount.
 * Lightweight replacement for react-helmet-async that avoids the
 * CJS/ESM React duplicate-instance issue in React 19.
 */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update meta description
    if (description) {
      let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }
  }, [title, description]);
}
