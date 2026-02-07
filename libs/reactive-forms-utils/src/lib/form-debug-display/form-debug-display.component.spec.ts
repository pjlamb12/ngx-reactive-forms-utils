import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormDebugDisplayComponent } from './form-debug-display.component';
import { FormGroup } from '@angular/forms';

describe('FormDebugDisplayComponent', () => {
	let component: FormDebugDisplayComponent;
	let fixture: ComponentFixture<FormDebugDisplayComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [FormDebugDisplayComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(FormDebugDisplayComponent);
		component = fixture.componentInstance;
		fixture.componentRef.setInput('form', new FormGroup({}));
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
