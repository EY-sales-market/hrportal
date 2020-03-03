import { Validators, FormBuilder, FormGroup } from '@angular/forms';
export interface EventInterface {
	description_as_reported: string;
	description_to_be_coded: string;
	sytem_organ_class: string;
	high_level_group_team:string;
	high_level_team:string;
	preferred_team: string;
	low_level_team: string;
	synonym: string;
	event: string;
	event_type: string;
	receipt_date: string;
	onset_date_time: string;
	duration: string;
	event_details: string;
	term_highlighted_by_reporter: string;
	onset_latency: string;
	onset_from_last_dose: string;
	patient_has_prior_history: string;
	treatment_received: string;
	related_to_study_conduct: string;

}


export class  EventForm {

	public formGroup: FormGroup;
public description_as_reported: string;
public description_to_be_coded: string;
public sytem_organ_class: string;
public high_level_group_team:string;
public high_level_team:string;
public preferred_team: string;
public low_level_team: string;
public synonym: string;
public event: string;
public event_type: string;
public receipt_date: string;
public onset_date_time: string;
public duration: string;
public event_details: string;
public term_highlighted_by_reporter: string;
public onset_latency: string;
public onset_from_last_dose: string;
public patient_has_prior_history: string;
public treatment_received: string;
public related_to_study_conduct: string;

	constructor(props?: EventInterface) {
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



	public static getLoginForm(eventdata: any = []): EventInterface {
		return ({



			description_as_reported: eventdata.description_as_reported || '',
			description_to_be_coded: eventdata.description_to_be_coded || '',
			sytem_organ_class: eventdata.sytem_organ_class || '',
			high_level_group_team:eventdata.high_level_group_team || '',
			high_level_team:eventdata.high_level_team || '',
			preferred_team: eventdata.preferred_team || '',
			low_level_team: eventdata.low_level_team || '',
			synonym: eventdata.synonym || '',
			event: eventdata.event || '',
			event_type: eventdata.event_type || '',
			receipt_date: eventdata.receipt_date || '',
			onset_date_time: eventdata.onset_date_time || '',
			duration: eventdata.duration || '',
			event_details: eventdata.event_details || '',
			term_highlighted_by_reporter: eventdata.term_highlighted_by_reporter || '',
			onset_latency: eventdata.onset_latency || '',
			onset_from_last_dose: eventdata.onset_from_last_dose || '',
			patient_has_prior_history: eventdata.patient_has_prior_history || '',
			treatment_received: eventdata.treatment_received || '',
			related_to_study_conduct: eventdata.related_to_study_conduct || '',


		})
	}
}