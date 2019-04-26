import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private router: Router){}

  showSideBar(){
    let url = this.router.url;
    if(this.router.url === '/' ||  this.router.url === '/login'){
      return false;
    } else{
      return true;
    }
  };
}
