import { Component, contentChild, effect, inject, input, signal } from '@angular/core';
import { NgControl } from '@angular/forms';
import { debounceTime, map, startWith } from 'rxjs';
import { CustomErrorMessages, FORM_ERRORS, FORM_ERRORS_DEBOUNCE_TIME } from '../custom-error-message-utils';

@Component({
	selector: 'ngx-control-errors-display',
	templateUrl: './control-errors-display.component.html',
	styleUrls: ['./control-errors-display.component.scss'],
	standalone: true,
	imports: [],
})
export class ControlErrorsDisplayComponent {
	containerClasses = input<string>('');
	errorClasses = input<string>('');
	rules = input<string[]>(['touched']);

	control = contentChild(NgControl);

	private _errors = inject(FORM_ERRORS);
	private _debounceTime = inject(FORM_ERRORS_DEBOUNCE_TIME);
	private _errorMessages: CustomErrorMessages = this._errors;

	get rulesBroken() {
		const control = this.control();
		return !!control && this.rules().every((rule) => control[rule as keyof NgControl]);
	}

	errorsList = signal<string[]>([]);

	constructor() {
		effect((onCleanup) => {
			const control = this.control();
			if (control) {
				const sub = control.statusChanges
					?.pipe(
						startWith(control.status),
						debounceTime(this._debounceTime),
						map(() => {
							const errors = control.errors;

							if (errors) {
								return Object.keys(errors).map((errorKey) => {
									const getError = this._errorMessages[errorKey];
									return getError ? getError(errors[errorKey]) : 'Unknown Error';
								});
							}
							return [];
						}),
					)
					.subscribe((errors) => this.errorsList.set(errors));

				onCleanup(() => sub?.unsubscribe());
			}
		});
	}
}
