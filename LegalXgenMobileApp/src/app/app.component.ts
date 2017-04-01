import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalEventsManager } from './globalEventManager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public showMenu : boolean;
  constructor(  private _globalEventsManager: GlobalEventsManager, private router: Router,){
     
     this.showMenu = false;
     this._globalEventsManager.showNavBar.subscribe((mode : boolean) =>{
             this.showMenu =mode;  
         });
  }

  
}

