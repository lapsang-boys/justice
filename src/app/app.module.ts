import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SetupComponent } from './setup/setup.component';
import { DieComponent } from './die/die.component';
import { DistributionComponent } from './distribution/distribution.component';

@NgModule({
  declarations: [
    AppComponent,
    SetupComponent,
    DieComponent,
    DistributionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
