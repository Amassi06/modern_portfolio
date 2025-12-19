import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export const useTextSplitAnimation = () => {
    const textRef = useRef(null);

    useEffect(() => {
        if (!textRef.current) return;

        // Split le texte en mots
        const split = new SplitType(textRef.current, { types: 'words' });

        // Anime chaque mot
        gsap.from(split.words, {
            scrollTrigger: {
                trigger: textRef.current,
                start: 'top 80%',
                end: 'top 50%',
                scrub: 1,
            },
            opacity: 0,
            y: 20,
            stagger: 0.05,
        });

        return () => {
            split.revert();
        };
    }, []);

    return textRef;
};
