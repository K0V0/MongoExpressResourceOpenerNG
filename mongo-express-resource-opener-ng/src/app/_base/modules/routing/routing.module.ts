// angular imports
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// my imports
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
