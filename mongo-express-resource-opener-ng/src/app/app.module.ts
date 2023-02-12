// angular imports
import { HashLocationStrategy, LocationStrategy, CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// my imports
import { AppComponent } from './app.component';
import { OptionsModule } from './options/options.module';
import { PopupModule } from './popup/popup.module';
import { BaseModule } from './_base/base.module';
import { RoutingModule } from './_base/modules/routing/routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // Angular modules
    CommonModule,
    BrowserModule,
    // My other modules
    RoutingModule,
    BaseModule,
    // Extension pages
    PopupModule,
    OptionsModule
  ],
  providers: [
    // This is needed because the manifest loads the index.html file, followed by a #,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
