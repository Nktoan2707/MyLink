import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

import {
  selectIsLoggedIn,
  selectCurrentUser,
} from 'src/app/services/store/auth.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  userCurrent: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.select(selectCurrentUser).subscribe((user) => {
      this.userCurrent = user;
    });
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  handleLogout() {
    window.location.reload();
    this.authService.logout();
  }
}
