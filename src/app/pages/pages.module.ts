
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
//  import { DashboardModule } from './dashboard/dashboard.module';
//  import { ECommerceModule } from './e-commerce/e-commerce.module';
//  import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { UsersModule } from './users/users.module';
import { MediaModule } from './media/media.module';
import { StickerModule } from './sticker/sticker.module';
import { ReportsModule } from './reports/reports.module';
import { ProjectsModule } from './projects/projects.module';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    MediaModule,
    UsersModule,
  //  DashboardModule,
  //  ECommerceModule,
  //  MiscellaneousModule,
    StickerModule,
    ReportsModule,
    ProjectsModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
