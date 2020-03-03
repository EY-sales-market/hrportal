import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FullDataEntryPage } from './full-data-entry';

@NgModule({
  declarations: [
    FullDataEntryPage,
  ],
  imports: [
    IonicPageModule.forChild(FullDataEntryPage),
  ],
})
export class FullDataEntryPageModule {}
