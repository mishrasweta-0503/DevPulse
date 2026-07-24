import React, { useState } from 'react';
import { Send, Tag, Code } from 'lucide-react';

const CreatePost = ({ user, onAddPost, onDemoLogin }) => {
  const [content, setContent] = useState('');
  const [techTag, setTechTag] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    onAddPost({
      content,
      techTag: techTag.trim() ? techTag.trim() : 'General',
    });

    setContent('');
    setTechTag('');
  };

  // If user is not logged in, show quick prompt with instant demo login
  if (!user) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center shadow-lg mb-8">
        <h3 className="text-lg font-semibold text-white mb-2">Want to share a project update or snippet?</h3>
        <p className="text-slate-400 text-sm mb-4">
          Experience the full app interactively as a recruiter or guest developer.
        </p>
        <button
          onClick={onDemoLogin}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition"
        >
          <Code className="w-4 h-4" />
          <span>Enable Quick Demo Mode</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-full bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-indigo-400 font-bold text-sm">
          {user.name ? user.name[0].toUpperCase() : 'D'}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">{user.name}</h3>
          <p className="text-xs text-slate-400">Posting to DevPulse feed</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What are you building or learning today? Share a project update, code snippet, or insight..."
          rows={3}
          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition resize-none"
        />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-400">
            <Tag className="w-3.5 h-3.5 text-indigo-400" />
            <input
              type="text"
              value={techTag}
              onChange={(e) => setTechTag(e.target.value)}
              placeholder="Tag (e.g., React, Node, MongoDB)"
              className="bg-transparent border-none outline-none text-slate-200 text-xs w-full sm:w-44 placeholder-slate-600"
            />
          </div>

          <button
            type="submit"
            disabled={!content.trim()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish Post</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;