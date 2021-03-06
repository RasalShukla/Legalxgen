import { Component, OnInit } from '@angular/core';
import { Login } from '../../shared/model/login'
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { GlobalValidator } from "../../shared/validators/mail-validators";
import { AccountService } from '../../shared/services/account.service'

/**
 * Account component class , contains all the functionality related to login operations
 */
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
    ngOnInit() {
        this._accountService.clearDataOnBackMovement();
        this.loginModel.email = "rasalshukla@gmail.com";
        this.loginModel.password = "123456";
    }
   
    public loginModel: Login = new Login();
    public form: FormGroup;
    public responce: any;
    public globalEmailData: any;
    
    /**
     * @param  {FormBuilder} privatefb
     * @param  {AccountService} private_accountService
     */
    constructor(private fb: FormBuilder,
        private _accountService: AccountService,
    ) {
        this.form = fb.group({
            email: ['', [
                Validators.compose([Validators.required, GlobalValidator.mailFormat])
            ]],
            password: ['', [
                Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])
            ]]
        });
    }

    /**
     * Login method, authenticates user is authorized or not
     * @returns void
     */
    login() : void {
        var formData = this.form.value;
        this._accountService.login(formData);
    }
}
