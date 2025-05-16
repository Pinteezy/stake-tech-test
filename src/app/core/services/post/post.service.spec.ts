import { TestBed } from '@angular/core/testing';
import { PostService } from './post.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { API_BASE_URL } from '../../tokens/api-base-url.token';
import { Post } from '../../models/post.model';

describe('PostService (basic)', () => {
  let service: PostService;
  let httpMock: HttpTestingController;

  const baseUrl = 'http://localhost:3000';
  const mockPosts: Post[] = [
    { id: 1, userId: 1, title: 'Post 1', body: 'Body 1' },
    { id: 2, userId: 2, title: 'Post 2', body: 'Body 2' },
  ];
  const mockPost: Post = mockPosts[0];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: API_BASE_URL, useValue: baseUrl },
      ],
    });

    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all posts', () => {
    service.fetchPosts().subscribe(posts => {
      expect(posts.length).toBe(2);
    });

    const req = httpMock.expectOne(`${baseUrl}/posts`);
    req.flush(mockPosts);
  });

  it('should fetch post by ID', () => {
    service.getPostById(1).subscribe(post => {
      expect(post.id).toBe(1);
    });

    const req = httpMock.expectOne(`${baseUrl}/posts/1`);
    req.flush(mockPost);
  });

  it('should emit selected post', () => {
    service.setSelectedPost(mockPost);

    service.selectedPost$.subscribe(post => {
      expect(post?.title).toBe('Post 1');
    });
  });
});
