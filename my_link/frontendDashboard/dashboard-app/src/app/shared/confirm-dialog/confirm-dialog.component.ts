import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AdminService } from 'src/app/services/admin.service';
import { CustomerService } from 'src/app/services/customer.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { DriverService } from 'src/app/services/driver.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  subscription: Subscription = new Subscription();

  @Input() nameOfTable: string = '';
  @Input() dataDelete: any = null;
  @Input() typeAction: string = '';
  @Input() statusAccount: any;

  constructor(
    private modalActiveModal: NgbActiveModal,
    private driverService: DriverService,
    private adminService: AdminService,
    private customerService: CustomerService,
    private employeeService: EmployeeService,
    private userService: UserService,
    private toastrService: ToastrService
  ) {}

  handleCloseModal() {
    this.modalActiveModal.close();
  }

  handleDelete() {
    const idRole = this.dataDelete.ID;
    const idUser = this.dataDelete['ID Account'];

    console.log(this.dataDelete);
    console.log(this.nameOfTable);
    console.log(this.typeAction);

    if (this.typeAction === 'delete') {
      if (this.nameOfTable === 'admin') {
        this.subscription = this.adminService.deleteAdmin(idRole, idUser).subscribe((res: any) => {
          if(res.message === 'ok') {
            this.toastrService.success("Xóa thành công!");
            this.modalActiveModal.close();
            window.location.reload();
          } else {
            this.toastrService.error(res.message);
          }
        }, (error: any) => {
          this.toastrService.error(error);
        })
      } else if (this.nameOfTable === 'employee') {
        this.subscription = this.employeeService.deleteEmployee(idRole, idUser).subscribe((res: any) => {
          if(res.message === 'ok') {
            this.toastrService.success("Xóa thành công!");
            this.modalActiveModal.close();
            window.location.reload();
          } else {
            this.toastrService.error(res.message);
          }
        }, (error: any) => {
          this.toastrService.error(error);
        })
      } else if (this.nameOfTable === 'driver') {
        this.subscription = this.driverService.deleteDriver(idRole, idUser).subscribe((res: any) => {
          if(res.message === 'ok') {
            this.toastrService.success("Xóa thành công!");
            this.modalActiveModal.close();
            window.location.reload();
          } else {
            this.toastrService.error(res.message);
          }
        }, (error: any) => {
          this.toastrService.error(error);
        })
      } else if (this.nameOfTable === 'customer') {
        this.subscription = this.customerService.deleteCustomer(idRole, idUser).subscribe((res: any) => {
          if(res.message === 'ok') {
            this.toastrService.success("Xóa thành công!");
            this.modalActiveModal.close();
            window.location.reload();
          } else {
            this.toastrService.error(res.message);
          }
        }, (error: any) => {
          this.toastrService.error(error);
        })
      }
    } else if(this.typeAction === 'change-status-account') {
      console.log(this.dataDelete)
      const idUser = this.dataDelete['ID Account'];
      this.subscription = this.userService.changeStatusAccount(idUser, this.statusAccount).subscribe((res: any) => {
        if(res.message === 'ok') {
          this.toastrService.success("Thay đổi thành công!");
          this.modalActiveModal.close();
          window.location.reload();
        } else {
          this.toastrService.error(res.message);
        }
      }, (error: any) => {
        this.toastrService.error(error);
      })
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
