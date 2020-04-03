import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {AuthService} from '../auth.service';
import {UserModel} from '../userModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control(''),
      password: this.fb.control('')
    });
  }

  onSubmit() {
    this.http.post(environment.endPoint + '/login', this.loginForm.value, {observe: 'response'})
      .subscribe((response: HttpResponse<any>) => {
        console.log(response);
        if (response.status !== 200) {
          alert('Some error occured!' + response.body.message);
          return;
        }
        const user: UserModel = response.body.result.user;
        localStorage.setItem('auth', JSON.stringify(user));
        this.authService.currentUser.next(user);
        this.router.navigate(['/']);

      });
  }

}
