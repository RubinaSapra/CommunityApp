// import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';

// admin.initializeApp(functions.config().firebase);



// export const updatelikesc= functions.https.onRequest((request,response)=>{

//     console.log(request.body);
//     const postId=JSON.parse(request.body).postId;

//     const userId=JSON.parse(request.body).userId;
    
//     const action=JSON.parse(request.body).action;
//     admin.firestore().collection("posts").doc(postId).get().then((data:any)=>{
//         let likesc=data.data().likesc || 0;
//         let likes=data.data().likes || [];
//         let updatedata: any;
//         console.log(likes);
//         if(action=="like"){
//            updatedata["likesc"]=++likesc;
//            updatedata[`likes.${userId}`]=true;
//         }else{
//             updatedata["likesc"]=--likesc;
//            updatedata[`likes.${userId}`]=false;
//         }
//         admin.firestore().collection("posts").doc(postId).update(updatedata).then(()=>{
//             response.status(200).send("Done")
//         }).catch((err)=>{
//             response.status(err.code).send(err.message);
//         })
//     }).catch((err)=>{
//         response.status(err.code).send(err.message);
//     })
// })




import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase)

export const updateLikesCount = functions.https.onRequest((request, response) => {
    console.log(request.body);
    let body: any;
    if (typeof (request.body) === 'string') {
      body = JSON.parse(request.body);
    } else {
      body = request.body;
    }
       const postId=body.postId;

    const userId=body.userId;
    
    const action=body.action;
   
    admin.firestore().collection('posts').doc(postId).get()
      .then((data: any) => {
        let likesCount = data.data().likesCount || 0;
        const likes = data.data().likes || [];
        const updateData: { likesCount: number, likes: string[] } = { likesCount: likesCount, likes: likes };
        if (action === 'like') {
          updateData['likesCount'] = ++likesCount;
          updateData['likes'].push(userId);
        } else {
          updateData['likesCount'] = --likesCount;
          updateData['likes'].splice(updateData['likes'].indexOf(userId), 1);
        }
        admin.firestore().collection('posts').doc(postId).update(updateData)
          .then(() => {
            response.status(200).send('Done');
          })
          .catch(error => {
            response.status(error.code).send(error.message);
          })
      })
      .catch(error => {
        response.status(error.code).send(error.message);
      });
  });