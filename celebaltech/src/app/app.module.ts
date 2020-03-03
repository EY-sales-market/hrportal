import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CommonservicesProvider } from '../providers/commonservices/commonservices';
import { HttpClientModule } from '@angular/common/http';
import { AlertService } from '../services/alert.service';
import { VideoCapturePlus, VideoCapturePlusOptions, MediaFile } from '@ionic-native/video-capture-plus';



@NgModule({

  declarations: [
    MyApp,
    HomePage,
    ListPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      mode: 'ios',
			backButtonText: '',
			backButtonIcon: 'md-arrow-back',
			swipeBackEnabled: false,
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    VideoCapturePlus,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CommonservicesProvider,
    AlertService
  ]
})
export class AppModule {}
