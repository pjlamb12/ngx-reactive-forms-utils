import { JsonPipe } from '@angular/common';
import { Component, effect, input, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debugForm, DEFAULT_DEBUG_FIELDS, FormDebugField, FormDebugValue } from '../form-debug.util';

@Component({
	selector: 'ngx-form-debug-display',
	standalone: true,
	imports: [JsonPipe],
	templateUrl: './form-debug-display.component.html',
	styleUrls: ['./form-debug-display.component.scss'],
})
export class FormDebugDisplayComponent {
	debugFields = input<FormDebugField[]>([...DEFAULT_DEBUG_FIELDS]);
	form = input.required<FormGroup>();

	debugData = signal<FormDebugValue | null>(null);

	constructor() {
		effect((onCleanup) => {
			const form = this.form();
			const debugFields = this.debugFields();

			const sub = debugForm(form, debugFields).subscribe((data) => this.debugData.set(data));

			onCleanup(() => sub.unsubscribe());
		});
	}
}
