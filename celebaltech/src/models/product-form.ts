import { Validators, FormBuilder, FormGroup } from '@angular/forms';
export interface ProductInterface {
	product_category: string;
	product_name: string;
	formulations: string;
	concentration:string;
	concentration_unit:string;
	product_type: string;
	generic_name: string;
	interaction: string;
	contra_incicated: string;
	who_drug_code: string;
	compnay_drug_code: string;
	manufacture: string;
	obtain_drug_country: string;
	drug_authorization_country: string;
	who_medical_product: string;

}


export class ProductForm {

	public formGroup: FormGroup;
	public product_category: string;
	public product_name: string;
	public formulations: string;
	public product_type: string;
	public generic_name: string;
	public interaction: string;
	public contra_incicated: string;
	public who_drug_code: string;
	public compnay_drug_code: string;
	public manufacture: string;
	public obtain_drug_country: string;
	public drug_authorization_country: string;
	public who_medical_product: string;
	public 	concentration:string
	public concentration_unit:string

	constructor(props?: ProductInterface) {
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



	public static getLoginForm(product: any = []): ProductInterface {
		return ({



			product_category: product.product_category || '',
			product_name: product.product_name || '',
			formulations: product.formulations || '',
			concentration:product.concentration || '',
			concentration_unit:product.concentration_unit || '',
			product_type: product.product_type || '',
			generic_name: product.generic_name || '',
			interaction: product.interaction || '',
			contra_incicated: product.contra_incicated || '',
			who_drug_code: product.who_drug_code || '',
			compnay_drug_code: product.compnay_drug_code || '',
			manufacture: product.manufacture || '',
			obtain_drug_country: product.obtain_drug_country || '',
			drug_authorization_country: product.drug_authorization_country || '',
			who_medical_product: product.who_medical_product || ''


		})
	}
}