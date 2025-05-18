import { EnrichedPost, Post } from '../models/post.model';
import { User } from '../models/user.model';

export function filterPostsByUsername(
  posts: EnrichedPost[],
  filter?: string
): EnrichedPost[] {
  const normalizedFilter = filter?.toLowerCase() ?? '';

  if (!normalizedFilter) return posts;

  return posts.filter((post) =>
    post.username.toLowerCase().includes(normalizedFilter)
  );
}

export function paginate(
  items: EnrichedPost[],
  page: number,
  pageSize: number
): EnrichedPost[] {
  const start = page * pageSize;
  return items.slice(start, start + pageSize);
}

export function enrichPostsWithUsernames(
  posts: Post[],
  users: User[]
): EnrichedPost[] {
  const userMap = new Map(users.map((user) => [user.id, user.username]));

  return posts.map((post) => ({
    ...post,
    username: userMap.get(post.userId) ?? 'Unknown',
  }));
}
