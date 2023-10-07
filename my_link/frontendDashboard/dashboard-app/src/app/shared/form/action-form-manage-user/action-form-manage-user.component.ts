import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-action-form-manage-user',
  templateUrl: './action-form-manage-user.component.html',
  styleUrls: ['./action-form-manage-user.component.scss'],
})
export class ActionFormManageUserComponent {
  @Input() dataEdit: any = null;
  @Input() title: string = '';
  @Input() typeAction: string = '';
  @Input() nameOfTable: string = '';

  @Output() dataEdited: any = new EventEmitter<any>();

  actionForm = this.fb.group({
    id: [''],
    username: [''],
    email: [''],
    phoneNumber: [''],
    address: [''],
    fullName: [''],
  });

  isSubmitted: boolean = false;

  constructor(private modalActive: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit() {
    const id: any = this.typeAction === 'edit' ? this.dataEdit?.ID : '';
    const username: any =
      this.typeAction === 'edit' ? this.dataEdit?.Username : '';
    const email: any = [this.typeAction === 'edit' ? this.dataEdit?.Email : ''];
    const phoneNumber: any =
      this.typeAction === 'edit' ? this.dataEdit['SĐT'] : '';
    const address: any =
      this.typeAction === 'edit' ? this.dataEdit['Địa chỉ'] : '';
    const fullName: any =
      this.typeAction === 'edit' ? this.dataEdit['Họ và tên'] : '';

    console.log(id, username, email, phoneNumber, address, fullName);

    this.actionForm = this.fb.group({
      id: [id],
      username: [username],
      email: [email],
      phoneNumber: [phoneNumber],
      address: [address],
      fullName: [fullName],
    });

    console.log(this.actionForm.value);
  }

  handleCloseModal() {
    this.modalActive.close();
  }

  handleSubmitActionForm() {
    const data = this.actionForm.value;
    if (this.typeAction === 'edit') {
      if (this.nameOfTable === 'driver') {
        const code = 'data-from-edit-driver';
        this.dataEdited.emit({ code, data });
      } else if (this.nameOfTable === 'customer') {
        const code = 'data-from-edit-customer';
        this.dataEdited.emit({ code, data });
      } else if (this.nameOfTable === 'admin') {
        const code = 'data-from-edit-admin';
        this.dataEdited.emit({ code, data });
      } else if (this.nameOfTable === 'employee') {
        const code = 'data-from-edit-employee';
        this.dataEdited.emit({ code, data });
      }
    }
  }

  isFieldInvalid(fieldName: string) {
    const field = this.actionForm.get(fieldName);
    return field?.dirty || field?.touched || this?.isSubmitted;
  }
}
