import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  role: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.role = localStorage.getItem('role');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
