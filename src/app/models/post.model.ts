/**
 * Represents a fully persisted Post resource from the API.
 */
export interface Post {
  readonly id: number; // Persisted records always have an ID; readonly prevents accidental mutation
  userId: number;
  title: string;
  body: string;
}

/**
 * Data payload required to create a new Post.
 * Automatically removes the 'id' requirement.
 */
export type CreatePostPayload = Omit<Post, 'id'>;

/**
 * Data payload required to update an existing Post.
 * Allows passing only the fields that changed.
 */
export type UpdatePostPayload = Partial<CreatePostPayload>;
