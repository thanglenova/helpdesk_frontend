import { Injectable, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CommonService implements OnInit{
  ngOnInit(): void {
    this.getIdProfileInParams();
  }

  constructor(private route: ActivatedRoute) { }

  getIdProfileInParams() : number{
    return +this.route.snapshot.firstChild.params.id;
  }

}
