import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsComponent } from './posts.component';
import { PostService } from 'src/app/core/services/post/post.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Post } from 'src/app/core/models/post.model';
import { User } from 'src/app/core/models/user.model';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let postServiceMock: Partial<PostService>;
  let userServiceMock: Partial<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockPosts: Post[] = [
    { id: 1, userId: 1, title: 'Title 1', body: 'Body 1' },
    { id: 2, userId: 2, title: 'Title 2', body: 'Body 2' },
  ];

  const mockUsers = [
    { id: 1, username: 'john' },
    { id: 2, username: 'jane' },
  ] as User[];

  beforeEach(async () => {
    postServiceMock = {
      getPosts: () => of(mockPosts),
      page$: of(0),
      filter$: of(''),
      getPage: () => 0,
      setPage: jasmine.createSpy('setPage'),
      setSelectedPost: jasmine.createSpy('setSelectedPost'),
      setFilter: jasmine.createSpy('setFilter'),
    };

    userServiceMock = {
      getUsers: () => of(mockUsers),
    };

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [PostsComponent],
      providers: [
        { provide: PostService, useValue: postServiceMock as PostService },
        { provide: UserService, useValue: userServiceMock as UserService },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to post detail and set selected post', () => {
    const post = mockPosts[0];
    component.selectPost(post);
    expect(postServiceMock.setSelectedPost).toHaveBeenCalledWith(post);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/posts', post.id]);
  });

  it('should go to next page if not at last page', () => {
    postServiceMock.getPage = () => 0;
    component.nextPage(3);
    expect(postServiceMock.setPage).toHaveBeenCalledWith(1);
  });

  it('should not go to next page if on last page', () => {
    postServiceMock.getPage = () => 2;
    component.nextPage(3);
    expect(postServiceMock.setPage).not.toHaveBeenCalled();
  });

  it('should go to previous page if not on first page', () => {
    postServiceMock.getPage = () => 1;
    component.prevPage();
    expect(postServiceMock.setPage).toHaveBeenCalledWith(0);
  });

  it('should not go to previous page if on first page', () => {
    postServiceMock.getPage = () => 0;
    component.prevPage();
    expect(postServiceMock.setPage).not.toHaveBeenCalled();
  });

  it('should call setFilter on filter change', () => {
    component.onFilterChange('john');
    expect(postServiceMock.setFilter).toHaveBeenCalledWith('john');
  });
});
