import { NgChartsModule } from 'ng2-charts';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './services/store/auth.reducer';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { MenubarModule } from 'primeng/menubar';
import { AccordionModule } from 'primeng/accordion';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageAccountComponent } from './components/manage-account/manage-account.component';
import { ManageAccountAdminComponent } from './components/manage-account/manage-account-admin/manage-account-admin.component';
import { ManageAccountEmployeeComponent } from './components/manage-account/manage-account-employee/manage-account-employee.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { ManageUserDriverComponent } from './components/manage-user/manage-user-driver/manage-user-driver.component';
import { ManageUserCustomerComponent } from './components/manage-user/manage-user-customer/manage-user-customer.component';
import { AccountComponent } from './components/account/account.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { RevenueReportComponent } from './components/statistics/revenue-report/revenue-report.component';
import { TopDriverComponent } from './components/statistics/top-driver/top-driver.component';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './services/guard/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { SideBarComponent } from './components/layout/side-bar/side-bar.component';

import { TableTemplateComponent } from './shared/table-template/table-template.component';
import { ActionFormManageUserComponent } from './shared/form/action-form-manage-user/action-form-manage-user.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { EditAccountComponent } from './components/account/edit-account/edit-account.component';
import { ChangePasswordAccountComponent } from './components/account/change-password-account/change-password-account.component';
import { ChartComponent } from './shared/chart/chart.component';
import { PieChartComponent } from './shared/chart/pie-chart/pie-chart.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddUserFormComponent } from './shared/form/add-user-form/add-user-form.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ManageAccountComponent,
    ManageAccountAdminComponent,
    ManageAccountEmployeeComponent,
    ManageUserComponent,
    ManageUserDriverComponent,
    ManageUserCustomerComponent,
    AccountComponent,
    StatisticsComponent,
    RevenueReportComponent,
    TopDriverComponent,
    AuthComponent,
    LoginComponent,
    PageNotFoundComponent,
    LayoutComponent,
    HeaderComponent,
    SideBarComponent,

    // shared
    TableTemplateComponent,
    ActionFormManageUserComponent,
    ConfirmDialogComponent,
    EditAccountComponent,
    ChangePasswordAccountComponent,
    ChartComponent,
    PieChartComponent,
    HomeComponent,
    ProfileComponent,
    AddUserFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({ auth: authReducer }), 

    MatMenuModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MenubarModule,
    AccordionModule,
    NgxPaginationModule,
    NgbModule,
    NgChartsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule
  ],
  providers: [AuthService, AuthGuard, NgbActiveModal],
  bootstrap: [AppComponent],
})
export class AppModule {}
