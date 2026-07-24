import React, { useState } from 'react';
import { GitBranch, Globe, UserPlus, Check, Code2 } from 'lucide-react';

const DeveloperCard = ({ developer }) => {
  const [following, setFollowing] = useState(false);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between shadow-lg hover:border-slate-700 transition">
      <div>
        {/* Header with Avatar & Follow Button */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-base shadow-md">
            {developer.name[0].toUpperCase()}
          </div>
          <button
            onClick={() => setFollowing(!following)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              following
                ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            {following ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Following</span>
              </>
            ) : (
              <>
                <UserPlus className="w-3.5 h-3.5" />
                <span>Follow</span>
              </>
            )}
          </button>
        </div>

        {/* Developer Info */}
        <h3 className="text-base font-semibold text-white">{developer.name}</h3>
        <p className="text-xs text-indigo-400 font-medium mb-2">{developer.title}</p>
        <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2">
          {developer.bio}
        </p>

        {/* Tech Stack Badges */}
        <div className="mb-4">
          <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider mb-2">Tech Stack</p>
          <div className="flex flex-wrap gap-1.5">
            {developer.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-slate-950 text-slate-300 border border-slate-800 text-[11px] font-medium px-2 py-0.5 rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Social / Portfolio Links */}
      <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-3">
          {developer.github && (
            <a
              href={developer.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
              title="GitHub Profile"
            >
              <GitBranch className="w-4 h-4" />
            </a>
          )}
          {developer.website && (
            <a
              href={developer.website}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
              title="Portfolio Website"
            >
              <Globe className="w-4 h-4" />
            </a>
          )}
        </div>
        <span className="text-[11px] text-slate-500">{developer.postsCount} posts</span>
      </div>
    </div>
  );
};

export default DeveloperCard;