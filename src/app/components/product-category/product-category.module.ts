import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryComponent } from './product-category.component';
import { Route, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ExpenseDetailsModule } from '../expense-details/expense-details.module';
// import { ExpenseDetailsComponent } from '../expense-details/expense-details.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
// import { SwiperModule } from "swiper/angular";
// import { SwiperModule } from 'ngx-swiper-wrapper';
import { DragDropModule } from '@angular/cdk/drag-drop';
// import { NguCarouselModule } from '@ngu/carousel';



const routes: Route[] = [
  {
    path: '',
    component: ProductCategoryComponent,
    // children: [
    //   // {
    //   //   path: ':id', component: ExpenseDetailsComponent
    //   //   ,
    //   // },
    // ]
  },

]



@NgModule({
  declarations: [
    ProductCategoryComponent,
    // ExpenseDetailsComponent
  ],
  imports: [
    CommonModule,
    // ExpenseDetailsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatIconModule,
    FormsModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    // NguCarouselModule,
    // SwiperModule,
    DragDropModule,
    RouterModule.forChild(routes),
  ]
})
export class ProductCategoryModule { }
