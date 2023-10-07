import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss']
})
export class AddUserFormComponent {
  @Input() typeRole: string = '';
  @Input() title: string = '';

  subscription: Subscription = new Subscription();

  addForm = this.fb.group({
    username: [''],
    email: [''],
    password: [''],
    roles: ['']
  });

  isSubmitted: boolean = false;

  constructor(private toastrService: ToastrService, private modalActive: NgbActiveModal, private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.addForm = this.fb.group({
      username: [''],
      email: [''],
      password: ['123456'],
      roles: [this.getStringRoles(this.typeRole)]
    });
  }

  handleCloseModal() {
    this.modalActive.close();
  }

  handleSubmitActionForm() {
    const data = this.addForm.value;


    let newData = null;
    if(this.typeRole === 'admin') { 
      newData = { ...data, password: '123455', roles: '["admin"]'}
    } else if(this.typeRole === 'employee') {
      newData = { ...data, password: '123455', roles: '["employee"]'}
    } else if(this.typeRole === 'customer') {
      newData = { ...data, password: '123455', roles: '["customer"]'}
    } else if(this.typeRole === 'driver') {
      newData = { ...data, password: '123455', roles: '["driver"]'}
    }

    this.subscription = this.authService.signup(newData).subscribe((res: any) => {
      if(res.message === 'User was registered successfully!') {
        window.location.reload();
      } else {
        this.toastrService.error(this.title +" không thành công!");
      }
    }, (error: any) => {
      this.toastrService.error(error);
    })
  }

  getStringRoles(idRole: string) {
    let roleStr = '';

    if(idRole === 'admin') {
      roleStr = 'Admin';
    } else if(idRole === 'employee') {
      roleStr = "Nhân viên";
    } else if(idRole === 'driver') {
      roleStr = 'Tài xế';
    } else if(idRole === 'customer') {
      roleStr = 'Khách hàng';
    }

    return roleStr;
  }

  isFieldInvalid(fieldName: string) {
    const field = this.addForm.get(fieldName);
    return field?.dirty || field?.touched || this?.isSubmitted;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}


