import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { ToastrService } from 'ngx-toastr';
import { EmployeesService } from 'src/app/services/employees.service';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})

export class EmployeesComponent implements OnInit {
  employees!: any[]
  constructor(private employeesService:EmployeesService, private _dialog:MatDialog,private toastr:ToastrService
    ,private confirmService: NgConfirmService,private router:Router,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getAllEmployees()
  }

  getAllEmployees(){
    this.employeesService.getAll().subscribe(
      res=>{
        this.employees=res
      }
    )
  }
  employeeDelete(id:any){
    this.confirmService.showConfirm('مسح الموظف ؟',
    ()=>{
      this.employeesService.deleteEmployee(id).subscribe({
        next: (res)=>{
          this.toastr.warning("تم مسح الموظف")
          this.getAllEmployees()
        }
        ,
        error: console.log
      }
      )
    },()=>{console.log("yes")})
  }
  openEditForm(data: any) {
    const dealogRef= this._dialog.open(CreateEmployeeComponent, {
       data,
     })
     dealogRef.afterClosed().subscribe({
       next: (val) => {
         if (val) {
           this.getAllEmployees()
         }
       }
     })
   }
  openAddItem() {
    const dealogRef = this._dialog.open(CreateEmployeeComponent)
    dealogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllEmployees()
        }
      }
    })
    // console.log(new Date().getMonth())
  }
  
}
