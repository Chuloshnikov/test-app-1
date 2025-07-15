'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useCreatePost } from '@/hooks/usePosts';
import { PostList } from '@/components/PostList';

const formSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters.' }),
  body: z.string().min(20, { message: 'Body must be at least 20 characters.' }),
});

type FormData = z.infer<typeof formSchema>;

export default function Home() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      body: '',
    },
  });

  const { mutate, isPending } = useCreatePost();

  const onSubmit = (data: FormData) => {
    mutate(data, {
      onSuccess: () => {
        toast.success('Post created!');
        form.reset();
      },
    });
  };

  return (
    <div className="font-sans min-h-screen grid place-items-center p-8">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Open Form</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new post</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Post title..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Body</FormLabel>
                    <FormControl>
                      <Input placeholder="Post body..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Creating...' : 'Create Post'}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
       <PostList />
    </div>
  );
}