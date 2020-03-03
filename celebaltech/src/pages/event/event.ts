import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
// import { DosageremainForm } from '../../models/dosageremain';
import { GeneralInformationForm  } from '../../models/generalinformation-form'
import { CommonservicesProvider } from '../../providers/commonservices/commonservices';
import { FormBuilder } from '@angular/forms';
import { AlertService } from '../../services/alert.service';

/**
 * Generated class for the EventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {

   public generalInfo;
   public Country = 'Country'
   public d = new Date();
  public formFields:any='';
  public eventsDetails:any='';
  constructor(public navCtrl: NavController, public common: CommonservicesProvider, public navParams: NavParams, public alertService: AlertService, public builder: FormBuilder, public modal:ModalController) {
     this.alertService.getJSON('eventinformation.json').subscribe((s:any)=>{ 
     this.formFields = s[0].fields; 
    this.generalInfo = new GeneralInformationForm(GeneralInformationForm.getLoginForm( this.formFields,'')).formGroup
   

  })
    
    // this.signinForm = new EventForm(EventForm.getLoginForm()).formGroup;
    // let mm = this.d.getMonth();
    // let dd = this.d.getDate();
    // let ddd = this.d.getFullYear() + "-" +( (mm < 9) ? "0" + mm : mm )+ "-" + ((dd <= 0) ? "0" + dd : dd); 
    // this.signinForm.patchValue({ start_date: ddd }); 
    // this.signinForm.patchValue({ stop_date: ddd }); 
    // this.signinForm.patchValue({ expiration_date: ddd }); 
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventPage');
  }

 
  
  eventdetail(){
    // this.navCtrl.push('CountrySearchPage')
    const modal = this.modal.create('EventDetailPage')
    modal.onDidDismiss(data => { 
      this.eventsDetails = data.event.join(",")
       this.generalInfo.patchValue({ 'event': this.Country });  
      // this.signinForm.patchValue({ event:  data.event });
      console.log(this.Country )
    });
  
    modal.present();
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
