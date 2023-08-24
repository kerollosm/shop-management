import {Component, ViewChild, AfterViewInit,OnInit} from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/shared/models/item.model';
// import { Pagination, SearchFilter } from 'ngx-pagination';


@Component({
  selector: 'app-items2',
  templateUrl: './items2.component.html',
  styleUrls: ['./items2.component.css']
})
export class Items2Component implements OnInit {
  displayedColumns: string[] =['تعديل', 'الكمية', 'التكلفة', 'السعر', 'الصنف'];
  rows!: Item[]
  columns = [ { name: 'quantity' },{ name: 'cost' },{ name: 'price' },{ prop: 'name' }];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  loadingIndicator = true;
  reorderable = true;
  p: number = 1
  filteredRows: Item[] = []; // Array to hold filtered items

  constructor(private itemService: ItemService) {
  }

  ngOnInit(): void {
    this.getAllItems()
    

  }

  ngAfterViewInit() {
    
   
}
getAllItems() {
  this.itemService.getAll().subscribe((item: Item[])=>{this.rows=item
    this.filteredRows=item
  console.log(item)
  }

  )

}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
  // Filter the rows based on the name property
  this.filteredRows = this.rows.filter(item => item.name.toLowerCase().includes(filterValue))
  console.log(this.filteredRows)
  ;
}
}
