import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'ngx-reactive-form-utils-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'demo-app';
	form = this._fb.group({
		name: ['', [Validators.required]],
		age: [null, [Validators.min(5)]],
	});

	constructor(private _fb: FormBuilder) {}
}
