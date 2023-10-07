import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  isSubmitted: boolean = false;
  userLoggedIn: User = new User();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {}

  handleLogin() {
    this.isSubmitted = true;

    if (!this.loginForm.invalid) {
      const username: string = String(this.loginForm.value['username']);
      const password: string = String(this.loginForm.value['password']);

      let title = '';
      let msg = '';

      this.authService.login(username, password).subscribe(
        (res: any) => {
          console.log(res);
          if (res && res.roles[0] === 'ROLE_admin') {
            title = 'Thành công';
            msg = 'Đăng nhập thành công';

            this.showSucces(msg, title);

            this.loginForm.reset();
            this.router.navigate(['/manage-account/admin-account']);
          } else {
            title = 'Thất bại';
            msg = 'Đăng nhập thất bại';

            this.showFailure(msg, title);
          }
        },
        (err) => {
          title = 'Thất bại';
          msg = 'Đăng nhập thất bại';

          this.showFailure(msg, title);
        }
      );

      this.isSubmitted = false;
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return field?.dirty || field?.touched || this?.isSubmitted;
  }

  showSucces(msg: string, title: string) {
    this.toastrService.success(msg, title);
  }

  showFailure(msg: string, title: string) {
    this.toastrService.error(msg, title);
  }
}
