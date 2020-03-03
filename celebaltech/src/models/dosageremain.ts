import { Validators, FormBuilder, FormGroup } from '@angular/forms';
export interface DosageremainInterface {
	start_date: string;
	dose: string;
	dose_unit: string;
	frequency: string;
	start_patient_route_of_administration: string;
	stop_date: string;
	daily_dosage: string;
	daily_dosage_unit: string;
	regimen_dosage: string;
	regimen_dosage_unit: string
	stop_patient_route_of_administration: string;
	event_type: string;
	dose_description: string;
	duration_of_regimen: string;
	accidental_exposure: string;
	batch_no: string;
	package_id: string;
	expiration_date: string;

}


export class DosageremainForm {

	public formGroup: FormGroup;
	public start_date: string;
	public dose: string;
	public dose_unit: string;
	public frequency: string;
	public start_patient_route_of_administration: string;
	public stop_date: string;
	public daily_dosage: string;
	public daily_dosage_unit: string;
	public regimen_dosage: string;
	public regimen_dosage_unit: string
	public stop_patient_route_of_administration: string;
	public event_type: string;
	public dose_description: string;
	public duration_of_regimen: string;
	public accidental_exposure: string;
	public batch_no: string;
	public package_id: string;
	public expiration_date: string;

	constructor(props?: DosageremainInterface) {
		for (var prop in props) {


			this[prop] = [props[prop], Validators.compose([Validators.required])];


		}
		this.formGroup = new FormBuilder().group(this);
	}

	public static validate(form: FormGroup) {
		for (let formControl in form.controls) {

			if ((!form.controls[formControl].valid && form.controls[formControl].errors['required']) && formControl != 'undefined') {
				if (formControl == 'country')
					return `Please select ${formControl.replace(/_/g, " ")}`
				else
					return `Please enter ${formControl.replace(/_/g, " ")}`
			}
		}
		return '';
	}



	public static getLoginForm(dosage: any = []): DosageremainInterface {
		return ({



			start_date: dosage.start_date || '',
			dose: dosage.dose || '',
			dose_unit: dosage.dose_unit || '',
			frequency: dosage.frequency || '',
			start_patient_route_of_administration: dosage.start_patient_route_of_administration || '',
			stop_date: dosage.stop_date || '',
			daily_dosage: dosage.daily_dosage || '',
			regimen_dosage: dosage.regimen_dosage || '',
			regimen_dosage_unit: dosage.regimen_dosage_unit || '',

			daily_dosage_unit: dosage.daily_dosage_unit || '',
			stop_patient_route_of_administration: dosage.stop_patient_route_of_administration || '',
			event_type: dosage.event_type || '',
			dose_description: dosage.dose_description || '',
			duration_of_regimen: dosage.duration_of_regimen || '',
			accidental_exposure: dosage.accidental_exposure || '',
			batch_no: dosage.batch_no || '',
			package_id: dosage.package_id || '',
			expiration_date: dosage.expiration_date || ''


		})
	}
}