import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CountrySearchPage } from './country-search';

@NgModule({
  declarations: [
    CountrySearchPage,
  ],
  imports: [
    IonicPageModule.forChild(CountrySearchPage),
  ],
})
export class CountrySearchPageModule {}
