import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';





/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  show=false;
  shownGroup = null;

  public showname: string = localStorage.getItem("firstName")
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    var retrievedObject = localStorage.getItem('Object');
    retrievedObject=JSON.parse(retrievedObject);

    if(retrievedObject['EmployeeType']=="admin")
    {
    this.show=true;
    }
    console.log('ionViewDidLoad DashboardPage');
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };
  isGroupShown(group) {
    return this.shownGroup === group;
  };

  bookFood() {
    this.navCtrl.push('BookFoodPage');
  }

  foodHistory() {
    this.navCtrl.push('FoodHistoryPage');
  }
  timeSheet(){
    this.navCtrl.push('TimesheetPage');
  }
  hr() {
    this.navCtrl.push('HrPage');
  }
  appTimeSheet() {
    this.navCtrl.push('ApproveTimesheetPage');
  }
  projects(){
    this.navCtrl.push('ProjectsPage');
  }
  lMan(){
  this.navCtrl.push('LeaveManagmentPage');
  }
  reports(){
    if(this.show)
    this.navCtrl.push('AttendanceReportPage');
    else
    this.navCtrl.push('ReportPage');
  }
  leaveHistory(){
    this.navCtrl.push('LeaveHistoryPage');
  }
  request(){
    this.navCtrl.push('UpdateRequestsPage');
  }

}
