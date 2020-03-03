import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CommonservicesProvider } from '../../providers/commonservices/commonservices';
import { GeneralInformationForm  } from '../../models/generalinformation-form'
 import { FormBuilder } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {


  public Concentration:any = this.common.Concentration;
   public countrylist:any=this.common.countrylist
  public generalInfo;
   public signinForm;
   public Country = 'Drug Country'
   public d = new Date();
    public formFields:any='';
   constructor(public navCtrl: NavController, public common: CommonservicesProvider, public navParams: NavParams, public alertService: AlertService, public builder: FormBuilder, public modal:ModalController) {
    //  this.signinForm = new ProductForm(ProductForm.getLoginForm()).formGroup;
  
   this.alertService.getJSON('product.json').subscribe((s:any)=>{ 
     this.formFields = s[0].fields; 
    
    this.generalInfo = new GeneralInformationForm(GeneralInformationForm.getLoginForm( this.formFields,'')).formGroup
    console.log(  this.generalInfo)

  })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
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
  //   if(field.case=='todayDate'){ 
  //   let mm = this.d.getMonth() +1 ; 
  //   let dd = this.d.getDate();
  //   let ddd = this.d.getFullYear() + "-" +( (mm < 9) ? "0" + mm : mm )+ "-" + ((dd <= 0) ? "0" + dd : dd); 
  // this.generalInfo.patchValue({ [field.fieldName]: ddd }); 
  // return true;
  //   }
    return true;
  }
}
