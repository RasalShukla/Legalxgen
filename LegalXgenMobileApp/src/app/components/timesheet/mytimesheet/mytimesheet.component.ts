import { Component, OnInit } from '@angular/core';
import { MyTimeSheet } from '../../../shared/model/myTimeSheet';
import { MyTimeSheetService } from '../../../shared/services/myTimeSheet.service';

/**
 * Mytimesheet component class , contains all the functionality related to my time sheet  operations 
 */
@Component({
  selector: 'app-mytimesheet',
  templateUrl: './mytimesheet.component.html',
  styleUrls: ['./mytimesheet.component.css']
})
export class MytimesheetComponent implements OnInit {
     public myTimeSheetData: MyTimeSheet[];
    
    /**
     * @param  {MyTimeSheetService} private_myTimeSheetService
     */
    constructor(private _myTimeSheetService: MyTimeSheetService) {}

    ngOnInit() {
        // On initialization of page pass 1 , so it shows Monday data
        this._myTimeSheetService.loadMyTimeSheetByDayId(1).subscribe(res => this.myTimeSheetData = res);
    }
    
    /**
     * Funtion to get day data by dayId [1 - Mon , 2 - Tue, 3 - Wed, 4 - Thu, 5 - Fri , 6 - Sat, 7 - Sun]
     * @param  {number} dayId
     * @returns void
     */
    getDayDataByDayId(dayId: number) : void {
        this._myTimeSheetService.loadMyTimeSheetByDayId(dayId).subscribe(res => this.myTimeSheetData = res);
    }
    /**
     * Function to edit selected matter by its matter id 
     * @param  {number} matterId
     * @returns void
     */
    editMatterById(matterId: number) : void  {
        alert("Your matter id is :-" + matterId + "   Please do what you want");
    }
}
