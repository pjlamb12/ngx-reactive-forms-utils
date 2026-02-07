import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DemoFormComponent } from './demo-form.component';

describe('DemoFormComponent', () => {
	let component: DemoFormComponent;
	let fixture: ComponentFixture<DemoFormComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DemoFormComponent],
			imports: [ReactiveFormsModule],
		}).compileComponents();

		fixture = TestBed.createComponent(DemoFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
