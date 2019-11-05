import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import {  ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:string='';
  password:string='';
  constructor(public toastCtrl:ToastController, private navCtrl: NavController, private alertCtrl: AlertController,  private fire : AngularFireAuth,  public afAuth: AngularFireAuth, private router : Router ) 
  { 

  }


  ngOnInit() {
  }
   signIn()
  {
   firebase.auth().signInWithEmailAndPassword(this.email,this.password)
   .then( (user) => {
     console.log('Got some data in login here  ',user);
     let toast = this.toastCtrl.create({
      message: "Welcome " + user.user.displayName,
      duration: 2000
    }).then((toastData)=>{
      toastData.present();
    });
     this.navCtrl.navigateRoot('/feed');

   })
   .catch(error => {
     console.log('Got an error in login ', error );
     let toast = this.toastCtrl.create({
      message: error.message,
      duration: 2000
    }).then((toastData)=>{
      toastData.present();
    });
   })
   console.log('Would sign in with ',this.email,this.password);
  }
  signUp(){
    this.router.navigateByUrl('/register');
  }

}
