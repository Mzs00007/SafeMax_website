'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        // Force scroll to top on mount (initial load & refresh)
        // and on route change

        // 1. Disable browser's auto-scroll restoration (which remembers position on refresh)
        if (typeof window !== 'undefined') {
            // We wrap in try/catch just in case, though standard in modern browsers
            try {
                window.history.scrollRestoration = 'manual';
            } catch (e) {
                console.warn('Scroll restoration not supported', e);
            }

            // 2. Scroll to top
            window.scrollTo(0, 0);
        }
    }, [pathname]); // Depend on pathname to trigger on nav changes too

    return null;
}
