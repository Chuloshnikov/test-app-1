import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface PostData {
    title: string;
    body: string;
}

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await fetch('/api/test');
      if (!res.ok) throw new Error('Failed to fetch posts');
      return res.json();
    },
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postData: PostData) => {
      const res = await fetch('/api/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (!res.ok) {
        throw new Error('Failed to create post');
      }

      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },

    onError: (error) => {
      console.error('Error creating post:', error);
    },
  });
};