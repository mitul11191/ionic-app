import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { OtpVarifyPage } from '../otp-varify/otp-varify'; 

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  @ViewChild('signUp') form: any;
  private user: any = {};
  loading;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, private toastCtrl: ToastController, public loadingCtrl: LoadingController) {    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  saveUser() {
    this.showLoading();
    this.restProvider.signUpusers(this.user, ).then((result: any) => {
      console.log("result", result);
      if (result.success === "true") {
        this.dismissLoading();
        this.form.reset();
        this.navCtrl.push(OtpVarifyPage);
      } else {
        this.dismissLoading();
        this.errorMsg(result.message);
      }
    }, (err) => { 
      console.log(err);
    });
  }

  errorMsg(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'ok'
    });
    toast.present();
  }

  showLoading() {
    if (!this.loading) {
      this.loading = this.loadingCtrl.create({
        content: 'Please Wait...'
      });
      this.loading.present();
    }
  }

  dismissLoading() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  }

}
