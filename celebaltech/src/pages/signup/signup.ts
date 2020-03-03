import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  SignupForm } from '../../models/signup-form'
import { FormBuilder } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signinForm;
    constructor(public navCtrl: NavController, public navParams: NavParams, public alertService:AlertService, public builder: FormBuilder) {
    this.signinForm = new SignupForm(SignupForm.getSignUpForm()).formGroup
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  dashboard(){
    this.navCtrl.setRoot('DashboardPage');
  }

  /*
	 * submitForm
	 * For submiting login form
	 */
	public submitForm() {
		//knowledgegainorg@gmail.com / 123456
		let formValidation = SignupForm.validate(this.signinForm); 
		if (formValidation == '') {  
			this.dashboard()
		} else {
			this.alertService.populateAlert('', formValidation)
		}
	}
  
}
