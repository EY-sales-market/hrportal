import { Validators, FormBuilder, FormGroup } from '@angular/forms';
export interface PatientviewInterface {
	patient_id: string;
	patient_name: Date;
	dob: string;
	entinicity: string;
	gender: string;
	height: string;
	unit_of_height: string;
	pregnant: string;
	occupation: string;
	weight: string;
	unit_of_weight: string;
	lmp_date: string;
	address: string;
	country: string;
	state: string;
	city: string;
	postal_code: string;
	phone: string;
}


export class PatientviewForm implements PatientviewInterface {

	public formGroup: FormGroup;
	public patient_id: string;
	public patient_name: Date;
	public dob: string;
	public entinicity: string;
	public gender: string;
	public height: string;
	public unit_of_height: string;
	public pregnant: string;
	public occupation: string;
	public weight: string;
	public unit_of_weight: string;
	public lmp_date: string;
	public address: string;
	public country: string;
	public state: string;
	public city: string;
	public postal_code: string;
	public phone: string;
	constructor(props?: PatientviewInterface) {
		for (var prop in props) {
			this[prop] = [props[prop], Validators.compose([Validators.required])];

		}
		this.formGroup = new FormBuilder().group(this);
	}

	public static validate(form: FormGroup) {
		for (let formControl in form.controls) {

			if ((!form.controls[formControl].valid && form.controls[formControl].errors['required']) && formControl != 'undefined') {
				if (formControl == 'gender' || formControl == 'unit_of_height'|| formControl == 'entinicity'|| formControl == 'pregnant')
					return `Please select ${formControl.replace("_", " ")}`
				else
					return `Please enter ${formControl.replace("_", " ")}`
			}
		}
		return '';
	}



	public static getLoginForm(patientview: any = []): PatientviewInterface {
		return ({



			patient_id: patientview.patient_id || '',
			patient_name: patientview.patient_name || '',
			dob: patientview.dob || '',
			entinicity: patientview.entinicity || '',
			gender: patientview.gender || '',
			height: patientview.height || '',
			unit_of_height: patientview.unit_of_height || '',
			pregnant: patientview.pregnant || '',
			occupation: patientview.occupation || '',
			weight: patientview.weight || '',
			unit_of_weight: patientview.unit_of_weight || '',
			lmp_date: patientview.lmp_date || '',
			address: patientview.address || '',
			country: patientview.country || '',
			state: patientview.state || '',
			city: patientview.city || '',
			postal_code: patientview.postal_code || '',
			phone: patientview.phone || '',
		})
	}
}