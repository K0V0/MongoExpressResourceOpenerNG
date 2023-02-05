// angular imports
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

// my imports
import { RoutingModule } from './_base/modules/routing/routing.module';
import { AppComponent } from './app.component';
import { OptionsModule } from './options/options.module';
import { PopupModule } from './popup/popup.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // Angular modules
    BrowserModule,
    // My other modules
    RoutingModule,
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