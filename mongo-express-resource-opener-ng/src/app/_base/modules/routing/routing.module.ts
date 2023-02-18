// angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

// my imports
import { BackgroundComponent } from 'src/app/background/background.component';
import { OptionsComponent } from 'src/app/options/options.component';
import { PopupComponent } from '../../../popup/popup.component';

const routes: Routes = [
    {
      path: 'popup',
      component: PopupComponent
    },
    {
      path: 'options',
      component: OptionsComponent
    },
    {
      path: 'background',
      component: BackgroundComponent
    },
    {
      path: '**',
      component: PopupComponent
    },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    CommonModule
  ],
  exports: [
    RouterModule
  ]
})

export class RoutingModule { }
