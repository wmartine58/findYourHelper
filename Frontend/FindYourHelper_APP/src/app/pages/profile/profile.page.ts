import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { GooglemapsPage } from 'src/app/googlemaps/googlemaps.page';
import { Client } from 'src/app/models/client.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  client: Client = {
    uid: '',
    email: '',
    phone: '',
    photo: '',
    reference: '',
    name: '',
    ubication: null
  }

  constructor(
    public menuController: MenuController,
    // public firebaseauthService: FirebaseauthService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async addDirecction() {
    const ubication = this.client.ubication;
    let position = {
      lat: -2.898116,
      lng: -78.9995814999999
    };
    if (ubication !== null) {
      position = ubication;
    }
    const modalAdd = await this.modalController.create({
      component: GooglemapsPage,
      mode: 'ios',
      // swipeToClose: true,
      // ComponentProps: {position}
    });
    await modalAdd.present();
    const {data} = await modalAdd.onWillDismiss();
    if (data) {
      this.client.ubication = data.pos;
    }
  }

}
