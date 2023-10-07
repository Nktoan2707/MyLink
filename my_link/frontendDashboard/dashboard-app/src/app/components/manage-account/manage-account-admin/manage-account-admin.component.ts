import { Component } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { GeneralService } from 'src/app/services/general.service';
import { ActionFormManageUserComponent } from 'src/app/shared/form/action-form-manage-user/action-form-manage-user.component';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AddUserFormComponent } from 'src/app/shared/form/add-user-form/add-user-form.component';

@Component({
  selector: 'app-manage-account-admin',
  templateUrl: './manage-account-admin.component.html',
  styleUrls: ['./manage-account-admin.component.scss'],
})
export class ManageAccountAdminComponent {
  subscription: Subscription = new Subscription();

  searchText: string = '';
  tableContent: any = [];
  tableContentCopy: any = [];
  tableConfig: any = [];
  itemsPerPage: number = 7;

  data: any = [
    {
      id: 1,
      username: 'huuloc2310',
      email: 'huuloc2310@gmail.com',
      fullName: 'Nguyễn Hữu Lộc',
      position: 'Trưởng phòng kinh doanh',
      phoneNumber: '0908090809',
      address: 'Đ12, Phường 9, Quận 8, TP.HCM',
      permissions: ['view', 'edit', 'delete', 'add'],
      isEnabled: true,
      isOnline: true,
      created_date: '23-10-2020',
    },
    {
      id: 2,
      username: 'huuloc2310',
      email: 'huuloc2310@gmail.com',
      fullName: 'Nguyễn Hữu Lộc',
      position: 'Trưởng phòng kinh doanh',
      phoneNumber: '0908090809',
      address: 'Đ12, Phường 9, Quận 8, TP.HCM',
      permissions: ['view', 'edit', 'delete', 'add'],
      isEnabled: true,
      isOnline: true,
      created_date: '23-10-2020',
    },
    {
      id: 3,
      username: 'huuloc2310',
      email: 'huuloc2310@gmail.com',
      fullName: 'Nguyễn Hữu Lộc',
      position: 'Trưởng phòng kinh doanh',
      phoneNumber: '0908090809',
      address: 'Đ12, Phường 9, Quận 8, TP.HCM',
      permissions: ['view', 'edit', 'delete', 'add'],
      isEnabled: true,
      isOnline: true,
      created_date: '23-10-2020',
    },
    {
      id: 4,
      username: 'huuloc2310',
      email: 'huuloc2310@gmail.com',
      fullName: 'Nguyễn Hữu Lộc',
      position: 'Trưởng phòng kinh doanh',
      phoneNumber: '0908090809',
      address: 'Đ12, Phường 9, Quận 8, TP.HCM',
      permissions: ['view', 'edit', 'delete', 'add'],
      isEnabled: true,
      isOnline: true,
      created_date: '23-10-2020',
    },
    {
      id: 5,
      username: 'huuloc2310',
      email: 'huuloc2310@gmail.com',
      fullName: 'Nguyễn Hữu Lộc',
      position: 'Trưởng phòng kinh doanh',
      phoneNumber: '0908090809',
      address: 'Đ12, Phường 9, Quận 8, TP.HCM',
      permissions: ['view', 'edit', 'delete', 'add'],
      isEnabled: true,
      isOnline: true,
      created_date: '23-10-2020',
    },
    {
      id: 6,
      username: 'huuloc2310',
      email: 'huuloc2310@gmail.com',
      fullName: 'Nguyễn Hữu Lộc',
      position: 'Trưởng phòng kinh doanh',
      phoneNumber: '0908090809',
      address: 'Đ12, Phường 9, Quận 8, TP.HCM',
      permissions: ['view', 'edit', 'delete', 'add'],
      isEnabled: true,
      isOnline: true,
      created_date: '23-10-2020',
    },
    {
      id: 7,
      username: 'huuloc2310',
      email: 'huuloc2310@gmail.com',
      fullName: 'Nguyễn Hữu Lộc',
      position: 'Trưởng phòng kinh doanh',
      phoneNumber: '0908090809',
      address: 'Đ12, Phường 9, Quận 8, TP.HCM',
      permissions: ['view', 'edit', 'delete', 'add'],
      isEnabled: true,
      isOnline: true,
      created_date: '23-10-2020',
    },
    {
      id: 8,
      username: 'huuloc2310',
      email: 'huuloc2310@gmail.com',
      fullName: 'Nguyễn Hữu Lộc',
      position: 'Trưởng phòng kinh doanh',
      phoneNumber: '0908090809',
      permissions: ['view', 'edit', 'delete', 'add'],
      isEnabled: true,
      isOnline: true,
      created_date: '23-10-2020',
    },
    {
      id: 9,
      username: 'huuloc2310',
      email: 'huuloc2310@gmail.com',
      fullName: 'Nguyễn Hữu Lộc',
      position: 'Trưởng phòng kinh doanh',
      phoneNumber: '0908090809',
      address: 'Đ12, Phường 9, Quận 8, TP.HCM',
      permissions: ['view', 'edit', 'delete', 'add'],
      isEnabled: true,
      isOnline: true,
      created_date: '23-10-2020',
    },
    {
      id: 10,
      username: 'huuloc2310',
      email: 'huuloc2310@gmail.com',
      fullName: 'Nguyễn Hữu Lộc',
      position: 'Trưởng phòng kinh doanh',
      phoneNumber: '0908090809',
      address: 'Đ12, Phường 9, Quận 8, TP.HCM',
      permissions: ['view', 'edit', 'delete', 'add'],
      isEnabled: true,
      isOnline: true,
      created_date: '23-10-2020',
    },
  ];

