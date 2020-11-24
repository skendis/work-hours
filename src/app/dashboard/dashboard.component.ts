import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  constructor(private fb: FormBuilder) {
  }

  workHours = this.fb.array([]);
  totalSeconds = 0;
  totalTime = '';
  form = this.fb.group({
    workHours: this.workHours
  });

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    const date = new Date();
    const days = this.DaysInMonth(date.getFullYear(), date.getMonth());
    for (let i = 1; i <= days; i++) {
      this.addFormGroup(new Date(date.getUTCFullYear(), date.getUTCMonth(), i));
    }
  }

  countWorkHours(): void {
    for (let i = 0; i < this.workHours.length; i++) {
      this.calcTime(this.workHours.controls[i]);
    }
    let hours = Math.floor(this.totalSeconds / 1000 / 60 / 60);
    this.totalSeconds -= hours * 1000 * 60 * 60;
    const minutes = Math.floor(this.totalSeconds / 1000 / 60);
    hours = hours < 0 ? hours + 24 : hours;
    this.totalTime = `${hours}:${minutes}`;
  }

  duplicateDay(formGroup: AbstractControl): void {
    const date = formGroup.get('shiftDate').value;
    const index = this.workHours.controls.findIndex(control => control.get('shiftDate').value === date);
    const group = this.fb.group({
      startTime: [''],
      endTime: [''],
      shiftDate: [{value: date, disabled: true}]
    });
    this.workHours.insert(index + 1, group);
  }

  private diff(start, end): number {
    if ((start && end)) {
      start = start.split(':');
      end = end.split(':');
      const startDate = new Date(0, 0, 0, start[0], start[1], 0);
      const endDate = new Date(0, 0, 0, end[0], end[1], 0);
      return endDate.getTime() - startDate.getTime();
    } else {
      return 0;
    }
  }

  private DaysInMonth(year, month): number {
    return new Date(year, month, 0).getUTCDate();
  }

  private addFormGroup(date: Date): void {
    const group = this.fb.group({
      startTime: [''],
      endTime: [''],
      shiftDate: [{value: date, disabled: true}]
    });
    this.workHours.push(group);
  }

  private calcTime(formGroup: AbstractControl): void {
    if (formGroup) {
      const startTime = formGroup.get('startTime').value;
      const endTime = formGroup.get('endTime').value;
      this.totalSeconds += this.diff(startTime, endTime);
    }
  }
}
