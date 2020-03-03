import { Validators, FormBuilder, FormGroup } from '@angular/forms';
export interface QuickEntryInterface {
	country: string;
	date: string;
	product_name: string;
	patient_details: string;
	adverse_event: string;
}


export class QuickEntryForm {

	public formGroup: FormGroup;

	constructor(props?: QuickEntryInterface) {
		for (var prop in props) {

			if (prop != 'email')
				this[prop] = [props[prop], Validators.compose([Validators.required])];
			else
				this[prop] = '';

		}
		this.formGroup = new FormBuilder().group(this);
	}

	public static validate(form: FormGroup) {
		for (let formControl in form.controls) {

			if ((!form.controls[formControl].valid && form.controls[formControl].errors['required']) && formControl != 'undefined') {
				if (formControl == 'country')
					return `Please select ${formControl.replace("_", " ")}`
				else
					return `Please enter ${formControl.replace("_", " ")}`
			}
		}
		return '';
	}



	public static getLoginForm(quickentry: any = []): QuickEntryInterface {
		return ({
			country: quickentry.country || '',
			date: quickentry.date || '',
			product_name: quickentry.product_name || '',
			adverse_event: quickentry.adverse_event || '',
			patient_details: quickentry.patient_details || '',

		})
	}
}