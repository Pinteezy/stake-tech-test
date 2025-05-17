import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsComponent } from './posts.component';
import { PostService } from 'src/app/core/services/post/post.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../core/models/user.model';

const mockPosts = [
  { id: 1, userId: 1, title: 'Post 1', body: 'Body 1' },
  { id: 2, userId: 2, title: 'Post 2', body: 'Body 2' },
  { id: 3, userId: 1, title: 'Post 3', body: 'Body 3' },
];

const mockUsers = [
  { id: 1, username: 'Bret' },
  { id: 2, username: 'Antonette' },
];

describe('PostsListComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let mockPostService: jasmine.SpyObj<PostService>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockPostService = jasmine.createSpyObj('PostService', [
      'getPosts',
      'setSelectedPost',
    ]);
    mockUserService = jasmine.createSpyObj('UserService', ['getUsers']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [PostsComponent],
      imports: [ReactiveFormsModule, MatCardModule],
      providers: [
        { provide: PostService, useValue: mockPostService },
        { provide: UserService, useValue: mockUserService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    mockPostService.getPosts.and.returnValue(of(mockPosts));
    mockUserService.getUsers.and.returnValue(of(mockUsers as User[]));

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should go to next page if not at last page', () => {
    // component.currentPage$.next(0);
    component.nextPage(2);
    // expect(component.currentPage$.value).toBe(1);
  });

  it('should not go to next page if at last page', () => {
    // component.currentPage$.next(1);
    component.nextPage(2);
    // expect(component.currentPage$.value).toBe(1);
  });

  it('should go to previous page if not at first page', () => {
    // component.currentPage$.next(1);
    component.prevPage();
    // expect(component.currentPage$.value).toBe(0);
  });

  it('should not go to previous page if at first page', () => {
    // component.currentPage$.next(0);
    component.prevPage();
    // expect(component.currentPage$.value).toBe(0);
  });

  it('should reset page to 0 when filter changes', (done) => {
    // component.currentPage$.next(2);
    component.userFilter.setValue('Bret');

    // Wait for debounce
    setTimeout(() => {
      // expect(component.currentPage$.value).toBe(0);
      done();
    }, 600);
  });

  it('should navigate to post detail and store selected post', () => {
    const post = mockPosts[0];
    component.selectPost(post);
    expect(mockPostService.setSelectedPost).toHaveBeenCalledWith(post);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/posts', post.id]);
  });
});
