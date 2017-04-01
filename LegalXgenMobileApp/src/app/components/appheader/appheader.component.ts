import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../../shared/services/account.service';


@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent  {

 

constructor(   private router: Router,private _accountService: AccountService){
  
  }

logOut() {
    this._accountService.logOut();

  }
 
}
