import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginForm } from '../../models/login-form'
import { FormBuilder } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { DataService } from '../../services/data.service';
// import {DataService } from '../../services/data.service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({

  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[DataService]

})
export class LoginPage {
	public signinForm;
   rdata:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertService:AlertService,public builder: FormBuilder,public data:DataService) {
    this.signinForm = new LoginForm(LoginForm.getLoginForm()).formGroup
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  forgotpassword(){
    this.navCtrl.push('ForgotPasswordPage');
  }

  requestcredentials(){
    this.navCtrl.push('SignupPage');
  }

  dashboard(){

    this.navCtrl.setRoot('DashboardPage');

  }


	/*
	 * submitForm
	 * For submiting login form
	 */
	public submitForm() {

    let mob = +this.signinForm.value.email;

		//knowledgegainorg@gmail.com / 123456
    let formValidation = LoginForm.validate(this.signinForm);


    this.data.getVerifyy(mob).subscribe(data=>{
      console.log(data);
     this.rdata=data;
     console.log(this.rdata);


    if(this.rdata){
      localStorage.setItem('Object', JSON.stringify(this.rdata) );
      }
      var retrievedObject = localStorage.getItem('Object');

console.log('retrievedObject: ', JSON.parse(retrievedObject));


		if (formValidation == '' && this.rdata) {

			// this.alertService.showLoading();
			// this.loginService.getLogin(this.signinForm.value).then(success => {
			// 	console.log(success)
			// 	this.alertService.hideLoading();
			// 	this.navCtrl.setRoot(LandingPage)
			// }, (error) => {
			// 	if (error === 'OTP not verified yet,Please verify OTP to login.') {
			// 		this.alertService.populateAlert('', error, 'Ok', () => {
			// 			this.alertService.hideLoading();
			// 			this.navCtrl.push(OtpPage ,{username:this.signinForm.value.username})
			// 		})
			// 	} else {
			// 		this.alertService.hideLoading();
			// 		this.alertService.populateAlert('', error)
      // 	}
      // })


		 let nm = this.signinForm.value.email.split("@")
			localStorage.setItem("login","yes")
			localStorage.setItem("firstName",nm[0])
			this.dashboard()
    }else {
       if(formValidation!=''){
        this.alertService.populateAlert('', formValidation);

       }
      else
      this.alertService.populateAlert('', "plese register your self");
    }
  })
  }

}
