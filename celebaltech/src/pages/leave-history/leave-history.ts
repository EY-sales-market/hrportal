import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReportService } from '../../services/report.service';
import { e } from '@angular/core/src/render3';

/**
 * Generated class for the LeaveHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leave-history',
  templateUrl: 'leave-history.html',
  providers: [ReportService]
})
export class LeaveHistoryPage {
  EmployeeType='employee';
  query;
  query1;
  values;
  retrievedObject;
  show=[];
  showMessage=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public reportService:ReportService) {
  }

getAdminData(){
  this.reportService.getLeaveHistoryAdmin('hello').subscribe((data) => {
    console.log(data);
    this.values=data;
    // for(var i=0;i<this.values.length;i++){
    //   this.show[i]=false;
    //   console.log(this.show[i]);
    // }

  });
}
showMessages(i)
{
  if(this.showMessage[i])
  this.showMessage[i]=false;
  else
  this.showMessage[i]=true;
}

getEmployeeData(){

  this.reportService.getLeaveHistoryEmployee(this.retrievedObject['OfficialEmailID'] ).subscribe((data) => {
    console.log(data);
    this.values=data;
    // for(var i=0;i<this.values.length;i++){
    //   this.show[i]=false;
    //   console.log(this.show[i]);
    // }

  });
}

  ionViewDidLoad() {
  this.retrievedObject = localStorage.getItem('Object');
    this.retrievedObject = JSON.parse(this.retrievedObject);
    if (this.retrievedObject['EmployeeType'] == 'admin') {
      this.EmployeeType = 'admin';
      this.getAdminData();
    }
    else
    this.getEmployeeData();
  }



}
