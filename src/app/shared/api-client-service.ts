import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { Post, CreatePostPayload, UpdatePostPayload } from '../models/post.model'; // adjust path
@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com/posts';

  // GET all posts (cached to prevent duplicate network hits)
  public getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl).pipe(
      shareReplay(1),
      catchError(this.handleError)
    );
  }

  // GET single post
  public getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // CREATE post (Omit 'id' from input if backend generates it)
  public createPost(post: CreatePostPayload): Observable<Post> {
    return this.http.post<Post>(this.baseUrl, post).pipe(
      catchError(this.handleError)
    );
  }

  // UPDATE post
  public updatePost(id: number, post: UpdatePostPayload): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/${id}`, post).pipe(
      catchError(this.handleError)
    );
  }

  // DELETE post
  public deletePost(id: number): Observable<unknown> {
    return this.http.delete<unknown>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Centralized global error handler
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
