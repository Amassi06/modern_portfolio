import { useState, useEffect } from 'react';

const Nav = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            setScrolled(currentScrollY > 50);

            // Style Apple: cache au scroll down, montre au scroll up
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setHidden(true);
            } else {
                setHidden(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const navLinks = [
        { name: 'À Propos', url: '#about' },
        { name: 'Expérience', url: '#experience' },
        { name: 'Projets', url: '#projects' },
        { name: 'Contact', url: '#contact' },
    ];

    return (
        <>
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'
                } ${scrolled ? 'bg-navy/95 backdrop-blur-md shadow-lg h-16' : 'bg-navy/85 backdrop-blur-md h-24'
                }`}>
                <div className="container-custom h-full flex items-center justify-between">
                    {/* Logo */}
                    <a href="/" className="text-green font-mono text-2xl font-bold hover:text-green">
                        AM
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <ol className="flex items-center gap-6 list-none m-0 p-0">
                            {navLinks.map((link, i) => (
                                <li key={i} className="font-mono text-sm">
                                    <a href={link.url} className="text-slate-light hover:text-green px-3 py-2">
                                        <span className="text-green mr-1">0{i + 1}.</span>
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ol>
                        <a href="mailto:aidelmassi@gmail.com" className="btn text-xs">
                            Me Contacter
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5 z-50"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Menu"
                    >
                        <span className={`w-6 h-0.5 bg-green transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`w-6 h-0.5 bg-green transition-all ${menuOpen ? 'opacity-0' : ''}`} />
                        <span className={`w-6 h-0.5 bg-green transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${menuOpen ? 'visible' : 'invisible'
                }`}>
                <div className={`absolute inset-0 bg-navy-light/95 backdrop-blur-md transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'
                    }`}>
                    <div className="flex flex-col items-center justify-center h-full gap-8">
                        <ol className="flex flex-col items-center gap-6 list-none">
                            {navLinks.map((link, i) => (
                                <li key={i} className="font-mono">
                                    <a
                                        href={link.url}
                                        className="text-slate-light hover:text-green text-lg"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <span className="text-green mr-2">0{i + 1}.</span>
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ol>
                        <a href="mailto:aidelmassi@gmail.com" className="btn">
                            Me Contacter
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Nav;
