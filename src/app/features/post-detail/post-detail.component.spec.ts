import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostDetailComponent } from './post-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/core/services/post/post.service';
import { of } from 'rxjs';
import { Post } from 'src/app/core/models/post.model';

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;
  let postServiceMock: Partial<PostService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockPost: Post = {
    id: 1,
    userId: 1,
    title: 'Mock title',
    body: 'Mock body',
  };

  beforeEach(async () => {
    postServiceMock = {
      selectedPost$: of(mockPost),
      getPostById: jasmine
        .createSpy('getPostById')
        .and.returnValue(of(mockPost)),
    };

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [PostDetailComponent],
      providers: [
        { provide: PostService, useValue: postServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: () => '1', // simulate id=1 in route
            }),
          },
        },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get post from selectedPost$ when ID matches', (done) => {
    component.post$.subscribe((post) => {
      expect(post).toEqual(mockPost);
      expect(postServiceMock.getPostById).not.toHaveBeenCalled();
      done();
    });
  });

  it('should navigate back when goBack() is called', () => {
    component.goBack();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });
});
