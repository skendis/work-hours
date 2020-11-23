import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  workHours = this.fb.array([]);
  form = this.fb.group({
    workHours: this.workHours
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    const date = new Date();
    const days = this.DaysInMonth(date.getFullYear(), date.getMonth());
    for (let i = 2; i <= days; i++) {
      this.addFormGroup(new Date(date.getFullYear(), date.getMonth(), i));
    }
  }


  /**
   * @description calculate time diff of start and end
   * @param start hours:minutes 00:00
   * @param end hours:minutes 00:00
   */
  diff(start, end): number {
    start = start.split(':');
    end = end.split(':');
    const startDate = new Date(0, 0, 0, start[0], start[1], 0);
    const endDate = new Date(0, 0, 0, end[0], end[1], 0);
    return endDate.getTime() - startDate.getTime();
  }

  calcTime(formGroup: AbstractControl): void {
    const startTime = formGroup.get('startTime').value;
    const endTime = formGroup.get('endTime').value;
    this.diff(startTime, endTime);
  }

  /**
   * @description returns days in month
   * @param year - selected year
   * @param month - selected month
   */
  DaysInMonth(year, month): number {
    return new Date(year, month, 0).getDate();
  }


  addFormGroup(date: Date): void {
    const group = this.fb.group({
      startTime: [''],
      endTime: [''],
      shiftDate: [{value: date.toISOString().substring(0, 10), disabled: true}]
    });
    this.workHours.push(group);
  }


  // let hours = Math.floor(diff / 1000 / 60 / 60);
  // diff -= hours * 1000 * 60 * 60;
  // const minutes = Math.floor(diff / 1000 / 60);
  // hours = hours < 0 ? hours + 24 : hours;


  // this.totalHours += hours;
  // this.totalMinutes += minutes;
  // if (this.totalMinutes >= 60) {
  //   this.totalHours += 1;
  //   this.totalMinutes -= 60;
  // }
  // return (hours <= 9 ? '0' : '') + hours + ':' + (minutes <= 9 ? '0' : '') + minutes;


}
