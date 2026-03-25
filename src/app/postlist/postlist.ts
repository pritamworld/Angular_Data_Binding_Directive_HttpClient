import { Component, inject, OnInit } from '@angular/core';
import { ApiClientService } from '../shared/api-client-service';
import { Postdetails } from '../postdetails/postdetails';
import { Post } from '../models/post.model';
import { catchError, finalize, of } from 'rxjs';

@Component({
  selector: 'app-postlist',
  imports: [Postdetails],
  templateUrl: './postlist.html',
  styleUrl: './postlist.css',
})
export class Postlist implements OnInit {
  private readonly api = inject(ApiClientService);

  postList: Post[] = [];
  isLoading = false;
  errorMsg = '';

  ngOnInit(): void {
    this.loadPosts();
  }

  // 🔹 Load all posts
  loadPosts(): void {
    this.isLoading = true;
    this.errorMsg = '';

    this.api.getPosts()
      .pipe(
        catchError(err => {
          console.error('Error fetching posts:', err);
          this.errorMsg = 'Failed to load posts';
          return of([] as Post[]);
        }),
        finalize(() => this.isLoading = false)
      )
      .subscribe(posts => this.postList = posts);
  }

  // 🔹 Get single post
  getPostById(id: number): void {
    this.api.getPostById(id)
      .pipe(
        catchError(err => {
          console.error('Error fetching post:', err);
          this.errorMsg = 'Failed to fetch post';
          return of(null);
        })
      )
      .subscribe(post => {
        if (post) console.log(post);
      });
  }

  // 🔹 Create post
  createPost(): void {
    const newPost: Post = {
      userId: 1,
      title: 'My Title',
      body: 'My Content'
    };

    this.api.createPost(newPost)
      .pipe(
        catchError(err => {
          console.error('Error creating post:', err);
          this.errorMsg = 'Create failed';
          return of(null);
        })
      )
      .subscribe(post => {
        if (post) {
          this.postList = [post, ...this.postList]; // optimistic UI update
        }
      });
  }

  // 🔹 Update post
  updatePost(id: number, updatedPost: Post): void {
    this.api.updatePost(id, updatedPost)
      .pipe(
        catchError(err => {
          console.error('Error updating post:', err);
          this.errorMsg = 'Update failed';
          return of(null);
        })
      )
      .subscribe(post => {
        if (post) {
          this.postList = this.postList.map(p =>
            p.id === id ? { ...p, ...post } : p
          );
        }
      });
  }

  // 🔹 Delete post
  deletePost(id: number): void {
    this.api.deletePost(id)
      .pipe(
        catchError(err => {
          console.error('Error deleting post:', err);
          this.errorMsg = 'Delete failed';
          return of(null);
        })
      )
      .subscribe(() => {
        this.postList = this.postList.filter(p => p.id !== id);
      });
  }
}
