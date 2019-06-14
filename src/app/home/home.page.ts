import { Component } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [
    AndroidPermissions
  ]
})
export class HomePage {

  constructor(
  private androidPermissions: AndroidPermissions,
  private navCtrl: NavController
  ) {
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
    //   result => this.navCtrl.navigateForward('/story')
    //   , err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    // );
    this.navCtrl.navigateBack('/story');
  }

}
