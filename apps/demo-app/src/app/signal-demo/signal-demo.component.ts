import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ControlErrorsDisplayComponent, formStateSignal } from '../../../../../libs/reactive-forms-utils/src/index';

@Component({
	selector: 'app-signal-demo',
	templateUrl: './signal-demo.component.html',
	standalone: false,
})
export class SignalDemoComponent {
	private fb = inject(FormBuilder);

	form = this.fb.group({
		name: ['test', [Validators.required, Validators.minLength(3)]],
	});

	nameState = formStateSignal(this.form.get('name')!);
}
