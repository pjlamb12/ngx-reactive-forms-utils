import { AfterContentInit, Component, ContentChild, inject, input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable, debounceTime, map, startWith } from 'rxjs';
import { CustomErrorMessages, FORM_ERRORS, FORM_ERRORS_DEBOUNCE_TIME } from '../custom-error-message-utils';
import { AsyncPipe } from '@angular/common';

@Component({
	selector: 'ngx-control-errors-display',
	templateUrl: './control-errors-display.component.html',
	styleUrls: ['./control-errors-display.component.scss'],
	standalone: true,
	imports: [AsyncPipe],
})
export class ControlErrorsDisplayComponent implements AfterContentInit {
	containerClasses = input<string>('');
	errorClasses = input<string>('');
	rules = input<string[]>(['touched']);

	@ContentChild(NgControl, { static: true }) control!: NgControl;

	errorsList$: Observable<string[]> | undefined;

	private _errors = inject(FORM_ERRORS);
	private _debounceTime = inject(FORM_ERRORS_DEBOUNCE_TIME);
	private _errorMessages: CustomErrorMessages = this._errors;

	get rulesBroken() {
		return !!this.control && this.rules().every((rule) => this.control[rule as keyof NgControl]);
	}

	ngAfterContentInit() {
		if (this.control) {
			this.errorsList$ = this.control.statusChanges?.pipe(
				startWith(this.control.status),
				debounceTime(this._debounceTime),
				map(() => {
					const errors = this.control.errors;

					if (errors) {
						return Object.keys(errors).map((errorKey) => {
							const getError = this._errorMessages[errorKey];
							return getError ? getError(errors[errorKey]) : 'Unknown Error';
						});
					}
					return [];
				}),
			);
		}
	}
}
