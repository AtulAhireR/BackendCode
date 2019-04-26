import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../seriveces/data.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  employeeList :any=[];
  empData: any={};
  data : any;
  constructor(private toastr: ToastrService,private dataService:DataService,private spinner: NgxSpinnerService ) {
    this.listEmployee();
   }

  ngOnInit() {
  }
  /**
   * for open add employee popup
   */
  prepareAddEmployee(){
    this.empData = {};
    $('#employee-modal').modal('show');
  }

  /**
   * for save and edit funtion
   */
  saveEmployee(){
    $('#employee-modal').modal('hide');
    this.spinner.show();
    this.dataService.postRequest(this.empData,'add-edit-employee')
      .then((res) => {
        this.data = res;
        if (this.data.status === '200') {
          this.spinner.hide();
          this.toastr.success(this.data.message,'Success');
          this.listEmployee();
        }else{
          this.spinner.hide();
          this.toastr.error(this.data.message,'Error');
        }
     })
     .catch((err) => {
       console.log(err);
       alert(err);
       this.toastr.error(err.message,'error')
     })
  };
  /**
   * Function for return Employee List
   */
  listEmployee() {
    this.spinner.show();
    this.dataService.getRequest('list-employee').then((result) => {
      this.spinner.hide();
      this.data = result;
      this.employeeList = this.data.result;
    }, (err) => {
      this.spinner.hide();
      console.log(err.message);
    });
   };
   /**
    * @purpase For open edit popup
    * @param employeeId 
    * @param firstName 
    * @param lastName 
    * @param mobile 
    * @param dob 
    * @param address 
    * @param city 
    */
   prepareEditEmployee(employeeId,firstName,lastName,mobile,dob,address,city){
     this.empData.employeeId = employeeId;
     this.empData.firstName = firstName;
     this.empData.lastName = lastName;
     this.empData.mobile = mobile;
     let date = new Date(dob);
     this.empData.dateOfBirth = date.getFullYear()+"-"+("0"+(date.getMonth()+1)).slice(-2)+"-"+("0" + date.getDate()).slice(-2);
     this.empData.address = address;
     this.empData.city = city;
     $('#employee-modal').modal('show');
   };
   /**
    * Delete Employee Details by id
    */
   deleteEmployee(employeeId){
    this.spinner.show();
     this.dataService.getRequest('delete-employee-by-id/'+employeeId).then((result)=>{
       this.data.result;
       if (this.data.status === '200') {
        this.spinner.hide();
         this.listEmployee();
         this.toastr.success(this.data.result.message,'Success');
       }else{
        this.spinner.hide();
        this.toastr.error(this.data.result.message,'Error');
       }
      
     },(err) => {
      console.log(err.message);
    });
   };
   sendCancel(){

   }
}
