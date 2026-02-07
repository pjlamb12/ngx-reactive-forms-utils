import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormDebugDisplayComponent } from './form-debug-display.component';
import { FormControl, FormGroup } from '@angular/forms';

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

	it('should update debugData when form changes', () => {
		const form = new FormGroup({ test: new FormControl('') });
		fixture.componentRef.setInput('form', form);
		fixture.detectChanges();

		form.setValue({ test: 'value' });

		// debugData update might be async due to RxJS/Effect timing?
		// Actually RxJS is sync here, but effect runs?
		// Effect runs, subscription happens.
		// Value changes emission is sync.
		// So debugData.set should be called synchronously IF debugForm is sync.
		expect(component.debugData()?.value).toEqual({ test: 'value' });
	});
});
