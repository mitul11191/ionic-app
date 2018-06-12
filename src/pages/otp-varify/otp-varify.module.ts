import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OtpVarifyPage } from './otp-varify';

@NgModule({
  declarations: [
    OtpVarifyPage,
  ],
  imports: [
    IonicPageModule.forChild(OtpVarifyPage),
  ],
})
export class OtpVarifyPageModule {}
