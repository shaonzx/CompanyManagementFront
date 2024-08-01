import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginResponse } from '../auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(loginForm: any): void {
    if (loginForm.invalid) {
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: (response: LoginResponse) => {
        localStorage.setItem('token', response.token);
        const decodedToken: any = jwtDecode(response.token);
        const role = decodedToken.role;
        localStorage.setItem('role', role);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login failed', error);
        this.errorMessage = error.error.message || 'Login failed. Please try again.';
      }
    });
  }
}
