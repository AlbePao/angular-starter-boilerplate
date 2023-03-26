import { Injectable } from '@angular/core';
import { storage } from '@lib/utils/storage/storage.utils';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(!!storage.getItem('App/session'));

  isLoggedIn$ = this._isLoggedIn$.asObservable();

  get isLoggedIn(): boolean {
    return this._isLoggedIn$.getValue();
  }

  login(): void {
    storage.setItem('App/session', { user: 'some-user-id', token: 'abc' });
    this._isLoggedIn$.next(true);
  }

  logout(): void {
    storage.removeItem('App/session');
    this._isLoggedIn$.next(false);
  }
}
