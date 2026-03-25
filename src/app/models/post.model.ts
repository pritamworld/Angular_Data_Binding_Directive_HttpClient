export interface Post {
  userId: number;
  id?: number;   // optional for create
  title: string;
  body: string;
}
