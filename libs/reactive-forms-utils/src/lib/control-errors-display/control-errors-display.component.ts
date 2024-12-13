import { AfterContentInit, Component, ContentChild, Inject, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable, debounceTime, map, startWith } from 'rxjs';
import { CustomErrorMessages, FORM_ERRORS, FORM_ERRORS_DEBOUNCE_TIME } from '../custom-error-message-utils';

@Component({
    selector: 'ngx-control-errors-display',
    templateUrl: './control-errors-display.component.html',
    styleUrls: ['./control-errors-display.component.scss'],
    standalone: false
})
export class ControlErrorsDisplayComponent implements AfterContentInit {
	@Input() containerClasses = '';
	@Input() errorClasses = '';
	@Input() rules = ['touched'];

	@ContentChild(NgControl, { static: true }) control!: NgControl;

	errorsList$: Observable<string[]> | undefined;

	get rulesBroken() {
		return this.rules.every((rule) => this.control[rule as keyof NgControl]);
	}

	private _errorMessages: CustomErrorMessages = this._errors;

	constructor(
		@Inject(FORM_ERRORS) private _errors: CustomErrorMessages,
		@Inject(FORM_ERRORS_DEBOUNCE_TIME) private debounceTime: number,
	) {}

	ngAfterContentInit() {
		if (this.control) {
			this.errorsList$ = this.control.statusChanges?.pipe(
				startWith(this.control.status),
				debounceTime(this.debounceTime),
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
