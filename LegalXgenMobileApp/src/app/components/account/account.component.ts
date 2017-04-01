import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalEventsManager } from '../../globalEventManager';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor( private router: Router,
               private _globalEventsManager: GlobalEventsManager
             ) { }

  ngOnInit() {
  }

  login(){
     this._globalEventsManager.showNavBar.emit(true);
     this.router.navigate(['/mytimesheet']);
  }

}
