export class TimeEntry
{ 
   constructor(
      public timeEntryId:string,
      public textMatter: string,
      public date: string, 
      public totalTime:string,
      public billableTime:string,
      public isBillable: boolean,
      public workDone: string){
    }
    static fromJson({ timeEntryId, textMatter, date, totalTime, billableTime, isBillable, workDone}) {
    return new TimeEntry(timeEntryId, textMatter, date, totalTime, billableTime, isBillable, workDone);
  }
}

