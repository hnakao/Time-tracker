import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { MediaListComponent } from './media-list/media-list.component';
import { MediaService } from '../../@core/data/media.service';

@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    ThemeModule,
  ],
  declarations: [
    MediaListComponent,
  ],
  providers: [
    MediaService,
  ],
})
export class MediaModule { }
