import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActionFormManageUserComponent } from '../form/action-form-manage-user/action-form-manage-user.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

import { DriverService } from 'src/app/services/driver.service';
import { AdminService } from 'src/app/services/admin.service';
import { CustomerService } from 'src/app/services/customer.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-table-template',
  templateUrl: './table-template.component.html',
  styleUrls: ['./table-template.component.scss'],
})
export class TableTemplateComponent {
  @Input() nameOfTable: string = '';
  @Input() tableContent: any;
  @Input() tableConfig: any;
  @Output() deletedSuccessEvent: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() editedSuccessEvent: EventEmitter<string> =
    new EventEmitter<string>();
  @Input() itemsPerPage: number = 0;
  pResult: number = 1;

  subscription: Subscription = new Subscription();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tableContent']) {
      this.pResult = 1;
    }
  }

  constructor(
    private modalService: NgbModal,
    private driverService: DriverService,
    private adminService: AdminService,
    private customerService: CustomerService,
    private employeeService: EmployeeService,
    private toastrService: ToastrService,
    private modalActiveService: NgbActiveModal
  ) {}

  ngOnInit() {}

  handleEdit(data: any) {
    const modalRef = this.modalService.open(ActionFormManageUserComponent, {
      backdrop: 'static',
      size: 'lg',
    });

    const typeAction = 'edit';
    let title = '';
    if (this.nameOfTable === 'driver') {
      title = 'Chỉnh sửa thông tin Tài xế';
    }
    modalRef.componentInstance.dataEdit = data;
    modalRef.componentInstance.typeAction = typeAction;
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.nameOfTable = this.nameOfTable;

    modalRef.componentInstance.dataEdited.subscribe((res: any) => {
      if (res.code === 'data-from-edit-driver') {
        this.subscription = this.driverService.updateDriver(res.data).subscribe((res: any) => {
          if(res.message === 'ok') {
            this.toastrService.success("Cập nhật thành công!");
            this.modalActiveService.close();
            window.location.reload();
          } else {
            this.toastrService.error(res.message);
          }
        }, (error: any) => {
          this.toastrService.error(error);
        })
      } else if (res.code === 'data-from-edit-customer') {
        this.subscription = this.customerService.updateCustomer(res.data).subscribe((res: any) => {
          if(res.message === 'ok') {
            this.toastrService.success("Cập nhật thành công!");
            this.modalActiveService.close();
            window.location.reload();
          } else {
            this.toastrService.error(res.message);
          }
        }, (error: any) => {
          this.toastrService.error(error);
        })
      } else if (res.code === 'data-from-edit-admin') {
        this.subscription = this.adminService.updateAdmin(res.data).subscribe((res: any) => {
          if(res.message === 'ok') {
            this.toastrService.success("Cập nhật thành công!");
            this.modalActiveService.close();
            window.location.reload();
          } else {
            this.toastrService.error(res.message);
          }
        }, (error: any) => {
          this.toastrService.error(error);
        })
      } else if (res.code === 'data-from-edit-employee') {
        this.subscription = this.employeeService.updateEmployee(res.data).subscribe((res: any) => {
          if(res.message === 'ok') {
            this.toastrService.success("Cập nhật thành công!");
            this.modalActiveService.close();
            window.location.reload();
          } else {
            this.toastrService.error(res.message);
          }
        }, (error: any) => {
          this.toastrService.error(error);
        })
      }
    });
  }

  handleDisable(data: any) {
    const modalRef = this.modalService.open(ConfirmDialogComponent, {
      backdrop: 'static',
      centered: true,
    });

    modalRef.componentInstance.nameOfTable = this.nameOfTable;
    modalRef.componentInstance.dataDelete = data;
    modalRef.componentInstance.typeAction = 'change-status-account';
    modalRef.componentInstance.statusAccount = 0;
  }

  handleEnable(data: any) {
    const modalRef = this.modalService.open(ConfirmDialogComponent, {
      backdrop: 'static',
      centered: true,
    });

    modalRef.componentInstance.nameOfTable = this.nameOfTable;
    modalRef.componentInstance.dataDelete = data;
    modalRef.componentInstance.typeAction = 'change-status-account';
    modalRef.componentInstance.statusAccount = 1;
  }

  handleConfirmDelete(data: any) {
    const modalRef = this.modalService.open(ConfirmDialogComponent, {
      backdrop: 'static',
      centered: true,
    });

    modalRef.componentInstance.nameOfTable = this.nameOfTable;
    modalRef.componentInstance.dataDelete = data;
    modalRef.componentInstance.typeAction = 'delete';
  }
}
