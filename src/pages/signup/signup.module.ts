import { NgModule } from '@angular/core';
import { IonicPageModule, LoadingController } from 'ionic-angular';
import { SignupPage } from './signup';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
  ],
})
export class SignupPageModule { }
