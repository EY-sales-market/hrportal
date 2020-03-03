import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimesheetPage } from './timesheet';
import { SearchPipe } from './search.pipe';
import { DirectivesModule } from '../../directives/directives.module';
@NgModule({

  declarations: [
    SearchPipe,
    TimesheetPage,

  ],
  imports: [
    IonicPageModule.forChild(TimesheetPage),
  DirectivesModule
  ],
})
export class TimesheetPageModule {
  
}
