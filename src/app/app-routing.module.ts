import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuard } from './shared/auth.guard';
// import { ContactsComponent } from './components/contacts/contacts.component';

const routes: Routes = [
  // {
  //   path: '', redirectTo: 'home', pathMatch: 'full'
  // },
  // {
  //   path: ':id', loadChildren: () => import('./components/expense-details/expense-details.module').then(m => m.ExpenseDetailsModule)
  // },
  // {
  //   path: '', loadChildren: () => import('./components/product-category/product-category.module').then(m => m.ProductCategoryModule)
  // },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: ':id', loadChildren: () => import('./components/series-detail/series-detail.module').then(m => m.SeriesDetailModule)
      },
      {
        path: '', loadChildren: () => import('./components/product-category/product-category.module').then(m => m.ProductCategoryModule)
      },
   
      // {
      //   path: 'products', loadChildren: () => import('./components/products/products.module').then(m => m.ProductsModule)
      // },
    ],
    // canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    // children: [
    //   {
    //     path: 'category', loadChildren: () => import('./components/product-category/product-category.module').then(m => m.ProductCategoryModule)
    //   }
    // ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
