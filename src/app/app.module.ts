import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SetupComponent } from './setup/setup.component';
import { DieComponent } from './die/die.component';
import { DistributionComponent } from './distribution/distribution.component';
import { BarComponent } from './bar/bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatIconModule} from '@angular/material/icon'; 

@NgModule({
  declarations: [
    AppComponent,
    SetupComponent,
    DieComponent,
    DistributionComponent,
    BarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatFormFieldModule,
	MatInputModule,
	MatExpansionModule,
	MatButtonModule,
	MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
