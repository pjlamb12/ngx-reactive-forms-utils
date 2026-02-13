import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ControlErrorsDisplayComponent, FormDebugDisplayComponent } from 'ngx-reactive-forms-utils';

import { AppComponent } from './app.component';
import { DemoFormComponent } from './demo-form/demo-form.component';
import { SignalDemoComponent } from './signal-demo/signal-demo.component';

@NgModule({
	declarations: [AppComponent, DemoFormComponent, SignalDemoComponent],
	imports: [BrowserModule, ReactiveFormsModule, ControlErrorsDisplayComponent, FormDebugDisplayComponent],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
