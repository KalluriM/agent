import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';
import { LoginLayoutComponent } from './_layout/login-layout/login-layout.component';
import { PhoneSelectionComponent } from './auth/phone-selection/phone-selection.component';
import { ServerSelectionComponent } from './auth/server-selection/server-selection.component';
import { ConnectComponent } from './auth/connect/connect.component';
import { RecentCallsComponent } from './_components/recent-calls/recent-calls.component';

const routes: Routes = [
  // application pages
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', component: DashboardComponent, pathMatch: 'full' },
      {
        path: 'recentcalls',
        component: RecentCallsComponent,
        pathMatch: 'full',
      },
    ],
  },

  // login, forgot password pages
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      { path: 'server', component: ServerSelectionComponent },
      { path: 'login', component: LoginComponent },
      { path: 'connect', component: ConnectComponent },
      { path: 'phone', component: PhoneSelectionComponent },
      { path: 'forgot', component: LoginComponent },
    ],
  },

  // // default route
  // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
