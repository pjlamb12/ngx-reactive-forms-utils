import { ControlErrorsDisplayComponent } from './control-errors-display.component';
describe('ControlErrorsDisplayComponent', () => {
	let component: ControlErrorsDisplayComponent;
	const mockErrorMessages = {};
	const mockDebounceTime = 0;
	beforeEach(() => {
		component = new ControlErrorsDisplayComponent(mockErrorMessages, mockDebounceTime);
	});
	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
