import { useState, useEffect } from 'react';

const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Simulate loading
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsVisible(false);
                        onComplete?.();
                    }, 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        return () => clearInterval(interval);
    }, [onComplete]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-navy flex items-center justify-center transition-opacity duration-500"
            style={{ opacity: progress >= 100 ? 0 : 1 }}>
            <div className="text-center">
                {/* Logo animation */}
                <div className="mb-8">
                    <h1 className="text-6xl font-bold text-green font-mono animate-pulse">
                        AM
                    </h1>
                </div>

                {/* Progress bar */}
                <div className="w-64 h-1 bg-navy-light rounded-full overflow-hidden">
                    <div
                        className="h-full bg-green transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Percentage */}
                <p className="mt-4 text-slate-light font-mono text-sm">
                    {progress}%
                </p>
            </div>
        </div>
    );
};

export default LoadingScreen;
