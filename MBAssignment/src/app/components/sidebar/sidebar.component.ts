import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../seriveces/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
data: any;
  constructor(private router: Router,private toastr: ToastrService,private dataService:DataService) { }

  ngOnInit() {
  }
  logout(){
    this.dataService.logout().then((result) => {
      this.data = result;
      if(this.data.status==='200'){
        sessionStorage.clear();
        this.toastr.success(this.data.message,'Success' );
        this.router.navigate(['']);
        //sessionStorage.setItem("currentUser",JSON.stringify(this.user));
      }else{
        this.toastr.error(this.data.message,'Fail' );
      }
    }, (err) => {
     this.toastr.error(err.message,'Fail' );
    });
  }
}
