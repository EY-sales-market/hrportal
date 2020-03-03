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
  TimesheetService
} from '../../services/timesheet.service';

/**
 * Generated class for the CreateTimesheetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-timesheet',
  templateUrl: 'create-timesheet.html',
  providers: [TimesheetService],
})
export class CreateTimesheetPage {
  Roles = [];
  role = '';
  prj = '';
  tasktype = '';
  date = '';
  billHour = '';
  task_des = '';
  billable = false;
  roleID;
  valData = 'please enter valid';
  projectID_data;
  constructor(public navCtrl: NavController, public alertController: AlertController, public navParams: NavParams, public close: ViewController, public data: TimesheetService) {
    this.data.getTask_types().subscribe(data => {
      for (var i in data) {
        this.Roles.push([data[i].types]);

      }
    });
    this.data.getprojectID().subscribe(data => {
      this.projectID_data = data;
      console.log(data);
    });
    console.log(this.Roles);
    console.log(this.projectID_data);
  }


  closeModel() {
    this.close.dismiss();
  }
  saveModel() {
    let obj = {};
    console.log(this.role);
    for (let i = 0; i < this.projectID_data.length; i++) {
      console.log(this.prj, this.projectID_data[i].PROJECTID)
      if (this.prj == this.projectID_data[i].PROJECTNAME) {
        console.log("hello");
        this.roleID = this.projectID_data[i].PROJECTID;
      }
    }
    console.log(this.date, this.task_des, this.role, this.billable, this.billHour, this.prj);
    var retrievedObject = localStorage.getItem('Object');
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    retrievedObject = JSON.parse(retrievedObject);
    obj['emp_id'] = retrievedObject['OfficialEmailID'];
    obj["project_id"] = this.roleID;
    obj["bill_date"] = this.date;
    obj["task_type"] = this.role;
    obj["billed_hours"] = this.billHour;
    obj["task_description"] = this.task_des;
    obj['last_updated'] = date;
    obj["approved1"] = "N";
    if(this.billable){
      obj['isbillable']='Y';
    }
    else{

      obj['isbillable']='N';

    }
    var flag = 0;
    if (!this.roleID) {
      flag = 1;
      this.valData = this.valData + " Project name";
    }
    if (!this.date) {
      flag = 1;
      this.valData = this.valData + " creationDate";
    }
    if (!this.role) {
      flag = 1;
      this.valData = this.valData + ' task type';
    }
    if (!this.task_des) {
      flag = 1;
      this.valData = this.valData + ' task description';
    }
    if (!this.billHour) {
      flag = 1;
      this.valData = this.valData + ' build hours';
    }
    if (flag == 0) {
      this.data.CreateNewTimesheet(obj).subscribe(data => {
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
