import { useEffect, useState } from 'react';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        const updatePosition = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        // Detect hover on interactive elements
        const handleMouseOver = (e) => {
            if (e.target.closest('a, button, .cursor-hover')) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = (e) => {
            if (!e.target.closest('a, button, .cursor-hover')) {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updatePosition);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    return (
        <>
            {/* Inner dot */}
            <div
                className="fixed w-2 h-2 bg-green rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: `translate(-50%, -50%) scale(${isClicking ? 0.5 : 1})`,
                }}
            />

            {/* Outer circle */}
            <div
                className="fixed w-8 h-8 border-2 border-green/50 rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
                    opacity: isHovering ? 0.5 : 1,
                }}
            />
        </>
    );
};

export default CustomCursor;
