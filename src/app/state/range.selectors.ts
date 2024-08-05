import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NgbDatesRange, NgbDatesRangeIso, NgbDatesRangeObjects } from '../features/range/range.models';

export const selectDatesRange = createFeatureSelector<NgbDatesRange>('range');


  export const selectDatesRangeObjects = createSelector(
    selectDatesRange,
    (s1: NgbDatesRange): NgbDatesRangeObjects => {
      return {   
            from: new Date(s1.from.year, s1.from.month-1, s1.from.day),
            to: new Date(s1.to.year, s1.to.month-1, s1.to.day)
        }
    }
  );

  export const selectDatesOnlyRange = createSelector(
    selectDatesRange,
    (s1: NgbDatesRange): NgbDatesRangeIso => {
      let dd = s1.from.day.toLocaleString("fr-CA", {minimumIntegerDigits: 2});
      let mm = s1.from.month.toLocaleString("fr-CA", {minimumIntegerDigits: 2});

      let dd1 = s1.to.day.toLocaleString("fr-CA", {minimumIntegerDigits: 2});
      let mm1 = s1.to.month.toLocaleString("fr-CA", {minimumIntegerDigits: 2});

        return {
          from:  `${s1.from.year}-${mm}-${dd}`,   
          to:  `${s1.to.year}-${mm1}-${dd1}`
        }
    }
  );

  export const selectDatesRangeIso = createSelector(
    selectDatesRange,
    selectDatesRangeObjects,
    (s1: NgbDatesRange, s2: NgbDatesRangeObjects): NgbDatesRangeIso => {
      return {   
            from: s2.from.toISOString(),
            to: s2.to.toISOString()
        }
    }
  );