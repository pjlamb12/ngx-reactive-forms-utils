import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
	ControlErrorsDisplayComponent,
	FormDebugDisplayComponent,
	ReactiveFormsUtilsModule,
} from 'ngx-reactive-forms-utils';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { DemoFormComponent } from './demo-form/demo-form.component';

@NgModule({
	declarations: [AppComponent, NxWelcomeComponent, DemoFormComponent],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		ReactiveFormsUtilsModule,
		ControlErrorsDisplayComponent,
		FormDebugDisplayComponent,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
