import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodHistoryPage } from './food-history';

@NgModule({
  declarations: [
    FoodHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(FoodHistoryPage),
  ],
})
export class FoodHistoryPageModule {}
