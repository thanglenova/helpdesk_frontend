import { Component, OnInit, Input } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DayOff } from 'src/app/shared/models/date-off';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  validateForm: FormGroup;

  dateFormat = 'yyyy/MM/dd';

  dateOff: DayOff;
 
  isAllDisplayDataChecked = false;
  isOperating = false;
  isIndeterminate = false;
  listOfDisplayData: DayOff;
  mapOfCheckedId: { [key: string]: boolean } = {};
  numberOfChecked = 0;


  currentPageDataChange($event: DayOff): void {
    this.listOfDisplayData = $event;
  }

  operateData(): void {
    this.isOperating = true;
    setTimeout(() => {  
      this.isOperating = false;
    }, 1000);
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {  
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
   }

}
