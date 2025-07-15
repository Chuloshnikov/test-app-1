// components/PostList.tsx
'use client';

import { usePosts } from '@/hooks/usePosts';

interface PostsTypes {
    userId: number,
    id: number,
    title: string,
    body: string
}

export const PostList = () => {
  const { data: posts, isLoading, isError } = usePosts();

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Failed to load posts.</p>;

  return (
    <div className="w-full max-w-2xl space-y-4 mt-10">
      {posts.slice().reverse().map((post: PostsTypes) => (
        <div key={post.id} className="p-4 border rounded-lg shadow">
          <h2 className="text-lg font-semibold">{post.title}</h2>
          <p className="text-sm text-gray-600 whitespace-pre-line">{post.body}</p>
        </div>
      ))}
    </div>
  );
};