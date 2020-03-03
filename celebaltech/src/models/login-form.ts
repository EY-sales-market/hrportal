import { Validators, FormBuilder, FormGroup } from '@angular/forms';

export interface LoginInterface {
	email: string;
	// password: string;
}


export class LoginForm  {

	public formGroup: FormGroup;
	emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  static data: any;

  constructor(props?: LoginInterface)
  {

    for (var prop in props) {
			if (prop != 'device_token') {}
				if(prop=='email')
				this[prop] = [props[prop], Validators.compose([Validators.required])];
				else
				this[prop] = [props[prop], Validators.compose([Validators.required])];

		}
		this.formGroup = new FormBuilder().group(this);
	}

	public static validate(form: FormGroup) {
       console.log(form.value.email.length);
       let value:number = +form.value.email;
       console.log(value);
     if(value <= 1000000000 || value >= 9999999999){
      //  console.log("hello");
       return "please enter valid Contact no.";
     }


  console.log("byre")
    for (let formControl in form.controls) {

			if ((!form.controls[formControl].valid && form.controls[formControl].errors['required']) && formControl != 'undefined') {
				// console.log(form.controls[formControl].errors)
				// if(form.controls[formControl].errors['pattern'])
				// {
				// 	  return `Please enter valid ${formControl}`
				// }
				// else
				return `Please enter ${formControl}`
			}
		}
		return '';
	}



	public static getLoginForm(loginInfo: any = []): LoginInterface  {
		return ({
			email : loginInfo.email || '',
			// password : loginInfo.password || '',
		})
	}
}
