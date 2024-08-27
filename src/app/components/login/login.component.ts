import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';  // Import your AuthService
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        console.log('Login successful:', response);

        // Save token or user data as needed
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role); // Assuming role is returned in response

        // Redirect based on user role
        if (response.role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/question-list']);
        }
      },
      (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid username or password. Please try again.';
      }
    );
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
