import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/services/auth/auth.service';

import {
  selectIsLoggedIn,
  selectCurrentUser,
} from 'src/app/services/store/auth.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss'],
})
export class EditAccountComponent {
  fullName: string = '';
  phoneNumber: string = '';
  email: string = '';
  address: string = '';
  selectedFile: any;
  avatarFileSelected: any = null;
  formData: FormData = new FormData();

  subscription: Subscription = new Subscription();
  currentUser: any;

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private store: Store
  ) {}

  ngOnInit() {
    let userLogged = null;
    this.store.select(selectCurrentUser).subscribe((user) => {
      userLogged = user;
    });

    if (userLogged) {
      let { id } = userLogged;
      const idUser = id;
      this.subscription = this.userService
        .getUserById(idUser, 'admin')
        .subscribe((res: any) => {
          if (res.message === 'ok') {
            this.currentUser = res.data;

            this.fullName = this.currentUser.full_name;
            this.address = this.currentUser.address;
            this.email = this.currentUser.user.email;
            this.phoneNumber = this.currentUser.phone_number;
          } else {
            this.toastrService.error(res.message);
          }
        });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.avatarFileSelected = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
    // Xử lý tệp được chọn tại đây
  }

  handleUpdateProfile() {
    this.formData.append('full_name', this.fullName);
    this.formData.append('email', this.email);
    this.formData.append('phone_number', this.phoneNumber);
    this.formData.append('address', this.address);
    this.formData.append('role', 'admin');
    this.formData.append('userId', this.currentUser.id_user);

    if (this.selectedFile) {
      this.formData.append('image_url', this.selectedFile);
      console.log(this.selectedFile);
    }

    if (this.currentUser) {
      const id = this.currentUser.id;
      console.log(id);
      this.subscription = this.userService
        .updateUser(id, this.formData)
        .subscribe((res: any) => {
          console.log(res);
          if (res.message === 'ok') {
            this.authService.logout();
            window.location.reload();
          } else {
            this.toastrService.error(res.message);
          }
        });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
