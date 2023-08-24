import { Component , Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {  ToastrService } from 'ngx-toastr';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit{
  iForm:FormGroup
constructor(private formGroub:FormBuilder,
  private toastr:ToastrService,
  private itemService:ItemService,
  private dialogRef:MatDialogRef<AddItemComponent>,
  @Inject(MAT_DIALOG_DATA)public data:any){
  this.iForm=this.formGroub.group({
    name: '',
    cost: '',
    price: '',
    quantity: ''
  })
}
onFormSubmit(){
  if(this.iForm.valid){
    if(this.data){
      this.itemService.updateItem(this.data.id,this.iForm.value).subscribe({
        next:(val:any)=>{
          this.toastr.success("تم تعديل المنتج بنجاح")
          this.dialogRef.close(true)
        },
        error:(err:any)=>{
  console.log(err)
  this.toastr.warning("خطأ")
  
        }
      })
    }else{
      this.itemService.addItem(this.iForm.value).subscribe({
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
