import { Component } from '@angular/core';
import { catchError, combineLatest, map, of } from 'rxjs';
import { PostService } from 'src/app/core/services/post/post.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { Post } from 'src/app/core/models/post.model';
import { Router } from '@angular/router';
import { filterPostsByUsername, paginate } from '../../core/utils/post.utils';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent {
  pageSize = 10;
  error: string | null = null;

  postsViewModel$ = combineLatest([
    this.postService.getPosts().pipe(
      catchError((err) => {
        this.handleError('Failed to load posts.');
        return of([]); 
      })
    ),
    this.userService.getUsers().pipe(
      catchError((err) => {
        this.handleError('Failed to load users.');
        return of([]); 
      })
    ),
    this.postService.page$,
    this.postService.filter$,
  ]).pipe(
    map(([posts, users, currentPage, filter]) => {
      const filtered = filterPostsByUsername(posts, users, filter);
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
    if (next < totalPages) this.postService.setPage(next);
  }

  prevPage() {
    const prev = this.postService.getPage() - 1;
    if (prev >= 0) this.postService.setPage(prev);
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
  }
}
