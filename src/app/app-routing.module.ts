import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CurrentStatComponent } from './current-stat/current-stat.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'line',
    loadChildren: './line/line.module#LinePageModule'
  },
  {
    path: 'pie',
    loadChildren: './pie/pie.module#PiePageModule'
  },
  { path: 'map', loadChildren: './map/map.module#MapPageModule' }
  ,
  { path: 'currentstate', component : CurrentStatComponent },
  { path: 'frame', loadChildren: './frame/frame.module#FramePageModule' },
  { path: 'frame2', loadChildren: './frame2/frame2.module#Frame2PageModule' }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
