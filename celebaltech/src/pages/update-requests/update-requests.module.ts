import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateRequestsPage } from './update-requests';

@NgModule({
  declarations: [
    UpdateRequestsPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateRequestsPage),
  ],
})
export class UpdateRequestsPageModule {}
