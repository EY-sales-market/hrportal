import { Validators, FormBuilder, FormGroup } from '@angular/forms';
export interface SignupInterface {
	name: string;
	// password: string;
	email?: string;
	mobile: string;
	device_token: string;
	gender: string;
	whatdoyouidentify: string;
	purposeofuse: string;

}


export class SignupForm implements SignupInterface {
	public name: string;
	public email: string;
	// password: string;public email?: string;
	public mobile: string;
	public device_token: string;
	public gender: string;
	public whatdoyouidentify: string;
	public purposeofuse: string;
	public formGroup;



	constructor(props?: SignupInterface) {
		for (var prop in props) {
			if (prop != 'device_token') {
				// if (prop == 'email') {
				// 	this[prop] = ''
				// } else {
					this[prop] = [props[prop], Validators.compose([Validators.required])]
				// }
			}
		}
		this.formGroup = new FormBuilder().group(this);
	}

	public static validate(form: FormGroup) {
		for (let formControl in form.controls) {
			
			if ((!form.controls[formControl].valid && form.controls[formControl].errors['required']) && formControl != 'undefined') {
				if(formControl=='gender' || formControl=='whatdoyouidentify')
				return `Please select ${formControl}`
				else
				return `Please enter ${formControl}`
			}
		}
		return '';
	}



	public static getSignUpForm(loginInfo: any = []): SignupInterface {
		return ({

			device_token: loginInfo.device_token || '',
			name: loginInfo.name || '',
			email: loginInfo.email || '',
			mobile: loginInfo.mobile || '',
			gender: loginInfo.gender || '',
			whatdoyouidentify: loginInfo.whatdoyouidentify || '',
			purposeofuse: loginInfo.purposeofuse || '',



		})
	}
}