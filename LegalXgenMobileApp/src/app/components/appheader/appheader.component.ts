import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalEventsManager } from '../../globalEventManager';

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent {


constructor(  private _globalEventsManager: GlobalEventsManager, private router: Router,){
  }

logOut() {
    this._globalEventsManager.showNavBar.emit(false);
    this.router.navigate(['/account']);

  }
 
}
