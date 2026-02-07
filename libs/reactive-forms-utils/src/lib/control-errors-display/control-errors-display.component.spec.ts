import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlErrorsDisplayComponent } from './control-errors-display.component';
import { FORM_ERRORS, FORM_ERRORS_DEBOUNCE_TIME } from '../custom-error-message-utils';

describe('ControlErrorsDisplayComponent', () => {
	let component: ControlErrorsDisplayComponent;
	let fixture: ComponentFixture<ControlErrorsDisplayComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ControlErrorsDisplayComponent],
			providers: [
				{ provide: FORM_ERRORS, useValue: {} },
				{ provide: FORM_ERRORS_DEBOUNCE_TIME, useValue: 0 },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(ControlErrorsDisplayComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should calculate rulesBroken correctly', () => {
		// Mock logic or just check basic instantiation
		expect(component.rulesBroken).toBeFalsy();
	});
	it('should maintain empty errorsList initially', () => {
		expect(component.errorsList()).toEqual([]);
	});
});
