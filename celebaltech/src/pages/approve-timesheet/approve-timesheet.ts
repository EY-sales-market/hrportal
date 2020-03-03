import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TimesheetService } from '../../services/timesheet.service';
/**
 * Generated class for the ApproveTimesheetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-approve-timesheet',
  templateUrl: 'approve-timesheet.html',
  providers:[TimesheetService]
})
export class ApproveTimesheetPage {
 // [x: string]: any;
loadData=false;
  drop=0;
  toggleDate=2;
 valData="please enter valid ";
 timesheet_data;
 query="";
 detailData=[];
 data;
 projectid;
 constructor(public navCtrl: NavController, public navParams: NavParams,public data1:TimesheetService,public alertController: AlertController) {
 }

 ionViewDidLoad() {
  var retrievedObject = localStorage.getItem('Object');
  retrievedObject=JSON.parse(retrievedObject);
    //   this.data1.admingetapproval().subscribe(data => {
    //   this.data = data;
    // for(let i=0;i<this.data.length;i++){
    //   if(this.data[i].isapproved=='N'){
    //          this.data[i].isapproved=false;
    //   }
    //   else{
    //     this.data[i].isapproved=true;
    //   }
    //   if(!this.data[i].projectname)
    //   this.data[i].projectname='pp';

    // }
    // console.log(this.data);
    // this.loadData=true;
    // });
    console.log(retrievedObject['EmployeeType']);
  if(retrievedObject['EmployeeType']=="admin"){
    console.log('aqwerdsdad');
    this.data1.admingetapproval().subscribe(data => {
      this.data = data;
    for(let i=0;i<this.data.length;i++){
      if(this.data[i].isapproved=='N'){
             this.data[i].isapproved=false;
      }
      else{
        this.data[i].isapproved=true;
      }
      if(!this.data[i].projectname)
      this.data[i].projectname='pp';

    }
    console.log(this.data);
    this.loadData=true;
    });
  }
  else{
   this.data1.getapproval(retrievedObject['OfficialEmailID']).subscribe(data => {
    this.data = data;
    for(let i=0;i<this.data.length;i++){
      if(this.data[i].isapproved=='N'){
             this.data[i].isapproved=false;
      }
      else{
        this.data[i].isapproved=true;
      }
    }
    this.loadData=true;
    console.log(this.data);
  });
}


   console.log('ionViewDidLoad TimesheetPage');
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

dropMenu(event){
  console.log(event);
  console.log(this.drop);
  this.drop=event;
}
 detail(i){
   console.log("hello");
   if(this.detailData[i])
   this.detailData[i]=false;
   else
   this.detailData[i]=true;
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

//  editRow(rowData){
//   console.log(rowData);
//  }
//  deleteRow(i){
//   console.log(i);
//  }

//  async presentAlertPrompt() {
//    const alert = await this.alertController.create({
//      message: "Create Time-Sheet",
//      inputs: [

//        {
//          name: 'prjname',
//          type: 'text',
//          placeholder: 'Project Name',

//        },
//        {
//          name: 'creationDate',
//          type: 'date',
//          placeholder: 'Date'
//        },
//        {
//          name: 'taskType',
//          type: 'text',
//          placeholder: 'Task Type'
//        },
//        {
//          name: 'buildHour',
//          type: 'number',
//          placeholder: 'Build Hour'
//        },
//        {
//          name: 'taskDes',
//          type: 'text',
//          placeholder: 'Task Description'
//        }
//      ],
//      buttons: [
//        {
//          text: 'Cancel',
//          role: 'cancel',
//          cssClass: 'secondary',
//          handler: () => {

//            console.log('Confirm Cancel');
//          }
//        }, {
//          text: 'Save',

//          handler: data => {
//            console.log(data.prjname,data.creationDate,);
//            console.log(data);
//            var flag=0;
//            if(!data.prjname){flag=1;
//            this.valData=this.valData+" Project name";
//            }
//            if(!data.creationDate){flag=1;
//             this.valData=this.valData+" creationDate";
//            }
//            if(!data.taskType){flag=1;
//            this.valData=this.valData+' task type';
//            }
//            if(!data.taskDes){flag=1;
//            this.valData=this.valData+' task description';
//            }
//            if(!data.buildHour){
//              flag=1;
//             this.valData=this.valData+' build hours';
//            }
//            console.log(this.valData)   ;
//            if(flag==0){
//              return true;
//            }else{
//          this.pAlert();
//          return false;
//            }
//          }
//        }
//      ]
//    });
//   console.log(alert);
//    await alert.present();
//  }


// async EditPrompt(data){
//    const alert = await this.alertController.create({
//      message: "Create Time-Sheet",
//      inputs: [

//        {
//          name: 'prjname',
//          type: 'text',
//          placeholder: 'Project Name',

//        },
//        {
//          name: 'creationDate',
//          type: 'date',
//          placeholder: 'Date'
//        },
//        {
//          name: 'taskType',
//          type: 'text',
//          placeholder: 'Task Type'
//        },
//        {
//          name: 'buildHour',
//          type: 'number',
//          placeholder: 'Build Hour'
//        },
//        {
//          name: 'taskDes',
//          type: 'text',
//          placeholder: 'Task Description'
//        }
//      ],
//      buttons: [
//        {
//          text: 'Cancel',
//          role: 'cancel',
//          cssClass: 'secondary',
//          handler: () => {

//            console.log('Confirm Cancel');
//          }
//        }, {
//          text: 'Save',

//          handler: data => {
//            console.log(data.prjname,data.creationDate,);
//            console.log(data);
//            var flag=0;
//            if(!data.prjname){flag=1;
//            this.valData=this.valData+" Project name";
//            }
//            if(!data.creationDate){flag=1;
//             this.valData=this.valData+" creationDate";
//            }
//            if(!data.taskType){flag=1;
//            this.valData=this.valData+' task type';
//            }
//            if(!data.taskDes){flag=1;
//            this.valData=this.valData+' task description';
//            }
//            if(!data.buildHour){
//              flag=1;
//             this.valData=this.valData+' build hours';
//            }
//            console.log(this.valData)   ;
//            if(flag==0){
//              return true;
//            }else{
//          this.pAlert();
//          return false;
//            }
//          }
//        }
//      ]
//    });
//   console.log(alert);
//    await alert.present();
//  }

//  async DeletePrompt(i){

//    const alert = await this.alertController.create({
//      message: "Are you sure to delete Time-Sheet",
//    buttons: [
//      {
//        text: 'Cancel',
//        role: 'cancel',
//        cssClass: 'secondary',
//        handler: () => {

//          console.log('Confirm Cancel');
//        }
//      }, {
//        text: 'Ok',
//        handler: () => {
//          this.data.splice(i, 1);
//        }
//      }
//    ]
//  });
// console.log(alert);
//  await alert.present();

