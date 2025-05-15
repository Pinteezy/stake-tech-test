import { Post } from '../models/post.model';
import { User } from '../models/user.model';

export function filterPostsByUsername(
  posts: Post[],
  users: User[],
  filter: string | null
): Post[] {
  const normalizedFilter = (filter ?? '').toLowerCase();

  const matchedUserIds = new Set(
    users
      .filter((user) => user.username.toLowerCase().includes(normalizedFilter))
      .map((user) => user.id)
  );

  return posts.filter((post) => matchedUserIds.has(post.userId));
}

export function paginate<T>(items: Post[], page: number, pageSize: number): Post[] {
  const start = page * pageSize;
  return items.slice(start, start + pageSize);
}
