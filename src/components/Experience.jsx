import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
    const [activeTab, setActiveTab] = useState(0);
    const expRef = useRef(null);

    const jobs = [
        {
            company: 'Joyatwork',
            title: 'Développeur Web Full-Stack',
            range: '2024 - Présent',
            url: 'https://joyatwork.com',
            location: 'Paris, France',
            duties: [
                'Développement d\'applications web avec React, Node.js et TypeScript',
                'Création d\'interfaces utilisateur modernes et responsives',
                'Intégration d\'APIs et services tiers (OpenAI, Gmail, Google Calendar)',
                'Mise en place de workflows automatisés avec n8n',
                'Collaboration en équipe avec méthodologie Agile/Scrum'
            ]
        },
        {
            company: 'Digital City Company',
            title: 'Développeur Web',
            range: '2023 - 2024',
            url: '#',
            location: 'Béjaïa, Algérie',
            duties: [
                'Développement d\'applications web full-stack',
                'Création de solutions sur mesure pour les clients',
                'Maintenance et optimisation de sites web existants',
                'Travail avec PHP, Laravel, JavaScript et SQL',
                'Gestion de bases de données PostgreSQL'
            ]
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.exp-heading', {
                scrollTrigger: {
                    trigger: '.exp-heading',
                    start: 'top 80%',
                    end: 'top 20%',
                    scrub: 1,
                },
                opacity: 0,
                x: -50,
            });

            gsap.from('.exp-tabs', {
                scrollTrigger: {
                    trigger: '.exp-tabs',
                    start: 'top 80%',
                    end: 'top 30%',
                    scrub: 1,
                },
                opacity: 0,
                y: 30,
            });

            // Sticky section effect (Apple style)
            ScrollTrigger.create({
                trigger: expRef.current,
                start: 'top top',
                end: 'bottom bottom',
                pin: '.exp-heading',
                pinSpacing: false,
            });
        }, expRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="experience" ref={expRef} className="section-padding container-custom max-w-4xl">
            <h2 className="exp-heading numbered-heading">Où J'ai Travaillé</h2>

            <div className="exp-tabs mt-12 flex flex-col md:flex-row gap-8">
                {/* Tabs */}
                <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
                    {jobs.map((job, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveTab(i)}
                            className={`px-6 py-3 text-left font-mono text-sm whitespace-nowrap transition-all duration-300 border-l-2 md:border-l-2 border-b-2 md:border-b-0 ${activeTab === i
                                    ? 'border-green text-green bg-green/10'
                                    : 'border-navy-light text-slate hover:bg-navy-light hover:text-green'
                                }`}
                        >
                            {job.company}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1">
                    <h3 className="text-slate-lightest text-xl font-semibold mb-2">
                        {jobs[activeTab].title}{' '}
                        <a href={jobs[activeTab].url} className="text-green hover:underline" target="_blank" rel="noreferrer">
                            @ {jobs[activeTab].company}
                        </a>
                    </h3>
                    <p className="font-mono text-sm text-slate mb-1">{jobs[activeTab].range}</p>
                    <p className="font-mono text-xs text-slate-light mb-6">{jobs[activeTab].location}</p>

                    <ul className="space-y-4">
                        {jobs[activeTab].duties.map((duty, i) => (
                            <li key={i} className="relative pl-8 text-slate before:content-['▹'] before:absolute before:left-0 before:text-green before:text-xl">
                                {duty}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Experience;
