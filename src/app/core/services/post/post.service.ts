import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Post } from '../../models/post.model';
import { API_BASE_URL } from '../../tokens/api-base-url.token';

@Injectable({ providedIn: 'root' })
export class PostService {
  private postsSubject = new BehaviorSubject<Post[] | null>(null);
  posts$ = this.postsSubject.asObservable();

  private selectedPostSubject = new BehaviorSubject<Post | null>(null);
  selectedPost$ = this.selectedPostSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(API_BASE_URL) private baseUrl: string
  ) {}

  fetchPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${this.baseUrl}/posts`)
      .pipe(tap((posts) => this.postsSubject.next(posts)));
  }

  getPosts(): Observable<Post[]> {
    // If already fetched, use cached version
    if (this.postsSubject.value) {
      return this.posts$ as Observable<Post[]>;
    } else {
      return this.fetchPosts();
    }
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`);
  }

  setSelectedPost(post: Post): void {
    this.selectedPostSubject.next(post);
  }
}
