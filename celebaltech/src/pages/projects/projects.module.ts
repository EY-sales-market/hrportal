import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectsPage } from './projects';
import { SearchPipe } from './searchpipe';
import { DirectivesModule } from '../../directives/directives.module';


@NgModule({
  declarations: [
    SearchPipe,
    ProjectsPage
  ],
  imports: [
    IonicPageModule.forChild(ProjectsPage),
    DirectivesModule
  ],
})
export class ProjectsPageModule {}
