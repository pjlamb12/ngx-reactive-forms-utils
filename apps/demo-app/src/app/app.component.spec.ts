import { AppComponent } from './app.component';

describe('AppComponent', () => {
	let component: AppComponent;
	beforeEach(() => {
		component = new AppComponent();
	});
	it('should create the app', () => {
		expect(component).toBeTruthy();
	});
});
