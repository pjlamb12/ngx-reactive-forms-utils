import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlErrorsDisplayComponent } from './control-errors-display.component';

describe('ControlErrorsDisplayComponent', () => {
	let component: ControlErrorsDisplayComponent;
	let fixture: ComponentFixture<ControlErrorsDisplayComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ControlErrorsDisplayComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ControlErrorsDisplayComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
