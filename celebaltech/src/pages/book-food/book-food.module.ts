import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookFoodPage } from './book-food';

@NgModule({
  declarations: [
    BookFoodPage,
  ],
  imports: [
    IonicPageModule.forChild(BookFoodPage),
  ],
})
export class BookFoodPageModule {}
