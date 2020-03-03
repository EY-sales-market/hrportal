import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaveManagmentPage } from './leave-managment';

@NgModule({
  declarations: [
    LeaveManagmentPage,
  ],
  imports: [
    IonicPageModule.forChild(LeaveManagmentPage),
  ],
})
export class LeaveManagmentPageModule {}
