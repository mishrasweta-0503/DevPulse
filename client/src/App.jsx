import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CreatePost from './components/CreatePost';
import PostCard from './components/PostCard';
import Developers from './pages/Developers';
import { fetchPosts, createPostApi } from './services/api';

const FALLBACK_POSTS = [
  {
    _id: '1',
    author: 'Alex Chen',
    role: 'Full Stack Engineer',
    content: 'Just deployed the new authentication microservice using Node.js and JWT! Loving how clean the refresh token rotation setup turned out. 🚀',
    techTag: 'Node.js',
    likes: 12,
    commentsCount: 3,
    timeAgo: '2h ago'
  },
  {
    _id: '2',
    author: 'Sarah Jenkins',
    role: 'Frontend Developer',
    content: 'Configured Tailwind CSS v3 with React dynamic layout components. Tip: standardizing container padding saves hours during responsive styling.',
    techTag: 'React',
    likes: 24,
    commentsCount: 5,
    timeAgo: '5h ago'
  }
];

function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from backend on component mount
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = await fetchPosts();
        setPosts(Array.isArray(data) && data.length > 0 ? data : FALLBACK_POSTS);
      } catch (err) {
        console.warn('Backend unavailable or empty, displaying initial posts.');
        setPosts(FALLBACK_POSTS);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const handleDemoLogin = () => {
    // Simulated token for demo mode
    const mockToken = 'demo-jwt-token-12345';
    localStorage.setItem('token', mockToken);

    setUser({
      name: 'Demo Recruiter',
      email: 'recruiter@demo.com',
      role: 'Full Stack Dev'
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const handleAddPost = async (newPostData) => {
    const payload = {
      author: user?.name || 'Demo Recruiter',
      role: user?.role || 'Recruiter / Developer',
      content: newPostData.content,
      techTag: newPostData.techTag
    };

    try {
      // Send to Express API via axios (interceptors handle Auth header)
      const savedPost = await createPostApi(payload);
      setPosts([savedPost, ...posts]);
    } catch (error) {
      console.warn('Post save error, updating local state optimistically.');
      const localPost = {
        _id: Date.now().toString(),
        ...payload,
        likes: 0,
        commentsCount: 0,
        timeAgo: 'Just now'
      };
      setPosts([localPost, ...posts]);
    }
  };

  return (
    <Layout user={user} onDemoLogin={handleDemoLogin} onLogout={handleLogout}>
      <Routes>
        <Route
          path="/"
          element={
            <div className="max-w-2xl mx-auto">
              <div className="mb-8 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-white sm:text-3xl">Developer Feed</h1>
                <p className="text-slate-400 text-sm mt-1">
                  Discover community project updates, snippets, and tech insights.
                </p>
              </div>

              <CreatePost user={user} onAddPost={handleAddPost} onDemoLogin={handleDemoLogin} />

              {loading ? (
                <div className="text-center py-12 text-slate-500 text-sm">
                  Loading feed...
                </div>
              ) : (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <PostCard key={post._id || post.id} post={post} />
                  ))}
                </div>
              )}
            </div>
          }
        />

        <Route path="/developers" element={<Developers />} />
      </Routes>
    </Layout>
  );
}

export default App;