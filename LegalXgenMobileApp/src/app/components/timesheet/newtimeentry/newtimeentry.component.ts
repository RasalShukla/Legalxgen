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
import {Observable, BehaviorSubject, Subject} from "rxjs/Rx";
import { TypeaheadMatch } from 'ng2-bootstrap/typeahead';
import { State } from  '../../../shared/model/states';

@Component({
  selector: 'app-newtimeentry',
  templateUrl: './newtimeentry.component.html',
  styleUrls: ['./newtimeentry.component.css']
})
export class NewtimeentryComponent implements OnInit {
     ngOnInit() {
          /* Bootstarp time timepicker initialization code */
         $( document ).ready(function() {
            $(".timepicker").timepicker({
            showInputs: false
            });
         });
       }



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
    public asyncSelected: string;
    public typeaheadLoading: boolean;
    public typeaheadNoResults: boolean;
    public dataSource: Observable<any>;
    public state : State[];
    public statesComplex: any[] = [];
 
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
     
     //BootStrap TypeAhead Search
     this.dataSource = Observable
      .create((observer: any) => {
        // Runs on every search
        observer.next(this.timeEntryModel.textMatter);
      })
      .mergeMap((token: string) => this.getStatesAsObservable(token));
   }

 /********************************************Code Start Related With Bootstarp TypeAhead Loading************************************************************** */
  public getStatesAsObservable(token: string): Observable<any> {  
        return  this._timeEntryService.loadTypeAheadBySearchString(token).do(contacts => this.statesComplex = contacts);
  }
 
  public changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }
 
  public changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;
  }
 
  public typeaheadOnSelect(e: TypeaheadMatch): void {
    console.log('Selected value: ', e.value);
  } 
/********************************************Code End Related With Bootstarp TypeAhead Loading************************************************************** */


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
  


