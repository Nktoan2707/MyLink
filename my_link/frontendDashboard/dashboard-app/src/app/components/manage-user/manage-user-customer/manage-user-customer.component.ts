import { Component } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { GeneralService } from 'src/app/services/general.service';
import { ActionFormManageUserComponent } from 'src/app/shared/form/action-form-manage-user/action-form-manage-user.component';
import { CustomerService } from 'src/app/services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AddUserFormComponent } from 'src/app/shared/form/add-user-form/add-user-form.component';

@Component({
  selector: 'app-manage-user-customer',
  templateUrl: './manage-user-customer.component.html',
  styleUrls: ['./manage-user-customer.component.scss']
})
export class ManageUserCustomerComponent {
  subscription: Subscription = new Subscription();

  searchText: string = '';
  tableContent: any = [];
  tableContentCopy: any = [];
  tableConfig: any = [];
  itemsPerPage: number = 7;

  constructor(private customerService: CustomerService, private toastrService: ToastrService, private generalService: GeneralService, private modalService: NgbModal, private modalActive: NgbActiveModal) {}

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    this.subscription = this.customerService.getListCustomers().subscribe((res: any) => {
      if(res.message === 'ok') {
        this.tableContent = res.data.map((item: any) => {
          return {
            ID: item.id,
            'Họ và tên': item.full_name,
            'Địa chỉ': item.address,
            Username: item.user.username,
            Email: item.user.email,
            SĐT: item.phone_number,
            'Tình trạng': item.user.status_account === true? 'Tài khoản đã kích hoạt': 'Tài khoản đã bị khóa',
            'Hoạt động': item.user.status_online === true? 'Online' : 'Offline',
            'ID Account': item.id_user
          };
        });
    
        this.tableConfig = [
          'ID',
          'Username',
          'Email',
          'SĐT',
          'Địa chỉ',
          'Họ và tên',
          'Tình trạng',
          'Hoạt động',
          'ID Account',
          'Hành động'
        ].map((heading: string) => {
          return {
            title: heading,
            dataField: heading,
          };
        });

        this.deepCloneTableContent();
      } else {
        this.toastrService.error(res.message);
      }
    }, (error: any) => {
      this.toastrService.error(error);
    })
  }

  deepCloneTableContent() {
    //Copy to search not affect to main tableContent
    this.tableContentCopy = JSON.parse(JSON.stringify(this.tableContent));
  }

  handleSearch(e: any) {
    if (this.searchText.trim() !== '') {
      this.tableContent = this.tableContentCopy.filter((item: any) => {
        return (
          item['ID'] === Number(this.searchText.trim()?.toLowerCase()) ||
          item['Username']?.toLowerCase().includes(this.searchText.trim()?.toLowerCase()) ||
          item['Email']?.toLowerCase().includes(this.searchText.trim()?.toLowerCase()) ||
          item['SĐT']?.toLowerCase().includes(this.searchText.trim()?.toLowerCase()) ||
          item['Địa chỉ']?.toLowerCase().includes(this.searchText.trim()?.toLowerCase()) ||
          item['Họ và tên']?.toLowerCase().includes(this.searchText.trim()?.toLowerCase()) ||
          item['Tình trạng']?.toLowerCase().includes(this.searchText.trim()?.toLowerCase()) ||
          item['Hoạt động']?.toLowerCase().includes(this.searchText.trim()?.toLowerCase()) || 
          item['ID Account'] === Number(this.searchText.trim()?.toLowerCase())
        );
      });
    } else {
      //The initial table --> the empty string
      this.tableContent = this.tableContentCopy;
    }
  }

  handleExportExcel() {
    this.generalService.exportExcel(this.tableContent, 'bao_cao_danh_sach_khach_hang');
  }

  handleAddCustomer() {
    const modalRef = this.modalService.open(AddUserFormComponent, {
      backdrop: 'static',
    })

    modalRef.componentInstance.title = "Thêm khách hàng";
    modalRef.componentInstance.typeRole = "customer";
  }
}
