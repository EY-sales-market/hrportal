import { Validators, FormBuilder, FormGroup } from '@angular/forms';
export interface EditInterface {
	name: string; 
	email?: string;
	mobile: string; 
	user_id:number;
}


export class EditForm implements EditInterface {
	public name: string; 
	public email?: string;
	public mobile: string; 
	public formGroup: FormGroup;
	public user_id:number;

	// public formControlsTitle = {
	// 	name: "name", 
	// 	mobile: "123456789",
	// 	email: 'email',
	// 	device_token: '12321312312312',
	// 	password: "password",

	// };

	constructor(props?: EditInterface) {
		for (var prop in props) {
			if (prop != 'device_token') {
				//this[this.formControlsTitle[prop]] = [props[prop], Validators.compose([Validators.required])]
				 if(prop!='email' )
				this[prop] = [props[prop], Validators.compose([Validators.required])]
				else
				this[prop] = '';
			}
		}
		this.formGroup = new FormBuilder().group(this);
	}

	public static validate(form: FormGroup) {
		for (let formControl in form.controls) {
			if ((!form.controls[formControl].valid && form.controls[formControl].errors['required']) && formControl != 'undefined') {
				return `Please enter ${formControl}`
			}
		}
		return '';
	}



	public static getEditForm(loginInfo: any = []): EditInterface {
		return ({
			name: loginInfo.name || '', 
			email: loginInfo.email || '',
			mobile: loginInfo.mobile || '', 
			user_id: loginInfo.id || '', 
		})
	}
}