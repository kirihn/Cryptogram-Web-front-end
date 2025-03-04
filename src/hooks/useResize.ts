import { useEffect, useState } from 'react';

export function useResize() {
    const [size, setSize] = useState(window.innerWidth);
    const SCREEN_S = 780;
    const SCREEN_M = 1060;
    const SCREEN_L = 1200;
    useEffect(() => {
        const handleResize = () => {
            setSize(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return {
        screenSize: size,
        isSMScreen: size <= SCREEN_S, // phone - true
        isMDScreen: size > SCREEN_S && size <= SCREEN_M, // tablet - true
        isLGScreen: size > SCREEN_M && size <= SCREEN_L, // tablet2 - true
        isXLScreen: size > SCREEN_L, // pc - true

    };
}
