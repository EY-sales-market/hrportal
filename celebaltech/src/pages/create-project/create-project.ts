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
 * Generated class for the CreateProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-project',
  templateUrl: 'create-project.html',
  providers: [TimesheetService],
})
export class CreateProjectPage {

  status=false;
  PROJECTNAME='';
  MANAGER_EMP_ID='';
  STARTDATE='';
  ENDDATE='';
  BILLED_ASSETS='';
  BUDGET='';
  PARTNER='';
  SALES='';
  prj_Id;
  paid=false;
  valData = 'please enter valid';
  constructor(public navCtrl: NavController, public alertController: AlertController, public navParams: NavParams, public close: ViewController, public data: TimesheetService) {
    console.log(navParams.get('data'));
    let data1=navParams.get('data');
if(data1){
  this.status=true;
    this.PROJECTNAME=data1.projectname;
    this.MANAGER_EMP_ID=data1.manager_emp_id;
    this.STARTDATE=data1.startdate;
    this.ENDDATE=data1.enddate;
    this.BILLED_ASSETS=data1.billed_assets;
    this.BUDGET=data1.budget;
    this.PARTNER=data1.partner;
    this.SALES=data1.sales_person_id;
    this.prj_Id=data1.projectid;
}

  }


  closeModel() {
    this.close.dismiss();
  }
  saveModel() {
    let obj = {};
    obj['PROJECTNAME'] = this.PROJECTNAME;
    obj["MANAGER_EMP_ID"] = this.MANAGER_EMP_ID;
    obj["STARTDATE"] = this.STARTDATE;
    obj["ENDDATE"] = this.ENDDATE;
    obj["BILLED_ASSETS"] = this.BILLED_ASSETS;
    obj["BUDGET"] = this.BUDGET;
    obj['PARTNER'] =this.PARTNER;
    obj["SALES"] =this.SALES;
    if(this.paid)
    obj["PAID"]='Y';
    else
    obj["PAID"]='N';
    var flag = 0;
    if (!this.PROJECTNAME) {
      flag = 1;
      this.valData = this.valData + " Project name";
    }
    if (!this.MANAGER_EMP_ID) {
      flag = 1;
      this.valData = this.valData + " Manager Email-id";
    }
    if (!this.STARTDATE) {
      flag = 1;
      this.valData = this.valData + ' Start Date';
    }
    if (!this.ENDDATE) {
      flag = 1;
      this.valData = this.valData + ' End Date';
    }
    if (!this.BILLED_ASSETS) {
      flag = 1;
      this.valData = this.valData + ' billed assets';
    }
    if (!this.BUDGET) {
      flag = 1;
      this.valData = this.valData + ' Project budget';
    }
    if (!this.PARTNER) {
      flag = 1;
      this.valData = this.valData + ' Partner';
    }
    if (!this.SALES) {
      flag = 1;
      this.valData = this.valData + ' Sales Person date';
    }
    if (flag == 0) {
      if(!this.status){
  
        this.data.CreateNewProject(obj).subscribe(data => {
          // this.projectID_data = data;
          console.log(data);
        });
      }
      else{
        obj["project_id"]=this.prj_Id;
                this.data.EditProject(obj).subscribe(data => {

          console.log(data);
        });
      }

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
