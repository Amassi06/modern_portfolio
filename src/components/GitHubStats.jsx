import { useState, useEffect } from 'react';
import { FaGithub, FaStar, FaCodeBranch, FaUsers } from 'react-icons/fa';

const GitHubStats = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://api.github.com/users/Amassi06')
            .then(res => res.json())
            .then(data => {
                setStats({
                    repos: data.public_repos,
                    followers: data.followers,
                    following: data.following,
                });
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching GitHub stats:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-navy-light p-6 rounded-lg animate-pulse">
                        <div className="h-8 w-8 bg-slate/20 rounded mb-3" />
                        <div className="h-8 w-16 bg-slate/20 rounded mb-2" />
                        <div className="h-4 w-20 bg-slate/20 rounded" />
                    </div>
                ))}
            </div>
        );
    }

    if (!stats) return null;

    const statCards = [
        { icon: FaCodeBranch, value: stats.repos, label: 'Repositories', color: '#64FFDA' },
        { icon: FaUsers, value: stats.followers, label: 'Followers', color: '#64FFDA' },
        { icon: FaGithub, value: stats.following, label: 'Following', color: '#64FFDA' },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {statCards.map((stat, i) => {
                const Icon = stat.icon;
                return (
                    <div
                        key={i}
                        className="bg-navy-light p-6 rounded-lg border border-green/20 hover:border-green transition-all duration-300 group"
                    >
                        <Icon className="text-3xl mb-3 group-hover:scale-110 transition-transform" style={{ color: stat.color }} />
                        <div className="text-3xl font-bold text-slate-lightest mb-1">{stat.value}</div>
                        <div className="text-sm text-slate-light font-mono">{stat.label}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default GitHubStats;
