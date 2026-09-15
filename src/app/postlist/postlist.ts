import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { firstValueFrom } from 'rxjs';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ApiClientService } from '../shared/api-client-service';
import { Postdetails } from '../postdetails/postdetails';
import { Post } from '../models/post.model';
import { Postform } from '../postform/postform';
@Component({
  selector: 'app-postlist',
  imports: [Postdetails, ScrollingModule, Postform],
  templateUrl: './postlist.html',
  styleUrl: './postlist.css',
})
export class Postlist {
  private readonly api = inject(ApiClientService);

  // 🔹 Local state modifiers for mutations (Creates/Deletes)
  private readonly localMutations = signal<{ added: Post[]; deletedIds: Set<number> }>({
    added: [],
    deletedIds: new Set()
  });

  refreshPosts(): void {
    this.postsResource.reload();
  }

  // 🔹 Use 'stream' instead of 'loader' for Angular 20+ rxResource
  // Explicitly pass <Post[]> to strongly type the resource values
  private readonly postsResource = rxResource<Post[], unknown>({
    stream: () => this.api.getPosts()
  });

  // 🔹 Combined computed list is now fully type-safe
  public readonly postList = () => {
    // Fallback to empty array safely if data is still downloading
    const apiPosts = this.postsResource.value() ?? [];
    const mutations = this.localMutations();

    const combined = [...mutations.added, ...apiPosts];
    return combined.filter(p => p.id !== undefined && !mutations.deletedIds.has(p.id));
  };


  // 🔹 Expose statuses directly from the resource wrapper
  public readonly isLoading = () => this.postsResource.isLoading();
  public readonly errorMsg = () => this.postsResource.error() ? 'Failed to load posts' : '';

  // 🔹 Fetch single post using modern async/await syntax
  async getPostById(id: number): Promise<void> {
    try {
      const post = await firstValueFrom(this.api.getPostById(id));
      console.log(post);
    } catch (err) {
      console.error('Error fetching post:', err);
    }
  }

  // 🔹 Create post
  async createPost(): Promise<void> {
    const newPost: Omit<Post, 'id'> = {
      userId: 1,
      title: 'My Title',
      body: 'My Content'
    };

    try {
      const post = await firstValueFrom(this.api.createPost(newPost));
      // Prepend the new post into the local mutations signal array
      this.localMutations.update(state => ({
        ...state,
        added: [post, ...state.added]
      }));
    } catch (err) {
      console.error('Error creating post:', err);
    }
  }

  // 🔹 Update post
  async updatePost(id: number, updatedPost: Partial<Post>): Promise<void> {
    try {
      const post = await firstValueFrom(this.api.updatePost(id, updatedPost));

      // Update local additions if the edited post was created locally
      this.localMutations.update(state => ({
        ...state,
        added: state.added.map(p => p.id === id ? { ...p, ...post } : p)
      }));

      // If updating source data, reload the resource query
      this.postsResource.reload();
    } catch (err) {
      console.error('Error updating post:', err);
    }
  }

  // 🔹 Delete post
  async deletePost(id: number): Promise<void> {
    try {
      await firstValueFrom(this.api.deletePost(id));

      // Track deletions to seamlessly filter them out of the UI
      this.localMutations.update(state => {
        const nextDeleted = new Set(state.deletedIds);
        nextDeleted.add(id);
        return {
          added: state.added.filter(p => p.id !== id),
          deletedIds: nextDeleted
        };
      });
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  }
}
