import { Component, OnInit } from '@angular/core';
import { Map,tileLayer, marker } from 'leaflet'
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map : Map ; 
  
  markers : Array<any>  = new Array<any>(); 
  data : any; 
  constructor(private http : HttpClient) { }
  showMap(){

    this.map = new Map('myMap').setView([33.886917,9.537499],10);
    tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(this.map);
    this.http.get('https://thevirustracker.com/timeline/map-data.json').subscribe((data) => {
    this.data = data ;     
    this.data.forEach(async (element )  => {
      console.log(element)  ; 
        await  this.showMarker({lat : element.Lat , lon : element.Lon}) ; 
      });
    })

  }
  ngOnInit() {
    
    this.showMap() ; 

  }
  showMarker(cords){
    console.log(cords)
    let m = marker(cords) ; 
    m.addTo(this.map).bindPopup('hey im here');
  }
}
