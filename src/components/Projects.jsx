import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from './ProjectCard';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const [githubRepos, setGithubRepos] = useState([]);
    const projectsRef = useRef(null);

    const featuredProjects = [
        {
            title: 'Application de Gestion des Employés',
            description: 'Conception et développement d\'une application interne permettant aux administrateurs de gérer les employés, les départements et les rôles. Fonctionnalités : création, modification, suppression et recherche d\'employés, gestion des permissions, authentification sécurisée, et génération de rapports.',
            tech: ['React', 'Node.js', 'SQL Server', 'TypeScript', 'Redux Toolkit'],
            github: 'https://github.com/Amassi06',
            image: 'https://via.placeholder.com/700x400/112240/64ffda?text=Gestion+Employés',
        },
        {
            title: 'Assistant Automatisé de Gestion des Emails & Calendar',
            description: 'Le système utilise n8n pour intercepter les nouveaux emails entrants, en extraire les informations clés (réunions, deadlines, tâches, contacts). Les événements détectés sont automatiquement ajoutés au Google Calendar de l\'utilisateur et intégrés dans un système de gestion de projet.',
            tech: ['n8n', 'Node.js', 'OpenAI API', 'Gmail API', 'Google Calendar API', 'PostgreSQL'],
            github: 'https://github.com/Amassi06',
            image: 'https://via.placeholder.com/700x400/112240/64ffda?text=Email+Assistant',
        },
        {
            title: 'Application de Prévision Météo - NASA SPACE APP',
            description: 'Développement d\'une application permettant de visualiser et analyser des données internes à partir d\'une NASA API. Fonctionnalités : affichage dynamique météo, graphiques interactifs, export des données en CSV/PDF.',
            tech: ['React', 'Node.js', 'Express', 'Leaflet', 'Chart.js', 'NASA API'],
            github: 'https://github.com/Amassi06',
            external: 'https://weatherchallengeparis.netlify.app',
            image: 'https://via.placeholder.com/700x400/112240/64ffda?text=NASA+Weather+App',
        },
    ];

    useEffect(() => {
        // Fetch GitHub repos - 10 plus récents
        fetch('https://api.github.com/users/Amassi06/repos?sort=updated&per_page=10')
            .then(res => res.json())
            .then(data => {
                const repos = data
                    .filter(repo => !repo.fork) // Exclure les forks
                    .map(repo => ({
                        title: repo.name,
                        description: repo.description || 'Projet GitHub',
                        tech: repo.language ? [repo.language] : ['Code'],
                        github: repo.html_url,
                        external: repo.homepage,
                    }));
                setGithubRepos(repos);
            })
            .catch(err => console.error('Error fetching repos:', err));
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animation individuelle pour chaque Featured Project - OPTIMISÉ
            gsap.utils.toArray('.featured-project').forEach((project, i) => {
                const isEven = i % 2 === 0;

                // Image zoom + fade - SIMPLIFIÉ
                gsap.from(project.querySelector('.project-image'), {
                    scrollTrigger: {
                        trigger: project,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                    scale: 1.1,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                });

                // Content slide - SIMPLIFIÉ
                gsap.from(project.querySelector('.project-content'), {
                    scrollTrigger: {
                        trigger: project,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse',
                    },
                    x: isEven ? -50 : 50,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                });
            });

            // Horizontal scroll - OPTIMISÉ
            const horizontalSection = document.querySelector('.horizontal-scroll-section');
            if (horizontalSection) {
                const cards = gsap.utils.toArray('.horizontal-card');
                const totalWidth = cards.length * 400;

                gsap.to(cards, {
                    xPercent: -100 * (cards.length - 1),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: horizontalSection,
                        pin: true,
                        scrub: 0.5,
                        end: () => `+=${totalWidth}`,
                    },
                });
            }
        }, projectsRef);

        return () => ctx.revert();
    }, [githubRepos]);

    return (
        <section id="projects" ref={projectsRef} className="section-padding container-custom">
            <h2 className="numbered-heading">Mes Réalisations</h2>

            {/* Featured Projects */}
            <div className="mt-12 space-y-24">
                {featuredProjects.map((project, i) => (
                    <div key={i} className={`featured-project grid md:grid-cols-12 gap-4 items-center ${i % 2 === 1 ? 'md:text-right' : ''}`}>
                        {/* Image avec zoom progressif (Apple style) */}
                        <div className={`md:col-span-7 relative group ${i % 2 === 1 ? 'md:col-start-6' : ''}`}>
                            <a href={project.external || project.github} target="_blank" rel="noreferrer" className="block relative rounded overflow-hidden">
                                <div className="absolute inset-0 bg-green mix-blend-screen transition-all duration-300 group-hover:bg-transparent z-10" />
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="project-image w-full grayscale contrast-100 brightness-90 transition-all duration-300 group-hover:grayscale-0"
                                />
                            </a>
                        </div>

                        {/* Content */}
                        <div className={`project-content md:col-span-6 relative z-20 ${i % 2 === 1 ? 'md:col-start-1 md:row-start-1' : 'md:col-start-7'}`}>
                            <p className="font-mono text-green text-sm mb-2">Projet Phare</p>
                            <h3 className="text-slate-lightest text-2xl font-semibold mb-4">
                                <a href={project.external || project.github} className="hover:text-green" target="_blank" rel="noreferrer">
                                    {project.title}
                                </a>
                            </h3>
                            <div className={`bg-navy-light p-6 rounded shadow-lg ${i % 2 === 1 ? 'md:-mr-12' : 'md:-ml-12'}`}>
                                <p className="text-slate-light">{project.description}</p>
                            </div>
                            <ul className={`flex flex-wrap gap-4 mt-4 font-mono text-sm text-slate-light list-none ${i % 2 === 1 ? 'md:justify-end' : ''}`}>
                                {project.tech.map((tech, j) => (
                                    <li key={j} className="tech-item">{tech}</li>
                                ))}
                            </ul>
                            <div className={`flex gap-4 mt-4 ${i % 2 === 1 ? 'md:justify-end' : ''}`}>
                                {project.github && (
                                    <a href={project.github} className="text-slate-light hover:text-green" target="_blank" rel="noreferrer" aria-label="GitHub">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                    </a>
                                )}
                                {project.external && (
                                    <a href={project.external} className="text-slate-light hover:text-green" target="_blank" rel="noreferrer" aria-label="External Link">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Other Projects - HORIZONTAL SCROLL (GitHub Repos) */}
            <div className="mt-24 horizontal-scroll-section overflow-hidden">
                <h3 className="text-center text-2xl font-semibold text-slate-lightest mb-12">Autres Projets GitHub</h3>

                <div className="flex gap-6">
                    {githubRepos.map((project, i) => (
                        <div key={i} className="horizontal-card flex-shrink-0 w-[380px]">
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
