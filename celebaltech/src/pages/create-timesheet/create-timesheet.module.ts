import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateTimesheetPage } from './create-timesheet';

@NgModule({
  declarations: [
    CreateTimesheetPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateTimesheetPage),
  ],
})
export class CreateTimesheetPageModule {}
