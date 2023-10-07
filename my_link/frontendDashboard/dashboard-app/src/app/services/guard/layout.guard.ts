import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Kiểm tra xem tuyến đường là auth/login hay không
    if (state.url === '/auth/login') {
      return false; // Không hiển thị layout cho tuyến đường auth/login
    }
    return true; // Hiển thị layout cho các tuyến đường khác
  }
}
