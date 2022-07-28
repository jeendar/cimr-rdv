import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;
  size: NzButtonSize = 'large';
  currentUser: User;
  
  constructor( private authService: AuthService) {
   // this.authService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
    console.log('user signed out');
  }

}
