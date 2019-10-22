import { Component, OnInit } from '@angular/core';

import { DayOff } from 'src/app/shared/models/date-off';
import {DayoffService} from 'src/app/core/services/dayoff.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-dayoff',
  templateUrl: './dayoff.component.html',
  styleUrls: ['./dayoff.component.scss']
})
export class DayoffComponent implements OnInit {

  searchValue = '';
  sortName: string | null = null;
  sortValue: string | null = null;
  listOfFilterAddress = [{ text: 'London', value: 'London' }, { text: 'Sidney', value: 'Sidney' }];
  listOfSearchAddress: string[] = [];

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  sort(sortName: string, value: string): void {
    this.sortName = sortName;
    this.sortValue = value;
    this.search();
  }

  filterAddressChange(value: string[]): void {
    this.listOfSearchAddress = value;
    this.search();
  }

  search(): void {
    const filterFunc = (item: { name: string; age: number; address: string }) => {
      return (
        (this.listOfSearchAddress.length
          ? this.listOfSearchAddress.some(address => item.address.indexOf(address) !== -1)
          : true) && item.name.indexOf(this.searchValue) !== -1
      );
    };
  }

  data: DayOff[];
  dayoff : DayOff;

  constructor(
    private dayOffService : DayoffService ,
    private router : Router
  ) { }

  ngOnInit() {
    this.getDayOffs();
  }
  getDayOffs(): void {
    this.dayOffService.getDayoff().subscribe(data=>this.data=data);
  }

  delete(dayoff: DayOff): void {
    // this.dayoffs = this.dayoffs.filter(b => b !== dayoff);
    this.dayOffService.deleteDayOff(dayoff).subscribe();
  }

}
