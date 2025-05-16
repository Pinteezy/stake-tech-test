import { Post } from '../models/post.model';
import { User } from '../models/user.model';

export function filterPostsByUsername(
  posts: Post[],
  users: User[],
  filter: string | null
): Post[] {
  if (!filter) return posts;

  const normalizedFilter = (filter ?? '').toLowerCase();

  const matchedUserIds = new Set(
    users
      .filter((user) => user.username.toLowerCase().includes(normalizedFilter))
      .map((user) => user.id)
  );

  return posts.filter((post) => matchedUserIds.has(post.userId));
}

export function paginate(
  items: Post[],
  page: number,
  pageSize: number
): Post[] {
  const start = page * pageSize;
  return items.slice(start, start + pageSize);
}
