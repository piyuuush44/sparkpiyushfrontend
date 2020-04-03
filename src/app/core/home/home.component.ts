import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../auth/auth.service';
import {UserModel} from '../../auth/userModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userData: UserModel;

  upPanel: boolean;
  maharashtraPanel: boolean;
  rajasthanPanel: boolean;
  selectedCities = [];

  cities = {
    noida: false,
    ghaziabad: false,
    lucknow: false,
    kanpur: false,
    mumbai: false,
    pune: false,
    nagpur: false,
    aurangabad: false,
    jaipur: false,
    udaipur: false,
    jodhpur: false,
    kota: false,
  };

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userData = this.authService.currentUserValue;
    this.http.get(environment.endPoint + `/cities/${this.userData._id}`, {observe: 'response'}).subscribe(
      (response: HttpResponse<any>) => {
        if (response.status !== 200) {
          return;
        }
        this.selectedCities = response.body.result.cities;
        response.body.result.cities.forEach(value => {
          this.cities[value.toLowerCase()] = true;
        });
      }
    );
  }

  change(value: string) {
    const index = this.getIndex(value);
    if (index > -1) {
      this.selectedCities.splice(index, 1);
      this.http.put(environment.endPoint + `/city/${this.userData._id}`, {city: value}, {observe: 'response'})
        .subscribe((res: HttpResponse<any>) => {
          if (res.status !== 200) {
            alert('Some error occured!' + res.body.message);
          }
        });
    } else {
      this.selectedCities.push(value);
      this.http.post(environment.endPoint + `/city/${this.userData._id}`, {city: value}, {observe: 'response'})
        .subscribe((res: HttpResponse<any>) => {
          if (res.status !== 200) {
            alert('Some error occured!' + res.body.message);
          }
        });
    }
  }

  remove(value: string) {
    const index = this.getIndex(value);
    this.cities[value.toLowerCase()] = false;
    this.selectedCities.splice(index, 1);
    this.http.put(environment.endPoint + `/city/${this.userData._id}`, {city: value}, {observe: 'response'})
      .subscribe((res: HttpResponse<any>) => {
        if (res.status !== 200) {
          alert('Some error occured!' + res.body.message);
        }
      });
  }

  private getIndex = (value: string) => {
    return this.selectedCities.indexOf(value);
  };
}
