import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CommonservicesProvider } from '../../providers/commonservices/commonservices';
import { FormBuilder } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { QuickEntryForm } from '../../models/quick-entry-form'

/**
 * Generated class for the QuickEntryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quick-entry',
  templateUrl: 'quick-entry.html',
})
export class QuickEntryPage {

  public countrylist = this.common.countrylist;

  public signinForm;
  public Country = 'Country'
  public d = new Date();
  constructor(public navCtrl: NavController, public common: CommonservicesProvider, public navParams: NavParams, public alertService: AlertService, public builder: FormBuilder, public modal:ModalController) {
    this.signinForm = new QuickEntryForm(QuickEntryForm.getLoginForm()).formGroup;
    let mm = this.d.getMonth();
    let dd = this.d.getDate();
    let ddd = this.d.getFullYear() + "-" +( (mm < 9) ? "0" + mm : mm )+ "-" + ((dd <= 0) ? "0" + dd : dd);
    console.log(ddd)
    this.signinForm.patchValue({ date: ddd });
    console.log(this.signinForm)
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad QuickEntryPage');
  }

  submitForm() {
    
    let formValidation = QuickEntryForm.validate(this.signinForm);
    if (formValidation == '') {
      this.navCtrl.setRoot('DashboardPage');

    } else {
      this.alertService.populateAlert('', formValidation)
    }
  }

  openCountry(){
    // this.navCtrl.push('CountrySearchPage')
    const modal = this.modal.create('CountrySearchPage')
    modal.onDidDismiss(data => {
      this.Country = data.country
      this.signinForm.patchValue({ country: this.Country });
      console.log(this.Country )
    });
  
    modal.present();
  }

}
