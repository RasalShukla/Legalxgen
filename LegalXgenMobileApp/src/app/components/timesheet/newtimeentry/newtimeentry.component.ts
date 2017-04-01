import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../shared/services/account.service';


@Component({
  selector: 'app-newtimeentry',
  templateUrl: './newtimeentry.component.html',
  styleUrls: ['./newtimeentry.component.css']
})
export class NewtimeentryComponent implements OnInit {
public globalEmailData : any;
  constructor( private _accountService: AccountService) {
      this._accountService.authInfo$.map(authInfo => authInfo.$userEmail).subscribe(userGlobalData=> this.globalEmailData = userGlobalData);
       alert(this.globalEmailData);
   }

  ngOnInit() {
  }

}
