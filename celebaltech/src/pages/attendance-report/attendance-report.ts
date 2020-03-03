import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController } from 'ionic-angular';
import { ReportService } from '../../services/report.service';

/**
 * Generated class for the AttendanceReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-attendance-report',
  templateUrl: 'attendance-report.html',
  providers:[ReportService]
})
export class AttendanceReportPage {

  loadData=false;
  retrievedObject;
  data;
query;
query1;
today;
JoinDay;
detailData=[];
constructor(public navCtrl: NavController, public navParams: NavParams,private mode:ModalController,public report:ReportService) {

  }




  getDetails(i){
    if(this.detailData[i]){
      this.detailData[i]=false;
    }
    else{
      this.detailData[i]=true;
    }
  }


  getReport(){
    var obj={};
 obj['todayDate']=this.query;
    console.log('ionViewDidLoad ReportPage');
   if(this.retrievedObject['EmployeeType']=='admin'){
     console.log("chutiya");
    this.report.getAllReport(obj).subscribe(data => {
      console.log(data);
      this.data=data;
      console.log(this.data.length,"helodkffsd");
      for(let i=0;i<this.data.length;i++)
      {
       let entryMin=this.data[i].entryTime.substr(3, 2);
       let entryHours=this.data[i].entryTime.substr(0, 2);
       let exitHours=this.data[i].exitTime.substr(0, 2);
       let exitMin=this.data[i].exitTime.substr(3, 2);
       console.log(entryMin,entryHours,"dsfsdfds");
       let hours=exitHours-entryHours;
       let min=exitMin-entryMin;
       if(min<0){
         hours=hours-1;
         min=60-min;
       }
       console.log(hours,min);
       this.data[i]["hours"]=[hours,min].join(':');
        console.log(this.data[i].hours);
      }
    console.log(this.data);
     });

   }else{
    this.report.getReport(obj).subscribe(data => {
      this.data=data;
      console.log(this.data.length,"helodkffsd");
      for(let i=0;i<this.data.length;i++)
      {
       let entryMin=this.data[i].entryTime.substr(3, 2);
       let entryHours=this.data[i].entryTime.substr(0, 2);
       let exitHours=this.data[i].exitTime.substr(0, 2);
       let exitMin=this.data[i].exitTime.substr(3, 2);
       console.log(entryMin,entryHours,"dsfsdfds");
       let hours=exitHours-entryHours;
       let min=exitMin-entryMin;
       if(min<0){
         hours=hours-1;
         min=60-min;
       }
       console.log(hours,min);
       this.data[i]["hours"]=[hours,min].join(':');
        console.log(this.data[i].hours);
      }
    console.log(this.data);
     });

   }



    console.log("hello");
  }

  ionViewDidLoad() {

    var d = new Date();
    var month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
if (month.length < 2)
    month = '0' + month;
if (day.length < 2)
    day = '0' + day;
this.today=[year, month, day].join('-');
this.query=this.today;
console.log(this.today);
var retrievedObject = localStorage.getItem('Object');
this.retrievedObject=JSON.parse(retrievedObject);
 d=new Date(retrievedObject['DOJ']);
 var month = '' + (d.getMonth() + 1);
 day = '' + d.getDate();
 year = d.getFullYear();
if (month.length < 2)
 month = '0' + month;
if (day.length < 2)
 day = '0' + day;
this.JoinDay=[year, month, day].join('-');
console.log(this.JoinDay);
 this.getReport();
  }

  detail(i){
    console.log("hello");
    if(this.detailData[i])
    this.detailData[i]=false;
    else
    this.detailData[i]=true;
  }

  async presentAlertPrompt() {
    const model:Modal=this.mode.create('SettingsPage');
   model.present();
   model.onDidDismiss((data)=>{
     console.log(data);
    //  this.ionViewWillEnter();
   })
   console.log("hello");

   }
}
