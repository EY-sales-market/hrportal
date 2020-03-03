import { Validators, FormBuilder, FormGroup } from '@angular/forms';
export interface ForgotInterface {
	username: string; 
}


export class ForgotForm  {
 
	public formGroup: FormGroup;

	// public formControlsTitle = {
	// 	username: "username",
	// 	password: "password",
	// 	device_token: "device_token",

	// };

	constructor(props?: ForgotInterface) {
		for (var prop in props) {
		 
 			 	this[prop] = [props[prop], Validators.compose([Validators.required])]
			
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

	 
	
	public static getForgotForm(loginInfo: any = []): ForgotInterface  { 
		return ({
			username : loginInfo.username || '', 
		})
	}
}