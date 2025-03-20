import { Component, OnInit } from '@angular/core';
import { MyhttpclientService } from '../services/myhttpclient.service';
import { PostdetailsComponent } from '../postdetails/postdetails.component';
@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [PostdetailsComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {

  posts: any[] = []
  constructor(private myhttpclientService:MyhttpclientService) {}

  ngOnInit(): void{
    this.getPosts()
  }

  getPosts(){
     this.myhttpclientService.getPosts().subscribe(
      (data: any)=>{
          console.log(data)
          this.posts = data
      },
      (error => {
        console.log(`ERROR : ${error}`)
      })
    )
  }

  // Create a new post
  createPost(): void {
    const newPost = { title: 'New Post', body: 'This is a new post' };
    this.myhttpclientService.createPost(newPost).subscribe(
      (data: any) => {
        console.log('Post created:', data);
        this.posts.push(data);  // Add the new post to the list
      },
      (error: any) => {
        console.error('Error creating post:', error);
      }
    );
  }

  // Delete a post
  deletePost(id: number): void {
    this.myhttpclientService.deletePost(id).subscribe(
      (response: any) => {
        console.log('Post deleted:', response);
        this.posts = this.posts.filter(post => post.id !== id);  // Remove post from list
      },
      (error: any) => {
        console.error('Error deleting post:', error);
      }
    );
  }

}
