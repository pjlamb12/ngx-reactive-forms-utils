import { Component, inject, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
	addCustomErrorMessage,
	CustomValidators,
	debugForm,
	FormDebugField,
	FormDebugFieldEnum,
} from 'ngx-reactive-forms-utils';

@Component({
	selector: 'ngx-reactive-form-utils-demo-form',
	templateUrl: './demo-form.component.html',
	styleUrls: ['./demo-form.component.scss'],
	standalone: false,
})
export class DemoFormComponent implements OnInit {
	private _fb = inject(FormBuilder);
	private options: AbstractControlOptions = {
		validators: [CustomValidators.confirmStringMatch('password', 'confirmPassword')],
	};
	public form: FormGroup = this._fb.nonNullable.group(
		{
			numberOnly: [null, [Validators.required, CustomValidators.number]],
			phone: ['', [Validators.required, CustomValidators.phoneNumber]],
			zipCode: ['', [Validators.required, CustomValidators.validZipCode]],
			password: ['', [Validators.required]],
			confirmPassword: ['', [Validators.required]],
			minAge: [null, [Validators.required, CustomValidators.minAge(18)]],
			maxAge: [null, [Validators.required, CustomValidators.maxAge(10)]],
		},
		this.options,
	);
	public debugFields: FormDebugField[] = [FormDebugFieldEnum.Value];

	public debugValues$ = debugForm(this.form);

	ngOnInit(): void {
		addCustomErrorMessage('phoneNumber', () => 'Please enter a valid phone number');
		addCustomErrorMessage('validZipCode', () => 'Please enter a valid zip code');
	}
}
