import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DatePickerNgmodel } from './date-picker-ngmodel';
import { DatePickerReactiveForms } from './date-picker-reactive-forms';
import { DatePickerDivHostElement } from './date-picker-div-host-element';
import { DatePickerInline} from './date-picker-inline';
import { AngularMyDatePickerDirective } from '../../projects/angular-mydatepicker/src/public-api';

@NgModule({
  declarations: [
    AppComponent, DatePickerNgmodel, DatePickerReactiveForms, DatePickerDivHostElement, DatePickerInline
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, FormsModule, AngularMyDatePickerDirective
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
