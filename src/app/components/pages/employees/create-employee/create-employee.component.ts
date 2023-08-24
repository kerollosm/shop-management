import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmployeesComponent } from '../employees.component';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  iForm:FormGroup
  total:any
  constructor(private formGroub:FormBuilder,
    private toastr:ToastrService,
    private dialogRef:MatDialogRef<EmployeesComponent>,
private employeesService:EmployeesService
    ,@Inject(MAT_DIALOG_DATA)public data:any) {
      this.iForm=this.formGroub.group({
        name: '',
        salary: '',
        notes:''   
      })
     }

 
  onFormSubmit(){
    if(this.iForm.valid){
      if(this.data){
        this.employeesService.updateEmployee(this.data.id,this.iForm.value).subscribe({
          next:(val:any)=>{
            this.toastr.success("تم التعديل بنجاح")
            this.dialogRef.close(true)
          },
          error:(err:any)=>{
    console.log(err)
    this.toastr.warning("خطأ")
    
          }
        })
      }else{
        this.employeesService.addEmployee(this.iForm.value).subscribe({
          next:(val:any)=>{
            this.toastr.success("تم اضافة المنتج")
            this.dialogRef.close(true)
          },
          error:(err:any)=>{
    console.log(err)
    this.toastr.warning("خطأ")
    
          }
        })
      }
   
    }else{
  
    }
  }
  ngOnInit(): void {
    this.iForm.patchValue(this.data)

  }
}
