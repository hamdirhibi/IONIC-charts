import { Component, ViewChild, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-line',
  templateUrl: 'line.page.html',
  styleUrls: ['line.page.scss'],
})
export class LinePage implements OnInit {
  @ViewChild('lineChart') lineChart;
  @ViewChild('hrzLineChart') hrzLineChart;
  @ViewChild('hrzLineChart2') hrzLineChart2;
  @ViewChild('hrzLineChart3') hrzLineChart3;
  lines: any;
  hrzLines: any;
  hrzLines2: any;
  hrzLines3: any;
  colorArray: any;
  data : Array<any> ; 
  confirmed : Array<number > =  new Array<number>() ;
  dates : Array<string > =  new Array<string>() ;

  constructor(private http: HttpClient){

  }
  ngOnInit(){
    this.http.get('https://api.covid19api.com/live/country/tunisia').subscribe((data:any)=>{
      this.data = data ; 
      this.data.forEach(elt=>{
        this.confirmed.push(elt.Confirmed) ; 
        this.dates.push(elt.Date) ; 
        //console.log(elt)
      })
    })
    
  }

  ionViewDidEnter() {
    this.createAreaChart();
    this.createSimpleLineChart()
    this.createGroupLineChart()
    this.createHrzLineChart3()
  }

  createAreaChart() {
    this.lines = new Chart(this.lineChart.nativeElement, {
      type: 'line',
      data: {
       // labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        labels : this.dates , 
        datasets: [{
          label: 'Viewers in millions',
          data : this.confirmed , 
          //   data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
          backgroundColor: 'rgb(38, 194, 129)',
          borderColor: 'rgb(38, 194, 129)',
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

  createSimpleLineChart() {
    this.hrzLines = new Chart(this.hrzLineChart.nativeElement, {
      type: 'line',
      data: {
       // labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
       labels : this.dates , 
       datasets: [{
          label: 'Viewers in millions',
          data : this.confirmed , 

//          data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgb(38, 194, 129)',
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

  createGroupLineChart() {
    this.hrzLines2 = new Chart(this.hrzLineChart2.nativeElement, {
      type: 'line',
      data: {
        labels : this.dates , 

        // labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: [{
          label: 'Online viewers in millions',
//        data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
          data : this.confirmed , 
            
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgb(38, 194, 129)',
          borderWidth: 1
        },
        {
          label: 'Offline viewers in millions',
          data: [1.5, 2.8, 3, 4.9, 4.9, 5.5, 7, 12],
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgb(242, 38, 19)',
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

  createHrzLineChart3() {
    let ctx = this.hrzLineChart3.nativeElement
    ctx.height = 400;
    this.hrzLines3 = new Chart(ctx, {
      type: 'line',
      data: {
     //   labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
     labels : this.dates , 
 
     datasets: [{
          label: 'Online viewers in millions',
         // data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
         data : this.confirmed , 

         backgroundColor: 'rgb(242, 38, 19)',
          borderColor: 'rgb(242, 38, 19)',
          borderWidth: 1
        },
        {
          label: 'Offline viewers in millions',
     //     data: [1.5, 2.8, 3, 4.9, 4.9, 5.5, 7, 12],
     data : this.confirmed , 
  
     backgroundColor: 'rgb(38, 194, 129)',
          borderColor: 'rgb(38, 194, 129)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            stacked: true
          }]
        }
      }
    });
  }
}
