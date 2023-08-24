import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder ,FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InvoicesService } from 'src/app/services/invoices.service';
import { ItemService } from 'src/app/services/item.service';
import { purchaseInvoicesService } from 'src/app/services/purchase-invoice.service';
@Component({
  selector: 'app-create-purchase-invoice',
  templateUrl: './create-purchase-invoice.component.html',
  styleUrls: ['./create-purchase-invoice.component.css']
})
export class CreatePurchaseInvoiceComponent implements OnInit{
  constructor(private builder:FormBuilder
    ,private toastr:ToastrService,
    private itemsService:ItemService,
    private invoiceService:purchaseInvoicesService,
    private router:Router,
    private activeroute:ActivatedRoute){}
    ngOnInit(): void {
      this.getAllItems()
      this.editInvoce=this.activeroute.snapshot.paramMap.get('data')
      if(this.editInvoce!=null){
        this.pageTitle='Edit Invoice'
        this.isEdit=true
        this.setEditInfo(this.editInvoce)
    }}
    pageTitle="تسجيل فاتورة"
    invoiceDetail!:FormArray<any>
    invoiceproduct!:FormGroup<any>
    items:any
    id:any
    editInvoce:any
    editDetails:any
    isEdit:boolean=false


    invoiceform=this.builder.group({
      total:this.builder.control(1, Validators.required),
      details:this.builder.array([],Validators.required),
    creator:this.builder.control(sessionStorage.getItem('userName')),
    timeCreated:new Date().toLocaleString('en-Uk',{
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false // Use 24-hour format
    })
    })
    get invproducts(){
      return this.invoiceform.get("details")as FormArray
    }
    saveInvoice(){
      // this.invoiceService.addInvoice()
     if(this.invoiceform.valid){
      if(!this.isEdit){
        this.invproducts.controls.forEach((item: AbstractControl) => {
          const itemsId = item.get('id')?.value;
          const qty = item.get('quantity')?.value;
          // console.log(Number(itemsId),qty)
          this.itemsService.sumToQuantity(Number(itemsId),qty).subscribe(
            () => {
              console.log('Quantity subtracted successfully');
              // Handle success
            },
            error => {
              console.log(itemsId,qty)
              console.error('Error subtracting quantity:', error);
              // Handle error
            }
          );
          // this.itemsService.subtractFromQuantity(itemsId,qty)
          
        });
        this.invoiceService.addInvoice(this.invoiceform.value).subscribe({
          next:(val:any)=>{
            this.toastr.success("تم تسجيل الفاتورة")
            this.router.navigate(['/purchase-invoices'])
          },
          error:(err:any)=>{
      console.log(err)
      this.toastr.warning("خطأ")
      
          }
        })
      
      }else{
        this.invoiceService.updateInvoice(this.activeroute.snapshot.paramMap.get('data'),this.invoiceform.value).subscribe({
          next:(val:any)=>{
            this.toastr.success("تم تعديل الفاتورة")
            this.router.navigate(['/purchase-invoices'])
          },
          error:(err:any)=>{
      console.log(err)
      this.toastr.warning("خطأ")
      
          }
        })
      
      }
      // console.log(this.invoiceform.value)
     
     }else{
      this.toastr.warning("برجاء ادخال كل البيانات المطلوبة")
     }
    
    }
    removeItem(index:any ){
      this.invproducts.removeAt(index)
    }
    setEditInfo(data:any){
      this.invoiceService.getInvHeaderByCode(data).subscribe(res=>{
        this.editDetails=res
        for(let i=0 ;i<this.editDetails.length;i++){
          this.addNewProduct()
        }
         
      })
      this.invoiceService.getInvDetailByCode(data).subscribe(res=>{
        let editData:any;
        editData =res
        if(editData!=null){
          this.invoiceform.setValue({total:editData.total,details:this.editDetails,
          creator:editData.creator,timeCreated:editData.timeCreated})
        }
      })
    }
    addNewProduct(){
      this.invoiceDetail=this.invoiceform.get("details")as FormArray
      this.invoiceDetail.push(this.genrateArow())
      this.updateInvoiceTotal()
    }
    genrateArow(){
      return this.builder.group({
        name:this.builder.control('',Validators.required),
        price:this.builder.control({disabled:true}),
        id:this.builder.control({disabled:true}),
        quantity:this.builder.control('',Validators.required),
        totalPrice:this.builder.control({disabled:true}),
      })
    }
    getAllItems(){
      this.itemsService.getAll().subscribe(
        (res: any)=>{
    this.items=res
    // console.log(this.items)
        }
        )
    }
    updatePrice(selectedName: string, index: number): void {
     
      const selectedItem = this.items.find((item: { name: any; }) => item.name === selectedName);
      
        if (selectedItem) {
          const priceControl = this.invproducts.controls[index].get('price');
          const idControl = this.invproducts.controls[index].get('id');
      
          if (priceControl) {
            priceControl.setValue(selectedItem.cost);
          }
          if (idControl) {
            idControl.setValue(selectedItem.id);
          }
        }
      }
    
    
    calculateTotal(index: number): number {
      const item = this.invproducts.controls[index];
      const quantity = item.get('quantity')?.value || 0;
      const price = item.get('price')?.value || 0;
      const totalPrice = quantity * price;
    
      this.invproducts.controls[index].get("totalPrice")?.setValue( quantity * price)
      // console.log(this.invproducts.controls[index].get('name')?.value)
      this.updateInvoiceTotal()
      return totalPrice;
      
    }
    
    updateInvoiceTotal(): void {
      let overallTotal = 0;
      this.invproducts.controls.forEach((item: AbstractControl) => {
        const totalPrice = item.get('totalPrice')?.value || 0;
        overallTotal += totalPrice;
      });
    
      this.invoiceform.get('total')?.setValue(overallTotal);
      this.invoiceform.get('total')?.patchValue(overallTotal); // Use patchValue() here
    console.log(overallTotal)
    }
    searchItems(event: any, index: number): void {
      if (event && event.target) {
        const selectedName = event.target.value;
    
        // Find the selected item based on the name
        const selectedItem = this.items.find((item: { name: any; }) => item.name === selectedName);
    
        if (selectedItem) {
          // Update the price and id fields of the corresponding form group
          const formGroup = this.invproducts.controls[index] as FormGroup;
          formGroup.get('price')?.setValue(selectedItem.price);
          formGroup.get('id')?.setValue(selectedItem.id);
    
          // Update the total price based on quantity and new price
          this.calculateTotal(index);
        }
      }
    }
}
