import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyhttpclientService {

  private API_BASE_URL = "https://jsonplaceholder.typicode.com/posts"
  constructor(private httpClient: HttpClient) { }

  // Method to get data
  getPosts(): Observable<any>{
    return this.httpClient.get(this.API_BASE_URL);
  }

  // Method to post data
  createPost(data: any): Observable<any> {
    return this.httpClient.post(this.API_BASE_URL, data);  // HTTP POST request
  }

  // Method to update data
  updatePost(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${this.API_BASE_URL}/${id}`, data);  // HTTP PUT request
  }

  // Method to delete data
  deletePost(id: number): Observable<any> {
    return this.httpClient.delete(`${this.API_BASE_URL}/${id}`);  // HTTP DELETE request
  }
}
