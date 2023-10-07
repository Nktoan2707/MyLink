import { Component } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { GeneralService } from 'src/app/services/general.service';
import { ActionFormManageUserComponent } from 'src/app/shared/form/action-form-manage-user/action-form-manage-user.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AddUserFormComponent } from 'src/app/shared/form/add-user-form/add-user-form.component';

@Component({
  selector: 'app-manage-account-employee',
  templateUrl: './manage-account-employee.component.html',
  styleUrls: ['./manage-account-employee.component.scss'],
})
export class ManageAccountEmployeeComponent {
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
      isEnabled: true,
      isOnline: true,
      created_date: '23-10-2020',
    },
  ];

  constructor(
    private employeeService: EmployeeService,
    private toastrService: ToastrService, private generalService: GeneralService, private modalService: NgbModal, private modalActive: NgbActiveModal
  ) {}

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    // id, username, email, fullName, position, phoneNumber, address, created_date
    this.subscription = this.employeeService.getListEmployees().subscribe(
      (res: any) => {
        if (res.message === 'ok') {
          this.tableContent = res.data.map((item: any) => {
            return {
              ID: item.id,
              Username: item.user.username,
              Email: item.user.email,
              'Họ và tên': item.full_name,
              'Vị trí': item.position,
              Lương: item.salary,
              SĐT: item.phone_number,
              'Địa chỉ': item.address,
              'Thông tin bảo hiểm': item.insurance_information,
              'Tình trạng':
                item.user.status_account === true
                  ? 'Tài khoản đã kích hoạt'
                  : 'Tài khoản đã bị khóa',
              'Hoạt động':
                item.user.status_online === true ? 'Online' : 'Offline',
              'Ngày vào công ty': item.createdAt,
              'Số ngày gắn bó': item.company_tenture,
              'ID Account': item.id_user,
            };
          });

          this.tableConfig = [
            'ID',
            'Username',
            'Email',
            'Họ và tên',
            'Vị trí',
            'Lương',
            'SĐT',
            'Địa chỉ',
            'Thông tin bảo hiểm',
            'Ngày vào công ty',
            'Số ngày gắn bó',
            'Tình trạng',
            'Hoạt động',
            'ID Account',
            'Hành động',
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
      },
      (err: any) => {
        this.toastrService.error(err);
      }
    );
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
          item['Lương'] === Number(this.searchText.trim()?.toLowerCase()) ||
          item['Số ngày gắn bó'] === Number(this.searchText.trim()?.toLowerCase()) ||
          item['Vị trí']
            ?.toLowerCase()
            .includes(this.searchText.trim()?.toLowerCase()) || 
            item['Thông tin bảo hiểm']
            ?.toLowerCase()
            .includes(this.searchText.trim()?.toLowerCase()) || 
            item['Ngày vào công ty']
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
    this.generalService.exportExcel(this.tableContent, 'bao_cao_danh_sach_nhan_vien');
  }

  handleAddEmployee() {
    const modalRef = this.modalService.open(AddUserFormComponent, {
      backdrop: 'static',
    })

    modalRef.componentInstance.title = "Thêm nhân viên";
    modalRef.componentInstance.typeRole = "employee";
  }
}
