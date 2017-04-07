import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../shared/services/account.service';
import {  AuthInfoResponce } from "../../shared/globalUserInfo";
@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.css']
})
export class AppmenuComponent implements OnInit {

  public authInfoResponce: AuthInfoResponce;
   
  constructor(private _accountService: AccountService,) {
     this._accountService.authInfo$.map(authInfo => authInfo.$authResponce).subscribe(userGlobalData=> this.authInfoResponce = userGlobalData);
   }

  ngOnInit() {
  }

}
