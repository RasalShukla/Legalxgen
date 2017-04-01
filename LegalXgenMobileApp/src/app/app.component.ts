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
  constructor(  private _globalEventsManager: GlobalEventsManager, private router: Router, 
                private _accountService: AccountService){
     this.showMenu = false;
     this._globalEventsManager.showNavBar.subscribe((mode : boolean) =>{
             this.showMenu =mode;  
         });
  }

  
}

