import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Item } from 'src/app/createprofile/model/item.model';

@Injectable()
export class editlog{

    private editlogRef = this.db.list<Item>( 'editlog');
    constructor(private db:AngularFireDatabase){

    }
    geteditlog(){
        return this.editlogRef;
    }

    addlog(item:Item){
        return this.editlogRef.push(item);

    }
}