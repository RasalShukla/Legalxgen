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
    form: FormGroup;
    title: string;
    timeEntryModel : TimeEntry =   new TimeEntry("0","","","","",false,"");
    mainHeadingText: string = "Time Entry";
    smallHeadingText: string = "New ENtry";
    breadcrumbParentText: string = "Dashboard";
    breadcrumbActiveText: string = "Time Entry";
    public allTimeEntryData : TimeEntry[]; 
    public timeEntryById : TimeEntry; 
    /*Typehaed Data storer */
    public states: string[];   
   
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
   
   }

  ngOnInit() {
      this.loadTimeEntry();
      /* Bootstarp TypeAhed Initialization code start */
        this._timeEntryService.loadTypeAheadData().subscribe(typeAheadResponce=>{
           this.states = typeAheadResponce;
            console.log(this.states);
        });
       
       
        /* Bootstarp time timepicker initialization code */
        /* This is wrong practice to use jquery, 
            in future I will create a component 
           for time picker , I did it just because of less time
           but my personal suggestion is please don't use this approch */
         $( document ).ready(function() {
         $(".timepicker").timepicker({
          showInputs: false
         });
        
      });
  }

  loadTimeEntry(){
      //allTimeEntryData
   this._timeEntryService.loadAllTimeEntry().subscribe(
       res =>{
                 this.allTimeEntryData = res;
                console.log(this.allTimeEntryData);
       },
            err => this._notificationService.popToastError('Error','An error occured while processing your request.')
       );}

 loadTimeEntryById(timeEntryId){
   this._timeEntryService.loadTimeEntryById(timeEntryId).subscribe(
            res => {
                this.timeEntryById = res;
                console.log(this.timeEntryById);
            },
            err => this._notificationService.popToastError('Error','An error occured while processing your request.')
        ); 
 }

  saveTimeEntry(timeEntryId){
      var formData = this.form.value;
      this._timeEntryService.createTimeEntry(formData); 
  }

   updateTimeEntry(timeEntryId){
      var formData = this.form.value;
      this._timeEntryService.updateTimeEntry(timeEntryId,formData); 
  }

  deleteTimeEntry(timeEntryId: string) {
    this._alertService.openConfirmationDialog('Delete Time','Are you sure you want delete this time entry',
      () => {
        this._timeEntryService.deleteTimeEntryById(timeEntryId);
        this._notificationService.popToastSuccess('Success','You have successfully delete the time entry.');
      });
  }
  

}
