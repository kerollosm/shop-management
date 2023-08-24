// import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/shared/models/item.model';
import { AddItemComponent } from './add-item/add-item.component';
import { ToastrService } from 'ngx-toastr';
import {Component, AfterViewInit,OnInit} from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})

export class ItemsComponent implements OnInit, AfterViewInit {
  items!: any[]
  totalPriceArr!: any
  totalPrice!: any
  totalCostArr!: any
  totalCost!: any
  totalQuantity!: any
  posts!:any
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  rows!: Item[]
  columns = [  { name: 'actions', sortable: false, canAutoResize: false },{ prop: 'quantity' },{ prop: 'cost' },{ prop: 'price' },{ prop: 'name' }];
  loadingIndicator = true;
  reorderable = true;
  p: number = 1
  filteredRows: Item[] = []; 


  constructor(private itemService: ItemService,
    private _dialog: MatDialog, private toastr: ToastrService) {


  }
  sumArray(arr: number[]): number {
    return arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }
  openAddItem() {
    const dealogRef = this._dialog.open(AddItemComponent)
    dealogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllItems()
        }
      }
    })
    // console.log(new Date().getMonth())
  }
  ngAfterViewInit(): void {
  
  }
  
  ngOnInit(): void {
    this.getAllItems()
  
  }
  getAllItems() {

    this.itemService.getAllsort().subscribe((res: Item[]) => {
      this.rows=res
      this.filteredRows=res
      this.totalPriceArr = res.map(i => { return i.price * i.quantity })
      this.totalCostArr = res.map(i => { return i.cost * i.quantity })
      this.totalQuantity = res.map(i => { return i.quantity })
      this.totalPrice = this.sumArray(this.totalPriceArr)
      this.totalCost = this.sumArray(this.totalCostArr)
      this.items=res.map(i=>{return i.name
      })
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    // Filter the rows based on the name property
    this.filteredRows = this.rows.filter(item => item.name.toLowerCase().includes(filterValue))
    console.log(this.filteredRows)
    ;
  }
  deleteItem(id: number) {
    this.itemService.deleteItem(id).subscribe({
      next: (res) => {
        this.toastr.warning('تم مسح المنتج')
        this.getAllItems()

      },
      error: console.log
    })
  }
  openEditForm(data: any) {
   const dealogRef= this._dialog.open(AddItemComponent, {
      data,
    })
    dealogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllItems()
        }
      }
    })
  }

}
