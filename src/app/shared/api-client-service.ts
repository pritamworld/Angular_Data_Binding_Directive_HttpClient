import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model'; // adjust path

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private readonly API_BASE_URL = "https://jsonplaceholder.typicode.com/posts";
  private readonly httpClient = inject(HttpClient);

  // GET all posts
  public getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.API_BASE_URL);
  }

  // GET single post
  public getPostById(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.API_BASE_URL}/${id}`);
  }

  // CREATE post
  public createPost(post: Post): Observable<Post> {
    return this.httpClient.post<Post>(this.API_BASE_URL, post);
  }

  // UPDATE post
  public updatePost(id: number, post: Post): Observable<Post> {
    return this.httpClient.put<Post>(`${this.API_BASE_URL}/${id}`, post);
  }

  // DELETE post
  public deletePost(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_BASE_URL}/${id}`);
  }
}
