import { Component, input } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { debugForm, DEFAULT_DEBUG_FIELDS, FormDebugField } from '../form-debug.util';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { combineLatest, switchMap } from 'rxjs';

@Component({
	selector: 'ngx-form-debug-display',
	standalone: true,
	imports: [AsyncPipe, JsonPipe],
	templateUrl: './form-debug-display.component.html',
	styleUrls: ['./form-debug-display.component.scss'],
})
export class FormDebugDisplayComponent {
	debugFields = input<FormDebugField[]>([...DEFAULT_DEBUG_FIELDS]);
	form = input.required<FormGroup>();

	debugData$ = combineLatest([toObservable(this.form), toObservable(this.debugFields)]).pipe(
		switchMap(([form, debugFields]) => debugForm(form, debugFields)),
	);
}
