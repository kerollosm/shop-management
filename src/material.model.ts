import { NgModule } from "@angular/core";
import{MatInputModule} from "@angular/material/input";
import{MatSelectModule} from "@angular/material/select";
import{MatCardModule} from "@angular/material/card";
import{MatRadioModule} from "@angular/material/radio";
import{MatCheckboxModule} from "@angular/material/checkbox";
import{MatTableModule} from "@angular/material/table";
import{MatPaginatorModule} from "@angular/material/paginator";
import{MatSortModule} from "@angular/material/sort";
import{MatDialogModule} from "@angular/material/dialog";
import{MatButtonModule} from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatBadgeModule} from '@angular/material/badge';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatFormFieldModule} from '@angular/material/form-field';

import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
    exports: [
        MatInputModule,
        MatSelectModule,
        MatCardModule,
        MatRadioModule,
        MatCheckboxModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatTooltipModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatDatepickerModule
    ]
})



export class MaterialModel{}