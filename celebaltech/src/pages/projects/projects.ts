import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Modal,ModalController } from 'ionic-angular';
import { TimesheetService } from '../../services/timesheet.service';


/**
 * Generated class for the ProjectsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-projects',
  templateUrl: 'projects.html',
  providers:[TimesheetService]
})
export class ProjectsPage {
  valData="please enter valid ";
  loadData=false;
  timesheet_data;
  query="";
  detailData=[];
  data;
  projectid;
  constructor(public navCtrl: NavController, public navParams: NavParams,public data1:TimesheetService,public alertController: AlertController,private mode:ModalController) {
  }

  ionViewWillEnter(){
    this.myDefaultMethodToFetchData();
}

  myDefaultMethodToFetchData() {
   var retrievedObject = localStorage.getItem('Object');
   retrievedObject=JSON.parse(retrievedObject);

   this.data1.getProjects().subscribe(data => {
       this.data=data;
    console.log(this.data);
    this.loadData=true;

   });
    console.log('ionViewDidLoad TimesheetPage');
  }
  detail(i){
    console.log("hello");
    if(this.detailData[i])
    this.detailData[i]=false;
    else
    this.detailData[i]=true;
  }




  async DeletePrompt(data,i){
    const alert = await this.alertController.create({
      message: "Are you sure to delete Time-Sheet",
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
        handler: () => {

          this.data.splice(i, 1);
          this.detailData[i]=false;
          this.data1.removeProjects(data.projectid).subscribe(
            data => {});

        }
      }
    ]
  });
 console.log(alert);
  await alert.present();

  }
  EditPrompt(data){
    const model:Modal=this.mode.create('CreateProjectPage' ,{data:data});
    model.present();
  }
  async presentAlertPrompt() {
    console.log("***********************************************");
    const model:Modal=this.mode.create('CreateProjectPage');
   model.present();
   // model.onDidDismiss((data)=>{
   //   console.log(data);
   // })
   this.ionViewWillEnter();
   }


 Prompt(data,i){
    console.log(this.data);
    var retrievedObject = localStorage.getItem('Object');
   retrievedObject=JSON.parse(retrievedObject);
    this.data1.setapprovals(
      data.isapproved ? 'Y':'N'
     ,data.timesheetid,retrievedObject['OfficialEmailID'])
    .subscribe(data => {
      console.log(data);
    });
 }



}
