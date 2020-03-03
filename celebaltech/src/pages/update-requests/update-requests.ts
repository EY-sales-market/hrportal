import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ReportService } from '../../services/report.service';

/**
 * Generated class for the UpdateRequestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-requests',
  templateUrl: 'update-requests.html',
  providers:[ReportService]
})
export class UpdateRequestsPage {
  values;
  show=[];
  constructor(public navCtrl: NavController, public alertController: AlertController, public navParams: NavParams,public reportService:ReportService) {
  }
  async acceptLeave(i){
    const alert = await this.alertController.create({
      message: 'Please enter some Comments and approve request!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler:(data) => {
            console.log('Confirm Ok');
            // this.values[i]['comment']=data.name1;
            this.values[i].isapproved= "Y";
            console.log(this.values[i]);
            console.log(data);
            console.log("hyyyy");
            this.reportService.appoveUpdateReport(this.values[i]).subscribe(()=>{

            });
            this.values.splice(i, 1);
          }
        }
      ]
    });
    await alert.present();
}
  async rejectLeave(i){
    console.log("fjsdkhjflkdsaf");
    const alert = await this.alertController.create({
      message: 'Please enter reason of rejection!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');

          }
        }, {
          text: 'Ok',
          handler: (data) => {

            this.values[i].isapproved= "REJ";
            // this.values[i]['comment']=data.name1;
            console.log(this.values[i]);
            this.reportService.appoveUpdateReport(this.values[i]).subscribe(()=>{

            });
            this.values.splice(i, 1);
          }
        }
      ]
    });
    await alert.present();

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateRequestsPage');
    this.reportService.getUpdateAttendance().subscribe((datp) => {
      console.log(datp);
      this.values=datp;
    });
  }


}
