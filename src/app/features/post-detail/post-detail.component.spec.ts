import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostDetailComponent } from './post-detail.component';
import { PostService } from 'src/app/core/services/post/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Post } from 'src/app/core/models/post.model';
import { MatCardModule } from '@angular/material/card';

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;
  let mockPostService: jasmine.SpyObj<PostService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockPost: Post = {
    id: 1,
    userId: 1,
    title: 'Mock post title',
    body: 'Mock post body',
  };

  beforeEach(async () => {
    mockPostService = jasmine.createSpyObj('PostService', ['getPostById'], {
      selectedPost$: of(mockPost),
    });

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [PostDetailComponent],
      imports: [MatCardModule],
      providers: [
        { provide: PostService, useValue: mockPostService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              },
            },
          },
        },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should return post from selectedPost$ when available', (done) => {
    component.post$.subscribe((post) => {
      expect(post).toEqual(mockPost);
      done();
    });
  });

  it('should navigate back to / on goBack()', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});
