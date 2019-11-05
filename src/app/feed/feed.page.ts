import { Component, OnInit } from '@angular/core';
import {  AngularFireAuth } from '@angular/fire/auth';
import {  AngularFireDatabase} from 'angularfire2/database';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Router } from '@angular/router';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import * as moment from 'moment';
import { LoadingController, ToastController } from '@ionic/angular';
import {WebView} from '@ionic-native/ionic-webview/ngx';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  myInput;
  email:string;
  arrData=[];
  text:string="";
  posts:any[]=[];
  pagesize:number=10;
  cursor:any;
  infiniteEvent:any;
  image:string='';
  url:any;
  loading: boolean = false;;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  constructor(private afStorage: AngularFireStorage,private http:HttpClient, private loadCtrl: LoadingController,private toastCtrl:ToastController, private camera: Camera, private router : Router, private fileChooser: FileChooser,private file: File, private fire:AngularFireAuth,private fdb: AngularFireDatabase) { 
    
     this.getposts();
    this.email = firebase.auth().currentUser.email;
  }
  getposts(){
    this.posts=[];
    let loading = this.loadCtrl.create({
      message:"Loading feed...",
      duration: 2000
    }).then((res) => {
      res.present();

      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed! after 2 Seconds');
      });
    });
    let query = firebase.firestore().collection("posts").orderBy("created","desc").limit(this.pagesize);
    // query.onSnapshot((snapshot)=>{
    //   let changedDocs=  snapshot.docChanges();
    //   changedDocs.forEach((change)=>{
    //     if(change.type =="added"){

    //     }
    //     if(change.type =="modified"){
          
    //     }
    //     if(change.type =="removed"){
          
    //     }
    //   })
    // })
    query.get()
    .then((docs)=>{
    docs.forEach((doc) => {
      this.posts.push(doc);
    })
    this.cursor=this.posts[this.posts.length-1];
    console.log(this.posts)
    }).catch((err)=>{
          console.log("QUery get");
    })
  }

  upload2(event) {
    console.log("one")
    const id = Math.random().toString(36).substring(2);
    console.log("o2")
    this.ref = this.afStorage.ref(id);
    console.log("3")
    this.task = this.ref.put(event.target.files[0]);
    console.log("updated");
  }

 post(){
   firebase.firestore().collection("posts").add({
     text: this.text,
     created:firebase.firestore.FieldValue.serverTimestamp(),
     owner: firebase.auth().currentUser.uid,
     owner_name: firebase.auth().currentUser.displayName
   }).then((doc) =>{
     console.log(doc)
     if(this.image){
       this.upload(doc.id)
     }
     this.text="";
    //  this.image= undefined;
     let toast = this.toastCtrl.create({
      message: 'Your post has been updated!! ',
      duration: 2000
    }).then((toastData)=>{
      console.log(toastData);
      toastData.present();
    });
     this.getposts();
   }).catch((err)=>{
     console.log("get posts "+JSON.stringify(err));
   })

 }
 
  ngOnInit() {
  }
  ago(time){
  let difference = moment(time).diff(moment());
  return moment.duration(difference).humanize();
  }

  
  loadData(event) {
    this.posts=[]
    firebase.firestore().collection("posts").orderBy("created","desc").startAfter(this.cursor).limit(this.pagesize).get()
    .then((docs)=>{ 
    docs.forEach((doc) => {
      this.posts.push(doc);
    })
    console.log(this.posts)
    if(docs.size<this.pagesize){
      event.enable(false);
      this.infiniteEvent=event;
    }
    else{
      event.complete(); 
      this.cursor=this.posts[this.posts.length-1];
    }
    }).catch((err)=>{
          console.log("Load data"+JSON.stringify(err));
    })
  }

  doRefresh(event) {
    this.posts=[];
    this.getposts();
    console.log('Begin async operation');
    if(this.infiniteEvent){
    this.infiniteEvent.enable(true);
    }
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  logout(){
    firebase.auth().signOut().then(()=>{
      let toast = this.toastCtrl.create({
        message: 'Successfully logged out!! ',
        duration: 2000
      }).then((toastData)=>{
        console.log(toastData);
        toastData.present();
      });
      this.router.navigateByUrl('/home');
    });

  }
  addPhoto(){
    this.launchCamera();
  }
 launchCamera(){
  let options: CameraOptions={
    quality:10,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType:this.camera.DestinationType.DATA_URL,
    encodingType:this.camera.EncodingType.PNG,
    mediaType:this.camera.MediaType.PICTURE,
    correctOrientation:true,
    targetHeight:512,
    targetWidth:512,
    allowEdit:true
  }
  this.camera.getPicture(options).then((base64Image)=>{
    console.log("Got image ");
    // console.log(base64Image); 
    this.image = "data:image/png;base64," + base64Image;

    // this.image.base64String;
  }).catch((err)=>{
    console.log("Image here error"+JSON.stringify(err));
  })
 
 }

 upload(name:string ){
   
  console.log(this.image);
//   let ref= firebase.storage().ref("posImages").child(name);
  
//  let uploadTask= ref.putString(this.image.split(',')[1], "base64");
let ref = firebase.storage().ref("postImages/").child(name); // ref: reference to path in firebase storage.
let uploadTask = ref.putString(this.image.split(',')[1], "base64"); //1st param: base64 image data we are splitting into
 console.log(this.image.split(',')[1])
 console.log(" Beanth upload tasl "  );

   uploadTask.on("state_changed",(taskSnapshot:any)=>{
     console.log(" taskSnapshot here  " );
   }, (error)=>{
     console.log(" error in ts" );
   }, () => {
     console.log("Upload complete");
     uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
       console.log(url);
     })
       })
 }

like(post){
  let body = {
    postId:post.id,
    userId:firebase.auth().currentUser.uid,
    action:post.data().likes && post.data().likes[firebase.auth().currentUser.uid] == true ? "unlike" : "like" 
  }

  this.http.post("https://us-central1-community-app-c67df.cloudfunctions.net/updateLikesCount",JSON.stringify(body),
  {responseType:"text"
    }).subscribe((data)=>{
    console.log(data)
  }, (error)=>{
    console.log(error)
  })
 
}
  

}
