import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { Postlist } from './postlist/postlist';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, Postlist],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('week11_tue_http_directives');
  name: string = ""

  countryList = ["Canada", "Mexico", "Brazil", "Indai", "USA", "Spain"]
  isShow = true
  weekDay = 2

  //array with objects
  docsList: { title: string , link : string}[] = [
    { title: 'Explore the Docs', link: 'https://angular.dev' },
    { title: 'Learn with Tutorials', link: 'https://angular.dev/tutorials' },
    { title: 'CLI Docs', link: 'https://angular.dev/tools/cli' },
    { title: 'Angular Language Service', link: 'https://angular.dev/tools/language-service' },
    { title: 'Angular DevTools', link: 'https://angular.dev/tools/devtools' },
  ];

  showName(): void {
    alert(`Name: ${this.name}`)
  }
}
