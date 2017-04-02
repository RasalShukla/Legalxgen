import { Component, OnInit } from '@angular/core';

import { GlobalEventsManager } from '../../globalEventManager';
import { Login } from '../../shared/model/login'
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { GlobalValidator } from "../../shared/validators/mail-validators";
import { AccountService } from '../../shared/services/account.service'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{
  
  ngOnInit() {
      this._accountService.clearDataOnBackMovement();
     //  this.loginModel.email = "rasalshukla@gmail.com";
   }
   loginModel: Login = new Login();
  
   form: FormGroup;
   public responce: any;
  
   public globalEmailData:any;
  constructor( private fb: FormBuilder,
               private _accountService : AccountService,
             ) { 
                  this.form = fb.group({
            email: ['', [
               Validators.compose([Validators.required, GlobalValidator.mailFormat])
            ]],
            password: ['', [
               Validators.compose([Validators.required,  Validators.minLength(6), Validators.maxLength(10)])
            ]]
        });
             }

  

  login(){
     var formData = this.form.value;
      this._accountService.login(formData);   
  }

  

}
