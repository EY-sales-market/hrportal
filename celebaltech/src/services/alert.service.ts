import { Injectable, } from '@angular/core';
import { LoadingController,Events } from "ionic-angular";
import { AlertController } from 'ionic-angular';
// import { SplashScreen } from '@ionic-native/splash-screen'; 
// import { Camera } from '@ionic-native/camera'
import { Configuration } from '../app/app.constants'
import { HttpClient } from '@angular/common/http'; 
@Injectable()
export class AlertService { 
	// Constructor
	public loading;
	  public d = new Date();
	constructor(
		private alertCtrl: AlertController,
		 
		public loadingCtrl: LoadingController,
		public http:HttpClient,
		public events:Events ,
			
	) { }

	populateAlert(title: string = "", messageInfo: string = "", okButton: string = "Ok", okHandler: any = '', cancelButton: string = "", cancelHandler: any = '') {
		let buttonsArr = [{
			text: okButton,
			handler: okHandler
		}];

		if (cancelButton != "") {
			buttonsArr.push({
				text: cancelButton,
				handler: cancelHandler
			});
		}

		let alert = this.alertCtrl.create({
			title: title ? title : Configuration.APPTITLE,
			message: messageInfo,
			buttons: buttonsArr,
			enableBackdropDismiss: false,
		});
		alert.present();

	}
	/*
	* Get Picture
	*/
	// public getPicture(): Promise<any> {

	// 	let self = this;
	// 	return new Promise(function (resolve, reject) {

	// 		self.camera.getPicture({
	// 			//allowEdit: true,
	// 			destinationType: self.camera.DestinationType.FILE_URI,
	// 			sourceType: self.camera.PictureSourceType.CAMERA,
	// 			targetWidth: 500,
	// 			targetHeight: 500,
	// 			quality: 100,
	// 			correctOrientation: true
	// 		}).then((imageData) => {
	// 			resolve(imageData);
	// 		}, (err) => {

	// 			reject(err);
	// 		});

	// 	})
	// }


	showLoading() {
		this.loading = this.loadingCtrl.create({
			spinner: 'hide',
			content: `
			<div class="custom-spinner-container">
			  <div class="custom-spinner-box">Please Wait</div>
			</div>`,
			duration: 5000
		});

		this.loading.onDidDismiss(() => {
			console.log('Dismissed loading');
		});

		this.loading.present();
	}
	hideLoading() {
		this.loading.dismiss();
	}

	// logoutUser(userId:any){
	// 	console.log(userId)
	// this.http.post(Configuration.APIURL + 'users/signout',{'user_id':userId})
	// .map(res=>res.json())
	// .subscribe(success=>{
	// 	//this.navCtrl.setRoot(LoginPage)
	// 	console.log("s")
	// 	this.events.publish("user.logout")
	// })
		
		
	// }

	public getJSON(fileName) {
		console.log("====")
        return this.http.get("./assets/jsonfiles/"+fileName);
    }
	
 

}