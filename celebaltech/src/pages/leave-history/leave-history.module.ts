import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaveHistoryPage } from './leave-history';

@NgModule({
  declarations: [
    LeaveHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(LeaveHistoryPage),
  ],
})
export class LeaveHistoryPageModule {}
