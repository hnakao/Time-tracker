
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { ECommerceComponent } from './e-commerce/e-commerce.component';
// import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
// import { MediaListComponent } from './media/media-list/media-list.component';

import { UserListComponent } from './users/user-list/user-list.component';
import { StickerComponent } from './sticker/sticker/sticker.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ReportListComponent } from './reports/report-list/report-list.component';
import { UserRoleComponent } from './users/user-role/user-role.component';



const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'stickers',
    component: StickerComponent,
  }, {
    path: 'users',
    component: UserListComponent,
  }, {
    path: 'users/user-role',
    component: UserRoleComponent,
  }, {
    path: 'reports',
    component: ReportListComponent,
  }, {
    path: 'projects',
    component: ProjectListComponent,
  },
  /*
  {
    path: 'media',
    component: MediaListComponent,
  }, {
    path: 'dashboard',
    component: DashboardComponent,
  }, {
    path: 'e-dashboard',
    component: ECommerceComponent,
  }, {
    path: 'ui-features',
    loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
  }, {
    path: 'components',
    loadChildren: './components/components.module#ComponentsModule',
  }, {
    path: 'maps',
    loadChildren: './maps/maps.module#MapsModule',
  }, {
    path: 'charts',
    loadChildren: './charts/charts.module#ChartsModule',
  }, {
    path: 'editors',
    loadChildren: './editors/editors.module#EditorsModule',
  }, {
    path: 'forms',
    loadChildren: './forms/forms.module#FormsModule',
  }, {
    path: 'tables',
    loadChildren: './tables/tables.module#TablesModule',
  }, {
    path: 'miscellaneous',
    loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
  */
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
