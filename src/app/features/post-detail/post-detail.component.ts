import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/core/services/post/post.service';
import { Post } from 'src/app/core/models/post.model';
import { Observable, switchMap, of, map, take } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostDetailComponent {
  post$: Observable<Post>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {
    this.post$ = this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((id) =>
        this.postService.selectedPost$.pipe(
          take(1),
          switchMap((selected) =>
            selected?.id === id
              ? of(selected)
              : this.postService.getPostById(id)
          )
        )
      )
    );
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
