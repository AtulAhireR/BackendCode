import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DataService } from '../../seriveces/data.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData : any={};
  //userData: any = {};
  registerData : any={};
  errordata:any={};
  error: any={};
  data:any;
  Ngform:any={};
  userData={firstName:'',lastName:'',companyEmail:''};
  constructor(private router: Router,private toastr: ToastrService,private dataService:DataService,private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }
/**
 * for login by email and password
 */
  login() {
    this.spinner.show();
    this.dataService.login(this.loginData)
    .then((res) => { 
      this.data = res;
      if(this.data.status==='200'){
        this.spinner.hide();
        this.toastr.success(this.data.message,'success' );
        this.userData.companyEmail = this.data.result.companyEmail;
        this.userData.firstName = this.data.result.firstName;
        this.userData.lastName = this.data.result.lastName;
        sessionStorage.setItem("currentUser",JSON.stringify(this.userData));
        this.router.navigate(['home']);
      }else{
        this.spinner.hide();
        this.toastr.error(this.data.message,'Fail' );
        this.router.navigate(['']);
      }
    })
    .catch((err) => {
      this.spinner.hide();
      this.toastr.error(err,'Fail' );
      this.router.navigate(['']);
    }) 
  };

  /**
   * function for open manager register popup
   */
  prepareRegister(){
    this.registerData={};
    $('#register-modal').modal('show');
  };

  /**
   * Register manager details 
   */
  registerManager(){
    $('#register-modal').modal('hide');
    this.spinner.show();
    this.dataService.postRequest(this.registerData,'register')
      .then((res) => {
        this.data = res;
        if (this.data.status === '200') {
          this.spinner.hide();
          this.toastr.success(this.data.message,'Success');
        }else{
          this.spinner.hide();
          this.toastr.error(this.data.message,'Error');
        }
     })
     .catch((err) => {
      this.spinner.hide();
       console.log(err);
       this.toastr.error(err.message,'error')
       this.router.navigate(['']);
     })
  };
  /**
   * Function for Check email already available or not 
   */
  checkEmail(email){
    this.registerData.email = email;
    this.dataService.postRequest(this.registerData,'check_email').then((result) =>{
    this.data=result;
    if(this.data.status === '300'){
        this.errordata={isErrorData:true,errorMessage:'email entered is already available'};
    }else{
          this.errordata={isErrorData:false,errorMessage:'Ok'};
        }
   })
   .catch((err) => {
     alert(err);
   })
 };
};
