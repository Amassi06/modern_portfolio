import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useMagneticButton } from '../hooks/useMagneticButton';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
    const heroRef = useRef(null);
    const magneticBtnRef = useMagneticButton();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate all children with stagger effect
            gsap.from('.hero-item', {
                opacity: 0,
                y: 30,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out',
                delay: 0.3,
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="min-h-screen flex flex-col justify-center container-custom pt-24">
            <div className="space-y-6 max-w-4xl">
                <h1 className="hero-item text-green font-mono text-md md:text-lg font-normal m-0">
                    Bonjour, je m'appelle
                </h1>

                <h2 className="hero-item big-heading text-slate-lightest">
                    Massinissa Aidel.
                </h2>

                <h3 className="hero-item big-heading text-slate mb-6 min-h-[100px] md:min-h-[120px] flex items-center">
                    <TypeAnimation
                        sequence={[
                            'Je développe des applications web.',
                            2000,
                            'Je crée des expériences digitales.',
                            2000,
                            'Je construis des solutions innovantes.',
                            2000,
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                    />
                </h3>

                <p className="text-slate max-w-xl text-lg leading-relaxed mt-6">
                    Je suis un <span className="text-green">développeur full-stack</span> passionné par la création d'applications web modernes et performantes.
                    Actuellement <span className="text-green">3 semaines en entreprise</span> et <span className="text-green">1 semaine école</span>,
                    je me spécialise dans React, Node.js, et les technologies modernes du web.
                </p>

                <div className="hero-item mt-12">
                    <a
                        ref={magneticBtnRef}
                        href="mailto:aidelmassi@gmail.com"
                        className="btn-big"
                    >
                        Me Contacter
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
