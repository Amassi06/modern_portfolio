import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GitHubStats from './GitHubStats';
import {
    SiJavascript, SiTypescript, SiReact, SiRedux, SiNodedotjs,
    SiPython, SiAngular, SiPhp, SiLaravel, SiPostgresql,
    SiSpring, SiDocker, SiGit, SiOpenai, SiGmail
} from 'react-icons/si';
import { FaDatabase, FaCode, FaCalendar, FaJava } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const aboutRef = useRef(null);
    const imageRef = useRef(null);

    const skills = [
        'React', 'TypeScript', 'Node.js', 'Redux', 'Python', 'SQL',
        'Java', 'Angular', 'Docker', 'Spring Boot', 'C#/C', 'Git/GitHub'
    ];

    const techStack = [
        { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
        { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
        { name: 'React', icon: SiReact, color: '#61DAFB' },
        { name: 'Redux', icon: SiRedux, color: '#764ABC' },
        { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
        { name: 'Python', icon: SiPython, color: '#3776AB' },
        { name: 'Java', icon: FaJava, color: '#007396' },
        { name: 'Angular', icon: SiAngular, color: '#DD0031' },
        { name: 'PHP', icon: SiPhp, color: '#777BB4' },
        { name: 'Laravel', icon: SiLaravel, color: '#FF2D20' },
        { name: 'SQL', icon: FaDatabase, color: '#4479A1' },
        { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
        { name: 'Spring', icon: SiSpring, color: '#6DB33F' },
        { name: 'Docker', icon: SiDocker, color: '#2496ED' },
        { name: 'Git', icon: SiGit, color: '#F05032' },
        { name: 'OpenAI', icon: SiOpenai, color: '#412991' },
        { name: 'Gmail', icon: SiGmail, color: '#EA4335' },
        { name: 'Calendar', icon: FaCalendar, color: '#4285F4' },
        { name: 'C#', icon: FaCode, color: '#239120' },
        { name: 'Clean Code', icon: FaCode, color: '#64FFDA' },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.about-heading', {
                scrollTrigger: {
                    trigger: '.about-heading',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
                opacity: 0,
                x: -50,
                duration: 0.8,
            });

            gsap.from('.about-content', {
                scrollTrigger: {
                    trigger: '.about-content',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
                opacity: 0,
                y: 30,
                duration: 0.6,
                stagger: 0.1,
            });

            gsap.from('.about-image', {
                scrollTrigger: {
                    trigger: '.about-image',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
                opacity: 0,
                scale: 0.9,
                duration: 0.8,
            });

            gsap.to(imageRef.current, {
                scrollTrigger: {
                    trigger: imageRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.5,
                },
                y: -30,
            });

            const techContainer = document.querySelector('.tech-scroll-container');
            if (techContainer) {
                gsap.to(techContainer, {
                    x: '-50%',
                    duration: 8,
                    ease: 'none',
                    repeat: -1,
                });
            }
        }, aboutRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" ref={aboutRef} className="section-padding container-custom">
            <h2 className="about-heading numbered-heading">À Propos</h2>

            <div className="grid md:grid-cols-3 gap-12 mt-12">
                <div className="md:col-span-2 space-y-4">
                    <p className="about-content text-slate">
                        Bonjour ! Je m'appelle <span className="text-green">Massinissa Aidel</span> et je suis passionné par le développement web.
                        Mon parcours a débuté avec la découverte de la programmation, et depuis, je n'ai cessé d'apprendre et de créer.
                    </p>

                    <p className="about-content text-slate">
                        Avec un rythme de <span className="text-green">3 semaines en entreprise</span> et <span className="text-green">1 semaine école</span>,
                        j'ai eu l'opportunité de travailler sur des projets variés chez{' '}
                        <span className="text-green">Joyatwork</span> et{' '}
                        <span className="text-green">Digital City Company</span>,
                        où j'ai développé mes compétences en développement full-stack.
                    </p>

                    <p className="about-content text-slate">
                        Je me concentre sur la création d'applications web modernes, performantes et accessibles,
                        en utilisant les dernières technologies comme React, Node.js, TypeScript et bien d'autres.
                    </p>

                    <p className="about-content text-slate">Voici quelques technologies avec lesquelles je travaille :</p>

                    <ul className="about-content grid grid-cols-2 gap-2 mt-6 list-none p-0">
                        {skills.map((skill, i) => (
                            <li key={i} className="relative pl-5 font-mono text-sm text-slate before:content-['▹'] before:absolute before:left-0 before:text-green">
                                {skill}
                            </li>
                        ))}
                    </ul>

                    {/* GitHub Statistics */}
                    <div className="about-content">
                        <h3 className="text-slate-lightest text-xl font-semibold mt-8 mb-4">Statistiques GitHub</h3>
                        <GitHubStats />
                    </div>
                </div>

                <div className="about-image relative max-w-xs mx-auto md:mx-0">
                    <div ref={imageRef} className="group relative rounded overflow-hidden">
                        <img
                            src="/assets/logo.png"
                            alt="Massinissa Aidel"
                            className="rounded transition-all duration-300 hover:scale-105"
                        />
                    </div>
                </div>
            </div>

            {/* Tech Stack Auto-Scroll avec LOGOS */}
            <div className="mt-24">
                <h3 className="text-center text-2xl font-semibold text-slate-lightest mb-12">Technologies Maîtrisées</h3>
                <div className="tech-scroll-section overflow-hidden">
                    <div className="flex gap-6 tech-scroll-container">
                        {[...techStack, ...techStack].map((tech, i) => {
                            const Icon = tech.icon;
                            return (
                                <div
                                    key={i}
                                    className="tech-card flex-shrink-0 bg-navy-light px-8 py-6 rounded-lg border border-green/20 hover:border-green transition-all duration-300 flex flex-col items-center gap-3 min-w-[140px]"
                                >
                                    <Icon className="text-4xl" style={{ color: tech.color }} />
                                    <span className="text-slate-light font-mono text-xs whitespace-nowrap">{tech.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
