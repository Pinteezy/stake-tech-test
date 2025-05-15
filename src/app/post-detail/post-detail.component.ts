import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/core/services/post/post.service';
import { Post } from 'src/app/core/models/post.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.postService.selectedPost$.subscribe((post) => {
      if (post) {
        this.post = post;
      } else {
        const id = +this.route.snapshot.paramMap.get('id')!;
        this.postService.getPostById(id).subscribe((p) => (this.post = p));
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
