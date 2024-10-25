import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoComponent } from './video.component';
import { Route, RouterModule } from '@angular/router';
import { PlyrModule } from 'ngx-plyr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routes: Route[] = [
  {
    path: '', component: VideoComponent
  }
]

@NgModule({
  declarations: [
    VideoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    PlyrModule,
    MatProgressSpinnerModule
  ]
})
export class VideoModule { }
