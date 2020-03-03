import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { ReportService } from '../../services/report.service';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers:[ReportService]
})
export class SettingsPage {
   date;
   qwerty;
   entryTime="11:00";
   exitTime="19:00";
  task_des = '';

  valData = 'please enter valid';
  today: string;
  lastDay: string;
  constructor(public navCtrl: NavController, public alertController: AlertController, public navParams: NavParams, public close: ViewController,public data:ReportService) {
//     var d = new Date();
//     var month = '' + (d.getMonth() + 1),
//     day = '' + d.getDate(),
//     year = d.getFullYear();

// if (month.length < 2)
//     month = '0' + month;
// if (day.length < 2)
//     day = '0' + day;

// this.date=[year, month, day].join('-');
// this.lastDay=[year,month,'01'].join('-');
  }

  closeModel() {
    this.close.dismiss();
  }
  saveModel() {
    let obj = {};

    var retrievedObject = localStorage.getItem('Object');

    retrievedObject = JSON.parse(retrievedObject);
    obj['emp_id'] = retrievedObject['OfficialEmailID'];
    obj["entryTime"] = this.entryTime;
    obj["exitTime"] = this.exitTime;
    obj["task_description"] = this.task_des;
    obj['DTU']=this.qwerty;
    obj["isapproved"] = "N";

    var flag = 0;
    if (!this.qwerty) {
      flag = 1;
      this.valData = this.valData + "Date to update";
    }
    if (!this.task_des) {
      flag = 1;
      this.valData = this.valData + ' task description';
    }

    if (flag == 0) {
      console.log(obj);
      this.data.updateReport(obj).subscribe(data => {
        console.log(data);
      });
      this.close.dismiss();

    } else {
      this.pAlert();
    }

  }
  async pAlert() {
    const alert = await this.alertController.create({
      message: this.valData,
      buttons: ['OK']
    });
    this.valData = "please enter valid ";
    await alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateTimesheetPage');
  }

}
