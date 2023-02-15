import { Component, OnInit } from '@angular/core';
import {
  RxFormBuilder,
  FormGroupExtension,
} from '@rxweb/reactive-form-validators';
import { FormGroup } from '@angular/forms';

import { User, Skill } from './user.model';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  userFormGroup: FormGroup;

  constructor(private formBuilder: RxFormBuilder) {}

  ngOnInit() {
    let user = new User();
    user.skills = new Array<Skill>();
    let skill = new Skill();
    user.skills.push(skill);
    this.userFormGroup = this.formBuilder.formGroup(user);
    this.userFormGroup.controls.firstName.setValidators([
      Validators.minLength(10),
    ]);
    let skills = this.userFormGroup.controls.skills as FormArray;
    for (let control of skills.controls) {
      if (control instanceof FormGroup) {
        control.controls.skillName.setValidators([Validators.minLength(10)]);
      }
    }
  }

  reset() {
    this.userFormGroup.reset();
  }

  submit() {
    console.log(this.userFormGroup.getRawValue());
  }
}
