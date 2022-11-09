import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlErrorsDisplayComponent } from './control-errors-display/control-errors-display.component';

@NgModule({
	imports: [CommonModule],
	declarations: [ControlErrorsDisplayComponent],
	exports: [ControlErrorsDisplayComponent],
})
export class ReactiveFormsUtilsModule {}