  constructor(private toastrService: ToastrService, private generalService: GeneralService, private modalService: NgbModal, private modalActive: NgbActiveModal, private adminService: AdminService) {}

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    this.subscription = this.adminService.getListAdmins().subscribe((res: any) => {
      console.log(res);
      if(res.message === 'ok') {

        // id, username, email, fullName, position, phoneNumber, address, created_date
    this.tableContent = res.data.map((item: any) => {
      return {
        'ID': item.id,
        'Username': item.user.username,
        'Email': item.user.email,
        'Họ và tên': item.full_name,
        'SĐT': item.phone_number,
        'Địa chỉ': item.address,
        'Tình trạng': item.user.status_account === true? 'Tài khoản đã kích hoạt': 'Tài khoản đã bị khóa',
        'Hoạt động': item.user.status_online === true? 'Online' : 'Offline',
        'Ngày tạo': item.createdAt,
        'Ngày cập nhật mới nhất': item.updatedAt,
        'ID Account': item.id_user
      }
    })

    this.tableConfig = ['ID', 'Username', 'Email', 'Họ và tên', 'SĐT', 'Địa chỉ', 'Tình trạng', 'Hoạt động', 'Ngày tạo', 'Ngày cập nhật mới nhất', 'ID Account', 'Hành động'].map((heading: string) => {
      return {
        title: heading,
        dataField: heading
      }
    })

    this.deepCloneTableContent();

      } else {
        this.toastrService.error(res.message)
      }
    }, (err: any) => {
      this.toastrService.error(err);
    })
  }

  convertIdPermissionsToPermissions(idPermissions: any) {
    const permisions: any = [];
    if(idPermissions.length === 4) {
      permisions.push('Tất cả quyền');
    } else {
      idPermissions.forEach((item: any) => {
        if(item === 'view') {
          permisions.push('Xem');
        } else if(item === 'delete') {
          permisions.push('Xóa');
        } else if(item === 'edit') {
          permisions.push('Sửa');
        } else if(item === 'add') {
          permisions.push('Thêm');
        }
      })
    }

    return permisions;
  }

  deepCloneTableContent() {
    //Copy to search not affect to main tableContent
    this.tableContentCopy = JSON.parse(JSON.stringify(this.tableContent));
  }

  handleSearch() {
    if (this.searchText.trim() !== '') {
      this.tableContent = this.tableContentCopy.filter((item: any) => {
        return (
          item['ID'] === Number(this.searchText.trim()?.toLowerCase()) ||
          item['Username']
            ?.toLowerCase()
            .includes(this.searchText.trim()?.toLowerCase()) ||
          item['Email']
            ?.toLowerCase()
            .includes(this.searchText.trim()?.toLowerCase()) ||
          item['SĐT']
            ?.toLowerCase()
            .includes(this.searchText.trim()?.toLowerCase()) ||
          item['Địa chỉ']
            ?.toLowerCase()
            .includes(this.searchText.trim()?.toLowerCase()) ||
          item['Họ và tên']
            ?.toLowerCase()
            .includes(this.searchText.trim()?.toLowerCase()) ||
          item['Tình trạng']
            ?.toLowerCase()
            .includes(this.searchText.trim()?.toLowerCase()) ||
          item['Hoạt động']
            ?.toLowerCase()
            .includes(this.searchText.trim()?.toLowerCase()) || 
          item['ID Account'] === Number(this.searchText.trim()?.toLowerCase()) || 
            item['Ngày tạo']
            ?.toLowerCase()
            .includes(this.searchText.trim()?.toLowerCase()) ||
            item['Ngày cập nhật mới nhất']
            ?.toLowerCase()
            .includes(this.searchText.trim()?.toLowerCase())
        );
      });
    } else {
      //The initial table --> the empty string
      this.tableContent = this.tableContentCopy;
    }
  }

  handleExportExcel() {
    this.generalService.exportExcel(this.tableContent, 'bao_cao_danh_sach_admin');
  }

  handleAddAdmin() {
    const modalRef = this.modalService.open(AddUserFormComponent, {
      backdrop: 'static',
    })

    modalRef.componentInstance.title = "Thêm admin";
    modalRef.componentInstance.typeRole = "admin";
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
