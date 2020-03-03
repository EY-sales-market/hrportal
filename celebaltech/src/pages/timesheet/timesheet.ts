import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Modal,ModalController } from 'ionic-angular';
import { TimesheetService } from '../../services/timesheet.service';

/**
 * Generated class for the TimesheetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-timesheet',
  templateUrl: 'timesheet.html',
  providers:[TimesheetService],
})

export class TimesheetPage{
  // [x: string]: any;
  toggleDate=2;
  loadData=false;
  show=false;
  valData="please enter valid ";
  timesheet_data;
  query="";
  detailData=[];
  data;
  projectid;
  constructor(public navCtrl: NavController, public navParams: NavParams,public data1:TimesheetService,public alertController: AlertController,private mode:ModalController) {
  }

  myDefaultMethodToFetchData(){

    console.log("hello3");
    // this.data.getTask_types().subscribe(data => {
    //   for (var i in data) {
    //     this.Roles.push([data[i].types]);

    //   }
    // });

    // this.data.getprojectID().subscribe(data => {
    //   this.projectID_data = data;
    //   console.log(data);
    // });

    var retrievedObject = localStorage.getItem('Object');
    retrievedObject=JSON.parse(retrievedObject);
   console.log(retrievedObject);
   if(retrievedObject['EmployeeType']=="admin"){
     this.show=true;
    this.data1.adminViewTimesheets().subscribe(data => {
      this.data = data;
      console.log(data);
       this.loadData=true;
    });
   }
   else{

   console.log("heeloo"+retrievedObject['OfficialEmailID']);
    this.data1.getTimesheets(retrievedObject['OfficialEmailID']).subscribe(data => {
      console.log("******",data);

      this.data = data;
      this.loadData=true;
    console.log(this.data);
  });
}
    console.log('ionViewDidLoad TimesheetPage');
  }


  detail(i){
    console.log("hello");
    if(this.detailData[i])
    this.detailData[i]=false;
    else
    this.detailData[i]=true;
  }
  editRow(rowData){
   console.log(rowData);
  }
  sortDate(){
    if(this.toggleDate==2||this.toggleDate==1){
     this.data.sort(function(a, b){
       var dateA = new Date(a.bill_date).getTime();
       var dateB = new Date(b.bill_date).getTime();
       return dateA > dateB ? 1 : -1;

   });
   this.toggleDate=0;
    }
    else{
     this.data.sort(function(a, b){
       var dateA = new Date(a.bill_date).getTime();
       var dateB = new Date(b.bill_date).getTime();
       return dateA < dateB ? 1 : -1;

   });
   this.toggleDate=1;
    }


}

  deleteRow(i){
   console.log(i);
  }

  ionViewWillEnter(){
    console.log("hello1");
    this.myDefaultMethodToFetchData();
}



  async presentAlertPrompt() {
   const model:Modal=this.mode.create('CreateTimesheetPage');
  model.present();
  model.onDidDismiss((data)=>{
    console.log(data);
    this.ionViewWillEnter();
  })
  console.log("hello");

  }

  async pAlert() {
    const alert = await this.alertController.create({
      message: this.valData,
      buttons: ['OK']
    });
   this.valData="please enter valid ";
    await alert.present();
  }

//  async EditPrompt(data){
//     const alert = await this.alertController.create({
//       message: "Create Time-Sheet",
//       inputs: [

//         {
//           name: 'prjname',
//           type: 'text',
//           placeholder: 'Project Name',

//         },
//         {
//           name: 'creationDate',
//           type: 'date',
//           placeholder: 'Date'
//         },
//         {
//           name: 'taskType',
//           type: 'text',
//           placeholder: 'Task Type'
//         },
//         {
//           name: 'buildHour',
//           type: 'number',
//           placeholder: 'Build Hour'
//         },
//         {
//           name: 'taskDes',
//           type: 'text',
//           placeholder: 'Task Description'
//         }
//       ],
//       buttons: [
//         {
//           text: 'Cancel',
//           role: 'cancel',
//           cssClass: 'secondary',
//           handler: () => {

//             console.log('Confirm Cancel');
//           }
//         }, {
//           text: 'Save',
//           handler: data => {
//             console.log(data.prjname,data.creationDate,);
//             console.log(data);
//             var flag=0;
//             if(!data.prjname){flag=1;
//             this.valData=this.valData+" Project name";
//             }
//             if(!data.creationDate){flag=1;
//              this.valData=this.valData+" creationDate";
//             }
//             if(!data.taskType){flag=1;
//             this.valData=this.valData+' task type';
//             }
//             if(!data.taskDes){flag=1;
//             this.valData=this.valData+' task description';
//             }
//             if(!data.buildHour){
//               flag=1;
//              this.valData=this.valData+' build hours';
//             }
//             console.log(this.valData)   ;
//             if(flag==0){
//               return true;
//             }else{
//           this.pAlert();
//           return false;
//             }
//           }
//         }
//       ]
//     });
//    console.log(alert);
//     await alert.present();
//   }
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
          this.data1.removeTimesheet(data.timesheetid).subscribe(data => {});

        }
      }
    ]
  });
 console.log(alert);
  await alert.present();
  }
}
