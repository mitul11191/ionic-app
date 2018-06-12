import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ListPage } from '../list/list';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
  private user: any = {};
  loading;

  @ViewChild('loginForm') form: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController, private storage: Storage) {

  }

  ngOnInit(){
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginApp() {

    this.showLoading();

    this.restProvider.loginApp(this.user).then((result: any) => {
      if (result.success === "true") {
        this.dismissLoading();
        this.storage.set('app-token', result.data.token);
        this.navCtrl.push(ListPage);
        this.form.reset();
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
