import React, { useState } from 'react';
import DeveloperCard from '../components/DeveloperCard';
import { Search } from 'lucide-react';

const MOCK_DEVELOPERS = [
  {
    id: 1,
    name: 'Sweta Mishra',
    title: 'Full Stack Engineer',
    bio: 'Building modern web & mobile apps with React, Node.js, Express, and PostgreSQL.',
    skills: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind'],
    github: 'https://github.com/mishrasweta-0503',
    website: '#',
    postsCount: 8
  },
  {
    id: 2,
    name: 'Alex Chen',
    title: 'Backend Specialist',
    bio: 'Passionate about microservices, Docker, and high-performance MongoDB clusters.',
    skills: ['Node.js', 'MongoDB', 'Docker', 'Redis'],
    github: '#',
    website: '#',
    postsCount: 14
  },
  {
    id: 3,
    name: 'Sarah Jenkins',
    title: 'Frontend Engineer',
    bio: 'Crafting responsive user interfaces and accessible design systems.',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    github: '#',
    website: '#',
    postsCount: 19
  },
  {
    id: 4,
    name: 'Marcus Vance',
    title: 'DevOps & Cloud Engineer',
    bio: 'Automating CI/CD pipelines and deploying cloud infrastructure on AWS & Render.',
    skills: ['AWS', 'Docker', 'CI/CD', 'Python'],
    github: '#',
    website: '#',
    postsCount: 6
  }
];

const Developers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDevelopers = MOCK_DEVELOPERS.filter((dev) => {
    const term = searchTerm.toLowerCase();
    return (
      dev.name.toLowerCase().includes(term) ||
      dev.title.toLowerCase().includes(term) ||
      dev.skills.some((skill) => skill.toLowerCase().includes(term))
    );
  });

  return (
    <div>
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Developers Community</h1>
          <p className="text-slate-400 text-sm mt-1">
            Connect with creators, engineers, and contributors on DevPulse.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter by skill or name..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>
      </div>

      {/* Directory Grid */}
      {filteredDevelopers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredDevelopers.map((developer) => (
            <DeveloperCard key={developer.id} developer={developer} />
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-slate-400 text-sm">
          No developers found matching "{searchTerm}".
        </div>
      )}
    </div>
  );
};

export default Developers;