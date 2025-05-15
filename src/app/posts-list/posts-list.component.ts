import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/core/models/post.model';
import { User } from 'src/app/core/models/user.model';
import { PostService } from 'src/app/core/services/post/post.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
})
export class PostsListComponent implements OnInit {
  posts: Post[] = [];
  allPosts: Post[] = [];
  users: User[] = [];
  paginatedPosts: Post[] = [];
  currentPage = 0;
  pageSize = 10;

  userFilter = new FormControl('');

  constructor(
    private postService: PostService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((posts) => {
      this.allPosts = posts; // Store original list
      this.posts = [...posts]; // Clone it for filtering
      this.applyPagination();
    });

    this.userService.getUsers().subscribe((users) => (this.users = users));

    this.userFilter.valueChanges.subscribe((name) => {
      this.currentPage = 0;

      if (!name) {
        this.posts = [...this.allPosts]; // Reset when input is cleared
      } else {
        const matchedUsers = this.users.filter((u) =>
          u.username.toLowerCase().includes(name.toLowerCase())
        );

        if (matchedUsers.length > 0) {
          const matchedUserIds = new Set(matchedUsers.map((u) => u.id));
          this.posts = this.allPosts.filter((p) =>
            matchedUserIds.has(p.userId)
          );
        } else {
          this.posts = []; // No match, show empty
        }
      }

      this.applyPagination();
    });
  }

  applyPagination(): void {
    const start = this.currentPage * this.pageSize;
    this.paginatedPosts = this.posts.slice(start, start + this.pageSize);
  }

  nextPage(): void {
    if ((this.currentPage + 1) * this.pageSize < this.posts.length) {
      this.currentPage++;
      this.applyPagination();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.applyPagination();
    }
  }

  selectPost(post: Post) {
    this.postService.setSelectedPost(post);
    this.router.navigate(['/posts', post.id]);
  }
}
