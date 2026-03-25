import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { JsonPipe, NgClass, NgStyle } from '@angular/common';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-postdetails',
  standalone: true,
  imports: [JsonPipe, NgClass, NgStyle],
  templateUrl: './postdetails.html',
  styleUrls: ['./postdetails.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Postdetails {

  @Input({ required: true }) post!: Post;

  isHighlighted = false;

  toggleHighlight(): void {
    this.isHighlighted = !this.isHighlighted;
  }
}
