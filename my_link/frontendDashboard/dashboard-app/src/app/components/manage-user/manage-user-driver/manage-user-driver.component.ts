import { Component } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import TaxiDriver from 'src/app/models/taxiDriver.model';
import { GeneralService } from 'src/app/services/general.service';
import { ActionFormManageUserComponent } from 'src/app/shared/form/action-form-manage-user/action-form-manage-user.component';
import { DriverService } from 'src/app/services/driver.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AddUserFormComponent } from 'src/app/shared/form/add-user-form/add-user-form.component';

@Component({
  selector: 'app-manage-user-driver',
  templateUrl: './manage-user-driver.component.html',
  styleUrls: ['./manage-user-driver.component.scss'],
})
export class ManageUserDriverComponent {
  subscription: Subscription = new Subscription();

  searchText: string = '';
  tableContent: any = [];
  tableContentCopy: any = [];
  tableConfig: any = [];
  itemsPerPage: number = 7;

  data: TaxiDriver[] = [
    {
      id: 1,
      username: 'huuloc01',
      email: 'huuloc01@gmail.com',
      phoneNumber: '0101010101',
      licenseNumber: 'A12-12345',
      typeVehicleRegistering: 'Taxi Driver',
      address: 'Số 123, Đ.Quảng Nam, Quận 12, TP.HCM',
      bankingNumber: '01234567890',
      startDate: '2018-01-01',
      companyTenture: 4,
      insuranceInformation: 'Thông tin bảo hiểm',
    },
    {
      id: 2,
      username: 'huuloc01',
      email: 'huuloc01@gmail.com',
      phoneNumber: '0101010101',
      licenseNumber: 'A12-12345',
      typeVehicleRegistering: 'Taxi Driver',
      address: 'Số 123, Đ.Quảng Nam, Quận 12, TP.HCM',
      bankingNumber: '01234567890',
      startDate: '2018-01-01',
      companyTenture: 4,
      insuranceInformation: 'Thông tin bảo hiểm',
    },
    {
      id: 3,
      username: 'huuloc01',
      email: 'huuloc01@gmail.com',
      phoneNumber: '0101010101',
      licenseNumber: 'A12-12345',
      typeVehicleRegistering: 'Taxi Driver',
      address: 'Số 123, Đ.Quảng Nam, Quận 12, TP.HCM',
      bankingNumber: '01234567890',
      startDate: '2018-01-01',
      companyTenture: 4,
      insuranceInformation: 'Thông tin bảo hiểm',
    },
    {
      id: 4,
      username: 'huuloc01',
      email: 'huuloc01@gmail.com',
      phoneNumber: '0101010101',
      licenseNumber: 'A12-12345',
      typeVehicleRegistering: 'Taxi Driver',
      address: 'Số 123, Đ.Quảng Nam, Quận 12, TP.HCM',
      bankingNumber: '01234567890',
      startDate: '2018-01-01',
      companyTenture: 4,
      insuranceInformation: 'Thông tin bảo hiểm',
    },
    {
      id: 5,
      username: 'huuloc01',
      email: 'huuloc01@gmail.com',
      phoneNumber: '0101010101',
      licenseNumber: 'A12-12345',
      typeVehicleRegistering: 'Taxi Driver',
      address: 'Số 123, Đ.Quảng Nam, Quận 12, TP.HCM',
      bankingNumber: '01234567890',
      startDate: '2018-01-01',
      companyTenture: 4,
      insuranceInformation: 'Thông tin bảo hiểm',
    },
    {
      id: 6,
      username: 'huuloc01',
      email: 'huuloc01@gmail.com',
      phoneNumber: '0101010101',
      licenseNumber: 'A12-12345',
      typeVehicleRegistering: 'Taxi Driver',
      address: 'Số 123, Đ.Quảng Nam, Quận 12, TP.HCM',
      bankingNumber: '01234567890',
      startDate: '2018-01-01',
      companyTenture: 4,
      insuranceInformation: 'Thông tin bảo hiểm',
    },
    {
      id: 7,
      username: 'huuloc01',
      email: 'huuloc01@gmail.com',
      phoneNumber: '0101010101',
      licenseNumber: 'A12-12345',
      typeVehicleRegistering: 'Taxi Driver',
      address: 'Số 123, Đ.Quảng Nam, Quận 12, TP.HCM',
      bankingNumber: '01234567890',
      startDate: '2018-01-01',
      companyTenture: 4,
      insuranceInformation: 'Thông tin bảo hiểm',
    },
    {
      id: 8,
      username: 'huuloc01',
      email: 'huuloc01@gmail.com',
      phoneNumber: '0101010101',
      licenseNumber: 'A12-12345',
      typeVehicleRegistering: 'Taxi Driver',
      address: 'Số 123, Đ.Quảng Nam, Quận 12, TP.HCM',
      bankingNumber: '01234567890',
      startDate: '2018-01-01',
      companyTenture: 4,
      insuranceInformation: 'Thông tin bảo hiểm',
    },
    {
      id: 9,
      username: 'huuloc01',
      email: 'huuloc01@gmail.com',
      phoneNumber: '0101010101',
      licenseNumber: 'A12-12345',
      typeVehicleRegistering: 'Taxi Driver',
      address: 'Số 123, Đ.Quảng Nam, Quận 12, TP.HCM',
      bankingNumber: '01234567890',
      startDate: '2018-01-01',
      companyTenture: 4,
      insuranceInformation: 'Thông tin bảo hiểm',
    },
    {
      id: 10,
      username: 'huuloc01',
      email: 'huuloc01@gmail.com',
      phoneNumber: '0101010101',
      licenseNumber: 'A12-12345',
      typeVehicleRegistering: 'Taxi Driver',
      address: 'Số 123, Đ.Quảng Nam, Quận 12, TP.HCM',
      bankingNumber: '01234567890',
      startDate: '2018-01-01',
      companyTenture: 4,
      insuranceInformation: 'Thông tin bảo hiểm',
    },
    {
      id: 11,
      username: 'huuloc01',
      email: 'huuloc01@gmail.com',
      phoneNumber: '0101010101',
      licenseNumber: 'A12-12345',
      typeVehicleRegistering: 'Taxi Driver',
      address: 'Số 123, Đ.Quảng Nam, Quận 12, TP.HCM',
      bankingNumber: '01234567890',
      startDate: '2018-01-01',
      companyTenture: 4,
      insuranceInformation: 'Thông tin bảo hiểm',
    },
    {
      id: 12,
      username: 'huuloc01',
      email: 'huuloc01@gmail.com',
      phoneNumber: '0101010101',
      licenseNumber: 'A12-12345',
      typeVehicleRegistering: 'Taxi Driver',
      address: 'Số 123, Đ.Quảng Nam, Quận 12, TP.HCM',
      bankingNumber: '01234567890',
      startDate: '2018-01-01',
      companyTenture: 4,
      insuranceInformation: 'Thông tin bảo hiểm',
    },
    {
      id: 13,
      username: 'huuloc01',
      email: 'huuloc01@gmail.com',
      phoneNumber: '0101010101',
      licenseNumber: 'A12-12345',
      typeVehicleRegistering: 'Taxi Driver',
      address: 'Số 123, Đ.Quảng Nam, Quận 12, TP.HCM',
      bankingNumber: '01234567890',
      startDate: '2018-01-01',
      companyTenture: 4,
      insuranceInformation: 'Thông tin bảo hiểm',
    },
    {
      id: 14,
      username: 'huuloc01',
      email: 'huuloc01@gmail.com',
      phoneNumber: '0101010101',
      licenseNumber: 'A12-12345',
      typeVehicleRegistering: 'Taxi Driver',
      address: 'Số 123, Đ.Quảng Nam, Quận 12, TP.HCM',
      bankingNumber: '01234567890',
      startDate: '2018-01-01',
      companyTenture: 4,
      insuranceInformation: 'Thông tin bảo hiểm',
    },
    {
      id: 15,
      username: 'huuloc01',
      email: 'huuloc01@gmail.com',
      phoneNumber: '0101010101',
      licenseNumber: 'A12-12345',
      typeVehicleRegistering: 'Taxi Driver',
      address: 'Số 123, Đ.Quảng Nam, Quận 12, TP.HCM',
      bankingNumber: '01234567890',
      startDate: '2018-01-01',
      companyTenture: 4,
      insuranceInformation: 'Thông tin bảo hiểm',
    },
  ];

