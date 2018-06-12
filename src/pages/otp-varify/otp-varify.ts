import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { LoginPage } from '../login/login';


/**
 * Generated class for the OtpVarifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otp-varify',
  templateUrl: 'otp-varify.html',
})
export class OtpVarifyPage {
  // private otp: any;
  private params = { "id": '2069', "otp": '125955' }
  public loading;

  @ViewChild('otpForm') form: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, private toastCtrl: ToastController, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtpVarifyPage');
  }

  submitOtp() {
    this.showLoading();

    this.restProvider.submitOTP(this.params).then((result: any) => {
      if (result.success === "true") {
        this.dismissLoading();
        this.navCtrl.push(LoginPage);
        this.form.reset();
      } else {
        this.dismissLoading();
        this.errorMsg(result.message);
        this.navCtrl.push(LoginPage);
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
