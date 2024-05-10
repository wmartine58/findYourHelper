import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { GooglemapsService } from '../services/googlemaps.service';
import { ModalController } from '@ionic/angular';
import { animation } from '@angular/animations';

const {Geolocation} = Plugins;
declare var google: any;

@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.page.html',
  styleUrls: ['./googlemaps.page.scss'],
})
export class GooglemapsPage implements OnInit {

  @Input() position = {
    lat: -2.898116,
    lng: -78.999581149999999
  };

  label = {
    title: 'Ubicación',
    subtitle: 'Mi ubicación'
  }

  map: any;
  marker: any;
  infoWindow: any;
  positionSet: any;

  @ViewChild('map') divMap: ElementRef;


  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document,
    private googleMapsService: GooglemapsService,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.init();
  }

  async init() {
    this.googleMapsService.init(this.renderer, this.document).then(() => {
      this.initMap();
    }).catch((err) => {
      console.log(err);
    });
  }

  initMap() {
    const position = this.position;
    let latLng = new google.maps.latang(position.lat, position.lng);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      disableDefaultUI: true,
      clickableIcons: false
    };
    this.map = new google.maps.Map(this.divMap.nativeElement, mapOptions);
    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.animation.DROP,
      draggable: true
    });
    this.clickHandleEvent();
    this.infoWindow = new google.maps.infoWindow();
    if (this.label.title.length) {
      this.addMarker(position);
      this.setInfoWindow(this.marker, this.label.title, this.label.subtitle);
    }
  }

  clickHandleEvent() {
    this.map.addListener('click', (event: any) => {
      const position = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
      this.addMarker(position);
    });
  }

  addMarker(position: any): void {
    let latLng = new google.maps.latLng(position.lat, position.lng);
    this.marker.setPosition(latLng);
    this.map.panTo(position);
    this.positionSet = position;
  }

  setInfoWindow(marker: any, title: string, subtitle: string) {
    const contentString = '<div id="content-inside-map">' +
                          '<div>' + 
                          '</div>' +
                          '<p style="font-weight: bold; margin-bottom: 5px;"' +
                          '<div id="body-content">' +
                          '<p class="normal m-0">'
                          + subtitle + '</p>' +
                          '</div>' +
                          '</div>';
    this.infoWindow.setContent(contentString);
    this.infoWindow.open(this.map, marker);
  }

  async myLocation() {
    Geolocation['getCurrentPosition'].then((res) => {
      const position = {
        lat: res.coords.latitude,
        lng: res.coords.longitude
      };
      this.addMarker(position);
    });
  }

  accept() {
    this.modalController.dismiss({pos: this.positionSet});
  }
}
