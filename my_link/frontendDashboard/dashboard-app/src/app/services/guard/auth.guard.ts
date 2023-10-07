// import { Observable, map } from 'rxjs';
// import { Injectable } from '@angular/core';
// import {
//   CanActivate,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
// } from '@angular/router';
// import { AuthService } from '../auth/auth.service';
// import { Router } from '@angular/router';
// import { User } from 'src/app/models/user.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean> | Promise<boolean> | boolean {
//     return this.authService.isUserLoggedIn().pipe(
//       // Use pipe to transform the Observable
//       map((userLoggedIn: User | null) => {
//         if (userLoggedIn) {
//           return true;
//         } else {
//           this.router.navigate(['/auth/login']);
//           return false;
//         }
//       })
//     );
//   }
// }

// auth.guard.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { selectIsLoggedIn } from '../store/auth.selector';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(selectIsLoggedIn).pipe(
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigate(['auth/login']);
        }
      })
    );
  }
}

