import { Component, OnInit, Input } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DayOff } from 'src/app/shared/models/date-off';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/shared/models/user';
import { DayOffService } from 'src/app/core/services/day-off.service';
import { TypeDayOffService } from 'src/app/core/services/type-day-off.service';
import { TypeDay } from 'src/app/shared/models/type-day';
import { Observable } from 'rxjs';
import { type } from 'os';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  requestForm: FormGroup;

  dateFormat = 'yyyy/MM/dd';

  dateOff: DayOff;

  submitted : boolean =false;

  isAllDisplayDataChecked = false;
  isOperating = false;
  isIndeterminate = false;
  listOfDisplayData: DayOff;
  mapOfCheckedId: { [key: string]: boolean } = {};
  numberOfChecked = 0;

  authService: AuthService;
  router: Router;
  idUser: number;
  dayOff: DayOff;
  user: User;
  dayOffs: DayOff[];
  types: TypeDay[];

  currentPageDataChange($event: DayOff): void {
    this.listOfDisplayData = $event;
  }

  operateData(): void {
    this.isOperating = true;
    setTimeout(() => {
      this.isOperating = false;
    }, 1000);
  }

  id: number;
  status: number;
  userEntity: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dayOffService: DayOffService,
    private typeService: TypeDayOffService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {

    this.getDays();
    this.getAllTypes();

    this.requestForm = this.formBuilder.group({
      createAt: new Date(),
      dayEndOff: ['', [Validators.required]],
      dayOffType: 0,
      dayStartOff: ['', [Validators.required]],     
      description: ['', [Validators.required]],
      id: 0,
      status: 0,
      userEntity: 0     
    });
  }

  get f(){
    return this.requestForm.controls;
  }

  isLogged(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }

  getDays(): void {
    const id = + this.route.snapshot.paramMap.get('id');
    this.dayOffService.getDayOffs(id).subscribe(dayOff => this.dayOff = dayOff)
  }

  getAllTypes(): void {
    this.typeService.getAllTypes().subscribe(types => this.types = types);
  }


  onSubmit() {
    for (const i in this.requestForm.controls) {
      this.requestForm.controls[i].markAsDirty();
      this.requestForm.controls[i].updateValueAndValidity();
    }
    this.submitted =true;
    if(this.requestForm.invalid){
      return;
    }
    this.dayOffService.addDayOff(this.requestForm.value)
        .pipe(first())
        .subscribe(
          data=>{
            this.alertService.success("successful");
            this.router.navigate(['/welcome']);
          },
          error=>{
            this.alertService.error("error");
          }
        )
  }
}
