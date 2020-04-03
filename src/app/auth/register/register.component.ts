import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {UserModel} from '../userModel';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      email: this.fb.control(''),
      password: this.fb.control(''),
      name: this.fb.control('')
    });
  }

  onSubmit() {
    this.http.post(environment.endPoint + '/register', this.registrationForm.value, {observe: 'response'})
      .subscribe((response: HttpResponse<any>) => {
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
