import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  tap,
} from 'rxjs';
import { PostService } from 'src/app/core/services/post/post.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { Post } from 'src/app/core/models/post.model';
import { Router } from '@angular/router';
import { filterPostsByUsername, paginate } from '../../core/utils/post.utils';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent {
  userFilter = new FormControl(this.postService.getFilter());
  pageSize = 10;

  postsViewModel$ = combineLatest([
    this.postService.getPosts(),
    this.userService.getUsers(),
    this.postService.page$,
    this.postService.filter$,
    this.userFilter.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap((value) => {
        this.postService.setPage(0); // Reset page only on distinct filter change
        this.postService.setFilter(value as string);
      }),
      startWith(this.postService.getFilter())
    ),
  ]).pipe(
    map(([posts, users, currentPage, filter]) => {
      const filtered = filterPostsByUsername(posts, users, filter);
      const paginated = paginate(filtered, currentPage, this.pageSize);

      return {
        posts: paginated,
        totalFiltered: filtered.length,
        currentPage,
        totalPages: Math.ceil(filtered.length / this.pageSize),
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
}
