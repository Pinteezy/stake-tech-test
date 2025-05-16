import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserService } from './user.service';
import { API_BASE_URL } from '../../tokens/api-base-url.token';
import { User } from '../../models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const mockBaseUrl = 'http://localhost:3000';
  const mockUsers: User[] = [
    { id: 1, name: 'User One', email: 'user1@example.com' },
    { id: 2, name: 'User Two', email: 'user2@example.com' },
  ] as User[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: API_BASE_URL, useValue: mockBaseUrl }],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users', () => {
    service.fetchUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(`${mockBaseUrl}/users`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});
