import { Subscription } from 'rxjs';
import { Component } from '@angular/core';

import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

import {
  selectIsLoggedIn,
  selectCurrentUser,
} from 'src/app/services/store/auth.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-change-password-account',
  templateUrl: './change-password-account.component.html',
  styleUrls: ['./change-password-account.component.scss']
})
export class ChangePasswordAccountComponent {
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  subscription: Subscription = new Subscription();
  currentUser: any;

  constructor(private toastrService: ToastrService, private authService: AuthService, private store: Store) {}

  ngOnInit() {
    this.store.select(selectCurrentUser).subscribe((user) => {
      this.currentUser = user;
    });
  }

  handleChangePassword() {
    if(this.newPassword !== this.confirmPassword) {
      this.toastrService.show("Mật khẩu không trùng khớp")
    } else {
      const currentPassword = this.oldPassword;
      const newPassword = this.newPassword;
      const userId = this.currentUser.id;

      this.subscription = this.authService.changePassword({ currentPassword, newPassword, userId }).subscribe((res: any) => {
        if(res.message === 'ok') {
          this.toastrService.success("Thay đổi mật khẩu thành công!");
          this.authService.logout();
        } else {
          this.toastrService.error(res.message);
        }
      }, (error: any) => {
        this.toastrService.error(error);
      })
    }
  }
}
