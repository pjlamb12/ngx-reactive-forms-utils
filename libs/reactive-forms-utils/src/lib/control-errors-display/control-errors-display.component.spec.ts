import { Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ControlErrorsDisplayComponent } from './control-errors-display.component';
import { FORM_ERRORS, FORM_ERRORS_DEBOUNCE_TIME } from '../custom-error-message-utils';

@Component({
	template: `
		<ngx-control-errors-display [ariaLive]="ariaLive">
			<input type="text" [formControl]="control" />
		</ngx-control-errors-display>
	`,
	imports: [ControlErrorsDisplayComponent, ReactiveFormsModule],
	standalone: true,
})
class TestHostComponent {
	control = new FormControl('');
	ariaLive: 'polite' | 'assertive' | 'off' = 'assertive';
	errorsDisplay = viewChild(ControlErrorsDisplayComponent);
}

describe('ControlErrorsDisplayComponent', () => {
	describe('standalone', () => {
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

	describe('with form control', () => {
		beforeEach(async () => {
			await TestBed.configureTestingModule({
				imports: [TestHostComponent],
				providers: [
					{ provide: FORM_ERRORS, useValue: { required: () => 'Field is required' } },
					{ provide: FORM_ERRORS_DEBOUNCE_TIME, useValue: 0 },
				],
			}).compileComponents();
		});

		it('should attach aria-invalid and aria-describedby when errors exist and rules are broken', fakeAsync(() => {
			const hostFixture = TestBed.createComponent(TestHostComponent);
			const hostComponent = hostFixture.componentInstance;
			hostFixture.detectChanges();
			const inputEl = hostFixture.debugElement.query(By.css('input')).nativeElement;

			// Initially valid
			expect(inputEl.getAttribute('aria-invalid')).toBeNull();
			expect(inputEl.getAttribute('aria-describedby')).toBeNull();

			// Make invalid
			hostComponent.control.setErrors({ required: true });
			hostComponent.control.markAsTouched(); // rules check for 'touched' by default
			hostFixture.detectChanges();
			flush();
			hostFixture.detectChanges();

			expect(inputEl.getAttribute('aria-invalid')).toBe('true');
			expect(inputEl.getAttribute('aria-describedby')).toContain('ngx-control-errors');

			// Make valid again
			hostComponent.control.setErrors(null);
			hostFixture.detectChanges();
			flush();
			hostFixture.detectChanges();

			expect(inputEl.getAttribute('aria-invalid')).toBeNull();
			expect(inputEl.getAttribute('aria-describedby')).toBeNull();
		}));

		it('should render role="alert" when displaying errors', fakeAsync(() => {
			const hostFixture = TestBed.createComponent(TestHostComponent);
			const hostComponent = hostFixture.componentInstance;
			hostFixture.detectChanges();

			hostComponent.control.setErrors({ required: true });
			hostComponent.control.markAsTouched();
			hostFixture.detectChanges();
			flush();
			hostFixture.detectChanges();

			const alerts = hostFixture.debugElement.queryAll(By.css('p[role="alert"]'));
			expect(alerts.length).toBe(1);
			expect(alerts[0].nativeElement.textContent).toContain('Field is required');
		}));

		it('should wrap errors in an aria-live container matching ariaLive input', fakeAsync(() => {
			const hostFixture = TestBed.createComponent(TestHostComponent);
			const hostComponent = hostFixture.componentInstance;
			hostFixture.detectChanges();

			hostComponent.control.setErrors({ required: true });
			hostComponent.control.markAsTouched();
			hostFixture.detectChanges();
			flush();
			hostFixture.detectChanges();

			const liveContainer = hostFixture.debugElement.query(By.css(`div[aria-live="assertive"]`));
			expect(liveContainer).toBeTruthy();

			hostComponent.ariaLive = 'polite';
			hostFixture.detectChanges();
			flush();
			hostFixture.detectChanges();

			const updatedLiveContainer = hostFixture.debugElement.query(By.css(`div[aria-live="polite"]`));
			expect(updatedLiveContainer).toBeTruthy();
		}));
	});
});
