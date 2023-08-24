import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgConfirmService } from 'ng-confirm-box';
import { ToastrService } from 'ngx-toastr';
import { ItemService } from 'src/app/services/item.service';
import { Router } from '@angular/router';
import { purchaseInvoicesService } from 'src/app/services/purchase-invoice.service';
import { Observable, of } from 'rxjs';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-purchase-invoice',
  templateUrl: './purchase-invoice.component.html',
  styleUrls: ['./purchase-invoice.component.css']
})
export class PurchaseInvoiceComponent {

  invoices:any
  items:any
  allInvoicesSum:any
  creator:any
  displayedColumns: string[] = [ 'تسجيل', 'اجمالى الفاتورة', 'الاصناف'];
  dataSource!: MatTableDataSource<any>;
  model:any;


  
constructor(private invoiceService:purchaseInvoicesService, private _dialog:MatDialog,private is:ItemService,private toastr:ToastrService
  ,private confirmService: NgConfirmService,private router:Router,private datePipe: DatePipe){}
ngAfterViewInit(): void {
  // this.dataSource.sort = this.sort
  // this.dataSource.paginator = this.paginator
}
ngOnInit(): void {
  this.getAllInvoices()



}

getAllInvoices(){
  this.invoiceService.getAll().subscribe((res:any)=>{
    this.invoices=res
    this.items=res[0].items
    this.allInvoicesSum=res.map((i: { fullPrice: any; })=>{return i.fullPrice})
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
  this.router.navigateByUrl("/editpinvoice/"+data)
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
filterInvoicesByDateRange(start: Date | null, end: Date | null): Observable<any[]> {  
  const filteredInvoices = this.invoices.filter((invoice: any) => {

    const invoiceDate = invoice.timeCreated; 
    return invoiceDate >= this.formatDate(start) && invoiceDate <= this.formatDate(end);
  });
  this.filteredInvoices=filteredInvoices
  console.log('Filtered invoices:', filteredInvoices);
  for(let i of filteredInvoices){

    for(let d of i.details){
      this.total+=d.totalPrice
    }
  }

  return of(filteredInvoices);
}
}
