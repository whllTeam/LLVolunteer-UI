import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifyMessageComponent } from './notify-message.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NotifyMessageComponent
  ],
  exports: [ NotifyMessageComponent]
})
export class NotifyMessageModule { }
