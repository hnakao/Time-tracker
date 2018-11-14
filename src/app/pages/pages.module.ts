import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { UsersModule } from './users/users.module';
import { MediaModule } from './media/media.module';
import { StickerModule } from './sticker/sticker.module';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    MediaModule,
    UsersModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    StickerModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
