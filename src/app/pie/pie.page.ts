import { Component, ViewChild, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pie',
  templateUrl: 'pie.page.html',
  styleUrls: ['pie.page.scss'],
})
export class PiePage implements OnInit{
  @ViewChild('pieChart') pieChart;
  @ViewChild('dnChart') dnChart;
  //http://www.mocky.io/v2/5d286fe02c000066003eda49

  Gouvernorats :any ; 
  data : any; 
  stat : Array<any> = new Array<any>();; 
  date : string = new Date().getFullYear().toString()+'-'+(new Date().getMonth()+1).toString()+'-'+new Date().getDate().toString()   ; 
  titles : Array<string > =  new Array<string>() ;
  cases : Array<number > =  new Array<number>() ;
  deaths : Array<number > =  new Array<number>() ;

  constructor(private http : HttpClient) { }

  ngOnInit(){
    this.http.get('https://covid.tn/api/stats/cities/24/0 ').subscribe((data )=>{
      this.Gouvernorats = data ;
      this.Gouvernorats.data.forEach(element => {
      this.http.get('https://covid.tn/api/stats/city/'+element.id+'/2020-04-25').subscribe((res : any)=>{
       // console.log(res)
        this.titles.push(element.title) ; 
        this.cases.push(res.data[0].cases) ; 
        this.deaths.push(res.data[0].deaths) ; 
  
        //   this.stat.push({title :element.title , 
        //                   cases : res.data[0].cases , 
        //                   deaths : res.data[0].deaths 
        // })
      })
    });
    
    })
   
    console.log(this.cases)



  }

  bars: any;
  hrzPies: any;
  dn: any;
  colorArray: any;

  ionViewDidEnter() {
    this.http.get('https://thevirustracker.com/free-api?countryTimeline=TN').subscribe(data=> {
      console.log(data)
    })
    this.generateColorArray(24);
    this.createPieChart();
    this.createDnChart();
  }

  generateColorArray(num) {
    this.colorArray = [];
    for (let i = 0; i < num; i++) {
      this.colorArray.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }
  }

  createPieChart() {
    this.bars = new Chart(this.pieChart.nativeElement, {
      type: 'pie',
      data: {
        labels  : this.titles ,  
        //  labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: [{
          label: 'Viewers in millions',
          data : this.cases,
          //  data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
          backgroundColor: this.colorArray, // array should have same number of elements as number of dataset
          borderColor: this.colorArray,// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  createDnChart() {
    this.dn = new Chart(this.dnChart.nativeElement, {
      type: 'doughnut',
      circumference: Math.PI,
      data: {
        labels  : this.titles ,  

//        labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: [{
          label: 'Viewers in millions',
          data : this.cases , 
          //  data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
          backgroundColor: this.colorArray, // array should have same number of elements as number of dataset
          borderColor: this.colorArray,// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
