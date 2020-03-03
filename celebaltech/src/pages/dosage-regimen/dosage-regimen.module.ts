import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DosageRegimenPage } from './dosage-regimen';

@NgModule({
  declarations: [
    DosageRegimenPage,
  ],
  imports: [
    IonicPageModule.forChild(DosageRegimenPage),
  ],
})
export class DosageRegimenPageModule {}
