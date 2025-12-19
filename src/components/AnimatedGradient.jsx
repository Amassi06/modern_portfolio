const AnimatedGradient = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Animated mesh gradient */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 -left-4 w-96 h-96 bg-green/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
                <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
                <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
            </div>
        </div>
    );
};

export default AnimatedGradient;
