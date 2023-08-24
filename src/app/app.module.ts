import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ItemsComponent } from './components/pages/items/items.component';
import {DataTablesModule} from 'angular-datatables';
import { InvoicesComponent } from './components/pages/invoices/invoices.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModel } from 'src/material.model';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './dashboard/register/register.component';
import { LoginComponent } from './dashboard/login/login.component';
import { UpdatepopupComponent } from './shared/updatepopup/updatepopup.component';
import { AddItemComponent } from './components/pages/items/add-item/add-item.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown'
import { NgSelectModule } from '@ng-select/ng-select';
import { CreateInvoiceComponent } from './components/pages/create-invoice/create-invoice.component';
import { NgConfirmModule } from 'ng-confirm-box';
import { CreatePurchaseInvoiceComponent } from './components/pages/create-purchase-invoice/create-purchase-invoice.component';
import { PurchaseInvoiceComponent } from './components/pages/purchase-invoice/purchase-invoice.component';
import { AllInvoicesComponent } from './components/pages/all-invoices/all-invoices.component';
import { Items2Component } from './components/pages/items2/items2.component';
import {NgIf, DatePipe} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { EmployeesComponent } from './components/pages/employees/employees.component';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateEmployeeComponent } from './components/pages/employees/create-employee/create-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ItemsComponent,
    InvoicesComponent,
    RegisterComponent,
    LoginComponent,
    UpdatepopupComponent,
    AddItemComponent,
    CreateInvoiceComponent,
    CreatePurchaseInvoiceComponent,
    PurchaseInvoiceComponent,
    AllInvoicesComponent,
    Items2Component,
    EmployeesComponent,
    CreateEmployeeComponent,
    
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    BrowserAnimationsModule,
    MaterialModel,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatFormFieldModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule,
    NgConfirmModule,
    DatePipe,
    NgIf,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    DateRangePickerModule,
    NgxDatatableModule,
    NgxPaginationModule
    
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
