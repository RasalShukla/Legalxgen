import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../shared/services/account.service';
import { TimeEntry }  from '../../../shared/model/timeEntry';
import { FormBuilder, FormGroup,  Validators,ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TimeEntryService} from '../../../shared/services/time-entry.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { AlertService } from '../../../shared/services/alert.service';
import { Observable, BehaviorSubject, Subject } from "rxjs/Rx";
import { TypeaheadMatch } from 'ng2-bootstrap/typeahead';
import { State } from  '../../../shared/model/states';
declare var $:any;
declare var timepicker: any;


/**
 *  Newtimeentry component class , contains all the functionality related to time entry operation  operations 
 */
@Component({
  selector: 'app-newtimeentry',
  templateUrl: './newtimeentry.component.html',
  styleUrls: ['./newtimeentry.component.css']
})
export class NewtimeentryComponent implements OnInit {
    
    ngOnInit() {
        /* Bootstarp time timepicker initialization code */
        $(document).ready(function() {
            $(".timepicker").timepicker({
                showInputs: false
            });
        });
    }

    public form: FormGroup;
    public title: string;
    public timeEntryModel: TimeEntry = new TimeEntry("0", "", "", "", "", false, "");
    public mainHeadingText: string = "Time Entry";
    public smallHeadingText: string = "New ENtry";
    public breadcrumbParentText: string = "Dashboard";
    public breadcrumbActiveText: string = "Time Entry";
    public allTimeEntryData: TimeEntry[];
    public timeEntryById: TimeEntry;
    /*Typehaed Data storer */
    public states: string[];
    public asyncSelected: string;
    public typeaheadLoading: boolean;
    public typeaheadNoResults: boolean;
    public dataSource: Observable < any > ;
    public state: State[];
    public statesComplex: any[] = [];
  
    /**
     * @param  {AccountService} private_accountService
     * @param  {NotificationService} private_notificationService
     * @param  {AlertService} private_alertService
     * @param  {TimeEntryService} private_timeEntryService
     * @param  {FormBuilder} privatefb
     */
    constructor(private _accountService: AccountService,
        private _notificationService: NotificationService,
        private _alertService: AlertService,
        private _timeEntryService: TimeEntryService,
        private fb: FormBuilder,
    ) {
        this.form = fb.group({
            timeEntryId: [],
            textMatter: [],
            date: [],
            totalTime: [],
            billableTime: [],
            isBillable: [],
            workDone: []
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
    
    /**
     * function execute all the the time when user search any data in Typeahead
     * @param  {string} token
     * @returns Observable
     */
    public getStatesAsObservable(token: string): Observable <any> {
        return this._timeEntryService.loadTypeAheadBySearchString(token).do(contacts => this.statesComplex = contacts);
    }

    /**
     * function execute and show loading when Typeahead search data
     * @param  {boolean} e
     * @returns void
     */
    public changeTypeaheadLoading(e: boolean): void {
        this.typeaheadLoading = e;
    }

    /**
     * funtion execute when no data found in Typeahead
     * @param  {boolean} e
     * @returns void
     */
    public changeTypeaheadNoResults(e: boolean): void {
        this.typeaheadNoResults = e;
    }
    
    /**
     * funtion to print selected value of Typeahead
     * @param  {TypeaheadMatch} e
     * @returns void
     */
    public typeaheadOnSelect(e: TypeaheadMatch): void {
            console.log('Selected value: ', e.value);
        }
   /********************************************Code End Related With Bootstarp TypeAhead Loading************************************************************** */

  
    /**
     * function to load all timeentry
     * @returns void
     */
   public loadTimeEntry() : void {
        this._timeEntryService.loadAllTimeEntry().subscribe(
            res => {
                this.allTimeEntryData = res;
                console.log(this.allTimeEntryData);
            },
            err => this._notificationService.popToastError('Error', 'An error occured while processing your request.')
        );
    }

    
    /**
     * function to load time entry by its id
     * @param  {} timeEntryId
     * @returns void
     */
   public loadTimeEntryById(timeEntryId) : void {
        this._timeEntryService.loadTimeEntryById(timeEntryId).subscribe(
            res => {
                this.timeEntryById = res;
                console.log(this.timeEntryById);
            },
            err => this._notificationService.popToastError('Error', 'An error occured while processing your request.')
        );
    }

    /**
     * function to add new time entry
     * @param  {} timeEntryId
     * @returns void
     */
   public saveTimeEntry(timeEntryId) : void {
        var formData = this.form.value;
        this._timeEntryService.createTimeEntry(formData);
    }
    /**
     * funtion to edit time entry by its id
     * @param  {} timeEntryId
     * @returns void
     */
   public updateTimeEntry(timeEntryId) :void {
        var formData = this.form.value;
        this._timeEntryService.updateTimeEntry(timeEntryId, formData);
    }

    /**
     * function to delete time entry by its id 
     * @param  {string} timeEntryId
     * @returns void
     */
    public deleteTimeEntry(timeEntryId: string) : void {
        this._alertService.openConfirmationDialog('Delete Time', 'Are you sure you want delete this time entry', () => {
            this._timeEntryService.deleteTimeEntryById(timeEntryId);
            this._notificationService.popToastSuccess('Success', 'You have successfully delete the time entry.');
        });
    }
}