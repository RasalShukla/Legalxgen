import { Component, OnInit } from '@angular/core';
import { MyTimeSheet } from '../../../shared/model/myTimeSheet';
import { MyTimeSheetService } from '../../../shared/services/myTimeSheet.service';

@Component({
  selector: 'app-mytimesheet',
  templateUrl: './mytimesheet.component.html',
  styleUrls: ['./mytimesheet.component.css']
})
export class MytimesheetComponent implements OnInit {
  myTimeSheetData: MyTimeSheet[];
  constructor(private  _myTimeSheetService : MyTimeSheetService) {
  }

  ngOnInit() {
     this._myTimeSheetService.loadMyTimeSheetByDayId(1).subscribe(res => this.myTimeSheetData = res); 
  }

  getDayDataByDayId(dayId :number){
     this._myTimeSheetService.loadMyTimeSheetByDayId(dayId).subscribe(res => this.myTimeSheetData = res); 
  }

  editMatterById(matterId: number){
    alert("Your matter id is :-" + matterId + "   Please do what you want");
  }

}
