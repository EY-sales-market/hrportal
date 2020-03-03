import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceReportPage } from './attendance-report';
import { SearchPipe } from '../approve-timesheet/search.pipe';

@NgModule({
  declarations: [
    SearchPipe,
    AttendanceReportPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceReportPage),
  ],
})
export class AttendanceReportPageModule {}
