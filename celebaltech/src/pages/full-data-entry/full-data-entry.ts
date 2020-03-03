import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-full-data-entry',
  templateUrl: 'full-data-entry.html',
})
export class FullDataEntryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FullDataEntryPage');
  }

  generalpage(){
    this.navCtrl.push('GeneralInformationPage');
  }

  patientview(){
    this.navCtrl.push('PatientViewPage');
  }

  productview(){
    this.navCtrl.push('ProductPage');
  }

  dosageregimen(){
    this.navCtrl.push('DosageRegimenPage')
  }

  eventview(){
    this.navCtrl.push('EventPage')
  }
}
