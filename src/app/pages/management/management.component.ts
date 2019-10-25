import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShowUserService } from './service/show-user/show-user.service';
import { Subscription } from 'rxjs';
import { Profile } from '../../shared/models/profile'
import { EditUserService } from './service/edit-user/edit-user.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit, OnDestroy {

  private users: Profile[];
  private subscription: Subscription;
  private searchValue: string;
  private allUser: Profile[];
  private sortNameCurrent: string;
  private sortEmailCurrent: string;

  constructor(private showUserService: ShowUserService,
    private editUserService: EditUserService) { }

  ngOnInit() {
    this.loadListUser();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadListUser() {
    this.subscription = this.showUserService.getListProfile().subscribe(
      data => {
        this.users = data;
        this.allUser = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  onDisableUser(user: Profile) {
    this.subscription = this.editUserService.disableFollowIdUser(user.id).subscribe(
      data => {
        this.reverseStatusOfUser(user);
      }, error => {
        console.log(error);
      }
    )
  }
  onEnableUser(user: Profile) {
    this.subscription = this.editUserService.enableFollowIdUser(user.id).subscribe(
      data => {
        this.reverseStatusOfUser(user);
      }, error => {
        console.log(error);
      }
    )
  }

  reverseStatusOfUser(user: Profile) {
    for (let i = 0; i < this.users.length; ++i) {
      if (this.users[i].id === user.id) {
        this.users[i].enable = !this.users[i].enable;
        break;
      }
    }
  }

  sortName(event) {
    if (event === "ascend") {
      this.users.sort(function (a, b) {
        var nameA = a.lastName.toUpperCase();
        var nameB = b.lastName.toUpperCase();
        return nameA.localeCompare(nameB);
      });
    } else if (event === "descend") {
      this.users.sort(function (a, b) {
        var nameA = a.lastName.toUpperCase();
        var nameB = b.lastName.toUpperCase();
        return nameB.localeCompare(nameA);
      });
    } else {
      this.users.sort(function (a, b) {
        if (a.id === b.id) {
          return 0;
        }
        return a > b ? 1 : -1;
      });
    }
    this.sortEmailCurrent = event;
  }

  sortEmail(event) {
    if (event === "ascend") {
      this.users.sort(function (a, b) {
        var nameA = a.email.toUpperCase();
        var nameB = b.email.toUpperCase();
        return nameA.localeCompare(nameB);
      });
    } else if (event === "descend") {
      this.users.sort(function (a, b) {
        var nameA = a.email.toUpperCase();
        var nameB = b.email.toUpperCase();
        return nameB.localeCompare(nameA);
      });
    } else {
      this.users.sort(function (a, b) {
        if (a.id === b.id) {
          return 0;
        }
        return a > b ? 1 : -1;
      });
    }
    this.sortEmailCurrent = event;
  }

  searchName() {
    this.users = this.allUser.filter(user => {
      if (user.firstName.includes(this.searchValue) || user.lastName.includes(this.searchValue)) {
        return user;
      }
    });
    this.sortName(this.sortNameCurrent);
  }

  searchEmail() {
    let litsUserSearch: Profile[];
    this.users = this.allUser.filter(user => {
      if (user.email.includes(this.searchValue)) {
        return user;
      }
    });
    this.sortEmail(this.sortEmailCurrent);
  }

  reset() {
    this.users = this.allUser;
  }

}
