"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import PostCard from "../components/PostCard";

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchPosts = async () => {
      try {
        const resPosts = await fetch("https://dummyjson.com/posts");
        if (!resPosts.ok) throw new Error("failed to fetch posts");
        const data = await resPosts.json();
        setPosts(data.posts)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    };
    fetchPosts()
  }, []);

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error: {error}</p>

  return(
    <div className="container mx-auto p-4 bg-gradient-to-r from-green-50 via-white to-green-50 text-center">
      <h1 className="text-2xl font-semibold text-green-700">Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default PostsList;
