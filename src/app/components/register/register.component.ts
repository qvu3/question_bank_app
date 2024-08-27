import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  password = '';
  email = '';

  constructor(private authService: AuthService) { }

  // Method to handle user registration
  register() {
    this.authService.register(this.username, this.password, this.email).subscribe(
      response => {
        console.log('User registered successfully:', response);
        alert('User registered successfully!');
      },
      error => {
        console.error('Error registering user:', error);
        alert('Error registering user. Please try again.');
      }
    );
  }
}
