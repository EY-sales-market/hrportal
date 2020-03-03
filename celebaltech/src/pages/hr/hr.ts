import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../services/data.service';
import { ReportService } from '../../services/report.service';
/**
 * Generated class for the HrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hr',
  templateUrl: 'hr.html',
  providers:[ReportService]
})
export class HrPage {
  food_data;
  constructor(public navCtrl: NavController, public navParams: NavParams,private data:ReportService) {
  }

  ionViewDidLoad() {



    console.log('ionViewDidLoad FoodHistoryPage');

  }

  pp(){
    // var obj={};
    // obj['user']="rahulmangalam27@gmail.com";
    // obj['password']="rahul";
    // this.data.getData().subscribe(data=>{
    //   console.log(data);
    //  })
  }
  pp1(){
    var obj={};
    obj['user']="papu";
    this.data.getData(obj).subscribe(data=>{
      console.log(data);
     })
  }

}
