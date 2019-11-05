import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import firebaseConfig from './firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { Camera } from '@ionic-native/camera/ngx';
import { AngularFireStorageModule } from 'angularfire2/storage';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { environment } from 'src/environments/environment';
import {HttpClientModule} from '@angular/common/http'
firebase.initializeApp(firebaseConfig);





@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(),
     AppRoutingModule,
     AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,File,FileChooser,Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

//   constructor(db: AngularFirestore) {
//     const settings: firebase.firestore.Settings = { timestampsInSnapshots: true };
//     db.firestore.settings(settings);   
// }
}
