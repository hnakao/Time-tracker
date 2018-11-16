import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ThemeModule } from '../../@theme/theme.module';

import { ReportActionsComponent } from './report-actions.component';
import { AddReportComponent } from './add-report/add-report.component';
import { ReportService } from '../../@core/data/report.service';
import { TokenInterceptor } from '../../@core/utils/token.interceptor';
import { ReportListComponent } from './report-list/report-list.component';


@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ReportActionsComponent,
    AddReportComponent,
    ReportListComponent,

  ],
  entryComponents: [
    ReportActionsComponent,
    AddReportComponent,
  ],
  providers: [
    ReportService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }, /*
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true},*/
  ],
})
export class ReportsModule { }
