export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface EnrichedPost extends Post {
  username: string;
}
