import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/core/services/post/post.service';
import { Post } from 'src/app/core/models/post.model';
import { Observable, switchMap, of } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent {
  post$: Observable<Post>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {
    this.post$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = Number(params.get('id'));
        return this.postService.selectedPost$.pipe(
          switchMap((selected) =>
            selected?.id === id
              ? of(selected)
              : this.postService.getPostById(id)
          )
        );
      })
    );
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
