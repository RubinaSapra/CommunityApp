import { Component, OnInit } from '@angular/core';
import { Item } from './model/item.model';



@Component({
  selector: 'app-createprofile',
  templateUrl: './createprofile.page.html',
  styleUrls: ['./createprofile.page.scss'],
})
export class CreateprofilePage implements OnInit {

  item:Item= {
    fname: '',
    lname:'',
    age:'',
  };
  constructor() { }

  ngOnInit() {
  }

//   addlog(item:Item){
//     this.editlog.addlog(item).then( ref=>{
//       console.log(ref.key);
//     })
// }

}
