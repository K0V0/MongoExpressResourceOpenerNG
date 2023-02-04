// angular imports
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

// my imports
import { PopupComponent } from '../../../popup/popup.component';
import { OptionsComponent } from 'src/app/options/options.component';
import { BackgroundComponent } from 'src/app/background/background.component';

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
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class RoutingModule { }
