import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgConfirmService } from 'ng-confirm-box';
import { ToastrService } from 'ngx-toastr';
import { InvoicesService } from 'src/app/services/invoices.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})

export class InvoicesComponent implements OnInit,AfterViewInit{
  
  invoices:any
  items:any
  allInvoicesSum:any
  allInvoicescost:any
  creator:any

  

  
constructor(private invoiceService:InvoicesService,private toastr:ToastrService
  ,private confirmService: NgConfirmService,private router:Router,private datePipe: DatePipe){}
ngAfterViewInit(): void {}


ngOnInit(): void {
  this.getAllInvoices()
}

getAllInvoices(){
  this.invoiceService.getAll().subscribe((res:any)=>{
    this.invoices=res
    this.items=res[0].items
    this.allInvoicesSum=res.map((i: { fullPrice: any; })=>{return i.fullPrice})
    this.allInvoicescost=res.map((i: { fullCost: any; })=>{return i.fullCost})
    this.creator=res.creator

  })
}
invoiceDelete(id:any){
  this.confirmService.showConfirm('مسح الفاتورة ؟',
  ()=>{
    this.invoiceService.deleteItem(id).subscribe({
      next: (res)=>{
        this.toastr.warning("تم مسح الفاتورة")
        this.getAllInvoices()
      }
      ,
      error: console.log
    }
    )
  },()=>{console.log("yes")})
}
editInvoice(data: any){
  this.router.navigateByUrl("/editinvoice/"+data)
}
range = new FormGroup({
  start: new FormControl<Date | null>(null),
  end: new FormControl<Date | null>(null),
});

formatDate(date: Date | null): any {
  return date ? this.datePipe.transform(date, 'dd/MM/yyyy, HH:mm:ss') : '';
}
filteredInvoices:any[]=[]
total:any=0
totalCost:any=0
profit:any=0
filterInvoicesByDateRange(start: Date | null, end: Date | null): Observable<any[]> {
  
    this.total=0
    this.totalCost=0
    this.profit=0
  

  
  const filteredInvoices = this.invoices.filter((invoice: any) => {
    const invoiceDate = invoice.timeCreated; 
    return invoiceDate >= this.formatDate(start) && invoiceDate <= this.formatDate(end);
  });
  this.filteredInvoices=filteredInvoices
  console.log('Filtered invoices:', filteredInvoices);
  for(let i of filteredInvoices){

    for(let d of i.details){
      this.total+=d.totalPrice
      this.totalCost+=d.totalCost
    }
  }
  this.profit=this.total-this.totalCost

  return of(filteredInvoices);
}



}
