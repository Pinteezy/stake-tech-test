import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/core/services/post/post.service';
import { Post } from 'src/app/core/models/post.model';
import { Observable, switchMap, of } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
})
export class PostDetailComponent {
  post$: Observable<Post | null>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {
    this.post$ = this.postService.selectedPost$.pipe(
      switchMap((selected) => {
        if (selected) return of(selected);
        const id = Number(this.route.snapshot.paramMap.get('id'));
        return this.postService.getPostById(id);
      })
    );
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
