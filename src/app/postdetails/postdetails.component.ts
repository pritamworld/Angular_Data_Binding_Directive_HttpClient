import { Component, Input } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
@Component({
  selector: 'app-postdetails',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './postdetails.component.html',
  styleUrl: './postdetails.component.css'
})
export class PostdetailsComponent {
  @Input("userPost")post:any

  isClassAvailable = true
}
