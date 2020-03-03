import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CommonservicesProvider } from '../../providers/commonservices/commonservices';

/**
 * Generated class for the CountrySearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-country-search',
  templateUrl: 'country-search.html',
})
export class CountrySearchPage {
  public countrylist = this.common.countrylist;
  searchTerm: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,public common: CommonservicesProvider, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CountrySearchPage');
    this.setFilteredLocations();
  }

  setFilteredLocations(){
    this.countrylist =  this.common.countrylist.filter(item => {  
      return item.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
  }

  selectCountry(location){
    this.common.searchCountry = location;
    let data = { 'country': this.common.searchCountry };
   this.viewCtrl.dismiss(data);
  }
  closePopup(){
    let data = { 'country': '' };
    this.viewCtrl.dismiss(data);
  
  }

}
