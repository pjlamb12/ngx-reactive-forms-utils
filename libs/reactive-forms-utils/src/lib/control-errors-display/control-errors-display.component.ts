import { AfterContentInit, Component, ContentChild, HostBinding, Inject, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ErrorMessages, FORM_ERRORS } from '../error-utils';

@Component({
	selector: '[ngxControlErrorsDisplay]',
	templateUrl: './control-errors-display.component.html',
	styleUrls: ['./control-errors-display.component.scss'],
})
export class ControlErrorsDisplayComponent implements AfterContentInit {
	@Input() cssClass = '';
	rules = ['touched'];

	@ContentChild(NgControl, { static: true }) control!: NgControl;

	@HostBinding('class.hasError') get setErrorClass() {
		return this._hasError;
	}

	_text = '';

	get _hasError() {
		return this._text && this.rules.every((rule) => this.control[rule as keyof NgControl]);
	}

	private _errorMessages: ErrorMessages = this._errors;

	constructor(@Inject(FORM_ERRORS) private _errors: ErrorMessages) {}

	ngAfterContentInit() {
		if (this.control) {
			// Set error here in case form is initialized with invalid data
			this.setError();
			this.control.statusChanges?.pipe().subscribe(() => {
				this.setError();
			});
		}
	}

	private setError() {
		const errors = this.control.errors;
		this._text = '';
		let innerHtml = '';

		if (errors) {
			this._text = Object.keys(errors).reduce((html, errorKey) => {
				const getError = this._errorMessages[errorKey];
				const nextErrorText = getError ? getError(errors[errorKey]) : 'Unknown Error';

				const newParagraph = `<p>${nextErrorText}</p>`;
				return (html += newParagraph);
			}, '');
		} else {
			this._text = '';
		}
	}
}
