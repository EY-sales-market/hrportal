import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  userName;
  userEmail;
  rootPage: any = 'LoginPage';

  pages: Array<{title: string, component: any, icon: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'DashboardPage', icon:'zmdi zmdi-home' },
      { title: 'Food', component: 'BookFoodPage', icon:'zmdi zmdi-folder' },
      { title: 'Hr', component: 'CommingSoonPage', icon: 'zmdi zmdi-accounts-alt'  },
      { title: 'History', component: 'FoodHistoryPage', icon: 'zmdi zmdi-star'  },
      { title: 'Timesheet', component: 'CommingSoonPage', icon: 'zmdi zmdi-favorite'  },
      // { title: 'Upload a file', component: 'CommingSoonPage', icon: 'zmdi zmdi-upload'  },
      // { title: 'Discard case entry', component: 'CommingSoonPage', icon: 'zmdi zmdi-delete'  },
      { title: 'Settings', component: 'CommingSoonPage', icon: 'zmdi zmdi-settings'},
      { title: 'Logout', component: 'LoginPage', icon: 'ion ion-md-log-out'},
    ];

  }
  ionViewDidLoad() {
    console.log("asdfghjkasdfghjk+++++++++++++++++++++++++++")
  }
  initializeApp() {

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleLightContent();
      this.splashScreen.hide();

      if(localStorage.getItem('login')=='yes'){

        var retrievedObject = localStorage.getItem('Object');
        retrievedObject=JSON.parse(retrievedObject);
        console.log(retrievedObject);
         if(retrievedObject){
        this.userName=retrievedObject['Name'];
        this.userEmail=retrievedObject['OfficialEmailID'];
        console.log(this.userName,this.userEmail);
         }
         this.rootPage = 'DashboardPage'
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log(page);
    if(page.component==='LoginPage'){
      localStorage.removeItem("login")
    }

    this.nav.setRoot(page.component);
  }
}
