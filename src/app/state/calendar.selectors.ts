import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { createFeatureSelector, createSelector } from '@ngrx/store';

  export const selectCalendarDate = createFeatureSelector<NgbDate>('currentDate');

  export const selectCalendarDateStruc = createSelector(
    selectCalendarDate,
    (date:NgbDate): NgbDateStruct => {
      return {  
        year: date.year,
        month: date.month,
        day: date.day,
        }
    }
  );

  export const select7_10CurrentDay = createSelector(
    selectCalendarDate,
    (date:NgbDate): boolean => {
      let now = new Date();
      if (now.getFullYear() == date.year && ((now.getMonth()+1) == date.month) && now.getDate() == date.day && now.getHours() >=7 && now.getHours() < 10) {        
        return true;
      }
      now.setDate(now.getDate() -1);
      //returns the month (0 to 11)
      return (now.getFullYear() == date.year && ((now.getMonth()+1) == date.month) && now.getDate() == date.day && now.getHours() >=7 && now.getHours() < 10);
    }
  );

  export const selectCalendarDateObject = createSelector(
    selectCalendarDate,
    (date: NgbDate): Date => {
      return new Date(date.year,date.month-1, date.day, 0, 0, 0)
    }
  );

  export const selectCalendarDateIso = createSelector(
    selectCalendarDate,
    (date: NgbDate): string => {
      return  new Date(date.year,date.month-1, date.day, 0, 0, 0).toISOString();
    }
  );

  export const selectedDateSttring = createSelector(
    selectCalendarDate,
    (date: NgbDate): string => {
      let dd = date.day.toLocaleString("fr-CA", {minimumIntegerDigits: 2});
      let mm = date.month.toLocaleString("fr-CA", {minimumIntegerDigits: 2});
      return  `${date.year}-${mm}-${dd}`;
    }
  );