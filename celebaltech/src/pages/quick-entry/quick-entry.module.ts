import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuickEntryPage } from './quick-entry';

@NgModule({
  declarations: [
    QuickEntryPage,
  ],
  imports: [
    IonicPageModule.forChild(QuickEntryPage),
  ],
})
export class QuickEntryPageModule {}
