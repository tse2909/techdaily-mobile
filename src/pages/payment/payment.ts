import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../pages';
/**
 * Generated class for the Payment page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class Payment {
  detailOrder;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let data =this.navParams.get('res');
    this.detailOrder = JSON.parse(data.payload);
    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Payment');
  }
  return(){
    this.navCtrl.setRoot(HomePage);
  }
}