  constructor(private driverService: DriverService, private toastrService: ToastrService, private generalService: GeneralService, private modalService: NgbModal, private modalActive: NgbActiveModal) {}

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    this.subscription = this.driverService.getListDrivers().subscribe((res: any) => {
      if(res.message === 'ok') {
        this.tableContent = res.data.map((item: any) => {
          return {
            ID: item.id,
            Username: item.user.username,
            Email: item.user.email,
            SĐT: item.phone_number,
            'Họ và tên': item.full_name,
            'Biển số xe': item.car_license_number,
            'Loại xe đăng kí': item.car_vehicle_registering,
            'Địa chỉ': item.address,
            'STK Ngân hàng': item.banking_number,
            'Ngày nhận việc': item.createdAt,
            'Số ngày gắn bó': item.company_tenture,
            'Thông tin bảo hiểm': item.insurance_info,
            'Số sao đánh giá': item.total_rating,
            'Tình trạng': item.user.status_account === true? 'Tài khoản đã kích hoạt': 'Tài khoản đã bị khóa',
            'Hoạt động': item.user.status_online === true? 'Online' : 'Offline',
            'ID Account': item.id_user
          };
        });
    
        this.tableConfig = [
          'ID',
          'Username',
          'Email',
          'Họ và tên',
          'SĐT',
          'Số sao đánh giá',
          'Biển số xe',
          'Loại xe đăng kí',
          'Địa chỉ',
          'STK Ngân hàng',
          'Ngày nhận việc',
          'Số ngày gắn bó',
          'Thông tin bảo hiểm',
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
      console.log(this.searchText)
      this.tableContent = this.tableContentCopy.filter((item: any) => {
        return (
          item['ID'] === Number(this.searchText.trim()?.toLowerCase()) ||
          item['Username']?.toLowerCase().includes(this.searchText.trim()?.toLowerCase()) ||
          item['Email']?.toLowerCase().includes(this.searchText.trim()?.toLowerCase()) ||
          item['SĐT']?.toLowerCase().includes(this.searchText.trim()?.toLowerCase()) ||
          item['Biển số xe']?.toLowerCase().includes(this.searchText.trim()?.toLowerCase()) ||
          item['Loại xe đăng kí']?.toLowerCase().includes(this.searchText.trim()?.toLowerCase()) ||
          item['STK Ngân hàng']?.toLowerCase().includes(this.searchText.trim()?.toLowerCase()) ||
          item['Ngày nhận việc']?.toLowerCase().includes(this.searchText.trim()?.toLowerCase()) ||
          item['Số ngày gắn bó'] === Number(this.searchText.trim()?.toLowerCase()) ||
          item['Thông tin bảo hiểm']?.toLowerCase().includes(this.searchText.trim()?.toLowerCase()) ||
          item['Tình trạng']?.toLowerCase().includes(this.searchText.trim()?.toLowerCase()) || 
          item['Hoạt động']?.toLowerCase().includes(this.searchText.trim()?.toLowerCase())
        );
      });
    } else {
      //The initial table --> the empty string
      this.tableContent = this.tableContentCopy;
    }
  }

  handleExportExcel() {
    this.generalService.exportExcel(this.tableContent, 'bao_cao_danh_sach_tai_xe');
  }

  handleAddDriver() {
    const modalRef = this.modalService.open(AddUserFormComponent, {
      backdrop: 'static',
    })

    modalRef.componentInstance.title = "Thêm tài xế";
    modalRef.componentInstance.typeRole = "driver";
  }
}
