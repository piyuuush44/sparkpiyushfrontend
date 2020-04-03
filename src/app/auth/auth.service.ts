import {BehaviorSubject, Observable} from 'rxjs';
import {UserModel} from './userModel';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthService {
  public currentUser: BehaviorSubject<UserModel>;
  public user: Observable<UserModel>;
  private userData = JSON.parse(localStorage.getItem('auth'));

  constructor() {
    this.currentUser = new BehaviorSubject<UserModel>(this.userData);
    this.user = this.currentUser.asObservable();
  }

  public get currentUserValue(): UserModel {
    return this.currentUser.value;
  }
}
