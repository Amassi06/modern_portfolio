import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMagneticButton } from '../hooks/useMagneticButton';
import ContactForm from './ContactForm';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const contactRef = useRef(null);
    const magneticBtnRef = useMagneticButton();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.contact-item', {
                scrollTrigger: {
                    trigger: '.contact-item',
                    start: 'top 80%',
                    end: 'top 30%',
                    scrub: 1,
                },
                opacity: 0,
                y: 30,
                stagger: 0.1,
            });
        }, contactRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="contact" ref={contactRef} className="section-padding container-custom max-w-2xl text-center">
            <h2 className="contact-item numbered-heading justify-center before:mr-4 after:hidden">Et Maintenant ?</h2>

            <h2 className="contact-item text-5xl md:text-6xl font-semibold text-slate-lightest mt-6 mb-6">
                Contactez-Moi
            </h2>

            <p className="contact-item text-slate max-w-lg mx-auto mb-12">
                Je suis actuellement ouvert aux opportunités et collaborations.
                Que vous ayez une question, un projet en tête, ou simplement envie de discuter,
                n'hésitez pas à me contacter !
            </p>

            {/* Contact Form */}
            <div className="contact-item">
                <ContactForm />
            </div>
        </section>
    );
};

export default Contact;
