import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CommonservicesProvider } from '../../providers/commonservices/commonservices';
// import { PatientviewForm  } from '../../models/patientview-form'
import { GeneralInformationForm  } from '../../models/generalinformation-form'
import { FormBuilder } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
/**
 * Generated class for the PatientViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-view',
  templateUrl: 'patient-view.html',
})
export class PatientViewPage {
  public unitofHeight = this.common.unitOfHeight;
  public unitOfWeight = this.common.unitOfWeight;
  public EntinicityData:any=this.common.ethnicity;
  public genderData:any=this.common.genderType;
  public generalInfo;
  public Country = 'Country'

  public formFields:any='';
  public d = new Date();
  constructor(public navCtrl: NavController, public navParams: NavParams, public common: CommonservicesProvider, public alertService:AlertService, public builder: FormBuilder, public modal:ModalController) {
   
   this.alertService.getJSON('patient.json').subscribe((s:any)=>{ 
     this.formFields = s[0].fields; 
    
    this.generalInfo = new GeneralInformationForm(GeneralInformationForm.getLoginForm( this.formFields,'')).formGroup
    console.log(  this.generalInfo)

  })
  //  this.patientviewhtml = new PatientviewForm(PatientviewForm.getLoginForm()).formGroup
  //   let mm = this.d.getMonth();
  //   let dd = this.d.getDate();
  //   let ddd = this.d.getFullYear() + "-" +( (mm < 9) ? "0" + mm : mm )+ "-" + ((dd <= 0) ? "0" + dd : dd); 
  //   this.patientviewhtml.patchValue({ dob: ddd }); 
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientViewPage');
  }

  
  public submitForm() {
		//knowledgegainorg@gmail.com / 123456
		let formValidation = GeneralInformationForm.validate(this.generalInfo); 
		if (formValidation == '') {   
      this.navCtrl.setRoot('FullDataEntryPage');
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
