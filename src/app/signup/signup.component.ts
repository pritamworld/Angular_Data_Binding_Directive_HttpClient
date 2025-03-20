import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from "@angular/common";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  user = {
    firstname: "Pritesh",
    lastname: "Patel",
    city: "Tor"
  }

  buttonSignupClick(){
    alert(JSON.stringify(this.user))
  }
}
