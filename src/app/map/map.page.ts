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
  Gouvernorats :any ; 
  markers : Array<any>  = new Array<any>(); 
  data : any; 
  stat : Array<any> = new Array<any>();; 
  date : string = new Date().getFullYear().toString()+'-'+(new Date().getMonth()+1).toString()+'-'+new Date().getDate().toString()   ; 
  constructor(private http : HttpClient) { }
  showMap(){
    this.map = new Map('myMap').setView([33.886917,9.537499],10);

    tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/light-v9',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.map);
  
    this.http.get('https://covid.tn/api/stats/cities/24/0 ').subscribe((data )=>{
      this.Gouvernorats = data ;
      this.Gouvernorats.data.forEach(element => {
      this.http.get('https://covid.tn/api/stats/city/'+element.id+'/2020-04-25').subscribe((res : any)=>{
       // console.log(res)
          this.stat.push({title :element.title , 
                          cases : res.data[0].cases , 
                          deaths : res.data[0].deaths 
        })
      })
    });
    
    })

    console.log(this.stat)

    this.http.get('https://thevirustracker.com/timeline/map-data.json').subscribe((data) => {
    this.data = data ;     
    this.data.forEach(async (element )  => {
      console.log(element)  ; 
        await  this.showMarker({lat : element.Lat , lon : element.Lon}) ; 
      });
    })
  }
  ngOnInit() {
    console.log(this.date)
    this.showMap() ; 
  }
  showMarker(cords){
    console.log(cords)
    let m = marker(cords) ; 
    m.addTo(this.map).bindPopup('hey im here');
  }



  getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}




}
