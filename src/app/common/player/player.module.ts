import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PlayerComponent } from './player.component';
import { PlyrModule } from 'ngx-plyr';



@NgModule({
  declarations: [
    PlayerComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    PlyrModule,
    MatProgressSpinnerModule
  ]
})
export class PlayerModule { }
