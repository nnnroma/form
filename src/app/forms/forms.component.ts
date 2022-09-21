
import { Component, OnInit } from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormArray, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';

import { Subscription, of, Observable, delay } from 'rxjs';
import { map } from 'rxjs';

interface Frameworks {
  value: string;
}

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})

export class FormsComponent {

  setHobbies() {
    return new FormGroup({
        hobbiesTitle: new FormControl('', Validators.required),
        hobbiesDuration: new FormControl('', Validators.required),
      })
  }

  pageForm: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    userLastName: new FormControl('', Validators.required),
    dateOfBirth: new FormControl(new Date(), Validators.required),
    selectFramework: new FormControl('', Validators.required),
    selectVersion: new FormControl('', Validators.required),
    email:  new FormControl('', [Validators.required, Validators.email], this.validatorsEmail()),
    hobbies: new FormArray([
      this.setHobbies()
    ]) 
  })
  
  addHobbies() {
    this.hobbies.push(this.setHobbies());
  }

  //Метод для получения значения с hobbies, пушо без него нот ворк - https://howtojs.io/how-to-solve-property-controls-does-not-exist-on-type-abstractcontrol-error-in-angular-13-applications/
  get hobbies() {
    return this.pageForm.controls['hobbies'] as FormArray
  }

  emails = ['test@test.test'];
    
  frameworks: Frameworks[] = [
    {value: 'Angular'},
    {value: 'React'},
    {value: 'Vue'}
  ];

  frameworkEvents!: Subscription;

  frameworkVersion:{[key:string]:string[]} =  {
    'Angular': ['1.1.1', '1.2.1', '1.3.3'],
    'React': ['2.1.2', '3.2.4', '4.3.1'],
    'Vue': ['3.3.1', '5.2.1', '5.1.3'],
  }

  versionFramework: string[] = [];

  ngAfterViewInit() {
    this.pageForm.get('selectFramework')?.valueChanges.subscribe((v) => {
      this.versionFramework = this.frameworkVersion[v];
    })
  }

  versionValue!: Subscription;

  private mailExists(email: string): Observable<boolean> {
    return of(this.emails.includes(this.pageForm.get('email')?.value)).pipe(delay(500))
  }

  private validatorsEmail():AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => 
      this.mailExists(control.value).pipe(
        map((response) => (response ? {mailExists: true} : null))
      )
  }

  sendForm() {
    console.log(this.pageForm.controls);
    this.emails.push(this.pageForm.controls['email'].value);
    console.log(this.emails);
  }

}

// Thank you for your attention