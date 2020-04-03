import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {UserModel} from '../../auth/userModel';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userData: UserModel;
  isLoggedIn = false;

  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.userData = this.authService.currentUserValue;
    this.authService.user.subscribe(value => {
      if (value != null) {
        this.isLoggedIn = true;
      }
    });
  }
  logout() {
    localStorage.clear();
    this.authService.currentUser.next(null);
    this.router.navigate(['/login']);

  }

}
