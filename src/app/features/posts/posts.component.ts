import { Component, ElementRef, ViewChild } from '@angular/core';
import { catchError, combineLatest, map, of, shareReplay } from 'rxjs';
import { PostService } from 'src/app/core/services/post/post.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { Post } from 'src/app/core/models/post.model';
import { Router } from '@angular/router';
import {
  enrichPostsWithUsernames,
  filterPostsByUsername,
  paginate,
} from '../../core/utils/post.utils';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent {
  pageSize = 10;
  error: string | null = null;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  readonly enrichedPosts$ = combineLatest([
    this.postService
      .getPosts()
      .pipe(catchError((err) => this.handleError('Failed to load posts.'))),
    this.userService
      .getUsers()
      .pipe(catchError((err) => this.handleError('Failed to load users.'))),
  ]).pipe(
    map(([posts, users]) => enrichPostsWithUsernames(posts, users)),
    shareReplay(1)
  );

  readonly postsViewModel$ = combineLatest([
    this.enrichedPosts$,
    this.postService.page$,
    this.postService.filter$,
  ]).pipe(
    map(([enrichedPosts, currentPage, filter]) => {
      const filtered = filterPostsByUsername(enrichedPosts, filter);
      const paginated = paginate(filtered, currentPage, this.pageSize);

      return {
        posts: paginated,
        totalFiltered: filtered.length,
        currentPage,
        totalPages: Math.ceil(filtered.length / this.pageSize),
        filter,
      };
    })
  );

  constructor(
    private postService: PostService,
    private userService: UserService,
    private router: Router
  ) {}

  nextPage(totalPages: number) {
    const next = this.postService.getPage() + 1;
    if (next < totalPages) {
      this.postService.setPage(next);
      this.scrollToTop();
    }
  }

  prevPage() {
    const prev = this.postService.getPage() - 1;
    if (prev >= 0) {
      this.postService.setPage(prev);
      this.scrollToTop();
    }
  }

  selectPost(post: Post) {
    this.postService.setSelectedPost(post);
    this.router.navigate(['/posts', post.id]);
  }

  onFilterChange(value: string) {
    this.postService.setFilter(value);
  }

  private handleError(message: string) {
    this.error = message;
    return of([]);
  }

  private scrollToTop() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = 0;
    }
  }
}
