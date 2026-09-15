import { Component, inject } from '@angular/core';
import { ApiClientService } from '../shared/api-client-service';
import { CreatePostPayload } from '../models/post.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-postform',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './postform.html',
  styleUrl: './postform.css',
})
export class Postform {
  public readonly newPost: CreatePostPayload = {
    userId: 1,
    title: '',
    body: ''
  };

  private readonly api = inject(ApiClientService);

  public submitPost(): void {
    this.api.createPost(this.newPost).subscribe({
      next: (createdPost) => {
        console.log('Post created successfully:', createdPost);
        // Optionally reset the form or provide feedback to the user
      },
      error: (err) => {
        console.error('Error creating post:', err);
        // Optionally provide error feedback to the user
      }
    });
  }
}
