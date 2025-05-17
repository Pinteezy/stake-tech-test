import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/core/models/post.model';

@Component({
  selector: 'app-posts-list',
  template: `
    <div class="posts-list">
      <mat-card
        class="post-card"
        *ngFor="let post of posts"
        (click)="postSelected.emit(post)"
        tabindex="0"
      >
        <mat-card-title>{{ post.title }}</mat-card-title>
        <mat-card-subtitle>User ID: {{ post.userId }}</mat-card-subtitle>
        <mat-card-content>{{ post.body }}</mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .posts-list {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .post-card {
        border: 1px solid rgba(0, 0, 0, 0.12);

        &:hover {
          box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
        }
      }
    `,
  ],
})
export class PostsListComponent {
  @Input() posts: Post[] = [];
  @Output() postSelected = new EventEmitter<Post>();
}
