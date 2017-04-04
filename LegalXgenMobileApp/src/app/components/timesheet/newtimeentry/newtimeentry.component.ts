import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../shared/services/account.service';
import { TimeEntry }  from '../../../shared/model/timeEntry';
import { FormBuilder, FormGroup,  Validators,ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TimeEntryService} from '../../../shared/services/time-entry.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { AlertService } from '../../../shared/services/alert.service';
declare var $:any;
declare var timepicker: any;


@Component({
  selector: 'app-newtimeentry',
  templateUrl: './newtimeentry.component.html',
  styleUrls: ['./newtimeentry.component.css']
})
export class NewtimeentryComponent implements OnInit {
    globalEmailData : any;
    form: FormGroup;
    title: string;
    timeEntryModel : TimeEntry =   new TimeEntry("0","","","","",false,"");
    mainHeadingText: string = "Time Entry";
    smallHeadingText: string = "New ENtry";
    breadcrumbParentText: string = "Dashboard";
    breadcrumbActiveText: string = "Time Entry";
    public allTimeEntryData : TimeEntry[]; 
    public timeEntryById : TimeEntry; 
   
  constructor( private _accountService: AccountService,
               private _notificationService: NotificationService,
               private _alertService : AlertService,
               private _timeEntryService : TimeEntryService,
               private fb: FormBuilder,
                  ) {
      this.form = fb.group({
            timeEntryId: [],
            textMatter: [],
            date:[],
            totalTime:[],
            billableTime: [],
            isBillable: [],
            workDone:[]
        });

      this._accountService.authInfo$.map(authInfo => authInfo.$userEmail).subscribe(userGlobalData=> this.globalEmailData = userGlobalData);
      console.log("Global Data Email :-" + this.globalEmailData);
   }

  ngOnInit() {
         $( document ).ready(function() {
         $(".timepicker").timepicker({
          showInputs: false
         });
});
  }

  loadTimeEntry(){
   this._timeEntryService.loadAllTimeEntry(); 
      // this._crudEmployeeService.getAllEmployees().subscribe(employeesInfo => { this.employees = employeesInfo });
    console.log(this.allTimeEntryData);
  }

 loadTimeEntryById(timeEntryId){
   this._timeEntryService.loadTimeEntryById(timeEntryId).subscribe();

    let sub =  this._timeEntryService.loadTimeEntryById(timeEntryId)
            .subscribe(data => {
                if (data != null) {
                    this.timeEntryById = data; // We have something     
                }
                else {
                    console.log('No data returned');
                    // Do something else letting the end user know of this.
                }
            },
            err => {
                console.log('we got an error:', err);
            });
 console.log(this.timeEntryById);
  //  this._timeEntryService.loadTimeEntryById(timeEntryId); 
  //   console.log(this.timeEntryById)
   
 }

  saveTimeEntry(timeEntryId){
      var formData = this.form.value;
      this._timeEntryService.createTimeEntry(formData); 
  }

   updateTimeEntry(timeEntryId){
      var formData = this.form.value;
      this._timeEntryService.updateTimeEntry(timeEntryId,formData); 
  }

  deleteTimeEntry(employeeKey: string) {
    this._alertService.openConfirmationDialog('Delete Time','Are you sure you want delete this time entry',
      () => {
        this._timeEntryService.deleteTimeEntryById("1");
        this._notificationService.popToastSuccess('Success','You have successfully delete the time entry.');
      });
  }
  

}
