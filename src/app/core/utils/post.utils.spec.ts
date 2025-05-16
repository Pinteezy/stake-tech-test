import { filterPostsByUsername, paginate } from './post.utils';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';

describe('filterPostsByUsername', () => {
  const posts: Post[] = [
    { id: 1, userId: 1, title: 'Post 1', body: 'Body 1' },
    { id: 2, userId: 2, title: 'Post 2', body: 'Body 2' },
  ];

  const users: User[] = [
    { id: 1, name: 'User One', username: 'alice' },
    { id: 2, name: 'User Two', username: 'bob' },
  ] as User[];

  it('filters posts by username', () => {
    const result = filterPostsByUsername(posts, users, 'alice');
    expect(result.length).toBe(1);
    expect(result[0].userId).toBe(1);
  });

  it('returns all posts if filter is empty', () => {
    const result = filterPostsByUsername(posts, users, '');
    expect(result.length).toBe(2);
  });
});

describe('paginate', () => {
  const posts: Post[] = [
    { id: 1, userId: 1, title: '', body: '' },
    { id: 2, userId: 1, title: '', body: '' },
    { id: 3, userId: 1, title: '', body: '' },
    { id: 4, userId: 1, title: '', body: '' },
  ];

  it('returns paginated items for page 0', () => {
    const result = paginate(posts, 0, 2);
    expect(result).toEqual([posts[0], posts[1]]);
  });

  it('returns paginated items for page 1', () => {
    const result = paginate(posts, 1, 2);
    expect(result).toEqual([posts[2], posts[3]]);
  });
});
