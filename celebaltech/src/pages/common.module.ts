import { NgModule } from '@angular/core';
import { SortDirective } from '../directives/sort/sort';

@NgModule({
  exports:[SortDirective],
  declarations: [
    SortDirective
  ],
})
export class CommonPageModule {}
