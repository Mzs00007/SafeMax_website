'use client';

import { useCallback } from 'react';

/**
 * Hook for playing cybernetic UI sounds.
 * Since we don't have the actual MP3s yet, this logic is ready to go.
 * Just place 'hover.mp3' and 'click.mp3' in public/assets/audio/
 */
export default function useCyberneticSound() {

    const playHover = useCallback(() => {
        // const audio = new Audio('/assets/audio/hover.mp3');
        // audio.volume = 0.2;
        // audio.play().catch(() => {}); // Ignore interaction errors
        // console.log("🔊 Hover Sound");
    }, []);

    const playClick = useCallback(() => {
        // const audio = new Audio('/assets/audio/click.mp3');
        // audio.volume = 0.5;
        // audio.play().catch(() => {});
        // console.log("🔊 Click Sound");
    }, []);

    return { playHover, playClick };
}
