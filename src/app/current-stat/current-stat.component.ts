import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-stat',
  templateUrl: './current-stat.component.html',
  styleUrls: ['./current-stat.component.scss'],
})
export class CurrentStatComponent implements OnInit {
  
  
  async ngOnInit() {
    setTimeout(()=>{
      document.getElementById('content').innerHTML=document.getElementById('content').innerHTML ; 
    })
  }


constructor(){  }
  
}
