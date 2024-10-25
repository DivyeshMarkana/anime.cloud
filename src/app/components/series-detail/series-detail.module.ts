import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesDetailComponent } from './series-detail.component';
import { Route, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VideoComponent } from '../video/video.component';
import { PlyrModule } from 'ngx-plyr';


const routes: Route[] = [
  {
    path: '', component: SeriesDetailComponent,

    // children: [
    //   {
    //     path: 'video/:id',
    //     component: VideoComponent,
    //     data: { title: 'Product Details' }
    //   },
    // ],
  },
  {
    path: 'video/:id', component: VideoComponent
  },
]



@NgModule({
  declarations: [
    SeriesDetailComponent,
    VideoComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatProgressSpinnerModule,
    PlyrModule,
  ]
})
export class SeriesDetailModule { }
