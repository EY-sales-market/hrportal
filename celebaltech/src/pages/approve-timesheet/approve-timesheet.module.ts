import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApproveTimesheetPage } from './approve-timesheet';
import {SearchPipe} from './search.pipe';
import { CommonPageModule } from '../common.module';
import { DirectivesModule } from '../../directives/directives.module';
// import { SortDirective } from '../../directives/sort/sort';

@NgModule({
  declarations: [
    SearchPipe,
    ApproveTimesheetPage
  ],
  imports: [
    IonicPageModule.forChild(ApproveTimesheetPage),
    DirectivesModule
  ],
})
export class ApproveTimesheetPageModule {}
