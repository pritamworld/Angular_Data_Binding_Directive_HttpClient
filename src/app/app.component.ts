import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common'
import { SignupComponent } from './signup/signup.component';
import { PostsComponent } from './posts/posts.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, PostsComponent, SignupComponent, NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'week11_tue_binding_http';
  items = [
          { title: 'Explore the Docs', link: 'https://angular.dev' },
          { title: 'Learn with Tutorials', link: 'https://angular.dev/tutorials' },
          { title: 'CLI Docs', link: 'https://angular.dev/tools/cli' },
          { title: 'Angular Language Service', link: 'https://angular.dev/tools/language-service' },
          { title: 'Angular DevTools', link: 'https://angular.dev/tools/devtools' },
        ]

  isFullTime = false
  countries = ["USA", "CAN"] //[]
  dayNo = 2
}
