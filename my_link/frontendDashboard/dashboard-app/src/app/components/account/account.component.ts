import { Component } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth/auth.service';

import {
  selectIsLoggedIn,
  selectCurrentUser,
} from 'src/app/services/store/auth.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  subscription: Subscription = new Subscription();
  userNow: any;

  constructor(private userService: UserService, private toastrService: ToastrService, private authService: AuthService,
    private store: Store) {}

  ngOnInit() {
    let currentUser;
    this.store.select(selectCurrentUser).subscribe((user) => {
      currentUser = user;
    });
    if(currentUser) {
      const { id } = currentUser;
      this.subscription = this.userService.getUserById(id+ "", "admin").subscribe((res: any) => {
        console.log(res);
        this.userNow = res.data;
        
        console.log(this.userNow);
      })
    }
  }

}
