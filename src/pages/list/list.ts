import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { LoanDetailsPage } from '../loan-details/loan-details';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  public lists: any = [];
  private listParams: any = {};
  loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public restProvider: RestProvider, private toastCtrl: ToastController, public loadingCtrl: LoadingController) {
  }

  ngAfterViewInit() {
    this.storage.get('app-token').then((val) => {
      this.listParams['tk'] = val;
      this.listParams['appreq'] = "true";
      this.listParams['req'] = this.generate();
      this.getLoanlist();
    });

  }

  getLoanlist() {
    this.showLoading();
    this.restProvider.loanList(this.listParams).then((result: any) => {
      this.dismissLoading();
      if (result.success === "true") {
        this.dismissLoading();
        this.lists = result.data;
      } else {
        this.errorMsg(result.message);
      }

    }, (err) => {
      console.log(err);
    });

  }

  itemTapped(event, id) {
    this.navCtrl.push(LoanDetailsPage, { id: id });
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
