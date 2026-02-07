import { FormBuilder } from '@angular/forms';
import { DemoFormComponent } from './demo-form.component';
describe('DemoFormComponent', () => {
	let component: DemoFormComponent;
	let mockFormBuilder = new FormBuilder();
	beforeEach(async () => {
		component = new DemoFormComponent(mockFormBuilder);
	});
	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
