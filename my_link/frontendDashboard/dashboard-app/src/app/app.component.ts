import { Component } from '@angular/core';

import { loginSuccess, logout } from './services/store/auth.action';
import { Store } from '@ngrx/store';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dashboard-app';
  isLoggedIn: boolean = false;

  constructor(private store: Store, private authService: AuthService) {}

  ngOnInit(): void {}

  ngDoCheck() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      // Nếu có, cập nhật trạng thái đăng nhập trong store
      this.store.dispatch(loginSuccess({ user: JSON.parse(currentUser) }));
      this.isLoggedIn = true;
    } else {
      this.store.dispatch(logout());
      this.isLoggedIn = false;
    }
  }
}
