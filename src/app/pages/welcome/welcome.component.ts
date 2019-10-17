import { Component, OnInit, Input } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DayOff } from 'src/app/shared/models/date-off';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/shared/models/user';
import { DayOffService } from 'src/app/core/services/day-off.service';

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

  authService: AuthService;
  router: Router;
  idUser: number;
  dayOff: DayOff;
  user: User;
  dayOffs: DayOff[];

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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dayOffService: DayOffService
    ) { }

  ngOnInit(): void { 
    
    this.getDays();
    // this.getIdUser();
    
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
   }

   isLogged(): boolean{
     if(this.authService.isLoggedIn()){
       return true;
     }else{
       this.router.navigate(['/login']);
      }
   }

   getDays(): void{
     const id=+ this.route.snapshot.paramMap.get('id');
     this.dayOffService.getDayOffs(id).subscribe(dayOff=> this.dayOff=dayOff)   
   }

  //  getIdUser(): void{
  //    this.dayOffService.getUserById().subscribe(user=>this.idUser=user.idUser)
  //  }

   submit(name: string, dateStart: Date, dateEnd: Date, description: string): void{
     name: name.trim();
     description = description.trim();

     if(!name||!dateStart||!dateEnd||!description){
       return;
     }
     this.dayOffService.addRequest(name,dateStart,dateEnd,description)
      .subscribe(dayOff=>{
        this.dayOffs.push(dayOff);
      })
   }
}
