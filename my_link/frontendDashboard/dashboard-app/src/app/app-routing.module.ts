import { ChangePasswordAccountComponent } from './components/account/change-password-account/change-password-account.component';
import { EditAccountComponent } from './components/account/edit-account/edit-account.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageAccountComponent } from './components/manage-account/manage-account.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { AccountComponent } from './components/account/account.component';
import { ManageAccountAdminComponent } from './components/manage-account/manage-account-admin/manage-account-admin.component';
import { ManageAccountEmployeeComponent } from './components/manage-account/manage-account-employee/manage-account-employee.component';
import { ManageUserDriverComponent } from './components/manage-user/manage-user-driver/manage-user-driver.component';
import { ManageUserCustomerComponent } from './components/manage-user/manage-user-customer/manage-user-customer.component';
import { RevenueReportComponent } from './components/statistics/revenue-report/revenue-report.component';
import { TopDriverComponent } from './components/statistics/top-driver/top-driver.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './services/guard/auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  // { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthComponent,
    children: [{ path: 'login', component: LoginComponent }],
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [{ path: 'dashboard', component: DashboardComponent }],
  },
  {
    path: 'manage-account',
    component: ManageAccountComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'admin-account',
        component: ManageAccountAdminComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'employee-account',
        component: ManageAccountEmployeeComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'manage-user',
    component: ManageUserComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'driver-user',
        component: ManageUserDriverComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'customer-user',
        component: ManageUserCustomerComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    children: [
      {
        path: 'revenue-report',
        component: RevenueReportComponent,
      },
      {
        path: 'top-driver',
        component: TopDriverComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'my-account',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: AccountComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit',
        component: EditAccountComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'change-password',
        component: ChangePasswordAccountComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent }, // Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
