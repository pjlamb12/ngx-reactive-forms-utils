import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

describe('AppComponent', () => {
	let component: AppComponent;
	beforeEach(() => {
		component = new AppComponent();
	});

	it('should create the app', () => {
		expect(component).toBeTruthy();
	});
});
