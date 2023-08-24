import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './components/pages/items/items.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './dashboard/login/login.component';
import { RegisterComponent } from './dashboard/register/register.component';
import { InvoicesComponent } from './components/pages/invoices/invoices.component';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './services/auth.service';
import { CreateInvoiceComponent } from './components/pages/create-invoice/create-invoice.component';
import { CreatePurchaseInvoiceComponent } from './components/pages/create-purchase-invoice/create-purchase-invoice.component';
import { PurchaseInvoiceComponent } from './components/pages/purchase-invoice/purchase-invoice.component';
import { AllInvoicesComponent } from './components/pages/all-invoices/all-invoices.component';
import { Items2Component } from './components/pages/items2/items2.component';
import { EmployeesComponent } from './components/pages/employees/employees.component';

const routes: Routes = [
  {path:"",component:HomeComponent,canActivate:[AuthGuard]},
  {path:"inventory",component:ItemsComponent,canActivate:[AuthGuard]},
  {path:"inventory2",component:Items2Component,canActivate:[AuthGuard]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"all-invoices",component:AllInvoicesComponent,canActivate:[AuthGuard]},
  {path:"invoices",component:InvoicesComponent,canActivate:[AuthGuard]},
  {path:"purchase-invoices",component:PurchaseInvoiceComponent,canActivate:[AuthGuard]},
  {path:"create",component:CreateInvoiceComponent},
  {path:"create-purchase",component:CreatePurchaseInvoiceComponent},
  {path:"editinvoice/:data",component:CreateInvoiceComponent},
  {path:"editpinvoice/:data",component:CreatePurchaseInvoiceComponent},
  {path:'employees',component:EmployeesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  constructor(private authService:AuthService){

  }
}
