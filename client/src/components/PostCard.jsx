import React, { useState } from 'react';
import { Heart, MessageSquare, Share2, Tag } from 'lucide-react';

const PostCard = ({ post }) => {
  const [likes, setLikes] = useState(post.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1);
      setHasLiked(false);
    } else {
      setLikes(likes + 1);
      setHasLiked(true);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-4 shadow-md hover:border-slate-700 transition">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow">
            {post.author ? post.author[0].toUpperCase() : 'U'}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100">{post.author}</h4>
            <p className="text-xs text-slate-400">{post.role || 'Software Engineer'}</p>
          </div>
        </div>

        {post.techTag && (
          <span className="inline-flex items-center gap-1 bg-indigo-950/80 text-indigo-300 border border-indigo-800/50 text-[11px] font-medium px-2.5 py-0.5 rounded-full">
            <Tag className="w-3 h-3 text-indigo-400" />
            {post.techTag}
          </span>
        )}
      </div>

      {/* Post Content */}
      <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line mb-4">
        {post.content}
      </p>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 text-xs text-slate-400">
        <div className="flex items-center gap-6">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 transition ${
              hasLiked ? 'text-rose-500 font-semibold' : 'hover:text-rose-400'
            }`}
          >
            <Heart className={`w-4 h-4 ${hasLiked ? 'fill-rose-500' : ''}`} />
            <span>{likes}</span>
          </button>

          <button className="flex items-center gap-1.5 hover:text-indigo-400 transition">
            <MessageSquare className="w-4 h-4" />
            <span>{post.commentsCount || 0} Comments</span>
          </button>
        </div>

        <span className="text-[11px] text-slate-500">{post.timeAgo || 'Just now'}</span>
      </div>
    </div>
  );
};

export default PostCard;