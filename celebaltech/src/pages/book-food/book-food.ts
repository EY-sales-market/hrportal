import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertService } from '../../services/alert.service';
import { DataService } from '../../services/data.service';

/**
 * Generated class for the BookFoodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-book-food',
  templateUrl: 'book-food.html',
  providers:[DataService],
})
export class BookFoodPage {
 x:any;
 loadData=false;
 orderLunch=false;
 orderDinner=false;
 today = new Date();
 hideDinner=false;
 hideLunch=false;
 submit=false;

// var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
time ;
retrievedObject;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertServices: AlertService,private data:DataService) {

  }
  ionViewWillEnter(){
  }

 public showname: string = localStorage.getItem("firstName");
  ionViewDidLoad() {
  let pp=true;
    console.log('ionViewDidLoad BookFoodPage');
     this.retrievedObject=JSON.parse(localStorage.getItem('Object'));
  let x={ empId:this.retrievedObject['EmployeeID']}
    console.log(x);


    this.data.getFoodVerify(x).subscribe(data1=>{

       console.log(data1);
       if(data1){
      this.time=data1['hour'];
      console.log(this.submit);
      if(data1['status'])
      { console.log("hello");
        this.submit=true;
        this.hideLunch=true;
        this.hideDinner=true;
        console.log("+++++++++++++++",data1['dinner'],data1['lunch_status']);
        console.log(pp);
        this.orderDinner=data1['dinner'];
        this.orderLunch=data1['lunch_status'];
      }

       if(this.time > 12){
        this.hideLunch=true;
        this.hideDinner=true;
        this.submit=true;
       }

   this.loadData=true;
      }
     });
  console.log(this.loadData);
  }
  submitForm() {
    console.log();
    var retrievedObject = localStorage.getItem('Object');
    retrievedObject=JSON.parse(retrievedObject);
    let x={orderLunch:false,orderDinner:false,empId:retrievedObject['EmployeeID']};
        x.orderLunch=this.orderLunch;
        x.orderDinner=this.orderDinner;
        console.log(x);
    this.alertServices.populateAlert('', 'Are You Sure!!', 'Ok', () => {
      console.log("Ok");
      this.data.getData(x).subscribe(data1=>{
        console.log(data1);
      });
      this.navCtrl.setRoot('DashboardPage')
    }, "Cancel", () => {
      console.log("Cancel")
    })
  }

}
