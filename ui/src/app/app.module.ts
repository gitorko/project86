import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RestService } from './services/rest.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChartsModule } from 'ng2-charts';
import {CheckboxFilterComponent} from "./components/filter/checkbox-filter.component";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavbarComponent,
        CheckboxFilterComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ClarityModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ChartsModule,
    ],
    providers: [RestService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
