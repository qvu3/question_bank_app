import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for form handling
import { AuthService } from '../../services/auth.service'; // Import your AuthService

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Import necessary modules
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService) { }

  // Method to handle user login
  login() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        console.log('User logged in successfully:', response);
        alert('User logged in successfully!');
        localStorage.setItem('token', response.token); // Save JWT token if needed
      },
      error => {
        console.error('Error logging in:', error);
        alert('Invalid credentials. Please try again.');
      }
    );
  }
}
