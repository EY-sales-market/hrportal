import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  AlertController
} from 'ionic-angular';
import {
  ReportService
} from '../../services/report.service';

/**
 * Generated class for the LeaveManagmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leave-managment',
  templateUrl: 'leave-managment.html',
  providers: [ReportService]
})
export class LeaveManagmentPage {
  values;
  EmployeeType:any= 'employee';
  query;
  query1;
  type = 'LEA';
  totaldata=0;
  task_des = '';
  retrievedObject;
  longText = "Björk first came to prominence as one of the lead vocalists of the avant pop Icelandic sextet the Sugarcubes, but when  Björk first came to prominence as one of the lead vocalists of the avant pop Icelandic sextet the Sugarcubes, but when..Buttons are an essential way to interact with and navigate through an app, and should clearly communicate what action will occur after the user taps them. Buttons can consist of text and/or an icon, and can be enhanced with a wide variety of attributes.Buttons are an essential way to interact with and navigate through an app, and should clearly communicate what action will occur after the user taps them. Buttons can consist of text and/or an icon, and can be enhanced with a wide variety of attributes.";

  show=[];

  valData = 'please enter valid';
  //  today: string;
  //  lastDay: string;
  constructor(public navCtrl: NavController, public alertController: AlertController, public navParams: NavParams, public close: ViewController, public data: ReportService) {

    //    var d = new Date();
    //    var month = '' + (d.getMonth() + 1),
    //    day = '' + d.getDate(),
    //    year = d.getFullYear();

    // if (month.length < 2)
    //    month = '0' + month;
    // if (day.length < 2)
    //    day = '0' + day;

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
    obj["reason"] = this.task_des;
    obj["DOLF"] = this.query;
    obj["DOLT"] = this.query1;
    obj["status"] = this.type;
    var flag = 0;
    if (!this.query) {
      flag = 1;
      this.valData = this.valData + "Date from ";
    }
    if (!this.query1) {
      flag = 1;
      this.valData = this.valData + "Date to ";
    }
    if (!this.task_des) {
      flag = 1;
      this.valData = this.valData + 'description ';
    }
    if (flag == 0) {
      this.pAlert2(obj);
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
  async pAlert2(obj) {
    const alert = await this.alertController.create({
      message: 'Are you sure!!',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {

        }
      }, {
        text: 'Yes',
        handler: () => {
          this.data.upadteLeave(obj).subscribe((data) => {
            console.log(data);
          });
          this.closeModel();
        }
      }]
    });
    await alert.present();
  }
  async acceptLeave(i){
      const alert = await this.alertController.create({
        message: 'Please enter some Comments and approve request!!',
        inputs: [
          {
            name: 'name1',
            type: 'text',
            placeholder: 'comments....'
          }
        ],
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
              this.values[i]['comment']=data.name1;
              this.values[i].isApproved= "Y";
              this.totaldata--;
              console.log(this.values[i]);
              this.data.approveLeave(this.values[i]).subscribe(()=>{
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
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'comments....'
        }
      ],
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

            this.values[i].isApproved= "REJ";
            this.values[i]['comment']=data.name1;
            console.log(this.values[i]);
            this.totaldata--;
            this.data.approveLeave(this.values[i]).subscribe(()=>{

            });
            this.values.splice(i, 1);
          }
        }
      ]
    });
    await alert.present();

  }
  readMore(i){
    if(this.show[i])
    this.show[i]=false;
    else
    this.show[i]=true;
  }
  ionViewDidLoad() {
    this.retrievedObject = localStorage.getItem('Object');
    this.retrievedObject = JSON.parse(this.retrievedObject);
    if (this.retrievedObject['EmployeeType'] == 'admin') {
      this.EmployeeType = 'admin';
      this.data.getLeaveData().subscribe((datp) => {
        console.log(datp);

        this.values=datp;
        this.totaldata=this.values.length;
        // for(var i=0;i<this.values.length;i++){
        //   this.show[i]=false;
        //   console.log(this.show[i]);
        // }

      });
    }
  }

}
