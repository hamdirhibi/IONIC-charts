import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public appPages = [
    {
      title: 'Bar Charts',
      url: '/home',
      icon: 'stats'
    },
    {
      title: 'Line Charts',
      url: '/line',
      icon: 'trending-up'
    },
    {
      title: 'Pie Charts',
      url: '/pie',
      icon: 'pie'
    },{
      title: 'MAPS',
      url: '/map',
      icon: 'map'
    }
    ,{
      title: 'Current',
      url: '/currentstate',
      icon: 'planet'
    }
    ,{
      title: 'Frame',
      url: '/frame',
      icon: 'planet'
    }
    ,{
      title: 'Frame 2',
      url: '/frame2',
      icon: 'planet'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
