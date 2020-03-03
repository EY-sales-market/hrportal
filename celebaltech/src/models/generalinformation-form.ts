import { Validators, FormBuilder, FormGroup } from '@angular/forms';
export interface GeneralInformationInterface {
	// reportType: string;
	// country: Date;
	// initial_receipt_details: string;
	// centeral_receipt_date: string;
	// initial_justification: string;
	// narrative: string;
	[key: string]: any;
}


export class GeneralInformationForm implements GeneralInformationInterface {

	public formGroup: FormGroup;
	public static arrayRequired: any = [];
	// public reportType: string;
	// public country: Date;
	// public initial_receipt_details: string;
	// public centeral_receipt_date: string;
	// public initial_justification: string;
	// public narrative: string;
	constructor(props) {

		for (var prop in props) {
			
			this[prop] = [props[prop], Validators.compose([Validators.required])];

		}
		this.formGroup = new FormBuilder().group(this);
		console.log(this.formGroup)
	}

	public static validate(form: FormGroup) {
		console.log(this.arrayRequired)
		for (let formControl in form.controls) {
			console.log(form.controls)
			if ((!form.controls[formControl].valid && form.controls[formControl].errors['required']) && formControl != 'undefined') {
			 
				if(this.arrayRequired.indexOf(formControl) >=0) { 
				return `Please enter ${formControl.replace("_", " ")}`
				}
			}
		}
		return '';
	}



	public static getLoginForm(generalInformation: any = [], fieldData: any = []): GeneralInformationInterface {
		let a: any = {}
		generalInformation.forEach((element: any) => {
			if (element['isvisible'] == 'Yes') {
				Object.assign(a, {
					[element['fieldName']]: ''
				})
			}
			if (element['validateField'] == 'Yes') {
				this.arrayRequired.push(element['fieldName'])
			}

		});
	 

		return a;
	}
}