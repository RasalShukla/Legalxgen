import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalEventsManager } from './globalEventManager';
import { AccountService } from './shared/services/account.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public showMenu : boolean;
  public globalEmailData : any;
  
  /**
   * @param  {GlobalEventsManager} private_globalEventsManager
   */
  constructor(  private _globalEventsManager: GlobalEventsManager ){
     
     this.showMenu = false;
     this._globalEventsManager.showNavBar.subscribe((mode : boolean) =>{
             this.showMenu =mode;  
         });
  }

  
}

