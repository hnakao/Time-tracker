import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ThemeModule } from '../../@theme/theme.module';
import { StickerComponent } from './sticker/sticker.component';
import { StickerActionsComponent } from './sticker-actions.component';
import { AddStickerComponent } from './add-sticker/add-sticker.component';
import { StickerService } from '../../@core/data/sticker.service';
import { TokenInterceptor } from '../../@core/utils/token.interceptor';
import { StickerListComponent } from './sticker-list/sticker-list.component';
import { InstanceListComponent } from './instance-list/instance-list.component';
import { InstanceInfoComponent } from './instance-info/instance-info.component';
import { InstanceActionsComponent } from './instance-actions.component';
import { VumarkImageComponent } from './vumark-image/vumark-image.component';
import { ImageColumnComponent } from './image-column/image-column.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    StickerComponent,
    StickerActionsComponent,
    AddStickerComponent,
    StickerListComponent,
    InstanceListComponent,
    InstanceInfoComponent,
    InstanceActionsComponent,
    VumarkImageComponent,
    ImageColumnComponent,
  ],
  entryComponents: [
    StickerActionsComponent,
    AddStickerComponent,
    InstanceInfoComponent,
    InstanceActionsComponent,
    ImageColumnComponent,
  ],
  providers: [
    StickerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }, /*
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true},*/
  ],
})
export class StickerModule { }
