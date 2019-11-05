import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { ToastController, AlertController } from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name:string='';
 email:string='';
  password:string='';
  constructor(private toastCtrl: ToastController, private alertCtrl:AlertController, private fire : AngularFireAuth, private router : Router) { }

  ngOnInit() {
  }
  signUp()
{
  firebase.auth().createUserWithEmailAndPassword(this.email,this.password)
  .then(data => {
    let newUser : firebase.User= data.user;
    newUser.updateProfile({
      displayName: this.name,
      photoURL:""
    }).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      let toast = this.toastCtrl.create({
        message: err.message,
        duration: 2000
      }).then((toastData)=>{
        toastData.present();
      });
    })
    console.log('Got Data!',data);
     this.presentalert()
  })
  .catch(error => {
    let toast = this.toastCtrl.create({
      message: error.message,
      duration: 2000
    }).then((toastData)=>{
      toastData.present();
    });
  });

  
}
signIn(){
  this.router.navigateByUrl('/login');
}
async presentalert()
{
  let alert = await this.alertCtrl.create({
    message: 'Account Created',
    subHeader: 'Your Account has been created succesfully!',
    buttons: [{
      text:"Ok",
      handler:() =>{

      }
      
    }]
   });
  await alert.present(); 
}

}
