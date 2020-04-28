import { Component, ViewChild, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  @ViewChild('barChart') barChart;
  @ViewChild('hrzBarChart') hrzBarChart;
  @ViewChild('hrzBarChart2') hrzBarChart2;
  @ViewChild('hrzBarChart3') hrzBarChart3;
  @ViewChild('hrzBarChart4') hrzBarChart4;
  @ViewChild('hrzBarChart5') hrzBarChart5;
  @ViewChild('hrzBarChart6') hrzBarChart6;
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
  hrzBars: any;
  hrzBars2: any;
  hrzBars3: any;
  hrzBars4: any;
  hrzBars5: any;
  hrzBars6: any;
  apiData: any;
  colorArray: any;

  ionViewDidEnter() {
    this.generateColorArray(8);
    this.createBarChart();
    this.createHrzBarChart()
    this.createHrzBarChart2()
    this.createHrzBarChart3()
    this.createHrzBarChart4()
    this.createHrzBarChart5()
  }

  fetchData() {
    const my_url = 'http://www.mocky.io/v2/5d28754a2c000066003eda63?mocky-delay=3000ms'
    this.http.get(my_url).subscribe(data => {
      console.log(data);
      this.apiData = data;
      this.createHrzBarChart6();
    })
  }

  generateColorArray(num) {
    this.colorArray = [];
    for (let i = 0; i < num; i++) {
      this.colorArray.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }
  }

  async createBarChart() {
    this.bars = await new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.titles,
        //  labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: [{
          label: 'Viewers in millions',
          data : this.cases , 

          //  data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
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

  createHrzBarChart() {
    this.hrzBars = new Chart(this.hrzBarChart.nativeElement, {
      type: 'horizontalBar',
      data: {
        labels: this.deaths,
        //  labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: [{
          label: 'Viewers in millions',
          data : this.cases , 
          //   data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
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

  createHrzBarChart2() {
    let ctx = this.hrzBarChart2.nativeElement
    ctx.height = 400;
    this.hrzBars2 = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: this.titles,

    //    labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: [{
          label: 'Viewers in millions',
          data : this.cases  , 
          //   data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          xAxes: [{
            barPercentage: 0.9,
            gridLines: {
              offsetGridLines: true
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  createHrzBarChart3() {
    let ctx = this.hrzBarChart3.nativeElement
    ctx.height = 400;
    this.hrzBars3 = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: this.titles,

        //labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: [{
          label: 'Viewers in millions',
          data: this.deaths,
          //  data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
          backgroundColor: this.colorArray, // array should have same number of elements as number of dataset
          borderColor: this.colorArray,// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          xAxes: [{
            barPercentage: 0.9,
            gridLines: {
              offsetGridLines: true
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  createHrzBarChart4() {
    let ctx = this.hrzBarChart4.nativeElement
    ctx.height = 400;
    this.hrzBars4 = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels : this.titles ,
        //   labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: [{
          label: 'Online viewers in millions',
          data : this.cases , 
          //    data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
          backgroundColor: 'rgb(245, 229, 27)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(245, 229, 27)',// array should have same number of elements as number of dataset
          borderWidth: 1
        },
        {
          label: 'Offline viewers in millions',
          data: [1.5, 2.8, 3, 3.9, 4.9, 5.5, 7, 12],
          backgroundColor: 'rgb(63, 195, 128)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(63, 195, 128)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          xAxes: [{
            barPercentage: 0.9,
            gridLines: {
              offsetGridLines: true
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  createHrzBarChart5() {
    let ctx = this.hrzBarChart5.nativeElement
    ctx.height = 400;
    this.hrzBars5 = new Chart(ctx, {
      type: 'bar',
      data: {
        labels : this.titles , 
        //  labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: [{
          label: 'Online viewers in millions',
          data : this.deaths , 
          //    data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
          backgroundColor: 'rgb(245, 229, 27)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(245, 229, 27)',// array should have same number of elements as number of dataset
          borderWidth: 1
        },
        {
          label: 'Offline viewers in millions',
          data: [1.5, 2.8, 3, 3.9, 4.9, 5.5, 7, 12],
          backgroundColor: 'rgb(63, 195, 128)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(63, 195, 128)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          xAxes: [{
            barPercentage: 0.9,
            gridLines: {
              offsetGridLines: true
            },
            stacked: true
          }],
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

  createHrzBarChart6() {
    let ctx = this.hrzBarChart6.nativeElement
    ctx.height = 400;
    this.hrzBars6 = new Chart(ctx, {
      type: 'bar',
      data: {
        labels : this.titles , 

//        labels: this.apiData && this.apiData.labels,
        datasets: [{
          label: 'Online viewers in millions',
          data : this.cases , 
          //  data: this.apiData && this.apiData.values,
          backgroundColor: 'rgb(245, 229, 27)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(245, 229, 27)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          xAxes: [{
            barPercentage: 0.9,
            gridLines: {
              offsetGridLines: true
            },
            stacked: true
          }],
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
