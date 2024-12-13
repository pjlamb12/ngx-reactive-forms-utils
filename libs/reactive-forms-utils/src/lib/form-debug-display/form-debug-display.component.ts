import { Component, Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debugForm, DEFAULT_DEBUG_FIELDS, FormDebugField, FormDebugValue } from '../form-debug.util';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { EMPTY, Observable } from 'rxjs';

@Component({
	selector: 'ngx-form-debug-display',
	standalone: true,
	imports: [AsyncPipe, JsonPipe],
	templateUrl: './form-debug-display.component.html',
	styleUrls: ['./form-debug-display.component.scss'],
})
export class FormDebugDisplayComponent {
	@Input() debugFields: FormDebugField[] = [...DEFAULT_DEBUG_FIELDS];
	@Input({ required: true }) form!: FormGroup; // No need for getter/setter
	public debugData$!: Observable<FormDebugValue | typeof EMPTY>;

	ngOnChanges(changes: SimpleChanges) {
		if (changes['form'] || changes['debugFields']) {
			if (this.form) {
				this.debugData$ = debugForm(this.form, this.debugFields);
			}
		}
	}
}
