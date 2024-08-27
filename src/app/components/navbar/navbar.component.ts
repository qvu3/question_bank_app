import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Import your AuthService
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  userRole: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      this.userRole = this.authService.getUserRole();
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
