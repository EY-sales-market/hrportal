import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { AlertService } from '../../services/alert.service';
import { DataService } from '../../services/data.service';

/**
 * Generated class for the FoodHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-food-history',
  templateUrl: 'food-history.html',
  providers:[DataService]
})
export class FoodHistoryPage {
  food_data;
  loadData=false;
  x=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private data:DataService) {
  }

  ionViewDidLoad() {
    let x:any;
    var retrievedObject = localStorage.getItem('Object');
    retrievedObject=JSON.parse(retrievedObject);
    if(retrievedObject['EmployeeType']=='admin'){
      this.x=true;
      this.data.getFoodData().subscribe(data=>{
        console.log(data);
              this.food_data=data;
              console.log(this.food_data);
              this.loadData=true;
       })

  }
  else{
    this.data.getFoodHistroy(x).subscribe(data=>{
      console.log(data);
            this.food_data=data;
            console.log(this.food_data);
            this.loadData=true;
     })
  }


    console.log('ionViewDidLoad FoodHistoryPage');

  }



}
