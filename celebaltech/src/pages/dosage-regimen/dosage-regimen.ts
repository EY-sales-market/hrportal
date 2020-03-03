import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CommonservicesProvider } from '../../providers/commonservices/commonservices';
import { AlertService } from '../../services/alert.service';
// import { DosageremainForm } from '../../models/dosageremain';
import { GeneralInformationForm  } from '../../models/generalinformation-form'
import { FormBuilder } from '@angular/forms';
/**
 * Generated class for the DosageRegimenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dosage-regimen',
  templateUrl: 'dosage-regimen.html',
})
export class DosageRegimenPage {
 
  public dosesregimenUnit:any=this.common.dosesregimenUnit;
  public identify:any=this.common.identify;
  public Concentration:any = this.common.Concentration;
   public countrylist:any=this.common.countrylist

    public generalInfo;
   public Country = 'Country'
   public d = new Date();
  public formFields:any='';
   constructor(public navCtrl: NavController, public common: CommonservicesProvider, public navParams: NavParams, public alertService: AlertService, public builder: FormBuilder, public modal:ModalController) {
    //  this.signinForm = new DosageremainForm(DosageremainForm.getLoginForm()).formGroup;
    //  let mm = this.d.getMonth();
    //  let dd = this.d.getDate();
    //  let ddd = this.d.getFullYear() + "-" +( (mm < 9) ? "0" + mm : mm )+ "-" + ((dd <= 0) ? "0" + dd : dd); 
    //  this.signinForm.patchValue({ start_date: ddd }); 
    //  this.signinForm.patchValue({ stop_date: ddd }); 
    //  this.signinForm.patchValue({ expiration_date: ddd }); 
     this.alertService.getJSON('dosageregimen.json').subscribe((s:any)=>{ 
     this.formFields = s[0].fields; 
    this.generalInfo = new GeneralInformationForm(GeneralInformationForm.getLoginForm( this.formFields,'')).formGroup
   

  })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DosageRegimenPage');
  }
  submitForm() {
    
    let formValidation = GeneralInformationForm.validate(this.generalInfo);
    if (formValidation == '') {
      this.navCtrl.setRoot('DashboardPage');

    } else {
      this.alertService.populateAlert('', formValidation)
    }
  }

  
  openCountry(fieldName){
    console.log("click")
    // this.navCtrl.push('CountrySearchPage')
    const modal = this.modal.create('CountrySearchPage')
    modal.onDidDismiss(data => { 
      this.Country = data.country  == '' ? "Country" : data.country; 
      this.generalInfo.patchValue({ [fieldName]: this.Country });  
    });
    
    modal.present();
  }

  checkdate(field){ 
    if(field.case=='todayDate'){ 
    let mm = this.d.getMonth() +1 ;
    let dd = this.d.getDate();
    let ddd = this.d.getFullYear() + "-" +( (mm < 9) ? "0" + mm : mm )+ "-" + ((dd <= 0) ? "0" + dd : dd); 
  this.generalInfo.patchValue({ [field.fieldName]: ddd }); 
  return true;
    }
    return true;
  }
}
