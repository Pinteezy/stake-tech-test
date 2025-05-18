import {
  filterPostsByUsername,
  paginate,
  enrichPostsWithUsernames,
} from './post.utils';
import { Post, EnrichedPost } from '../models/post.model';
import { User } from '../models/user.model';

describe('filterPostsByUsername', () => {
  const posts: EnrichedPost[] = [
    { id: 1, userId: 1, title: 'Post 1', body: 'Body 1', username: 'alice' },
    { id: 2, userId: 2, title: 'Post 2', body: 'Body 2', username: 'bob' },
  ];

  it('filters posts by username', () => {
    const result = filterPostsByUsername(posts, 'alice');
    expect(result.length).toBe(1);
    expect(result[0].username).toBe('alice');
  });

  it('is case insensitive', () => {
    const result = filterPostsByUsername(posts, 'ALICE');
    expect(result.length).toBe(1);
    expect(result[0].username).toBe('alice');
  });

  it('returns all posts if filter is empty', () => {
    const result = filterPostsByUsername(posts, '');
    expect(result.length).toBe(2);
  });

  it('returns empty array if no matches', () => {
    const result = filterPostsByUsername(posts, 'nonexistent');
    expect(result.length).toBe(0);
  });
});

describe('paginate', () => {
  const posts: EnrichedPost[] = [
    { id: 1, userId: 1, title: '', body: '', username: 'a' },
    { id: 2, userId: 1, title: '', body: '', username: 'b' },
    { id: 3, userId: 1, title: '', body: '', username: 'c' },
    { id: 4, userId: 1, title: '', body: '', username: 'd' },
  ];

  it('returns paginated items for page 0', () => {
    const result = paginate(posts, 0, 2);
    expect(result).toEqual([posts[0], posts[1]]);
  });

  it('returns paginated items for page 1', () => {
    const result = paginate(posts, 1, 2);
    expect(result).toEqual([posts[2], posts[3]]);
  });

  it('returns empty array for out-of-bound page', () => {
    const result = paginate(posts, 10, 2);
    expect(result).toEqual([]);
  });
});

describe('enrichPostsWithUsernames', () => {
  const posts: Post[] = [
    { id: 1, userId: 1, title: 'Hello', body: 'World' },
    { id: 2, userId: 2, title: 'Foo', body: 'Bar' },
    { id: 3, userId: 3, title: 'NoUser', body: 'Missing user' },
  ];

  const users: User[] = [
    { id: 1, name: 'Alice', username: 'alice' },
    { id: 2, name: 'Bob', username: 'bob' },
  ] as User[];

  it('adds usernames to posts', () => {
    const result = enrichPostsWithUsernames(posts, users);
    expect(result[0].username).toBe('alice');
    expect(result[1].username).toBe('bob');
  });

  it('uses "Unknown" when no matching user found', () => {
    const result = enrichPostsWithUsernames(posts, users);
    expect(result[2].username).toBe('Unknown');
  });
});
