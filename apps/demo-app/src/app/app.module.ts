import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsUtilsModule } from 'ngx-reactive-forms-utils';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

@NgModule({
	declarations: [AppComponent, NxWelcomeComponent],
	imports: [BrowserModule, ReactiveFormsModule, ReactiveFormsUtilsModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
