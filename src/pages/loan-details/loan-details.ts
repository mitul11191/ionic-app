import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular'; 3
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoanDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loan-details',
  templateUrl: 'loan-details.html',
})
export class LoanDetailsPage {

  private getDetailParams: any = {};
  public loanDetails: any = {};
  public prodId: number;
  loading;
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, private toastCtrl: ToastController, private storage: Storage, public loadingCtrl: LoadingController) {
    this.prodId = navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoanDetailsPage');
  }

  ngAfterViewInit() {
    this.storage.get('app-token').then((val) => {
      this.getDetailParams['tk'] = val;
      this.getDetailParams['appreq'] = true;
      this.getDetailParams['id'] = this.prodId;
      this.getDetailParams['req'] = this.generate();
      this.getLoanDetails(this.getDetailParams);
    });

  }

  getLoanDetails(params) {
    this.showLoading();
    console.log("params....", params);

    this.restProvider.loanDetail(params).then((result: any) => {
      if (result.success === "true") {
        this.dismissLoading();
        this.loanDetails = result.data;
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

  generate() {
    return Math.floor(Math.random() * 90000) + 10000;
  }

}
