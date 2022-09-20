import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { Subscription } from 'rxjs';


interface Frameworks {
  value: string;
}

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})

export class FormsComponent implements OnInit {




  pageForm: FormGroup = new FormGroup({
    userName: new FormControl(''),
    userLastName: new FormControl(''),
    dateOfBirth: new FormControl(new Date()),
    selectFramework: new FormControl(),
    selectVersion: new FormControl(),
    // hobbies: 
  })


  //Метод для получения значения с hobbies, пушо без него нот ворк - https://howtojs.io/how-to-solve-property-controls-does-not-exist-on-type-abstractcontrol-error-in-angular-13-applications/
  get hobbies() {
    return this.pageForm.controls['hobbies'] as FormArray
  }


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

  sendForm() {
    // this.pageForm.get('hobbiesName')?.valueChanges.subscribe((value) => {
    //   console.log(value)
    // })
    // this.pageForm.valueChanges
    // console.log(this.pageForm.valueChanges)
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  constructor() { }

  ngOnInit(): void {
    // this.pageForm.get('FormControl')?.valueChanges.subscribe((v) => {
    //   console.log(v)
    // })
  }

}
