import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
// import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { Route, RouterModule } from '@angular/router';
// import { FooterComponent } from '../footer/footer.component';

const routes: Route[] = [
  {
    path: '',
    component: HomeComponent
  },

]



@NgModule({
  declarations: [
    HomeComponent,
    // FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    // DashboardRoutingModule,
    MaterialModule
  ]
})
export class HomeModule { }
