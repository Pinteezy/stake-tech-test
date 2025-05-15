import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, startWith, tap } from 'rxjs';
import { PostService } from 'src/app/core/services/post/post.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { Post } from 'src/app/core/models/post.model';
import { Router } from '@angular/router';
import { filterPostsByUsername, paginate } from '../core/utils/post.utils';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
})
export class PostsListComponent {
  userFilter = new FormControl('');
  currentPage$ = new BehaviorSubject(0);
  pageSize = 10;

  vm$ = combineLatest([
    this.postService.getPosts(),
    this.userService.getUsers(),
    this.userFilter.valueChanges.pipe(
      startWith(''),
      tap(() => this.currentPage$.next(0)) // reset to page 0 on filter change
    ),
    this.currentPage$,
  ]).pipe(
    map(([posts, users, filter, currentPage]) => {
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
    const next = this.currentPage$.value + 1;
    if (next < totalPages) this.currentPage$.next(next);
  }

  prevPage() {
    const prev = this.currentPage$.value - 1;
    if (prev >= 0) this.currentPage$.next(prev);
  }

  selectPost(post: Post) {
    this.postService.setSelectedPost(post);
    this.router.navigate(['/posts', post.id]);
  }
}
