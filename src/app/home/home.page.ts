import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // username:string='';
  // password:string='';


  constructor(private router : Router) {}
signIn()
{
  // console.log(this.username, this.password);
  this.router.navigateByUrl('/login');
}
register()
{
  // console.log(this.username, this.password);
  this.router.navigateByUrl('/register');
}
}
