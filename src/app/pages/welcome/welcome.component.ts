import {Component, OnInit, Input} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DayOff} from 'src/app/shared/models/date-off';
import {AuthService} from 'src/app/core/services/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import {UserService} from 'src/app/core/services/user.service';
import {User} from 'src/app/shared/models/user';
import {DayOffService} from 'src/app/core/services/day-off.service';
import {TypeDayOffService} from 'src/app/core/services/type-day-off.service';
import {TypeDay} from 'src/app/shared/models/type-day';
import {Observable} from 'rxjs';
import {type} from 'os';
import {first} from 'rxjs/operators';
import {AlertService} from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  isVisible = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dayOffService: DayOffService,
    private typeService: TypeDayOffService,
    private alertService: AlertService
  ) {
  }

  get f() {
    return this.requestForm.controls;
  }

  requestForm: FormGroup;

  dateFormat = 'dd/MM/yyyy';

  submitted = false;

  isLoading = false;

  authService: AuthService;
  router: Router;
  data: DayOff[];
  types: TypeDay[];
  type: TypeDay;
  id: number;

  ngOnInit(): void {

    this.getDays();
    this.getAllTypes();

    this.requestForm = this.formBuilder.group({
      dayEndOff: ['', [Validators.required]],
      dayOffType: [0, ''],
      dayStartOff: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  isLogged(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  getDays(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.dayOffService.getDayOffs(id).subscribe(data => this.data = data);
  }

  getAllTypes(): void {
    this.isLoading = true;
    this.typeService.getAllTypes().subscribe(types => {
      this.isLoading = false;
      this.types = types;
    });
  }

  onSubmit() {

    this.submitted = true;
    if (this.requestForm.invalid) {
      return;
    }
    this.dayOffService.addDayOff(this.requestForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('successful');
        },
        error => {
          this.alertService.error('error');
        }
      );
    this.isVisible = false;
  }
}
