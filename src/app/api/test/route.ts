import { NextResponse } from 'next/server';

import { posts } from '@/lib/data';

// GET - вернуть все посты
export async function GET() {
  return NextResponse.json(posts);
}

// POST - добавить новый пост
export async function POST(request: Request) {
  const body = await request.json();

  if (!body.title || !body.body) {
    return new NextResponse('Missing title or body', { status: 400 });
  }

  const newPost = {
    userId: 1,
    id: posts.length + 1,
    title: body.title,
    body: body.body,
  };

  posts.push(newPost);

  return NextResponse.json(newPost, { status: 201 });
}