import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the EventDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {

  public eventDetails:any=[]
  constructor(public navCtrl: NavController, public viewCtrl:ViewController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');
  }
  
  updatevalue(v){
    this.eventDetails.push(v)
  }

  submitForm(){ 
    let data = { 'event': this.eventDetails };
   this.viewCtrl.dismiss(data);
  }

}
