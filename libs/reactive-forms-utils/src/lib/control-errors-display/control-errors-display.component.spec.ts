import { ControlErrorsDisplayComponent } from './control-errors-display.component';

describe('ControlErrorsDisplayComponent', () => {
	let component: ControlErrorsDisplayComponent;
	const mockErrorMessages = {};

	beforeEach(() => {
		component = new ControlErrorsDisplayComponent(mockErrorMessages);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
