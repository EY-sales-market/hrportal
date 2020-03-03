import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportPage } from './report';
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [
    ReportPage,
    SearchPipe,
  ],
  imports: [
    IonicPageModule.forChild(ReportPage),
  ],
})
export class ReportPageModule {}
